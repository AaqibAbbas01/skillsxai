import puppeteerCore from 'puppeteer-core'
import type { Browser } from 'puppeteer-core'

let browserInstance: Browser | null = null

const CHROMIUM_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-gpu',
  '--disable-web-security',
  '--disable-features=IsolateOrigins',
  '--disable-site-isolation-trials',
  '--single-process',
  '--disable-dev-shm-usage',
]

async function getBrowser(): Promise<Browser> {
  if (browserInstance && browserInstance.connected) return browserInstance

  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    const puppeteer = await import('puppeteer')
    browserInstance = await puppeteer.default.launch({
      headless: true,
      args: CHROMIUM_ARGS,
    }) as unknown as Browser
  } else {
    const chromium = await import('@sparticuz/chromium')
    browserInstance = await puppeteerCore.launch({
      args: [...chromium.default.args, ...CHROMIUM_ARGS],
      defaultViewport: chromium.default.defaultViewport,
      executablePath: await chromium.default.executablePath(),
      headless: chromium.default.headless,
    })
  }

  return browserInstance
}

export async function htmlToPdf(html: string, landscape = false): Promise<Buffer> {
  const browser = await getBrowser()
  const page = await browser.newPage()
  try {
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const type = req.resourceType()
      if (['image', 'font', 'media'].includes(type)) {
        req.abort()
      } else {
        req.continue()
      }
    })

    await page.setContent(html, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    })

    const pdf = await page.pdf({
      format: 'A4',
      landscape,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      timeout: 15000,
    })
    return Buffer.from(pdf)
  } finally {
    await page.close()
  }
}

export async function htmlFileToPdf(htmlBuffer: Buffer, landscape = false): Promise<Buffer> {
  return htmlToPdf(htmlBuffer.toString('utf-8'), landscape)
}
