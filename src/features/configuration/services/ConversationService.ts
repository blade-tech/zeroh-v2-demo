import type {
  ConversationContext,
  ConversationResponse,
  SessionState,
  StreamEvent,
} from '../types/conversation'

/**
 * ConversationService Interface
 *
 * This interface defines the contract for conversation services.
 * It enables the Mock-to-Real pattern where:
 * - During development: MockConversationService implements this interface
 * - In production: RealConversationService implements this interface
 * - Frontend code NEVER imports implementations directly, only this interface
 *
 * This guarantees < 1 day backend swap when ready.
 */
export interface ConversationService {
  /**
   * Stream a message to the conversation and receive AG-UI protocol events
   *
   * @param message - User message content
   * @param context - Current conversation context
   * @returns AsyncGenerator yielding StreamEvent objects following AG-UI protocol
   *
   * AG-UI Event Flow:
   * 1. thinking - Agent processing (optional)
   * 2. message_start - Begin streaming response
   * 3. message_delta - Incremental content (multiple events)
   * 4. tool_call_start/result - Tool execution (if needed)
   * 5. message_stop - Response complete
   * 6. done - Stream finished
   */
  streamMessage(
    message: string,
    context: ConversationContext
  ): AsyncGenerator<StreamEvent, void, unknown>

  /**
   * Send a message and receive complete response (non-streaming)
   *
   * @param message - User message content
   * @param context - Current conversation context
   * @returns Promise resolving to complete ConversationResponse
   *
   * This is a convenience method that internally uses streamMessage
   * and aggregates all deltas into a single response.
   */
  sendMessage(message: string, context: ConversationContext): Promise<ConversationResponse>

  /**
   * Create a new conversation session
   *
   * @returns Promise resolving to initial SessionState
   */
  createSession(): Promise<SessionState>

  /**
   * Get current session state
   *
   * @param sessionId - Session identifier
   * @returns Promise resolving to SessionState or null if not found
   */
  getSession(sessionId: string): Promise<SessionState | null>

  /**
   * Update session state
   *
   * @param sessionId - Session identifier
   * @param state - Updated SessionState
   * @returns Promise resolving to updated SessionState
   */
  updateSession(sessionId: string, state: Partial<SessionState>): Promise<SessionState>

  /**
   * Interrupt ongoing conversation stream
   *
   * @param sessionId - Session identifier
   * @returns Promise resolving when interruption complete
   */
  interrupt(sessionId: string): Promise<void>

  /**
   * Reset conversation to initial state
   *
   * @param sessionId - Session identifier
   * @returns Promise resolving to reset SessionState
   */
  reset(sessionId: string): Promise<SessionState>
}

/**
 * Factory function type for creating conversation services
 * Enables runtime selection between mock and real implementations
 */
export type ConversationServiceFactory = () => ConversationService

/**
 * Configuration for conversation service
 */
export interface ConversationServiceConfig {
  useMockService: boolean
  apiBaseUrl?: string
  apiKey?: string
  timeout?: number
}
