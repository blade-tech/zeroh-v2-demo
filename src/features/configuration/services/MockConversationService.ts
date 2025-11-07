import type {
  ConversationContext,
  ConversationResponse,
  DealConfiguration,
  SessionState,
  StreamEvent,
} from '../types'
import type { ConversationService } from './ConversationService'
import type { MVQ_QUESTIONS } from '@/lib/constants/mvq-questions'
import { getNextQuestion } from '@/lib/constants/mvq-questions'
import { calculateActivatedControls } from '@/lib/constants/control-activation'

/**
 * MockConversationService
 *
 * Implements ConversationService interface with realistic AG-UI protocol streaming.
 * Simulates intelligent conversational flow for the 12-question MVQ.
 *
 * This mock service will be replaced with RealConversationService when backend is ready.
 * NO FRONTEND CODE should import this directly - always use the factory.
 */
export class MockConversationService implements ConversationService {
  private sessions = new Map<string, SessionState>()
  private interruptSignals = new Map<string, boolean>()

  /**
   * Stream message with AG-UI protocol events
   */
  async *streamMessage(
    message: string,
    context: ConversationContext
  ): AsyncGenerator<StreamEvent, void, unknown> {
    const sessionId = context.sessionId

    // Check for interrupt signal
    if (this.interruptSignals.get(sessionId)) {
      this.interruptSignals.set(sessionId, false)
      yield { type: 'error', data: { error: 'interrupted', message: 'Stream interrupted by user' } }
      return
    }

    // 1. Thinking phase
    yield { type: 'thinking', data: { message: 'Analyzing your response...' } }
    await this.delay(600)

    // 2. Extract information from user message
    const extracted = this.extractDealInfo(message, context.currentDealConfiguration)

    yield { type: 'thinking', data: { message: 'Updating deal configuration...' } }
    await this.delay(400)

    // 3. Calculate activated controls
    const updatedConfig = { ...context.currentDealConfiguration, ...extracted }
    const activatedControls = calculateActivatedControls(updatedConfig)

    // 4. Determine next question
    const answeredQuestions = this.getAnsweredQuestions(context)
    const nextQuestion = getNextQuestion(answeredQuestions)

    yield { type: 'thinking', data: { message: 'Preparing response...' } }
    await this.delay(300)

    // 5. Generate response
    const messageId = `msg_${Date.now()}`
    yield { type: 'message_start', data: { message_id: messageId } }

    let responseText = ''
    if (nextQuestion) {
      responseText = this.generateQuestionResponse(nextQuestion, updatedConfig, activatedControls)
    } else {
      responseText = this.generateCompletionResponse(updatedConfig, activatedControls)
    }

    // 6. Stream response word by word
    const words = responseText.split(' ')
    for (const word of words) {
      if (this.interruptSignals.get(sessionId)) {
        yield {
          type: 'error',
          data: { error: 'interrupted', message: 'Stream interrupted by user' },
        }
        return
      }

      yield { type: 'message_delta', data: { delta: word + ' ' } }
      await this.delay(30) // Realistic typing speed
    }

    // 7. Complete message
    yield {
      type: 'message_stop',
      data: { message_id: messageId, stop_reason: 'end_turn' as const },
    }

    // 8. Done
    yield { type: 'done', data: {} }
  }

  /**
   * Send message (non-streaming) - aggregates stream events
   */
  async sendMessage(message: string, context: ConversationContext): Promise<ConversationResponse> {
    let fullContent = ''
    const stream = this.streamMessage(message, context)

    for await (const event of stream) {
      if (event.type === 'message_delta') {
        fullContent += (event.data as { delta: string }).delta
      }
    }

    // Extract deal info
    const extracted = this.extractDealInfo(message, context.currentDealConfiguration)
    const updatedConfig = { ...context.currentDealConfiguration, ...extracted }
    const activatedControls = calculateActivatedControls(updatedConfig)

    // Determine next question
    const answeredQuestions = this.getAnsweredQuestions(context)
    const nextQuestion = getNextQuestion(answeredQuestions)

    return {
      messageId: `msg_${Date.now()}`,
      content: fullContent.trim(),
      updatedContext: {
        ...context,
        currentDealConfiguration: updatedConfig,
        activatedControls,
      },
      extractedData: extracted,
      activatedControls,
      suggestedNextQuestion: nextQuestion?.question,
    }
  }

