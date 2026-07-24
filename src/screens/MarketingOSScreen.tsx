import { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Lightbulb, CheckCircle2, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import { useMarketingOSStore } from '@/store/useMarketingOSStore';
import { DashboardContextForm } from '@/components/marketingos/DashboardContextForm';
import { BusinessObjectivesManager } from '@/components/marketingos/BusinessObjectivesManager';

interface BusinessObjective {
  id: string;
  title: string;
  status: 'on-track' | 'at-risk' | 'off-track';
  progress: number;
  risks: string[];
}

interface Priority {
  rank: number;
  action: string;
  why: string;
  objectiveSupported: string;
  deadline?: string;
  expectedImpact: string;
  confidence: number;
  evidence: string[];
}

interface ClaudeRecommendation {
  recommendation: string;
  reasoning: string;
  evidence: string[];
  expectedOutcome: string;
}

interface DailyDashboard {
  date: string;
  businessObjectiveStatus: BusinessObjective[];
  priorities: Priority[];
  needsAttention: string[];
  opportunities: string[];
  claudeRecommendation: ClaudeRecommendation;
}

export function MarketingOSScreen() {
  const [activeTab, setActiveTab] = useState<'today' | 'objectives' | 'decisions' | 'opportunities' | 'brain'>('today');
  const [dashboard, setDashboard] = useState<DailyDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [showContextForm, setShowContextForm] = useState(false);
  const [generating, setGenerating] = useState(false);

  const marketingStore = useMarketingOSStore();

  useEffect(() => {
    loadTodaysDashboard();
  }, []);

  const loadTodaysDashboard = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`/api/marketingos/dashboard/${today}`);
      const data = await response.json();
      if (data.success && data.result) {
        setDashboard(data.result);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateDashboard = async () => {
    setShowContextForm(true);
  };

  const handleContextSubmit = async (context: {
    userProvidedContext: string;
    currentTasks: string[];
    recentActivity: string[];
    salesFeedback: string[];
    performanceObservations: string[];
    decisionsAwaiting: string[];
  }) => {
    try {
      const today = new Date().toISOString().split('T')[0];

      // Save context
      await fetch('/api/marketingos/dashboard/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today, ...context }),
      });

      // Generate dashboard
      setGenerating(true);
      const response = await fetch('/api/marketingos/dashboard/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today }),
      });

      const data = await response.json();
      if (data.success) {
        // Reload dashboard
        await loadTodaysDashboard();
      } else {
        console.error('Failed to generate dashboard:', data.error);
        alert(`Failed to generate dashboard: ${data.error}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to generate dashboard');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">MarketingOS</h1>
            <p className="text-sm text-gray-600 mt-1">Your strategic marketing intelligence system</p>
          </div>
          <button
            onClick={loadTodaysDashboard}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mt-6 border-b border-gray-200">
          {[
            { id: 'today', label: 'Today' },
            { id: 'objectives', label: 'Objectives' },
            { id: 'decisions', label: 'Decisions' },
            { id: 'opportunities', label: 'Opportunities' },
            { id: 'brain', label: 'Marketing Brain' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 font-medium text-sm transition ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'today' && <TodayTab dashboard={dashboard} loading={loading} onGenerateDashboard={generateDashboard} />}
        {activeTab === 'objectives' && <ObjectivesTab />}
        {activeTab === 'decisions' && <DecisionsTab />}
        {activeTab === 'opportunities' && <OpportunitiesTab />}
        {activeTab === 'brain' && <MarketingBrainTab />}
      </div>

      {/* Context Form Modal */}
      {showContextForm && (
        <DashboardContextForm
          date={new Date().toISOString().split('T')[0]}
          onSubmit={handleContextSubmit}
          onClose={() => setShowContextForm(false)}
        />
      )}
    </div>
  );
}

function TodayTab({
  dashboard,
  loading,
  onGenerateDashboard,
}: {
  dashboard: DailyDashboard | null;
  loading: boolean;
  onGenerateDashboard: () => void;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Dashboard Generated Yet</h3>
          <p className="text-gray-600 mb-6">
            Generate today's dashboard to see your priorities, business objectives status, and Claude's recommendations.
          </p>
          <button
            onClick={onGenerateDashboard}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Generate Today's Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Business Objectives Status */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Business Objectives Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboard.businessObjectiveStatus.map((obj) => (
            <div
              key={obj.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-gray-900">{obj.title}</h3>
                <StatusBadge status={obj.status} />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition ${
                    obj.status === 'on-track'
                      ? 'bg-green-500'
                      : obj.status === 'at-risk'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${obj.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{obj.progress}% progress</p>
              {obj.risks.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-700 mb-1">Risks:</p>
                  <ul className="space-y-1">
                    {obj.risks.map((risk, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-2">
                        <span className="text-red-500 flex-shrink-0">•</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Today's Priorities */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Today's Priorities
        </h2>
        <div className="space-y-4">
          {dashboard.priorities.slice(0, 5).map((priority) => (
            <div key={priority.rank} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                    {priority.rank}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{priority.action}</h3>
                    <p className="text-sm text-gray-600 mt-1">{priority.why}</p>
                  </div>
                </div>
                <ConfidenceIndicator confidence={priority.confidence} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4 pb-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase font-medium mb-1">Objective</p>
                  <p className="text-gray-900 font-medium">{priority.objectiveSupported}</p>
                </div>
                {priority.deadline && (
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-medium mb-1">Deadline</p>
                    <p className="text-gray-900">{priority.deadline}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-600 uppercase font-medium mb-1">Expected Impact</p>
                  <p className="text-gray-900">{priority.expectedImpact}</p>
                </div>
              </div>

              {priority.evidence.length > 0 && (
                <div className="text-xs text-gray-600">
                  <p className="font-medium text-gray-700 mb-2">Evidence:</p>
                  <ul className="space-y-1">
                    {priority.evidence.map((e, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-blue-500 flex-shrink-0">✓</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Needs Attention */}
      {dashboard.needsAttention.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Needs Attention
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <ul className="space-y-2">
              {dashboard.needsAttention.map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-900">
                  <span className="text-yellow-600 flex-shrink-0 mt-0.5">⚠</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Opportunities */}
      {dashboard.opportunities.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboard.opportunities.map((opportunity, i) => (
              <div key={i} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-900 text-sm">{opportunity}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Claude's Recommendation */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-purple-600" />
          Claude's Main Recommendation
        </h2>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">{dashboard.claudeRecommendation.recommendation}</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-gray-700 font-medium uppercase mb-1">Reasoning</p>
              <p className="text-gray-900">{dashboard.claudeRecommendation.reasoning}</p>
            </div>
            <div>
              <p className="text-xs text-gray-700 font-medium uppercase mb-1">Expected Outcome</p>
              <p className="text-gray-900">{dashboard.claudeRecommendation.expectedOutcome}</p>
            </div>
            {dashboard.claudeRecommendation.evidence.length > 0 && (
              <div>
                <p className="text-xs text-gray-700 font-medium uppercase mb-2">Supporting Evidence</p>
                <ul className="space-y-1">
                  {dashboard.claudeRecommendation.evidence.map((e, i) => (
                    <li key={i} className="flex gap-2 text-gray-700">
                      <span className="text-purple-600 flex-shrink-0">✓</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ObjectivesTab() {
  return <BusinessObjectivesManager />;
}

function DecisionsTab() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600">Decision Log module coming soon</p>
    </div>
  );
}

function OpportunitiesTab() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600">Opportunity Register module coming soon</p>
    </div>
  );
}

function MarketingBrainTab() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600">Marketing Brain module coming soon</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string; dot: string }> = {
    'on-track': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    'at-risk': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
    'off-track': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  };

  const color = colors[status] || colors['on-track'];
  return (
    <div className={`${color.bg} ${color.text} px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
      {status === 'on-track' ? 'On Track' : status === 'at-risk' ? 'At Risk' : 'Off Track'}
    </div>
  );
}

function ConfidenceIndicator({ confidence }: { confidence: number }) {
  const getColor = (conf: number) => {
    if (conf >= 0.8) return 'text-green-600';
    if (conf >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`text-sm font-medium ${getColor(confidence)}`}>
      {Math.round(confidence * 100)}% Confidence
    </div>
  );
}
