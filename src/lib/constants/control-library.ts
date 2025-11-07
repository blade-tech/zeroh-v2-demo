/**
 * Control Library
 * Comprehensive library of 26 controls across 5 buckets for Islamic Finance GRC
 */

export type ControlBucket =
  | 'Shariah Governance'
  | 'Regulatory & Legal'
  | 'Risk Management'
  | 'Financial Reporting'
  | 'Audit & Assurance'

export type ControlStatus = 'active' | 'inactive' | 'pending' | 'review_required'

export interface Control {
  id: string
  bucket: ControlBucket
  name: string
  description: string
  objective: string
  implementation: string[]
  evidenceRequired: string[]
  stakeholders: string[]
  frequency: string
  priority: 'high' | 'medium' | 'low'
  standards: string[] // e.g., "AAOIFI FAS 1", "IFSB-15", etc.
  tags: string[]
}

export const CONTROL_LIBRARY: Control[] = [
  // ========================================
  // SHARIAH GOVERNANCE (SG-01 to SG-05)
  // ========================================
  {
    id: 'SG-01',
    bucket: 'Shariah Governance',
    name: 'Shariah Certification Requirement',
    description: 'Obtain and maintain valid Shariah certification for the transaction structure',
    objective:
      'Ensure transaction complies with Islamic principles and is certified by qualified Shariah scholars',
    implementation: [
      'Engage qualified Shariah advisory board or external Shariah consultant',
      'Submit transaction structure documentation for Shariah review',
      'Obtain formal Shariah certification/fatwa before execution',
      'Maintain ongoing Shariah compliance monitoring',
    ],
    evidenceRequired: [
      'Shariah certification letter/fatwa',
      'Shariah board meeting minutes',
      'Transaction structure documentation reviewed by Shariah board',
      'Ongoing compliance reports',
    ],
    stakeholders: ['Shariah Board', 'Legal Team', 'Transaction Team', 'Compliance Officer'],
    frequency: 'One-time (with ongoing monitoring)',
    priority: 'high',
    standards: ['AAOIFI Shariah Standard', 'IFSB-10', 'BNM Shariah Governance'],
    tags: ['Shariah', 'Certification', 'Fatwa', 'Religious Compliance'],
  },
  {
    id: 'SG-02',
    bucket: 'Shariah Governance',
    name: 'Shariah Board Oversight',
    description: 'Establish and maintain Shariah board oversight for complex structures',
    objective: 'Ensure ongoing Shariah supervision of transaction execution and modifications',
    implementation: [
      'Appoint qualified Shariah board members with relevant expertise',
      'Conduct regular Shariah board meetings (minimum quarterly)',
      'Submit all material transaction changes for board approval',
      'Document all Shariah rulings and decisions',
    ],
    evidenceRequired: [
      'Shariah board appointment letters',
      'Board meeting minutes and attendance records',
      'Shariah rulings and opinions',
      'Annual Shariah compliance report',
    ],
    stakeholders: ['Shariah Board', 'Board of Directors', 'Senior Management', 'Internal Audit'],
    frequency: 'Quarterly meetings; continuous oversight',
    priority: 'high',
    standards: ['AAOIFI Governance Standard 1', 'IFSB-10', 'BNM Shariah Governance Framework'],
    tags: ['Shariah Board', 'Governance', 'Oversight', 'Complex Structures'],
  },
  {
    id: 'SG-03',
    bucket: 'Shariah Governance',
    name: 'Underlying Asset Shariah Compliance Verification',
    description: 'Verify that all underlying assets comply with Shariah principles',
    objective: 'Ensure all assets backing the transaction are Shariah-compliant',
    implementation: [
      'Conduct Shariah screening of all underlying assets',
      'Verify assets are tangible and exist (no pure debt/money exchange)',
      'Ensure assets do not involve prohibited (haram) activities',
      'Obtain Shariah certification for asset portfolios',
    ],
    evidenceRequired: [
      'Asset Shariah screening reports',
      'Asset ownership documentation',
      'Shariah compliance certificates for assets',
      'Periodic asset compliance monitoring reports',
    ],
    stakeholders: ['Shariah Board', 'Asset Management Team', 'Compliance Team', 'Valuation Team'],
    frequency: 'Initial verification + periodic reviews (at least annually)',
    priority: 'high',
    standards: ['AAOIFI Shariah Standard (Asset-Backed)', 'IFSB-7'],
    tags: ['Assets', 'Shariah Compliance', 'Screening', 'Verification'],
  },
  {
    id: 'SG-04',
    bucket: 'Shariah Governance',
    name: 'Multi-Party Shariah Governance Framework',
    description:
      'Establish Shariah governance framework for transactions with multiple participants',
    objective: 'Coordinate Shariah compliance across all transaction parties',
    implementation: [
      'Define Shariah governance roles and responsibilities for each party',
      'Establish joint Shariah oversight committee if needed',
      'Create Shariah compliance reporting framework',
      'Implement dispute resolution mechanism for Shariah matters',
    ],
    evidenceRequired: [
      'Shariah governance framework document',
      'Inter-party Shariah compliance agreements',
      'Joint Shariah committee meeting minutes',
      'Shariah compliance coordination reports',
    ],
    stakeholders: [
      'All Transaction Parties',
      'Shariah Boards (multiple entities)',
      'Legal Teams',
      'Compliance Officers',
    ],
    frequency: 'Continuous throughout transaction lifecycle',
    priority: 'medium',
    standards: ['AAOIFI Governance Standard', 'IFSB-10'],
    tags: ['Multi-Party', 'Coordination', 'Governance', 'Framework'],
  },
  {
    id: 'SG-05',
    bucket: 'Shariah Governance',
    name: 'Ongoing Shariah Compliance Monitoring',
    description:
      'Mandatory ongoing monitoring of Shariah compliance throughout transaction lifecycle',
    objective: 'Ensure continuous adherence to Shariah principles during transaction execution',
    implementation: [
      'Establish Shariah compliance monitoring procedures',
      'Conduct periodic Shariah compliance reviews',
      'Report any Shariah non-compliance incidents immediately',
      'Implement corrective actions for any deviations',
    ],
    evidenceRequired: [
      'Shariah compliance monitoring procedures',
      'Periodic compliance review reports',
      'Non-compliance incident reports and remediation',
      'Annual Shariah audit report',
    ],
    stakeholders: ['Shariah Board', 'Compliance Team', 'Operations Team', 'Internal Audit'],
    frequency: 'Continuous (with formal reviews quarterly)',
    priority: 'high',
    standards: ['AAOIFI Governance Standard', 'IFSB-10', 'BNM Guidelines'],
    tags: ['Monitoring', 'Continuous Compliance', 'Mandatory', 'All Transactions'],
  },

  // ========================================
  // REGULATORY & LEGAL (RL-01 to RL-05)
  // ========================================
  {
    id: 'RL-01',
    bucket: 'Regulatory & Legal',
    name: 'Regulatory Compliance Mandate',
    description: 'Ensure compliance with all applicable regulatory requirements',
    objective: 'Meet all mandatory regulatory requirements for Islamic finance transactions',
    implementation: [
      'Identify all applicable regulations (securities, banking, Islamic finance)',
      'Obtain necessary regulatory licenses and approvals',
      'File required regulatory disclosures and reports',
      'Maintain regulatory compliance monitoring system',
    ],
    evidenceRequired: [
      'Regulatory compliance checklist',
      'Regulatory licenses and approvals',
      'Filed regulatory reports and disclosures',
      'Regulatory correspondence and approvals',
    ],
    stakeholders: [
      'Regulatory Affairs',
      'Legal Team',
      'Compliance Officer',
      'Regulators (SEC, Central Bank, etc.)',
    ],
    frequency: 'Continuous (with periodic filings)',
    priority: 'high',
    standards: ['Local Securities Laws', 'Central Bank Regulations', 'IFSB Standards'],
    tags: ['Regulatory', 'Mandatory', 'Licenses', 'Compliance'],
  },
  {
    id: 'RL-02',
    bucket: 'Regulatory & Legal',
    name: 'Prospectus and Disclosure Requirements',
    description:
      'Prepare and file prospectus/offering documents for public offerings or large transactions',
    objective:
      'Provide comprehensive disclosure to investors as required by securities regulations',
    implementation: [
      'Draft prospectus/offering circular with all required disclosures',
      'Obtain legal and Shariah board approval of prospectus',
      'File prospectus with securities regulator',
      'Publish and distribute prospectus to investors',
    ],
    evidenceRequired: [
      'Final prospectus/offering circular',
      'Regulatory approval letters',
      'Shariah board approval of disclosures',
      'Proof of publication and distribution',
    ],
    stakeholders: [
      'Legal Team',
      'Investment Banking Team',
      'Shariah Board',
      'Securities Regulator',
      'Investors',
    ],
    frequency: 'One-time (with updates as needed)',
    priority: 'high',
    standards: ['Securities Act', 'IOSCO Principles', 'AAOIFI Disclosure Standards'],
    tags: ['Prospectus', 'Disclosure', 'Public Offering', 'Investors'],
  },
  {
    id: 'RL-03',
    bucket: 'Regulatory & Legal',
    name: 'Specific Framework Compliance',
    description: 'Comply with specific regulatory frameworks (e.g., Green Sukuk, AAOIFI standards)',
    objective: 'Meet requirements of specialized Islamic finance frameworks',
    implementation: [
      'Identify applicable specialized frameworks',
      'Implement framework-specific requirements',
      'Obtain necessary certifications (e.g., Green certification)',
      'Maintain ongoing framework compliance',
    ],
    evidenceRequired: [
      'Framework compliance documentation',
      'Third-party certifications (if required)',
      'Impact reports (for Green/Social Sukuk)',
      'Annual compliance reports',
    ],
    stakeholders: [
      'Compliance Team',
      'Sustainability Team (for Green)',
      'External Certifiers',
      'Shariah Board',
    ],
    frequency: 'Initial compliance + ongoing monitoring',
    priority: 'medium',
    standards: ['ICMA Green Bond Principles', 'AAOIFI Standards', 'LMA Green Loan Principles'],
    tags: ['Specialized Frameworks', 'Green Sukuk', 'AAOIFI', 'Certification'],
  },
  {
    id: 'RL-04',
    bucket: 'Regulatory & Legal',
    name: 'Multi-Jurisdictional Regulatory Compliance',
    description: 'Navigate and comply with regulations across multiple jurisdictions',
    objective: 'Ensure compliance with all relevant jurisdictions for cross-border transactions',
    implementation: [
      'Map regulatory requirements for each jurisdiction',
      'Obtain legal opinions for each jurisdiction',
      'Coordinate filings and approvals across jurisdictions',
      'Manage conflicts of law issues',
    ],
    evidenceRequired: [
      'Jurisdiction-by-jurisdiction compliance matrix',
      'Legal opinions for each jurisdiction',
      'Regulatory approvals from all jurisdictions',
      'Conflict of law analysis and resolution',
    ],
    stakeholders: [
      'Legal Teams (multiple jurisdictions)',
      'Regulatory Affairs',
      'Local Counsel',
      'Multiple Regulators',
    ],
    frequency: 'Initial setup + ongoing coordination',
    priority: 'high',
    standards: ['Local Laws of each jurisdiction', 'International treaties', 'IFSB-20'],
    tags: ['Cross-Border', 'Multi-Jurisdiction', 'Regulatory', 'Coordination'],
  },
  {
    id: 'RL-05',
    bucket: 'Regulatory & Legal',
    name: 'AML/CFT Controls',
    description: 'Implement Anti-Money Laundering and Countering Financing of Terrorism controls',
    objective: 'Prevent transaction from being used for money laundering or terrorist financing',
    implementation: [
      'Conduct Customer Due Diligence (CDD) and Know Your Customer (KYC)',
      'Screen parties against sanctions lists (OFAC, UN, etc.)',
      'Implement transaction monitoring for suspicious activity',
      'File Suspicious Activity Reports (SARs) if needed',
    ],
    evidenceRequired: [
      'KYC documentation for all parties',
      'Sanctions screening reports',
      'AML/CFT policies and procedures',
      'Transaction monitoring reports',
      'SAR filings (if any)',
    ],
    stakeholders: ['Compliance Team', 'Legal Team', 'AML Officer', 'Financial Intelligence Unit'],
    frequency: 'Initial screening + ongoing monitoring',
    priority: 'high',
    standards: ['FATF Recommendations', 'Local AML Laws', 'IFSB-19', 'AAOIFI Governance'],
    tags: ['AML', 'CFT', 'KYC', 'Sanctions', 'Compliance'],
  },

  // ========================================
  // RISK MANAGEMENT (RM-01 to RM-05)
  // ========================================
  {
    id: 'RM-01',
    bucket: 'Risk Management',
    name: 'Comprehensive Risk Assessment',
    description: 'Conduct comprehensive risk assessment for all transactions',
    objective: 'Identify, assess, and mitigate all material risks',
    implementation: [
      'Conduct risk identification workshop',
      'Perform quantitative and qualitative risk assessment',
      'Develop risk mitigation strategies',
      'Assign risk owners and monitoring responsibilities',
    ],
    evidenceRequired: [
      'Risk assessment report',
      'Risk register with mitigation plans',
      'Risk appetite statement',
      'Risk monitoring dashboard',
    ],
    stakeholders: ['Risk Management Team', 'Transaction Team', 'Senior Management', 'Board'],
    frequency: 'Initial assessment + quarterly reviews',
    priority: 'high',
    standards: ['IFSB-1', 'Basel III', 'Enterprise Risk Management Framework'],
    tags: ['Risk Assessment', 'Mandatory', 'All Transactions', 'Risk Mitigation'],
  },
  {
    id: 'RM-02',
    bucket: 'Risk Management',
    name: 'Credit Risk Assessment (Profit-Sharing)',
    description: 'Assess credit risk for profit-sharing structures (Musharaka, Mudarabah)',
    objective: 'Evaluate and manage credit risk in partnership-based Islamic finance structures',
    implementation: [
      'Conduct credit analysis of all partners/counterparties',
      'Perform financial due diligence',
      'Establish credit limits and covenants',
      'Implement credit monitoring procedures',
    ],
    evidenceRequired: [
      'Credit analysis reports',
      'Financial statements and due diligence findings',
      'Credit approval documentation',
      'Ongoing credit monitoring reports',
    ],
    stakeholders: ['Credit Risk Team', 'Finance Team', 'Legal Team', 'Shariah Board'],
    frequency: 'Initial assessment + ongoing monitoring',
    priority: 'high',
    standards: ['IFSB-2', 'Basel III Credit Risk', 'AAOIFI FAS 4'],
    tags: ['Credit Risk', 'Musharaka', 'Mudarabah', 'Partnership', 'Due Diligence'],
  },
  {
    id: 'RM-03',
    bucket: 'Risk Management',
    name: 'FX Risk Management',
    description: 'Manage foreign exchange risk for non-USD or cross-border transactions',
    objective: 'Identify, measure, and hedge foreign exchange exposures',
    implementation: [
      'Identify all FX exposures in the transaction',
      'Measure potential FX losses using scenario analysis',
      "Implement Shariah-compliant FX hedging strategies (e.g., wa'd, khiyar)",
      'Monitor FX positions and adjust hedges as needed',
    ],
    evidenceRequired: [
      'FX exposure analysis',
      'FX hedging strategy document',
      'Shariah board approval of hedging instruments',
      'FX position monitoring reports',
    ],
    stakeholders: ['Treasury Team', 'Risk Management', 'Shariah Board', 'Finance Team'],
    frequency: 'Continuous monitoring',
    priority: 'medium',
    standards: ['IFSB-1', 'AAOIFI Shariah Standard (Hedging)', 'IFSB-11'],
    tags: ['FX Risk', 'Hedging', 'Cross-Border', 'Treasury'],
  },
  {
    id: 'RM-04',
    bucket: 'Risk Management',
    name: 'Operational Risk Controls',
    description: 'Implement operational risk controls for cross-border transactions',
    objective: 'Mitigate operational risks in complex multi-party, multi-jurisdiction structures',
    implementation: [
      'Map all operational processes and identify risk points',
      'Implement controls for each identified risk',
      'Establish clear roles and responsibilities',
      'Create operational contingency plans',
    ],
    evidenceRequired: [
      'Operational risk assessment',
      'Process maps with control points',
      'Roles and responsibilities matrix (RACI)',
      'Business continuity and contingency plans',
    ],
    stakeholders: ['Operations Team', 'Risk Management', 'IT Team', 'Compliance'],
    frequency: 'Continuous monitoring',
    priority: 'medium',
    standards: ['IFSB-1', 'Basel III Operational Risk', 'COSO Framework'],
    tags: ['Operational Risk', 'Cross-Border', 'Process Controls', 'Contingency'],
  },
  {
    id: 'RM-05',
    bucket: 'Risk Management',
    name: 'Liquidity Risk Management',
    description: 'Manage liquidity risk for transactions over 12 months',
    objective: 'Ensure sufficient liquidity to meet obligations throughout transaction tenor',
    implementation: [
      'Conduct liquidity stress testing',
      'Establish liquidity reserves or credit facilities',
      'Create cash flow forecasting model',
      'Develop liquidity contingency funding plan',
    ],
    evidenceRequired: [
      'Liquidity stress test results',
      'Liquidity reserve documentation or credit facility agreements',
      'Cash flow forecast model',
      'Liquidity contingency funding plan',
    ],
    stakeholders: ['Treasury Team', 'Risk Management', 'Finance Team', 'Board'],
    frequency: 'Monthly monitoring',
    priority: 'medium',
    standards: ['IFSB-12', 'Basel III Liquidity', 'AAOIFI FAS 3'],
    tags: ['Liquidity Risk', 'Long Tenor', 'Cash Flow', 'Stress Testing'],
  },

  // ========================================
  // FINANCIAL REPORTING (FR-01 to FR-06)
  // ========================================
  {
    id: 'FR-01',
    bucket: 'Financial Reporting',
    name: 'Mandatory Financial Reporting',
    description: 'Prepare and file mandatory financial reports for all transactions',
    objective:
      'Ensure accurate and timely financial reporting in accordance with applicable standards',
    implementation: [
      'Prepare financial statements in accordance with AAOIFI/IFRS',
      'Obtain external audit sign-off',
      'File financial reports with regulators',
      'Publish financial reports to stakeholders',
    ],
    evidenceRequired: [
      'Audited financial statements',
      'Audit opinion letter',
      'Filed regulatory reports',
      'Published financial statements',
    ],
    stakeholders: ['Finance Team', 'External Auditors', 'Regulators', 'Investors'],
    frequency: 'Annual (with interim reports as required)',
    priority: 'high',
    standards: ['AAOIFI FAS', 'IFRS', 'Local GAAP', 'IAS 39/IFRS 9'],
    tags: ['Financial Reporting', 'Mandatory', 'Audit', 'Disclosure'],
  },
  {
    id: 'FR-02',
    bucket: 'Financial Reporting',
    name: 'Enhanced Financial Reporting',
    description: 'Provide enhanced financial reporting for large transactions (>$10M)',
    objective: 'Offer detailed financial transparency for significant transactions',
    implementation: [
      'Prepare detailed notes to financial statements',
      'Provide segment reporting and disaggregated information',
      'Include management discussion and analysis (MD&A)',
      'Disclose all material risks and uncertainties',
    ],
    evidenceRequired: [
      'Detailed financial statement notes',
      'Segment and disaggregated reports',
      'MD&A document',
      'Risk disclosure section in reports',
    ],
    stakeholders: ['Finance Team', 'External Auditors', 'Investors', 'Rating Agencies'],
    frequency: 'Annual and interim reports',
    priority: 'high',
    standards: ['AAOIFI FAS', 'IFRS 8', 'SEC Regulation S-K'],
    tags: ['Enhanced Reporting', 'Large Transactions', 'Transparency', 'Disclosure'],
  },
  {
    id: 'FR-03',
    bucket: 'Financial Reporting',
    name: 'Periodic Disclosure (Public Offerings)',
    description: 'Provide periodic financial disclosures for public offerings',
    objective: 'Keep public investors informed through regular financial updates',
    implementation: [
      'Prepare quarterly and annual financial reports',
      'File periodic reports with securities regulator',
      'Issue earnings releases and investor updates',
      'Conduct investor calls and presentations',
    ],
    evidenceRequired: [
      'Quarterly and annual financial reports',
      'Regulatory filings (10-Q, 10-K equivalents)',
      'Earnings releases',
      'Investor presentation materials',
    ],
    stakeholders: ['Finance Team', 'Investor Relations', 'External Auditors', 'Public Investors'],
    frequency: 'Quarterly and annual',
    priority: 'high',
    standards: ['Securities Regulations', 'AAOIFI FAS', 'IFRS', 'Listing Requirements'],
    tags: ['Public Offering', 'Periodic Disclosure', 'Investor Relations', 'Transparency'],
  },
  {
    id: 'FR-04',
    bucket: 'Financial Reporting',
    name: 'Investor Reporting',
    description: 'Provide regular reports to investors in public offerings',
    objective: 'Maintain transparent communication with investors',
    implementation: [
      'Distribute regular investor reports (monthly/quarterly)',
      'Provide performance updates and metrics',
      'Disclose material events and changes',
      'Maintain investor portal or communication channel',
    ],
    evidenceRequired: [
      'Investor report distribution records',
      'Performance dashboards and KPIs',
      'Material event notifications',
      'Investor portal logs',
    ],
    stakeholders: ['Investor Relations', 'Finance Team', 'Trustee/Agent', 'Investors'],
    frequency: 'Monthly or quarterly',
    priority: 'medium',
    standards: ['Investment Agreement Terms', 'AAOIFI Governance', 'IOSCO Principles'],
    tags: ['Investor Reporting', 'Communication', 'Transparency', 'Performance'],
  },
  {
    id: 'FR-05',
    bucket: 'Financial Reporting',
    name: 'Special Purpose Reporting',
    description:
      'Provide special purpose reports for specific frameworks (e.g., Green Sukuk impact reporting)',
    objective: 'Meet specialized reporting requirements of specific Islamic finance frameworks',
    implementation: [
      'Prepare framework-specific reports (e.g., Green impact report)',
      'Obtain independent verification/assurance',
      'Publish reports to stakeholders',
      'Track framework-specific KPIs and metrics',
    ],
    evidenceRequired: [
      'Framework-specific reports (e.g., Green Bond Report)',
      'Independent verification reports',
      'Impact metrics and KPIs',
      'Published reports to stakeholders',
    ],
    stakeholders: [
      'Sustainability Team',
      'Finance Team',
      'Independent Verifier',
      'Investors',
      'Framework Bodies',
    ],
    frequency: 'Annual (or as required by framework)',
    priority: 'medium',
    standards: ['ICMA Green Bond Principles', 'Climate Bonds Standard', 'AAOIFI Sustainability'],
    tags: ['Green Sukuk', 'Impact Reporting', 'Sustainability', 'Special Purpose'],
  },
  {
    id: 'FR-06',
    bucket: 'Financial Reporting',
    name: 'Complex Structure Documentation',
    description: 'Provide detailed documentation for complex structures (Sukuk, Musharaka)',
    objective: 'Ensure comprehensive documentation of complex transaction structures',
    implementation: [
      'Prepare detailed structure memorandum',
      'Document all transaction flows and waterfalls',
      'Create accounting policies and procedures manual',
      'Maintain transaction structure diagrams',
    ],
    evidenceRequired: [
      'Structure memorandum',
      'Cash flow waterfall documentation',
      'Accounting policies manual',
      'Transaction structure diagrams',
    ],
    stakeholders: ['Finance Team', 'Legal Team', 'External Auditors', 'Stakeholders'],
    frequency: 'One-time (with updates as needed)',
    priority: 'high',
    standards: ['AAOIFI FAS (relevant standards)', 'IFRS', 'Legal documentation standards'],
    tags: ['Complex Structures', 'Sukuk', 'Documentation', 'Accounting'],
  },

  // ========================================
  // AUDIT & ASSURANCE (AA-01 to AA-05)
  // ========================================
  {
    id: 'AA-01',
    bucket: 'Audit & Assurance',
    name: 'External Audit Requirement',
    description: 'Engage external auditors for public offerings or large transactions (>$50M)',
    objective: 'Obtain independent assurance on financial statements',
    implementation: [
      'Appoint qualified external audit firm',
      'Provide audit firm with all required documentation',
      'Facilitate audit fieldwork and inquiries',
      'Obtain clean audit opinion',
    ],
    evidenceRequired: [
      'Audit engagement letter',
      'Audited financial statements',
      'Audit opinion letter',
      'Management letter (if any)',
    ],
    stakeholders: ['External Auditors', 'Finance Team', 'Audit Committee', 'Regulators'],
    frequency: 'Annual',
    priority: 'high',
    standards: ['ISA (International Standards on Auditing)', 'AAOIFI Auditing Standards'],
    tags: ['External Audit', 'Assurance', 'Public Offering', 'Large Transactions'],
  },
  {
    id: 'AA-02',
    bucket: 'Audit & Assurance',
    name: 'Internal Controls Framework',
    description: 'Establish internal controls framework for multi-party transactions',
    objective: 'Ensure robust internal controls to prevent errors and fraud',
    implementation: [
      'Design internal control framework (based on COSO or similar)',
      'Implement controls for all critical processes',
      'Conduct management testing of controls',
      'Remediate any control deficiencies',
    ],
    evidenceRequired: [
      'Internal control framework documentation',
      'Control design and testing documentation',
      'Management assessment report',
      'Remediation plans for deficiencies',
    ],
    stakeholders: ['Internal Audit', 'Management', 'External Auditors', 'Audit Committee'],
    frequency: 'Annual assessment',
    priority: 'medium',
    standards: ['COSO Framework', 'SOX (if applicable)', 'AAOIFI Governance'],
    tags: ['Internal Controls', 'COSO', 'Multi-Party', 'Fraud Prevention'],
  },
  {
    id: 'AA-03',
    bucket: 'Audit & Assurance',
    name: 'Compliance Audit',
    description: 'Conduct compliance audit for specific regulatory frameworks',
    objective: 'Verify compliance with specialized framework requirements',
    implementation: [
      'Engage qualified compliance auditor',
      'Conduct compliance testing against framework requirements',
      'Document findings and remediation plans',
      'Obtain compliance certification if required',
    ],
    evidenceRequired: [
      'Compliance audit report',
      'Testing documentation',
      'Compliance certification (if applicable)',
      'Remediation plans',
    ],
    stakeholders: ['Compliance Team', 'External Auditors', 'Regulators', 'Management'],
    frequency: 'Annual or as required by framework',
    priority: 'medium',
    standards: ['Framework-specific standards', 'ISAE 3000', 'AAOIFI Auditing Standards'],
    tags: ['Compliance Audit', 'Framework', 'Certification', 'Testing'],
  },
  {
    id: 'AA-04',
    bucket: 'Audit & Assurance',
    name: 'Documentation Review',
    description: 'Comprehensive review of all transaction documentation for new structures',
    objective: 'Ensure all documentation is complete, accurate, and legally sound',
    implementation: [
      'Conduct legal review of all transaction documents',
      'Perform accounting review of financial documentation',
      'Verify Shariah compliance of all contracts',
      'Obtain sign-offs from all relevant parties',
    ],
    evidenceRequired: [
      'Legal opinion letters',
      'Accounting review memos',
      'Shariah compliance certificates for documents',
      'Document sign-off matrix',
    ],
    stakeholders: ['Legal Team', 'Finance Team', 'Shariah Board', 'External Advisors'],
    frequency: 'One-time (with updates for amendments)',
    priority: 'high',
    standards: ['Legal documentation standards', 'AAOIFI Standards', 'Best practices'],
    tags: ['Documentation', 'Review', 'New Structures', 'Legal'],
  },
  {
    id: 'AA-05',
    bucket: 'Audit & Assurance',
    name: 'Shariah Audit Mandate',
    description: 'Mandatory Shariah audit for all Islamic finance transactions',
    objective: 'Provide independent assurance of Shariah compliance',
    implementation: [
      'Appoint qualified Shariah auditor',
      'Conduct comprehensive Shariah compliance audit',
      'Issue Shariah audit report',
      'Remediate any Shariah non-compliance findings',
    ],
    evidenceRequired: [
      'Shariah audit engagement letter',
      'Shariah audit report',
      'Shariah compliance certificates',
      'Remediation documentation',
    ],
    stakeholders: ['Shariah Auditor', 'Shariah Board', 'Management', 'Regulators'],
    frequency: 'Annual',
    priority: 'high',
    standards: ['AAOIFI Auditing Standard 1', 'IFSB-10', 'BNM Shariah Audit Framework'],
    tags: ['Shariah Audit', 'Mandatory', 'Assurance', 'All Transactions'],
  },
]

/**
 * Get controls by bucket
 */
export function getControlsByBucket(bucket: ControlBucket): Control[] {
  return CONTROL_LIBRARY.filter((control) => control.bucket === bucket)
}

/**
 * Get control by ID
 */
export function getControlById(id: string): Control | undefined {
  return CONTROL_LIBRARY.find((control) => control.id === id)
}

/**
 * Get all unique buckets
 */
export function getAllBuckets(): ControlBucket[] {
  return [
    'Shariah Governance',
    'Regulatory & Legal',
    'Risk Management',
    'Financial Reporting',
    'Audit & Assurance',
  ]
}

/**
 * Get control count by bucket
 */
export function getControlCountByBucket(): Record<ControlBucket, number> {
  return {
    'Shariah Governance': getControlsByBucket('Shariah Governance').length,
    'Regulatory & Legal': getControlsByBucket('Regulatory & Legal').length,
    'Risk Management': getControlsByBucket('Risk Management').length,
    'Financial Reporting': getControlsByBucket('Financial Reporting').length,
    'Audit & Assurance': getControlsByBucket('Audit & Assurance').length,
  }
}