  /**
   * Create new session
   */
  async createSession(): Promise<SessionState> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

    const session: SessionState = {
      sessionId,
      status: 'active',
      progress: {
        questionsAnswered: 0,
        totalQuestions: 12,
        completeness: 0,
      },
      context: {
        sessionId,
        currentDealConfiguration: {},
        activatedControls: [],
        conversationHistory: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.sessions.set(sessionId, session)
    return session
  }

  /**
   * Get session state
   */
  async getSession(sessionId: string): Promise<SessionState | null> {
    return this.sessions.get(sessionId) || null
  }

  /**
   * Update session state
   */
  async updateSession(sessionId: string, state: Partial<SessionState>): Promise<SessionState> {
    const existing = this.sessions.get(sessionId)
    if (!existing) {
      throw new Error(`Session ${sessionId} not found`)
    }

    const updated: SessionState = {
      ...existing,
      ...state,
      updatedAt: new Date(),
    }

    this.sessions.set(sessionId, updated)
    return updated
  }

  /**
   * Interrupt ongoing stream
   */
  async interrupt(sessionId: string): Promise<void> {
    this.interruptSignals.set(sessionId, true)
  }

  /**
   * Reset session
   */
  async reset(sessionId: string): Promise<SessionState> {
    const session = await this.getSession(sessionId)
    if (!session) {
      throw new Error(`Session ${sessionId} not found`)
    }

    const reset: SessionState = {
      ...session,
      status: 'active',
      progress: {
        questionsAnswered: 0,
        totalQuestions: 12,
        completeness: 0,
      },
      context: {
        sessionId,
        currentDealConfiguration: {},
        activatedControls: [],
        conversationHistory: [],
      },
      updatedAt: new Date(),
    }

    this.sessions.set(sessionId, reset)
    return reset
  }

  // ============================================================================
  // Private helper methods
  // ============================================================================

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private extractDealInfo(
    message: string,
    currentConfig: DealConfiguration
  ): Partial<DealConfiguration> {
    const extracted: Partial<DealConfiguration> = {}
    const lowerMessage = message.toLowerCase()

    // Extract deal type
    if (lowerMessage.includes('murabaha')) extracted.dealType = 'Murabaha'
    if (lowerMessage.includes('musharaka') || lowerMessage.includes('musharakah'))
      extracted.dealType = 'Musharaka'
    if (lowerMessage.includes('sukuk')) extracted.dealType = 'Sukuk'
    if (lowerMessage.includes('ijarah') || lowerMessage.includes('ijara'))
      extracted.dealType = 'Ijarah'
    if (lowerMessage.includes('wakala') || lowerMessage.includes('wakalah'))
      extracted.dealType = 'Wakala'

    // Extract size (look for numbers followed by million/billion)
    const sizeMatch = lowerMessage.match(/(\d+\.?\d*)\s*(million|billion|m|b)/i)
    if (sizeMatch && sizeMatch[1]) {
      const amount = parseFloat(sizeMatch[1])
      const unit = sizeMatch[2]?.toLowerCase()
      if (unit?.startsWith('b')) {
        extracted.size = amount * 1000000000
      } else {
        extracted.size = amount * 1000000
      }
    }

    // Extract simple number as size
    const numberMatch = lowerMessage.match(/\$?\s*(\d+(?:,\d{3})*(?:\.\d+)?)/g)
    if (numberMatch && !extracted.size) {
      const nums = numberMatch.map((n) => parseFloat(n.replace(/[$,]/g, '')))
      const largest = Math.max(...nums)
      if (largest > 1000) extracted.size = largest
    }

    // Extract jurisdiction
    if (lowerMessage.includes('malaysia')) extracted.jurisdiction = 'Malaysia'
    if (lowerMessage.includes('uae') || lowerMessage.includes('dubai'))
      extracted.jurisdiction = 'UAE'
    if (lowerMessage.includes('saudi') || lowerMessage.includes('ksa'))
      extracted.jurisdiction = 'Saudi Arabia'
    if (lowerMessage.includes('qatar')) extracted.jurisdiction = 'Qatar'
    if (lowerMessage.includes('indonesia')) extracted.jurisdiction = 'Indonesia'

    // Extract boolean flags
    if (lowerMessage.includes('cross-border') || lowerMessage.includes('multi-jurisdiction'))
      extracted.isMultiJurisdiction = true
    if (lowerMessage.includes('public offering') || lowerMessage.includes('public'))
      extracted.isPublicOffering = true
    if (lowerMessage.includes('shariah cert') || lowerMessage.includes('shariah approval'))
      extracted.requiresShariahCertification = true

    // Extract yes/no answers
    if (lowerMessage.includes('yes') || lowerMessage.includes('required')) {
      if (!currentConfig.requiresShariahCertification) extracted.requiresShariahCertification = true
    }
    if (lowerMessage.includes('no') || lowerMessage.includes('not required')) {
      if (currentConfig.requiresShariahCertification === undefined)
        extracted.requiresShariahCertification = false
    }

    // Extract tenor
    const tenorMatch = lowerMessage.match(/(\d+)\s*(month|year)/i)
    if (tenorMatch && tenorMatch[1]) {
      const amount = parseInt(tenorMatch[1])
      const unit = tenorMatch[2]?.toLowerCase()
      extracted.tenor = unit?.startsWith('y') ? amount * 12 : amount
    }

    // Extract currency
    if (lowerMessage.includes('usd') || lowerMessage.includes('dollar')) extracted.currency = 'USD'
    if (lowerMessage.includes('myr') || lowerMessage.includes('ringgit')) extracted.currency = 'MYR'
    if (lowerMessage.includes('sar') || lowerMessage.includes('riyal')) extracted.currency = 'SAR'
    if (lowerMessage.includes('aed') || lowerMessage.includes('dirham')) extracted.currency = 'AED'

    extracted.extractedAt = new Date()
    return extracted
  }

  private generateQuestionResponse(
    question: (typeof MVQ_QUESTIONS)[0],
    config: DealConfiguration,
    activatedControls: string[]
  ): string {
    const parts = [
      `Great! I've noted that information.`,
      `So far, we've activated ${activatedControls.length} compliance controls based on your deal structure.`,
      `\n\n**Question ${question.id} of 12** (${question.category}):\n${question.question}`,
    ]

    if (question.hint) {
      parts.push(`\n\n*Hint: ${question.hint}*`)
    }

    return parts.join(' ')
  }

  private generateCompletionResponse(
    config: DealConfiguration,
    activatedControls: string[]
  ): string {
    return `Perfect! We've completed the configuration questionnaire. Based on your ${config.dealType || 'Islamic finance'} transaction, I've activated **${activatedControls.length} compliance controls** out of 26 possible controls. This intelligent activation ensures you only focus on relevant requirements for your specific deal structure. Ready to review the activated controls and proceed to the next step?`
  }

  private getAnsweredQuestions(context: ConversationContext): number[] {
    // In a real implementation, we'd track which questions have been answered
    // For now, estimate based on how much data we have
    const config = context.currentDealConfiguration
    const answered: number[] = []

    if (config.dealType) answered.push(1)
    if (config.size) answered.push(2)
    if (config.jurisdiction) answered.push(3)
    if (config.isMultiJurisdiction !== undefined) answered.push(4)
    if (config.requiresShariahCertification !== undefined) answered.push(5)
    if (config.underlyingAsset) answered.push(6)
    if (config.isPublicOffering !== undefined) answered.push(7)
    if (config.tenor) answered.push(8)
    if (config.currency) answered.push(9)
    if (config.participants) answered.push(10)
    if (config.specificFrameworks !== undefined) answered.push(11)
    if (config.hasExistingDocs !== undefined) answered.push(12)

    return answered
  }
}
