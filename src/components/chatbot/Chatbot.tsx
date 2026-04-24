'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  User,
  Loader2,
  MinusCircle,
  Maximize2,
  RotateCcw,
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const QUICK_REPLIES = [
  '🎓 School program kya hai?',
  '💼 Professional courses',
  '📍 100% placement kaise?',
  '💰 Fees & EMI',
  '📞 Contact info',
]

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Namaste! 👋 Main hoon **Aria**, SkillsXAI ki AI assistant.\n\nMain aapki help kar sakti hoon — chahe aap apne school ke liye AI program dhundh rahe hoon, ya khud ka career transform karna chahte hoon with **100% placement assurance**.\n\nKya jaanna chahte hain aap? 😊",
  timestamp: new Date(),
}

// Pre-defined responses removed — now powered by Gemini AI

export default function Chatbot() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  if (pathname.startsWith('/masterclass')) return null

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    setError(null)

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInputValue('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        // Use server's user-friendly message if available
        throw new Error(data.error || 'Something went wrong')
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.content,
          timestamp: new Date(),
        },
      ])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error. Please try again.'
      setError(null) // clear banner, show inline instead
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: msg,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE])
    setError(null)
    setIsTyping(false)
  }

  return (
    <>
      {/* ── Floating Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan shadow-2xl flex items-center justify-center"
            style={{ boxShadow: '0 4px 30px rgba(59,130,246,0.55)' }}
            aria-label="Open chat"
          >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0a0f1a] animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-50 w-[390px] max-w-[calc(100vw-1.5rem)] rounded-3xl overflow-hidden flex flex-col"
            style={{
              height: isMinimized ? 'auto' : '600px',
              background: 'rgba(8, 12, 22, 0.97)',
              border: '1px solid rgba(59,130,246,0.2)',
              boxShadow: '0 8px 60px rgba(59,130,246,0.25)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* ── Header ── */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-3.5 border-b border-white/8 bg-gradient-to-r from-primary-600/15 to-purple-600/15">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#080c16]" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm leading-none mb-0.5">Aria</p>
                  <p className="text-[11px] text-green-400 leading-none">SkillsXAI AI Assistant · Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="p-2 rounded-xl hover:bg-white/8 text-gray-500 hover:text-gray-300 transition-colors"
                  title="Clear chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-xl hover:bg-white/8 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <MinusCircle className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/8 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* ── Messages ── */}
                <div
                  className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}
                >
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                      className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5 ${msg.role === 'user'
                          ? 'bg-purple-500/25'
                          : 'bg-gradient-to-br from-primary-500 to-accent-cyan shadow-sm shadow-primary-500/30'
                        }`}>
                        {msg.role === 'user'
                          ? <User className="w-3.5 h-3.5 text-purple-300" />
                          : <Sparkles className="w-3.5 h-3.5 text-white" />
                        }
                      </div>

                      {/* Bubble */}
                      <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                          ? 'bg-gradient-to-br from-purple-600/40 to-pink-600/20 text-white rounded-tr-sm border border-purple-500/20'
                          : 'bg-white/6 text-gray-100 rounded-tl-sm border border-white/8'
                        }`}>
                        {msg.role === 'assistant' ? (
                          <div className="prose prose-invert prose-sm max-w-none
                            prose-p:my-1 prose-p:leading-relaxed
                            prose-strong:text-white prose-strong:font-semibold
                            prose-ul:my-1 prose-ul:pl-4 prose-li:my-0.5
                            prose-headings:text-white prose-headings:font-semibold
                          ">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <p>{msg.content}</p>
                        )}
                        <p className="text-[10px] text-gray-600 mt-1.5 select-none">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="flex gap-2.5"
                      >
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center flex-shrink-0 shadow-sm shadow-primary-500/30">
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="bg-white/6 border border-white/8 px-4 py-3.5 rounded-2xl rounded-tl-sm">
                          <div className="flex gap-1 items-center">
                            {[0, 1, 2].map(i => (
                              <motion.span
                                key={i}
                                className="w-1.5 h-1.5 bg-primary-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.18 }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </div>

                {/* ── Quick Replies (shown only at start) ── */}
                {messages.length <= 2 && !isTyping && (
                  <div className="px-4 pb-2 flex gap-2 flex-wrap">
                    {QUICK_REPLIES.map(q => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-primary-500/15 hover:border-primary-500/30 hover:text-white transition-all whitespace-nowrap"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* ── Error Banner ── */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mx-4 mb-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Input Area ── */}
                <div className="flex-shrink-0 px-4 pb-4 pt-2 border-t border-white/8">
                  <div className="flex gap-2 items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isTyping}
                      placeholder="Kuch bhi poochh sakte hain…"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm outline-none focus:border-primary-500/40 focus:bg-white/8 transition-all disabled:opacity-50"
                    />
                    <button
                      onClick={() => sendMessage(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center flex-shrink-0 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/30 transition-all active:scale-95"
                    >
                      {isTyping
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Send className="w-4 h-4" />
                      }
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-700 text-center mt-2 select-none">
                    Powered by Gemini AI · SkillsXAI 🤖
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
