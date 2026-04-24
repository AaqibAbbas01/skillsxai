import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateCertHTML, generateEmailHTML } from '@/lib/certificate'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const PAYTM_MID = process.env.PAYTM_MID
const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY
const PAYTM_ENV = process.env.PAYTM_ENV || 'production'

const PAYTM_STATUS_URL =
  PAYTM_ENV === 'staging'
    ? 'https://securegw-stage.paytm.in/v3/order/status'
    : 'https://securegw.paytm.in/v3/order/status'

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

async function saveCertToDb(name: string, email: string) {
  const supabase = getSupabaseClient()
  if (!supabase) return null
  const { data: existing } = await supabase
    .from('masterclass_certificates')
    .select('id, issued_at')
    .eq('email', email)
    .limit(1)
    .single()
  if (existing) return { certId: existing.id as string, issuedAt: existing.issued_at as string }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const ts = Date.now().toString(36)
  let id = ts
  for (let i = 0; i < 30 - ts.length; i++) id += chars.charAt(Math.floor(Math.random() * chars.length))
  const issuedAt = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  await supabase.from('masterclass_certificates').insert({
    id,
    name,
    email,
    issued_at: issuedAt,
    skills: ['Artificial Intelligence', 'Prompt Engineering', 'AI Agents & Automation', 'AI Tools & APIs'],
  })
  return { certId: id, issuedAt }
}

async function sendCertificateEmail(name: string, email: string) {
  if (!RESEND_API_KEY || !name || !email) return
  const { Resend } = await import('resend')
  const resend = new Resend(RESEND_API_KEY)

  const saved = await saveCertToDb(name, email)
  const certId = saved?.certId || `SKX-MC-${Date.now().toString(36).toUpperCase()}`
  const dateStr = saved?.issuedAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const certUrl = `https://skillsxai.com/certificate/${certId}`

  const certHtml = generateCertHTML(name, certId, dateStr)
  const emailHtml = generateEmailHTML(name, certId, dateStr, certUrl)
  await resend.emails.send({
    from: 'SkillsXAI <certificates@team.skillsxai.com>',
    to: email,
    subject: `Your AI Masterclass Certificate — ${name} | SkillsXAI`,
    html: emailHtml,
    attachments: [{ filename: `SkillsXAI-Certificate-${name.replace(/\s+/g, '-')}.html`, content: Buffer.from(certHtml, 'utf-8'), contentType: 'text/html' }],
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, utr, name, email, phone } = body

    if (!orderId || typeof orderId !== 'string') {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 })
    }
    if (!utr || typeof utr !== 'string') {
      return NextResponse.json({ error: 'Transaction ID (UTR) is required' }, { status: 400 })
    }

    if (!PAYTM_MID || !PAYTM_MERCHANT_KEY) {
      const supabase = getSupabaseClient()
      if (supabase) {
        await supabase.from('masterclass_payments').insert({
          name: name || '',
          email: email || '',
          phone: phone || '',
          utr,
          amount: 99,
          order_id: orderId,
          paytm_status: 'UNVERIFIED',
          paytm_result_msg: 'Paytm credentials not configured — manual verification required',
          verified: false,
        })
      }

      return NextResponse.json({
        success: true,
        verified: false,
        status: 'PENDING_MANUAL',
        message:
          'Payment recorded. Our team will verify and send your certificate within 24 hours.',
      })
    }

    const PaytmChecksum = (await import('paytmchecksum')).default

    const paytmBody = {
      mid: PAYTM_MID,
      orderId,
    }

    const signature = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmBody),
      PAYTM_MERCHANT_KEY
    )

    const paytmResponse = await fetch(PAYTM_STATUS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: paytmBody,
        head: { signature },
      }),
    })

    const paytmData = await paytmResponse.json()

    const resultStatus = paytmData?.body?.resultInfo?.resultStatus
    const resultCode = paytmData?.body?.resultInfo?.resultCode
    const resultMsg = paytmData?.body?.resultInfo?.resultMsg
    const txnId = paytmData?.body?.txnId
    const paymentMode = paytmData?.body?.paymentMode
    const bankName = paytmData?.body?.bankName
    const isSuccess = resultStatus === 'TXN_SUCCESS'

    const supabase = getSupabaseClient()
    if (supabase) {
      await supabase.from('masterclass_payments').insert({
        name: name || '',
        email: email || '',
        phone: phone || '',
        utr,
        amount: 99,
        order_id: orderId,
        paytm_txn_id: txnId || null,
        paytm_status: resultStatus || 'UNKNOWN',
        paytm_result_code: resultCode || null,
        paytm_result_msg: resultMsg || null,
        payment_mode: paymentMode || null,
        bank_name: bankName || null,
        verified: isSuccess,
        verified_at: isSuccess ? new Date().toISOString() : null,
      })

      if (isSuccess) {
        await supabase
          .from('masterclass_registrations')
          .update({ payment_status: 'verified' })
          .eq('email', email)
      }
    }

    if (isSuccess) {
      sendCertificateEmail(name, email).catch(() => {})

      return NextResponse.json({
        success: true,
        verified: true,
        status: 'TXN_SUCCESS',
        message: 'Payment verified successfully! Your certificate is ready.',
        txnId,
        paymentMode,
        bankName,
      })
    }

    if (resultStatus === 'PENDING') {
      return NextResponse.json({
        success: true,
        verified: false,
        status: 'PENDING',
        message:
          'Payment is still being processed. Please wait a few minutes and try again.',
      })
    }

    if (resultStatus === 'NO_RECORD_FOUND') {
      return NextResponse.json({
        success: false,
        verified: false,
        status: 'NO_RECORD_FOUND',
        message:
          'No payment found for this transaction. Please check the Order ID and try again.',
      })
    }

    return NextResponse.json({
      success: false,
      verified: false,
      status: resultStatus || 'TXN_FAILURE',
      message: resultMsg || 'Payment verification failed. Please contact support.',
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
