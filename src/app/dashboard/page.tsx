'use client'

import { useState } from 'react'
import { useConversationStore } from '@/features/configuration/hooks'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  getAllBuckets,
  getControlsByBucket,
  getControlCountByBucket,
  type ControlBucket,
  type Control,
} from '@/lib/constants/control-library'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { activatedControls } = useConversationStore()
  const [expandedBuckets, setExpandedBuckets] = useState<Set<ControlBucket>>(new Set())

  const buckets = getAllBuckets()
  const controlCounts = getControlCountByBucket()

  const toggleBucket = (bucket: ControlBucket) => {
    setExpandedBuckets((prev) => {
      const next = new Set(prev)
      if (next.has(bucket)) {
        next.delete(bucket)
      } else {
        next.add(bucket)
      }
      return next
    })
  }

  const getBucketActivatedCount = (bucket: ControlBucket): number => {
    const bucketControls = getControlsByBucket(bucket)
    return bucketControls.filter((control) => activatedControls.includes(control.id)).length
  }

  const getBucketColor = (bucket: ControlBucket): string => {
    switch (bucket) {
      case 'Shariah Governance':
        return 'border-purple-200 bg-purple-50'
      case 'Regulatory & Legal':
        return 'border-blue-200 bg-blue-50'
      case 'Risk Management':
        return 'border-orange-200 bg-orange-50'
      case 'Financial Reporting':
        return 'border-green-200 bg-green-50'
      case 'Audit & Assurance':
        return 'border-indigo-200 bg-indigo-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getBucketIconColor = (bucket: ControlBucket): string => {
    switch (bucket) {
      case 'Shariah Governance':
        return 'text-purple-600'
      case 'Regulatory & Legal':
        return 'text-blue-600'
      case 'Risk Management':
        return 'text-orange-600'
      case 'Financial Reporting':
        return 'text-green-600'
      case 'Audit & Assurance':
        return 'text-indigo-600'
      default:
        return 'text-gray-600'
    }
  }

  const totalControls = 26
  const totalActivated = activatedControls.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">GRC Dashboard</h1>
                <p className="text-sm text-gray-600">Islamic Finance Compliance Controls</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{totalActivated}</div>
                <div className="text-xs text-gray-600">of {totalControls} controls activated</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {buckets.map((bucket) => {
              const total = controlCounts[bucket]
              const activated = getBucketActivatedCount(bucket)
              const percentage = total > 0 ? Math.round((activated / total) * 100) : 0

              return (
                <Card key={bucket} className={`${getBucketColor(bucket)} border-2`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Shield className={`h-6 w-6 ${getBucketIconColor(bucket)}`} />
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{activated}</div>
                        <div className="text-xs text-gray-600">of {total}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium text-gray-900">{bucket}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className={`h-full ${getBucketIconColor(bucket).replace('text', 'bg')}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{percentage}%</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Control Buckets */}
          <div className="space-y-4">
            {buckets.map((bucket) => {
              const controls = getControlsByBucket(bucket)
              const isExpanded = expandedBuckets.has(bucket)
              const activated = getBucketActivatedCount(bucket)
              const total = controls.length

              return (
                <Card key={bucket} className="overflow-hidden">
                  <button
                    onClick={() => toggleBucket(bucket)}
                    className="w-full text-left transition-colors hover:bg-gray-50"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Shield className={`h-6 w-6 ${getBucketIconColor(bucket)}`} />
                          <div>
                            <CardTitle>{bucket}</CardTitle>
                            <CardDescription>
                              {activated} of {total} controls activated
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {activated}/{total}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </button>

                  {isExpanded && (
                    <CardContent className="border-t border-gray-100 pt-4">
                      <div className="space-y-4">
                        {controls.map((control) => (
                          <ControlCard
                            key={control.id}
                            control={control}
                            isActivated={activatedControls.includes(control.id)}
                          />
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

function ControlCard({ control, isActivated }: { control: Control; isActivated: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`rounded-lg border-2 ${isActivated ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'} p-4`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">
          {isActivated ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-gray-700">{control.id}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    control.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : control.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {control.priority.toUpperCase()}
                </span>
                {isActivated && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    ACTIVE
                  </span>
                )}
              </div>
              <h3 className="mt-1 font-semibold text-gray-900">{control.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{control.description}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-shrink-0"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Objective</h4>
                <p className="mt-1 text-sm text-gray-600">{control.objective}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Implementation</h4>
                <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-gray-600">
                  {control.implementation.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Evidence Required</h4>
                <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-gray-600">
                  {control.evidenceRequired.map((evidence, idx) => (
                    <li key={idx}>{evidence}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Stakeholders</h4>
                <div className="mt-1 flex flex-wrap gap-1">
                  {control.stakeholders.map((stakeholder, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                    >
                      {stakeholder}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Frequency</h4>
                  <p className="mt-1 text-sm text-gray-600">{control.frequency}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Standards</h4>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {control.standards.map((standard, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
                      >
                        {standard}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
