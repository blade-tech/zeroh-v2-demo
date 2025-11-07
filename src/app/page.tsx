'use client'

import { useState, useRef, useEffect } from 'react'
import { useConversation } from '@/features/configuration/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { DealSummary } from '@/components/workflow/DealSummary'
import { Send, Loader2, Sparkles, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    isStreaming,
    currentStreamingMessage,
    thinkingStatus,
    completeness,
    questionsAnswered,
    totalQuestions,
    activatedControls,
    currentDealConfiguration,
    sendMessage,
  } = useConversation()

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, currentStreamingMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isStreaming) return
    await sendMessage(inputValue)
    setInputValue('')
  }

  const showWelcome = messages.length === 0 && !isStreaming

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">ZeroH V2</h1>
              <p className="text-sm text-gray-600">Islamic Finance GRC</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                View Dashboard
              </Button>
            </Link>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {questionsAnswered} of {totalQuestions}
              </p>
              <p className="text-xs text-gray-600">{activatedControls.length} controls</p>
            </div>
            <div className="w-32">
              <Progress value={completeness} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="flex h-full flex-1 flex-col">
          <div className="mx-auto h-full w-full max-w-4xl">
            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-y-auto px-4 py-6">
                {showWelcome && (
                  <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                      <CardTitle>Welcome to ZeroH V2 Demo</CardTitle>
                      <CardDescription>AI-native Islamic Finance GRC</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700">
                        I&apos;ll guide you through 12 questions. Based on your answers, I&apos;ll
                        activate 12-26 relevant controls.
                      </p>
                      <div className="rounded-lg bg-purple-50 p-4">
                        <p className="text-sm font-medium text-purple-900">Try:</p>
                        <ul className="mt-2 space-y-1 text-sm text-purple-800">
                          <li>• &quot;I want to structure a $50M Sukuk&quot;</li>
                          <li>• &quot;Murabaha transaction in Malaysia&quot;</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-900 shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                      <div
                        className={`mt-1 text-xs ${msg.role === 'user' ? 'text-purple-200' : 'text-gray-500'}`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}

                {isStreaming && currentStreamingMessage && (
                  <div className="mb-4 flex justify-start">
                    <div className="max-w-[80%] rounded-lg bg-white px-4 py-3 shadow-sm">
                      <div className="whitespace-pre-wrap text-sm text-gray-900">
                        {currentStreamingMessage}
                        <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-purple-600" />
                      </div>
                    </div>
                  </div>
                )}

                {thinkingStatus && (
                  <div className="mb-4 flex justify-start">
                    <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                      <span className="text-sm text-purple-900">{thinkingStatus}</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-gray-200 bg-white px-4 py-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isStreaming}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isStreaming || !inputValue.trim()} size="icon">
                    {isStreaming ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Summary Sidebar */}
        <div className="hidden w-96 lg:block">
          <DealSummary
            configuration={currentDealConfiguration}
            activatedControls={activatedControls}
            completeness={completeness}
            questionsAnswered={questionsAnswered}
            totalQuestions={totalQuestions}
          />
        </div>
      </main>
    </div>
  )
}
