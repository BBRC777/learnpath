// app/terms/page.tsx
export default function TermsPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px', fontFamily: "'DM Sans', sans-serif", color: '#e8e6df', background: '#0a0b0f', minHeight: '100vh' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, marginBottom: 8 }}>Terms of Service</div>
      <div style={{ fontSize: 13, color: '#5a5856', marginBottom: 40 }}>Last updated: May 2026 · MRF Studios</div>

      {[
        {
          h: 'Acceptance of Terms',
          b: 'By accessing or using Learnpath ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. These terms apply to all users, including free and paid subscribers.'
        },
        {
          h: 'Description of Service',
          b: 'Learnpath is an AI-powered learning platform that generates personalized curricula, flashcards, quizzes, and provides an AI tutor. The Service is provided by MRF Studios and is accessible at learnpathnow.com and through our mobile applications.'
        },
        {
          h: 'Account Registration',
          b: 'You must create an account to use the Service. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account.'
        },
        {
          h: 'Subscription and Billing',
          b: 'Learnpath offers Free, Pro, and Business subscription tiers. Pro subscriptions are billed monthly or annually. You may cancel at any time from your account settings. Cancellation takes effect at the end of the current billing period. We do not offer refunds for partial billing periods. Prices may change with 30 days notice.'
        },
        {
          h: 'Acceptable Use',
          b: 'You agree not to use the Service to: violate any laws or regulations; generate harmful, abusive, or illegal content; attempt to reverse engineer or circumvent security measures; share account credentials with others; use the Service for commercial resale without written permission; or overload our systems through automated requests.'
        },
        {
          h: 'AI-Generated Content',
          b: 'Learnpath uses artificial intelligence to generate educational content. AI-generated content may contain errors or inaccuracies. We do not guarantee the accuracy, completeness, or fitness for any particular purpose of AI-generated content. Users should verify important information from authoritative sources.'
        },
        {
          h: 'Intellectual Property',
          b: 'The Learnpath platform, including its design, code, and branding, is owned by MRF Studios. Curricula and content you create using the Service are owned by you. You grant MRF Studios a license to use anonymized learning data to improve the Service.'
        },
        {
          h: 'Privacy',
          b: 'Your use of the Service is governed by our Privacy Policy at learnpathnow.com/privacy. By using the Service, you consent to the collection and use of information as described in the Privacy Policy.'
        },
        {
          h: 'Disclaimer of Warranties',
          b: 'The Service is provided "as is" without warranties of any kind. MRF Studios does not warrant that the Service will be uninterrupted, error-free, or free of harmful components. We disclaim all warranties, express or implied, including warranties of merchantability and fitness for a particular purpose.'
        },
        {
          h: 'Limitation of Liability',
          b: 'MRF Studios shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability to you shall not exceed the amount you paid us in the 12 months preceding the claim.'
        },
        {
          h: 'Termination',
          b: 'We may suspend or terminate your account at any time for violation of these Terms. You may delete your account at any time by contacting us at contact@mrfstudios.com. Upon termination, your right to use the Service ceases immediately.'
        },
        {
          h: 'Changes to Terms',
          b: 'We may update these Terms at any time. We will notify you of significant changes via email or in-app notification. Continued use of the Service after changes constitutes acceptance of the new Terms.'
        },
        {
          h: 'Governing Law',
          b: 'These Terms are governed by the laws of the State of Washington, United States. Any disputes shall be resolved in the courts of Washington State.'
        },
        {
          h: 'Contact',
          b: 'Questions about these Terms? Email us at contact@mrfstudios.com or visit learnpathnow.com.'
        },
      ].map((s, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#e8e6df', marginBottom: 10 }}>{s.h}</div>
          <div style={{ fontSize: 15, color: '#9a9790', lineHeight: 1.8 }}>{s.b}</div>
        </div>
      ))}
    </div>
  )
}
