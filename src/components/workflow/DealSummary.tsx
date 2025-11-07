'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { DealConfiguration } from '@/features/configuration/types'
import { CheckCircle2, Circle } from 'lucide-react'

interface DealSummaryProps {
  configuration: DealConfiguration
  activatedControls: string[]
  completeness: number
  questionsAnswered: number
  totalQuestions: number
}

export function DealSummary({
  configuration,
  activatedControls,
  completeness,
  questionsAnswered,
  totalQuestions,
}: DealSummaryProps) {
  const hasData = Object.keys(configuration).some((key) => {
    const value = configuration[key as keyof DealConfiguration]
    return value !== undefined && key !== 'extractedAt' && key !== 'completeness'
  })

  return (
    <div className="h-full overflow-y-auto border-l border-gray-200 bg-white p-6">
      <div className="space-y-6">
        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configuration Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">Questions Answered</span>
                <span className="font-semibold text-gray-900">
                  {questionsAnswered} / {totalQuestions}
                </span>
              </div>
              <Progress value={(questionsAnswered / totalQuestions) * 100} />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">Completeness</span>
                <span className="font-semibold text-gray-900">{Math.round(completeness)}%</span>
              </div>
              <Progress value={completeness} />
            </div>
            <div className="pt-2">
              <div className="text-sm text-gray-600">Controls Activated</div>
              <div className="text-2xl font-bold text-purple-600">{activatedControls.length}</div>
              <div className="text-xs text-gray-500">out of 26 total controls</div>
            </div>
          </CardContent>
        </Card>

        {/* Deal Configuration Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deal Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            {!hasData ? (
              <p className="text-sm text-gray-500">
                No deal information extracted yet. Start the conversation to configure your deal.
              </p>
            ) : (
              <div className="space-y-3">
                {configuration.dealType && (
                  <ConfigItem label="Deal Type" value={configuration.dealType} />
                )}
                {configuration.structure && (
                  <ConfigItem label="Structure" value={configuration.structure} />
                )}
                {configuration.size && (
                  <ConfigItem
                    label="Size"
                    value={`${(configuration.size / 1000000).toFixed(1)}M ${configuration.currency || 'USD'}`}
                  />
                )}
                {configuration.jurisdiction && (
                  <ConfigItem label="Jurisdiction" value={configuration.jurisdiction} />
                )}
                {configuration.tenor && (
                  <ConfigItem label="Tenor" value={`${configuration.tenor} months`} />
                )}
                {configuration.sukukType && (
                  <ConfigItem label="Sukuk Type" value={configuration.sukukType} />
                )}
                {configuration.underlyingAsset && (
                  <ConfigItem label="Underlying Asset" value={configuration.underlyingAsset} />
                )}
                {configuration.isMultiJurisdiction !== undefined && (
                  <ConfigItem
                    label="Multi-Jurisdiction"
                    value={configuration.isMultiJurisdiction ? 'Yes' : 'No'}
                  />
                )}
                {configuration.requiresShariahCertification !== undefined && (
                  <ConfigItem
                    label="Shariah Certification"
                    value={configuration.requiresShariahCertification ? 'Required' : 'Not Required'}
                  />
                )}
                {configuration.isPublicOffering !== undefined && (
                  <ConfigItem
                    label="Public Offering"
                    value={configuration.isPublicOffering ? 'Yes' : 'No'}
                  />
                )}
                {configuration.hasCrossBorderPayments !== undefined && (
                  <ConfigItem
                    label="Cross-Border Payments"
                    value={configuration.hasCrossBorderPayments ? 'Yes' : 'No'}
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activated Controls Section */}
        {activatedControls.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activated Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {activatedControls.slice(0, 10).map((controlId) => (
                  <div key={controlId} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{controlId}</div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                  </div>
                ))}
                {activatedControls.length > 10 && (
                  <div className="pt-2 text-xs text-gray-500">
                    + {activatedControls.length - 10} more controls
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Remaining Controls Preview */}
        {activatedControls.length < 26 && (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-lg text-gray-500">Potential Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from({ length: Math.min(3, 26 - activatedControls.length) }).map(
                  (_, idx) => (
                    <div key={idx} className="flex items-start gap-2 opacity-50">
                      <Circle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500">
                          Additional control {idx + 1}
                        </div>
                        <div className="text-xs text-gray-400">
                          Will activate based on your answers
                        </div>
                      </div>
                    </div>
                  )
                )}
                <div className="pt-2 text-xs text-gray-400">
                  {26 - activatedControls.length} controls remaining
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function ConfigItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  )
}
