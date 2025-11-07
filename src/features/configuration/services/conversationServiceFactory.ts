import type { ConversationService, ConversationServiceConfig } from './ConversationService'
import { MockConversationService } from './MockConversationService'

/**
 * Service Factory for Conversation Service
 *
 * This factory enables runtime selection between Mock and Real implementations.
 * Frontend code ONLY imports this factory, never the implementations directly.
 *
 * To swap backends: Change the config.useMockService flag to false.
 * Expected time to swap: < 1 day (just configuration change).
 */

let serviceInstance: ConversationService | null = null

/**
 * Get or create conversation service instance
 */
export function getConversationService(config?: ConversationServiceConfig): ConversationService {
  if (serviceInstance) {
    return serviceInstance
  }

  const defaultConfig: ConversationServiceConfig = {
    useMockService: true, // Change to false when backend is ready
    apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    timeout: 30000,
  }

  const finalConfig = { ...defaultConfig, ...config }

  if (finalConfig.useMockService) {
    // Development mode: Use mock service
    serviceInstance = new MockConversationService()
  } else {
    // Production mode: Use real service (to be implemented)
    // serviceInstance = new RealConversationService(finalConfig)
    throw new Error('RealConversationService not yet implemented. Set useMockService: true')
  }

  return serviceInstance
}

/**
 * Reset service instance (useful for testing)
 */
export function resetConversationService(): void {
  serviceInstance = null
}
