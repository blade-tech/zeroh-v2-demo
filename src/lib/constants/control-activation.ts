import type { DealConfiguration } from '@/features/configuration/types'

/**
 * Control Activation Logic
 * Determines which controls are activated based on deal characteristics
 */

export interface ControlActivationRule {
  controlId: string
  condition: (config: DealConfiguration) => boolean
  reason: string
}

/**
 * Activation rules for all 26 controls
 * Controls are activated based on deal characteristics
 */
export const ACTIVATION_RULES: ControlActivationRule[] = [
  // Shariah Governance (5 controls)
  {
    controlId: 'SG-01',
    condition: (config) => config.requiresShariahCertification === true,
    reason: 'Shariah certification required for this deal',
  },
  {
    controlId: 'SG-02',
    condition: (config) =>
      config.dealType === 'Sukuk' ||
      config.dealType === 'Musharaka' ||
      config.isPublicOffering === true,
    reason: 'Complex structure requires Shariah board oversight',
  },
  {
    controlId: 'SG-03',
    condition: (config) => !!config.underlyingAsset,
    reason: 'Underlying asset must be verified for Shariah compliance',
  },
  {
    controlId: 'SG-04',
    condition: (config) => !!config.participants && config.participants.length > 2,
    reason: 'Multiple participants require Shariah governance framework',
  },
  {
    controlId: 'SG-05',
    condition: () => true, // Always activated
    reason: 'Shariah compliance monitoring is mandatory for all Islamic finance transactions',
  },

  // Regulatory & Legal (5 controls)
  {
    controlId: 'RL-01',
    condition: () => true, // Always activated
    reason: 'Regulatory compliance is mandatory',
  },
  {
    controlId: 'RL-02',
    condition: (config) =>
      config.isPublicOffering === true || (!!config.size && config.size > 50000000),
    reason: 'Public offering or large transaction requires prospectus/disclosure',
  },
  {
    controlId: 'RL-03',
    condition: (config) =>
      config.specificFrameworks !== undefined && config.specificFrameworks !== null,
    reason: 'Specific regulatory framework compliance required',
  },
  {
    controlId: 'RL-04',
    condition: (config) => config.isMultiJurisdiction === true,
    reason: 'Cross-jurisdictional transaction requires multi-regulatory compliance',
  },
  {
    controlId: 'RL-05',
    condition: (config) =>
      config.isMultiJurisdiction === true || (!!config.size && config.size > 100000000),
    reason: 'AML/CFT controls required for cross-border or large transactions',
  },

  // Risk Management (5 controls)
  {
    controlId: 'RM-01',
    condition: () => true, // Always activated
    reason: 'Risk assessment is mandatory for all transactions',
  },
  {
    controlId: 'RM-02',
    condition: (config) => config.dealType === 'Musharaka' || config.dealType === 'Mudarabah',
    reason: 'Profit-sharing structures require credit risk assessment',
  },
  {
    controlId: 'RM-03',
    condition: (config) => config.currency !== 'USD' || config.isMultiJurisdiction === true,
    reason: 'Non-USD or cross-border transaction requires FX risk management',
  },
  {
    controlId: 'RM-04',
    condition: (config) => config.isMultiJurisdiction === true,
    reason: 'Cross-border transactions require operational risk controls',
  },
  {
    controlId: 'RM-05',
    condition: (config) => !!config.tenor && config.tenor > 12,
    reason: 'Transactions over 12 months require liquidity risk management',
  },

  // Financial Reporting (6 controls)
  {
    controlId: 'FR-01',
    condition: () => true, // Always activated
    reason: 'Financial reporting is mandatory',
  },
  {
    controlId: 'FR-02',
    condition: (config) => !!config.size && config.size > 10000000,
    reason: 'Large transactions require enhanced financial reporting',
  },
  {
    controlId: 'FR-03',
    condition: (config) => config.isPublicOffering === true,
    reason: 'Public offerings require periodic disclosure',
  },
  {
    controlId: 'FR-04',
    condition: (config) => config.isPublicOffering === true,
    reason: 'Public offerings require investor reporting',
  },
  {
    controlId: 'FR-05',
    condition: (config) =>
      config.specificFrameworks !== undefined && config.specificFrameworks !== null,
    reason: 'Special purpose reporting required for specific frameworks (e.g., Green Sukuk)',
  },
  {
    controlId: 'FR-06',
    condition: (config) =>
      config.dealType === 'Sukuk' ||
      config.dealType === 'Musharaka' ||
      config.isPublicOffering === true,
    reason: 'Complex structures require detailed documentation',
  },

  // Audit & Assurance (5 controls)
  {
    controlId: 'AA-01',
    condition: (config) =>
      config.isPublicOffering === true || (!!config.size && config.size > 50000000),
    reason: 'External audit required for public offerings or large transactions',
  },
  {
    controlId: 'AA-02',
    condition: (config) => !!config.participants && config.participants.length > 2,
    reason: 'Multiple participants require internal controls framework',
  },
  {
    controlId: 'AA-03',
    condition: (config) =>
      config.specificFrameworks !== undefined && config.specificFrameworks !== null,
    reason: 'Compliance audit required for specific frameworks',
  },
  {
    controlId: 'AA-04',
    condition: (config) => config.hasExistingDocs !== true,
    reason: 'New structures require documentation review',
  },
  {
    controlId: 'AA-05',
    condition: () => true, // Always activated
    reason: 'Shariah audit is mandatory for all Islamic finance transactions',
  },
]

/**
 * Calculate activated controls based on deal configuration
 */
export function calculateActivatedControls(config: DealConfiguration): string[] {
  return ACTIVATION_RULES.filter((rule) => rule.condition(config)).map((rule) => rule.controlId)
}

/**
 * Get activation reason for a specific control
 */
export function getActivationReason(controlId: string, config: DealConfiguration): string | null {
  const rule = ACTIVATION_RULES.find((r) => r.controlId === controlId)
  if (!rule) return null
  return rule.condition(config) ? rule.reason : null
}
