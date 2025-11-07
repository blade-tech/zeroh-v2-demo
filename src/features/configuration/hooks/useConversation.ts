import { useCallback, useEffect } from 'react'
import { useConversationStore } from './useConversationStore'
import { getConversationService } from '../services'
import type { Message, StreamEvent } from '../types'

/**
 * useConversation Hook
 *
 * Primary interface for conversation functionality.
 * Connects Zustand store with ConversationService.
 *
 * Usage:
 * ```tsx
 * const { sendMessage, isStreaming, messages } = useConversation()
 * await sendMessage("I want to structure a Sukuk")
 * ```
 */
export function useConversation() {
  const store = useConversationStore()
  const service = getConversationService()

  /**
   * Initialize session on mount
   */
  useEffect(() => {
    if (!store.sessionId) {
      initializeSession()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Initialize new session
   */
  const initializeSession = useCallback(async () => {
    try {
      const session = await service.createSession()
      store.setSessionId(session.sessionId)
    } catch (error) {
      console.error('Failed to initialize session:', error)
      store.setError('Failed to initialize conversation session')
    }
  }, [service, store])

  /**
   * Handle individual stream events
   */
  const handleStreamEvent = useCallback(
    (event: StreamEvent) => {
      switch (event.type) {
        case 'thinking':
          store.setThinkingStatus((event.data as { message: string }).message)
          break

        case 'message_start':
          store.setThinkingStatus(null)
          break

        case 'message_delta':
          store.updateStreamingMessage((event.data as { delta: string }).delta)
          break

        case 'message_stop':
          store.completeStreamingMessage((event.data as { message_id: string }).message_id)
          break

        case 'tool_call_start':
          store.setThinkingStatus(
            `Executing tool: ${(event.data as { tool_name: string }).tool_name}...`
          )
          break

        case 'tool_call_result':
          // Could update deal configuration based on tool results
          break

        case 'error':
          store.setError((event.data as { message: string }).message)
          store.setIsStreaming(false)
          store.setThinkingStatus(null)
          break

        case 'done':
          // Increment questions answered (estimated based on response)
          store.incrementQuestionsAnswered()
          break
      }
    },
    [store]
  )

  /**
   * Send message with streaming response
   */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!store.sessionId) {
        await initializeSession()
      }

      // Add user message
      const userMessage: Message = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
      }
      store.addMessage(userMessage)

      // Start streaming
      store.setIsStreaming(true)
      store.setError(null)

      try {
        const context = store.getContext()
        const stream = service.streamMessage(content, context)

        // Process stream events
        for await (const event of stream) {
          handleStreamEvent(event)
        }
      } catch (error) {
        console.error('Stream error:', error)
        store.setError(error instanceof Error ? error.message : 'Unknown error occurred')
        store.setIsStreaming(false)
        store.setThinkingStatus(null)
      }
    },
    [service, store, initializeSession, handleStreamEvent]
  )

  /**
   * Interrupt ongoing stream
   */
  const interrupt = useCallback(async () => {
    if (store.sessionId) {
      await service.interrupt(store.sessionId)
      store.setIsStreaming(false)
      store.setThinkingStatus(null)
    }
  }, [service, store])

  /**
   * Reset conversation
   */
  const reset = useCallback(async () => {
    if (store.sessionId) {
      await service.reset(store.sessionId)
    }
    store.reset()
    await initializeSession()
  }, [service, store, initializeSession])

  return {
    // State
    sessionId: store.sessionId,
    messages: store.messages,
    isStreaming: store.isStreaming,
    currentStreamingMessage: store.currentStreamingMessage,
    thinkingStatus: store.thinkingStatus,
    currentDealConfiguration: store.currentDealConfiguration,
    activatedControls: store.activatedControls,
    completeness: store.completeness,
    questionsAnswered: store.questionsAnswered,
    totalQuestions: store.totalQuestions,
    error: store.error,

    // Actions
    sendMessage,
    interrupt,
    reset,
    initializeSession,
  }
}
