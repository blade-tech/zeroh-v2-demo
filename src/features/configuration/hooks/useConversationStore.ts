import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Message, ConversationContext, DealConfiguration, SessionState } from '../types'

/**
 * Conversation Store State
 */
interface ConversationStore {
  // Session state
  sessionId: string | null
  sessionStatus: SessionState['status']

  // Messages
  messages: Message[]
  isStreaming: boolean
  currentStreamingMessage: string

  // Thinking/Status
  thinkingStatus: string | null

  // Deal configuration
  currentDealConfiguration: DealConfiguration
  activatedControls: string[]
  completeness: number

  // Progress
  questionsAnswered: number
  totalQuestions: number

  // Error state
  error: string | null

  // Actions
  setSessionId: (sessionId: string) => void
  addMessage: (message: Message) => void
  updateStreamingMessage: (delta: string) => void
  completeStreamingMessage: (messageId: string) => void
  setThinkingStatus: (status: string | null) => void
  setIsStreaming: (isStreaming: boolean) => void
  updateDealConfiguration: (updates: Partial<DealConfiguration>) => void
  setActivatedControls: (controls: string[]) => void
  setCompleteness: (completeness: number) => void
  incrementQuestionsAnswered: () => void
  setError: (error: string | null) => void
  reset: () => void

  // Derived getters
  getContext: () => ConversationContext
}

/**
 * Initial state
 */
const initialState = {
  sessionId: null,
  sessionStatus: 'active' as const,
  messages: [],
  isStreaming: false,
  currentStreamingMessage: '',
  thinkingStatus: null,
  currentDealConfiguration: {},
  activatedControls: [],
  completeness: 0,
  questionsAnswered: 0,
  totalQuestions: 12,
  error: null,
}

/**
 * Zustand Conversation Store
 *
 * Manages all conversation state with localStorage persistence.
 * Frontend components use this store to access conversation data.
 */
export const useConversationStore = create<ConversationStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSessionId: (sessionId) => set({ sessionId }),

      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      updateStreamingMessage: (delta) =>
        set((state) => ({
          currentStreamingMessage: state.currentStreamingMessage + delta,
        })),

      completeStreamingMessage: (messageId) =>
        set((state) => {
          const message: Message = {
            id: messageId,
            role: 'assistant',
            content: state.currentStreamingMessage.trim(),
            timestamp: new Date(),
          }
          return {
            messages: [...state.messages, message],
            currentStreamingMessage: '',
            isStreaming: false,
            thinkingStatus: null,
          }
        }),

      setThinkingStatus: (status) => set({ thinkingStatus: status }),

      setIsStreaming: (isStreaming) =>
        set({
          isStreaming,
          currentStreamingMessage: isStreaming ? '' : get().currentStreamingMessage,
        }),

      updateDealConfiguration: (updates) =>
        set((state) => ({
          currentDealConfiguration: {
            ...state.currentDealConfiguration,
            ...updates,
          },
        })),

      setActivatedControls: (controls) => set({ activatedControls: controls }),

      setCompleteness: (completeness) => set({ completeness }),

      incrementQuestionsAnswered: () =>
        set((state) => ({
          questionsAnswered: Math.min(state.questionsAnswered + 1, state.totalQuestions),
          completeness: Math.round(
            (Math.min(state.questionsAnswered + 1, state.totalQuestions) / state.totalQuestions) *
              100
          ),
        })),

      setError: (error) => set({ error }),

      reset: () => set(initialState),

      getContext: () => {
        const state = get()
        return {
          sessionId: state.sessionId || '',
          currentDealConfiguration: state.currentDealConfiguration,
          activatedControls: state.activatedControls,
          conversationHistory: state.messages,
        }
      },
    }),
    {
      name: 'zeroh-conversation-storage',
      partialize: (state) => ({
        sessionId: state.sessionId,
        messages: state.messages,
        currentDealConfiguration: state.currentDealConfiguration,
        activatedControls: state.activatedControls,
        questionsAnswered: state.questionsAnswered,
        completeness: state.completeness,
      }),
    }
  )
)
