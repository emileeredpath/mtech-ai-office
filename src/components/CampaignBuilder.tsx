import { useState, useMemo } from 'react';
import { getEmailManagerHelp, type CampaignBrief, type EmailVariant } from '@/services/emailManagerService';
import { getSocialMediaStrategy, type SocialMediaStrategy } from '@/services/socialMediaService';
import { getWebsiteStrategy, type WebsiteStrategy } from '@/services/websiteService';
import { getPPCStrategy, type PPCStrategy } from '@/services/ppcService';
import { getProposalTemplate, type ProposalResponse } from '@/services/proposalService';
import { getCaseStudyTemplate, type CaseStudyStrategy } from '@/services/caseStudyService';
import { getFundingOpportunities, type FundingStrategy } from '@/services/fundingService';

type ExpertTab = 'email' | 'social' | 'website' | 'ppc' | 'proposal' | 'case-study' | 'funding';

interface Campaign {
  id: string;
  brief: CampaignBrief;
  emailVariants: EmailVariant[];
  selectedVariant: string | null;
  socialStrategy: SocialMediaStrategy | null;
  websiteStrategy: WebsiteStrategy | null;
  ppcStrategy: PPCStrategy | null;
  proposalResponse: ProposalResponse | null;
  caseStudyStrategy: CaseStudyStrategy | null;
  fundingStrategy: FundingStrategy | null;
  status: 'draft' | 'ready' | 'launched';
  createdAt: Date;
}

