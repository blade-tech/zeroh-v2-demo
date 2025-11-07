/**
 * 12-Question Minimum Viable Questionnaire (MVQ)
 * Intelligent control activation based on deal characteristics
 */

export interface MVQQuestion {
  id: number
  category: string
  question: string
  hint: string
  extractionKey: string
  controlImpact: string[] // Control IDs this question affects
}

export const MVQ_QUESTIONS: MVQQuestion[] = [
  {
    id: 1,
    category: 'Deal Structure',
    question: 'What type of Islamic finance structure are you implementing?',
    hint: 'Common options: Murabaha, Musharaka, Sukuk, Ijarah, Wakala',
    extractionKey: 'dealType',
    controlImpact: ['SG-01', 'SG-02', 'RL-01', 'RM-01'],
  },
  {
    id: 2,
    category: 'Deal Structure',
    question: 'What is the approximate size of this transaction (in USD)?',
    hint: 'This helps determine regulatory thresholds and reporting requirements',
    extractionKey: 'size',
    controlImpact: ['RL-02', 'RL-03', 'FR-01', 'FR-02'],
  },
  {
    id: 3,
    category: 'Jurisdiction',
    question: 'Which jurisdiction(s) will this deal operate in?',
    hint: 'e.g., Malaysia, UAE, Saudi Arabia, Qatar, Indonesia',
    extractionKey: 'jurisdiction',
    controlImpact: ['RL-01', 'RL-04', 'RL-05'],
  },
  {
    id: 4,
    category: 'Jurisdiction',
    question: 'Does this involve cross-border payments or multi-jurisdictional participants?',
    hint: 'This determines AML/CFT and cross-border regulatory requirements',
    extractionKey: 'isMultiJurisdiction',
    controlImpact: ['RL-05', 'RM-03', 'RM-04'],
  },
  {
    id: 5,
    category: 'Shariah Compliance',
    question: 'Is Shariah certification required for this transaction?',
    hint: 'Most Islamic finance deals require Shariah board approval',
    extractionKey: 'requiresShariahCertification',
    controlImpact: ['SG-01', 'SG-02', 'SG-03', 'SG-04'],
  },
  {
    id: 6,
    category: 'Shariah Compliance',
    question: 'What is the underlying asset or business activity?',
    hint: 'Must be Shariah-compliant (no alcohol, gambling, conventional finance, pork)',
    extractionKey: 'underlyingAsset',
    controlImpact: ['SG-03', 'SG-05', 'RM-02'],
  },
  {
    id: 7,
    category: 'Transaction Type',
    question: 'Is this a public offering or private placement?',
    hint: 'Public offerings trigger additional disclosure and regulatory requirements',
    extractionKey: 'isPublicOffering',
    controlImpact: ['RL-02', 'FR-03', 'FR-04', 'AA-01'],
  },
  {
    id: 8,
    category: 'Transaction Type',
    question: 'What is the tenor (duration) of this transaction?',
    hint: 'Specify in months (e.g., 12, 24, 60)',
    extractionKey: 'tenor',
    controlImpact: ['RM-01', 'RM-05', 'FR-02'],
  },
  {
    id: 9,
    category: 'Risk Management',
    question: 'What currency will this transaction be denominated in?',
    hint: 'e.g., USD, MYR, SAR, AED - affects FX risk management',
    extractionKey: 'currency',
    controlImpact: ['RM-03', 'FR-01'],
  },
  {
    id: 10,
    category: 'Participants',
    question: 'Who are the key participants in this structure?',
    hint: 'e.g., Issuer, SPV, Trustee, Obligor, Investors',
    extractionKey: 'participants',
    controlImpact: ['SG-04', 'RL-04', 'AA-02'],
  },
  {
    id: 11,
    category: 'Compliance',
    question:
      'Are there any specific regulatory frameworks this must comply with (besides general Islamic finance standards)?',
    hint: 'e.g., Green Sukuk, SLB, ESG-linked, specific country regulations',
    extractionKey: 'specificFrameworks',
    controlImpact: ['RL-03', 'FR-05', 'AA-03'],
  },
  {
    id: 12,
    category: 'Documentation',
    question: 'Do you have existing documentation or is this a new structure?',
    hint: 'Existing docs may reduce documentation requirements',
    extractionKey: 'hasExistingDocs',
    controlImpact: ['FR-06', 'AA-04', 'AA-05'],
  },
]

/**
 * Get next question based on conversation history
 */
export function getNextQuestion(answeredQuestions: number[]): MVQQuestion | null {
  const unanswered = MVQ_QUESTIONS.filter((q) => !answeredQuestions.includes(q.id))
  return unanswered[0] || null
}

/**
 * Calculate completeness percentage
 */
export function calculateCompleteness(answeredQuestions: number[]): number {
  return Math.round((answeredQuestions.length / MVQ_QUESTIONS.length) * 100)
}
