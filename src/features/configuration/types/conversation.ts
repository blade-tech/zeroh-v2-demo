/**
 * Conversation Types
 * Following AG-UI Protocol specification for conversational interfaces
 */

// ============================================================================
// AG-UI Protocol Stream Events
// ============================================================================

/**
 * Server-Sent Events for AG-UI protocol streaming
 */
export type StreamEventType =
  | 'thinking' // Agent is processing
  | 'message_start' // Message generation starting
  | 'message_delta' // Incremental message content
  | 'message_stop' // Message generation complete
  | 'tool_call_start' // Tool execution starting
  | 'tool_call_delta' // Tool execution progress
  | 'tool_call_result' // Tool execution complete
  | 'error' // Error occurred
  | 'done' // Stream complete

export interface StreamEvent {
  type: StreamEventType
  data: unknown
}

export interface ThinkingEvent extends StreamEvent {
  type: 'thinking'
  data: {
    message: string
  }
}

export interface MessageStartEvent extends StreamEvent {
  type: 'message_start'
  data: {
    message_id: string
  }
}

export interface MessageDeltaEvent extends StreamEvent {
  type: 'message_delta'
  data: {
    delta: string
  }
}

export interface MessageStopEvent extends StreamEvent {
  type: 'message_stop'
  data: {
    message_id: string
    stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence'
  }
}

export interface ToolCallStartEvent extends StreamEvent {
  type: 'tool_call_start'
  data: {
    tool_call_id: string
    tool_name: string
  }
}

export interface ToolCallResultEvent extends StreamEvent {
  type: 'tool_call_result'
  data: {
    tool_call_id: string
    result: unknown
  }
}

export interface ErrorEvent extends StreamEvent {
  type: 'error'
  data: {
    error: string
    message: string
  }
}

export interface DoneEvent extends StreamEvent {
  type: 'done'
  data: Record<string, never>
}

// ============================================================================
// Conversation Context
// ============================================================================

/**
 * Context for conversation state
 * Includes current deal configuration and activated controls
 */
export interface ConversationContext {
  sessionId: string
  currentDealConfiguration: DealConfiguration
  activatedControls: string[] // Control IDs
  conversationHistory: Message[]
}

/**
 * Deal configuration extracted from conversation
 */
export interface DealConfiguration {
  // Basic deal information
  dealType?: string // e.g., "Murabaha", "Sukuk", "Ijarah"
  structure?: string // e.g., "Asset-backed", "Equity-based"
  jurisdiction?: string // e.g., "Malaysia", "UAE", "Saudi Arabia"

  // Financial details
  size?: number // Deal size in USD
  currency?: string // e.g., "USD", "MYR", "AED"
  tenor?: number // In months

  // Compliance details
  isMultiJurisdiction?: boolean
  requiresShariahCertification?: boolean
  hasCrossBorderPayments?: boolean
  isPublicOffering?: boolean

  // Sukuk-specific
  sukukType?: string // e.g., "Ijarah", "Murabaha", "Wakala"
  underlyingAsset?: string

  // Participants
  participants?: string[] // e.g., ["Issuer", "SPV", "Trustee"]

  // Framework and documentation
  specificFrameworks?: string[] // e.g., ["Green Sukuk", "AAOIFI Standard XX"]
  hasExistingDocs?: boolean // Whether existing documentation is available

  // Additional metadata
  extractedAt?: Date
  completeness?: number // 0-100%
}

// ============================================================================
// Messages
// ============================================================================

export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  metadata?: {
    thinking?: string
    toolCalls?: ToolCall[]
  }
}

export interface ToolCall {
  id: string
  name: string
  input: unknown
  result?: unknown
  status: 'pending' | 'success' | 'error'
  error?: string
}

// ============================================================================
// Conversation Response
// ============================================================================

/**
 * Response from conversation service
 * Includes updated context and any extracted deal configuration
 */
export interface ConversationResponse {
  messageId: string
  content: string
  updatedContext: ConversationContext
  extractedData?: Partial<DealConfiguration>
  activatedControls?: string[]
  suggestedNextQuestion?: string
}

// ============================================================================
// Control Activation
// ============================================================================

/**
 * Control activation result
 * Maps questions to controls based on MVQ logic
 */
export interface ControlActivation {
  controlId: string
  reason: string
  confidence: number // 0-1
  requiredFor: string[] // Deal types this control is required for
}

// ============================================================================
// Session State
// ============================================================================

export type SessionStatus = 'active' | 'paused' | 'completed' | 'error'

export interface SessionState {
  sessionId: string
  status: SessionStatus
  progress: {
    questionsAnswered: number
    totalQuestions: number
    completeness: number // 0-100%
  }
  context: ConversationContext
  createdAt: Date
  updatedAt: Date
}