export function CampaignBuilder() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [activeExpertTab, setActiveExpertTab] = useState<ExpertTab>('email');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    objective: '',
    targetAudience: '',
    timeline: '',
    successMetric: '',
    keyMessages: '',
  });

  const [expertRequests, setExpertRequests] = useState<Record<ExpertTab, string>>({
    email: '',
    social: '',
    website: '',
    ppc: '',
    proposal: '',
    'case-study': '',
    funding: '',
  });

  const selectedCampaign = useMemo(() => campaigns.find((c) => c.id === selectedCampaignId), [campaigns, selectedCampaignId]);

  const handleCreateCampaign = () => {
    if (!formData.name.trim() || !formData.objective.trim()) return;

    const newCampaign: Campaign = {
      id: `campaign-${Date.now()}`,
      brief: {
        name: formData.name,
        objective: formData.objective,
        targetAudience: formData.targetAudience,
        timeline: formData.timeline,
        successMetric: formData.successMetric,
        keyMessages: formData.keyMessages
          .split('\n')
          .map((m) => m.trim())
          .filter((m) => m),
      },
      emailVariants: [],
      selectedVariant: null,
      socialStrategy: null,
      websiteStrategy: null,
      ppcStrategy: null,
      proposalResponse: null,
      caseStudyStrategy: null,
      fundingStrategy: null,
      status: 'draft',
      createdAt: new Date(),
    };

    setCampaigns((prev) => [...prev, newCampaign]);
    setSelectedCampaignId(newCampaign.id);
    setFormData({ name: '', objective: '', targetAudience: '', timeline: '', successMetric: '', keyMessages: '' });
    setShowNewCampaign(false);
  };

  const handleRequestExpert = async (expert: ExpertTab) => {
    if (!selectedCampaign || !expertRequests[expert].trim()) return;

    setLoading(true);
    try {
      let response: any;

      switch (expert) {
        case 'email':
          response = await getEmailManagerHelp(selectedCampaign.brief, expertRequests[expert]);
          setCampaigns((prev) =>
            prev.map((c) =>
              c.id === selectedCampaignId
                ? {
                    ...c,
                    emailVariants: response.variants,
                    selectedVariant: response.variants[0]?.id || null,
                  }
                : c
            )
          );
          break;

        case 'social':
          response = await getSocialMediaStrategy(
            selectedCampaign.brief.name,
            selectedCampaign.brief.targetAudience,
            selectedCampaign.brief.keyMessages,
            expertRequests[expert]
          );
          setCampaigns((prev) =>
            prev.map((c) => (c.id === selectedCampaignId ? { ...c, socialStrategy: response } : c))
          );
          break;

        case 'website':
          response = await getWebsiteStrategy(
            selectedCampaign.brief.name,
            selectedCampaign.brief.objective,
            selectedCampaign.brief.targetAudience,
            expertRequests[expert]
          );
          setCampaigns((prev) =>
            prev.map((c) => (c.id === selectedCampaignId ? { ...c, websiteStrategy: response } : c))
          );
          break;

        case 'ppc':
          response = await getPPCStrategy(
            selectedCampaign.brief.name,
            selectedCampaign.brief.targetAudience,
            selectedCampaign.brief.successMetric,
            expertRequests[expert]
          );
          setCampaigns((prev) =>
            prev.map((c) => (c.id === selectedCampaignId ? { ...c, ppcStrategy: response } : c))
          );
          break;

        case 'proposal':
          response = await getProposalTemplate(
            selectedCampaign.brief.name,
            selectedCampaign.brief.objective,
            selectedCampaign.brief.targetAudience,
            expertRequests[expert]
          );
          setCampaigns((prev) =>
            prev.map((c) => (c.id === selectedCampaignId ? { ...c, proposalResponse: response } : c))
          );
          break;

        case 'case-study':
          response = await getCaseStudyTemplate(
            selectedCampaign.brief.name,
            selectedCampaign.brief.targetAudience,
            selectedCampaign.brief.keyMessages,
            expertRequests[expert]
          );
          setCampaigns((prev) =>
            prev.map((c) => (c.id === selectedCampaignId ? { ...c, caseStudyStrategy: response } : c))
          );
          break;

        case 'funding':
          response = await getFundingOpportunities(
            selectedCampaign.brief.name,
            selectedCampaign.brief.successMetric,
            selectedCampaign.brief.targetAudience,
            expertRequests[expert]
          );
          setCampaigns((prev) =>
            prev.map((c) => (c.id === selectedCampaignId ? { ...c, fundingStrategy: response } : c))
          );
          break;
      }

      setExpertRequests({ ...expertRequests, [expert]: '' });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVariant = (variantId: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === selectedCampaignId
          ? {
              ...c,
              selectedVariant: variantId,
            }
          : c
      )
    );
  };

  const handleLaunchCampaign = () => {
    if (!selectedCampaign) return;

    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === selectedCampaignId
          ? {
              ...c,
              status: 'launched',
            }
          : c
      )
    );
  };

  const EXPERT_TABS: { key: ExpertTab; label: string; emoji: string }[] = [
    { key: 'email', label: 'Email', emoji: '📧' },
    { key: 'social', label: 'Social', emoji: '📱' },
    { key: 'website', label: 'Website', emoji: '🌐' },
    { key: 'ppc', label: 'PPC', emoji: '📊' },
    { key: 'proposal', label: 'Proposal', emoji: '✍️' },
    { key: 'case-study', label: 'Case Study', emoji: '📖' },
    { key: 'funding', label: 'Funding', emoji: '💰' },
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Campaign Builder
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Build full email campaigns with expert team assistance
            </p>
          </div>
          <button
            onClick={() => setShowNewCampaign(!showNewCampaign)}
            className="px-4 py-2 rounded-lg font-medium text-sm"
            style={{
              backgroundColor: 'var(--accent-orange)',
              color: 'white',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {showNewCampaign ? '✕ Cancel' : '+ New Campaign'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Campaign List */}
          <div className="col-span-1">
            <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Campaigns ({campaigns.length})
            </h2>

            {showNewCampaign && (
              <div className="p-4 mb-4 rounded-lg space-y-3" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', border: '1px solid' }}>
                <input
                  type="text"
                  placeholder="Campaign name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    border: '1px solid',
                    color: 'var(--text-primary)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Objective"
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  className="w-full px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    border: '1px solid',
                    color: 'var(--text-primary)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Target audience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    border: '1px solid',
                    color: 'var(--text-primary)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    border: '1px solid',
                    color: 'var(--text-primary)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Success metric"
                  value={formData.successMetric}
                  onChange={(e) => setFormData({ ...formData, successMetric: e.target.value })}
                  className="w-full px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    border: '1px solid',
                    color: 'var(--text-primary)',
                  }}
                />
                <textarea
                  placeholder="Key messages (one per line)"
                  value={formData.keyMessages}
                  onChange={(e) => setFormData({ ...formData, keyMessages: e.target.value })}
                  className="w-full px-3 py-2 rounded text-sm"
                  rows={3}
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    border: '1px solid',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  onClick={handleCreateCampaign}
                  className="w-full px-3 py-2 rounded text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--accent-orange)',
                    color: 'white',
                  }}
                >
                  Create Campaign
                </button>
              </div>
            )}

            <div className="space-y-2">
              {campaigns.map((campaign) => (
                <button
                  key={campaign.id}
                  onClick={() => setSelectedCampaignId(campaign.id)}
                  className="w-full text-left p-3 rounded-lg transition-all"
                  style={{
                    backgroundColor: selectedCampaignId === campaign.id ? 'var(--accent-orange)' : 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    border: '1px solid',
                    color: selectedCampaignId === campaign.id ? 'white' : 'var(--text-primary)',
                  }}
                >
                  <p className="font-medium text-sm">{campaign.brief.name}</p>
                  <p style={{ fontSize: '11px', opacity: 0.7 }}>
                    {[campaign.emailVariants.length > 0 && '📧', campaign.socialStrategy && '📱', campaign.websiteStrategy && '🌐', campaign.ppcStrategy && '📊', campaign.proposalResponse && '✍️', campaign.caseStudyStrategy && '📖', campaign.fundingStrategy && '💰']
                      .filter(Boolean)
                      .join(' ') || 'No experts yet'}
                  </p>
                  <p
                    style={{
                      fontSize: '10px',
                      marginTop: '4px',
                      opacity: 0.6,
                      textTransform: 'uppercase',
                    }}
                  >
                    {campaign.status}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Campaign Detail */}
          <div className="col-span-2">
            {selectedCampaign ? (
              <div className="space-y-6">
                {/* Campaign Brief */}
                <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', border: '1px solid' }}>
                  <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    {selectedCampaign.brief.name}
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Objective</p>
                      <p style={{ color: 'var(--text-primary)' }}>{selectedCampaign.brief.objective}</p>
                    </div>
                    <div>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Target Audience</p>
                      <p style={{ color: 'var(--text-primary)' }}>{selectedCampaign.brief.targetAudience}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Timeline</p>
                        <p style={{ color: 'var(--text-primary)' }}>{selectedCampaign.brief.timeline}</p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Success Metric</p>
                        <p style={{ color: 'var(--text-primary)' }}>{selectedCampaign.brief.successMetric}</p>
                      </div>
                    </div>
                    {selectedCampaign.brief.keyMessages.length > 0 && (
                      <div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Key Messages</p>
                        <ul style={{ color: 'var(--text-primary)' }} className="list-disc list-inside space-y-1">
                          {selectedCampaign.brief.keyMessages.map((msg, i) => (
                            <li key={i}>{msg}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expert Tabs */}
                <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', border: '1px solid' }}>
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {EXPERT_TABS.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveExpertTab(tab.key)}
                        className="px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
                        style={{
                          backgroundColor: activeExpertTab === tab.key ? 'var(--accent-orange)' : 'var(--bg-tertiary)',
                          color: activeExpertTab === tab.key ? 'white' : 'var(--text-primary)',
                          borderColor: 'var(--border-color)',
                          border: '1px solid',
                        }}
                      >
                        {tab.emoji} {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                        What would you like from the{' '}
                        {EXPERT_TABS.find((t) => t.key === activeExpertTab)?.label.toLowerCase()} expert?
                      </label>
                      <textarea
                        value={expertRequests[activeExpertTab]}
                        onChange={(e) =>
                          setExpertRequests({ ...expertRequests, [activeExpertTab]: e.target.value })
                        }
                        placeholder="Describe what you need..."
                        disabled={loading}
                        className="w-full px-3 py-2 rounded text-sm"
                        rows={3}
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          borderColor: 'var(--border-color)',
                          border: '1px solid',
                          color: 'var(--text-primary)',
                          opacity: loading ? 0.6 : 1,
                        }}
                      />
                    </div>

                    <button
                      onClick={() => handleRequestExpert(activeExpertTab)}
                      disabled={loading || !expertRequests[activeExpertTab].trim()}
                      className="w-full px-4 py-2 rounded-lg font-medium text-sm"
                      style={{
                        backgroundColor: 'var(--accent-orange)',
                        color: 'white',
                        opacity: loading || !expertRequests[activeExpertTab].trim() ? 0.6 : 1,
                        cursor: loading || !expertRequests[activeExpertTab].trim() ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {loading ? '⏳ Expert working...' : '✨ Get Expert Help'}
                    </button>
                  </div>

                  {/* Results Display */}
                  <ExpertResultsDisplay
                    expert={activeExpertTab}
                    campaign={selectedCampaign}
                    onSelectVariant={handleSelectVariant}
                  />
                </div>

                {/* Launch Button */}
                {selectedCampaign.emailVariants.length > 0 && selectedCampaign.selectedVariant && selectedCampaign.status === 'draft' && (
                  <button
                    onClick={handleLaunchCampaign}
                    className="w-full px-4 py-3 rounded-lg font-medium"
                    style={{
                      backgroundColor: '#1D9E75',
                      color: 'white',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    🚀 Campaign Ready - Mark as Ready
                  </button>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Select a campaign or create a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpertResultsDisplay({
  expert,
  campaign,
  onSelectVariant,
}: {
  expert: ExpertTab;
  campaign: Campaign;
  onSelectVariant: (variantId: string) => void;
}) {
  switch (expert) {
    case 'email':
      return campaign.emailVariants.length > 0 ? (
        <div className="mt-6 space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
            Email Variants ({campaign.emailVariants.length})
          </h3>
          <div className="space-y-3">
            {campaign.emailVariants.map((variant) => (
              <div
                key={variant.id}
                onClick={() => onSelectVariant(variant.id)}
                className="p-4 rounded-lg cursor-pointer transition-all"
                style={{
                  backgroundColor: campaign.selectedVariant === variant.id ? 'rgba(249, 112, 31, 0.1)' : 'var(--bg-tertiary)',
                  borderColor: campaign.selectedVariant === variant.id ? 'var(--accent-orange)' : 'var(--border-color)',
                  border: '1px solid',
                }}
              >
                <p style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '4px' }}>
                  {variant.subjectLine}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '8px' }}>
                  {variant.preview}
                </p>
                <div className="p-3 rounded text-xs" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  {variant.bodyContent}
                </div>
                <div className="mt-2 flex gap-2 text-xs">
                  <span
                    style={{
                      backgroundColor: 'rgba(249, 112, 31, 0.2)',
                      color: 'var(--accent-orange)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    CTA: {variant.cta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null;

    case 'social':
      return campaign.socialStrategy ? (
        <div className="mt-6 space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Social Media Strategy</h3>
          {campaign.socialStrategy.platforms.map((platform) => (
            <div key={platform.name} className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '8px' }}>
                {platform.name}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>
                Best times: {platform.bestTimes}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                {platform.posts.length} posts planned
              </p>
            </div>
          ))}
          <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <p style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '4px' }}>
              Hashtag Strategy
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
              {campaign.socialStrategy.hashtagStrategy}
            </p>
          </div>
        </div>
      ) : null;

    case 'website':
      return campaign.websiteStrategy ? (
        <div className="mt-6 space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
            Website Pages ({campaign.websiteStrategy.pages.length})
          </h3>
          {campaign.websiteStrategy.pages.map((page) => (
            <div key={page.id} className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                {page.title}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>
                {page.headline}
              </p>
              <p style={{ color: 'var(--accent-orange)', fontSize: '12px', marginTop: '4px' }}>
                CTA: {page.cta}
              </p>
            </div>
          ))}
        </div>
      ) : null;

    case 'ppc':
      return campaign.ppcStrategy ? (
        <div className="mt-6 space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
            PPC Campaigns ({campaign.ppcStrategy.campaigns.length})
          </h3>
          {campaign.ppcStrategy.campaigns.map((c) => (
            <div key={c.id} className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                {c.name}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>
                Platform: {c.platform} • Budget: {c.budget}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                Expected ROI: {c.expectedROI}
              </p>
            </div>
          ))}
        </div>
      ) : null;

    case 'proposal':
      return campaign.proposalResponse ? (
        <div className="mt-6 space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
            Proposals ({campaign.proposalResponse.proposals.length})
          </h3>
          {campaign.proposalResponse.proposals.map((p) => (
            <div key={p.id} className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                {p.title}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>
                {p.summary.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      ) : null;

    case 'case-study':
      return campaign.caseStudyStrategy ? (
        <div className="mt-6 space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
            Case Studies ({campaign.caseStudyStrategy.caseStudies.length})
          </h3>
          {campaign.caseStudyStrategy.caseStudies.map((cs) => (
            <div key={cs.id} className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                {cs.title}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>
                Client: {cs.clientName} • Industry: {cs.industry}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                Results: {cs.results.length} key metrics
              </p>
            </div>
          ))}
        </div>
      ) : null;

    case 'funding':
      return campaign.fundingStrategy ? (
        <div className="mt-6 space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
            Funding Opportunities ({campaign.fundingStrategy.opportunities.length})
          </h3>
          <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <p style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '4px' }}>
              Total Potential Funding
            </p>
            <p style={{ color: 'var(--accent-orange)', fontSize: '16px', fontWeight: 'bold' }}>
              {campaign.fundingStrategy.totalPotentialFunding}
            </p>
          </div>
          {campaign.fundingStrategy.opportunities.slice(0, 3).map((opp) => (
            <div key={opp.opportunity.id} className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                {opp.opportunity.name}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>
                Amount: {opp.opportunity.amount} • Effort: {opp.effortRequired}
              </p>
            </div>
          ))}
        </div>
      ) : null;

    default:
      return null;
  }
}
