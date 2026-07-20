import { useState, useEffect } from 'react';

const TEAM_MEMBERS = [
  { id: 'email_manager', label: 'Email Marketing Manager' },
  { id: 'website_manager', label: 'Website Manager' },
  { id: 'seo_ppc_manager', label: 'SEO & PPC Manager' },
  { id: 'social_media_manager', label: 'Social Media Manager' },
  { id: 'proposal_writer', label: 'Proposal Writer' },
  { id: 'case_study_writer', label: 'Case Study Writer' },
  { id: 'funding_manager', label: 'Funding & Rewards Manager' },
];

export function SettingsPanel() {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [projectUrls, setProjectUrls] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('anthropic_api_key') || '';
    setApiKey(savedKey);

    const savedUrls: Record<string, string> = {};
    TEAM_MEMBERS.forEach((member) => {
      const url = localStorage.getItem(`claude_project_url_${member.id}`) || '';
      savedUrls[member.id] = url;
    });
    setProjectUrls(savedUrls);
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('anthropic_api_key', apiKey);
    } else {
      localStorage.removeItem('anthropic_api_key');
    }

    TEAM_MEMBERS.forEach((member) => {
      const url = projectUrls[member.id] || '';
      if (url.trim()) {
        localStorage.setItem(`claude_project_url_${member.id}`, url);
      } else {
        localStorage.removeItem(`claude_project_url_${member.id}`);
      }
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleUrlChange = (memberId: string, value: string) => {
    setProjectUrls((prev) => ({
      ...prev,
      [memberId]: value,
    }));
  };

  return (
    <div className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
          Settings
        </h1>

        {/* API Key Section */}
        <div className="mb-10 p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', border: '1px solid' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Anthropic API Configuration
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Add your Anthropic API key to enable Sandy to generate marketing campaigns using Claude. Get your key at{' '}
            <a
              href="https://console.anthropic.com/account/keys"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#F97031', textDecoration: 'none', fontWeight: '500' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              console.anthropic.com
            </a>
          </p>
          <div className="flex gap-2">
            <input
              type={apiKeyVisible ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="flex-1 px-4 py-2 rounded-lg text-sm"
              style={{
                backgroundColor: '#0A0E14',
                borderColor: 'var(--border-color)',
                border: '1px solid',
                color: 'var(--text-primary)',
              }}
            />
            <button
              onClick={() => setApiKeyVisible(!apiKeyVisible)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
                border: '1px solid',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2A3141')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--border-color)')}
            >
              {apiKeyVisible ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Team Member Claude Projects */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', border: '1px solid' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Team Member Claude Projects
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Paste your team member's Claude.ai project URLs. The project links will allow direct access to each team member's workspace.
          </p>

          <div className="space-y-4">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id}>
                <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>
                  {member.label}
                </label>
                <input
                  type="url"
                  value={projectUrls[member.id] || ''}
                  onChange={(e) => handleUrlChange(member.id, e.target.value)}
                  placeholder="https://claude.ai/projects/..."
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    backgroundColor: '#0A0E14',
                    borderColor: 'var(--border-color)',
                    border: '1px solid',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: '#F97031',
                color: 'white',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E85E1F')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F97031')}
            >
              Save Settings
            </button>
            {saved && <span className="text-sm font-medium" style={{ color: '#1D9E75' }}>✓ Saved successfully</span>}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-10 p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', border: '1px solid' }}>
          <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            How This Works
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li>✓ API key is stored securely in your browser (never sent to servers)</li>
            <li>✓ Team member URLs are saved locally in localStorage</li>
            <li>✓ Sandy uses your API key to generate campaigns and content</li>
            <li>✓ All data stays in your browser — nothing is transmitted</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
