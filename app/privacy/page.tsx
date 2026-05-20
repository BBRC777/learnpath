// app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px', fontFamily: "'DM Sans', sans-serif", color: '#e8e6df', background: '#0a0b0f', minHeight: '100vh' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, marginBottom: 8 }}>Privacy Policy</div>
      <div style={{ fontSize: 13, color: '#5a5856', marginBottom: 40 }}>Last updated: May 2026</div>

      {[
        { h: 'Information We Collect', b: 'We collect your email address and display name when you create an account. We store the learning paths, progress, flashcards, and activity data you generate while using Learnpath. If you sign in with Google, we receive your name and email from Google.' },
        { h: 'How We Use Your Information', b: 'We use your data solely to provide the Learnpath service — generating curricula, tracking your progress, scheduling flashcard reviews, and displaying your stats. We do not sell your data to third parties.' },
        { h: 'AI Processing', b: 'Lesson content, curricula, and AI Tutor responses are generated using the Anthropic Claude API. Content you submit (topics, uploaded documents, YouTube URLs) is sent to Anthropic for processing. Please review Anthropic\'s privacy policy at anthropic.com/privacy.' },
        { h: 'Data Storage', b: 'Your data is stored securely in Supabase (PostgreSQL). Authentication is handled by Supabase Auth. Payment processing is handled by RevenueCat and Stripe. We do not store payment card details.' },
        { h: 'Cookies & Local Storage', b: 'We use localStorage to cache lessons for offline access and to remember your theme preference. We do not use third-party tracking cookies or advertising cookies.' },
        { h: 'Data Retention', b: 'Your data is retained for as long as your account is active. You may request deletion of your account and all associated data by emailing contact@mrfstudios.com.' },
        { h: 'Children\'s Privacy', b: 'Learnpath is not directed at children under 13. We do not knowingly collect personal information from children under 13.' },
        { h: 'Changes to This Policy', b: 'We may update this policy from time to time. We will notify you of significant changes by email or via the app.' },
        { h: 'Contact', b: 'Questions about this policy? Email us at contact@mrfstudios.com or visit learnpathnow.com.' },
      ].map((s, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#e8e6df', marginBottom: 10 }}>{s.h}</div>
          <div style={{ fontSize: 15, color: '#9a9790', lineHeight: 1.8 }}>{s.b}</div>
        </div>
      ))}
    </div>
  )
}
