// app/delete-account/page.tsx
export default function DeleteAccountPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px', fontFamily: "'DM Sans', sans-serif", color: '#e8e6df', background: '#0a0b0f', minHeight: '100vh' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, marginBottom: 8 }}>Delete Your Account</div>
      <div style={{ fontSize: 13, color: '#5a5856', marginBottom: 40 }}>Learnpath — MRF Studios</div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#e8e6df', marginBottom: 10 }}>How to delete your account</div>
        <div style={{ fontSize: 15, color: '#9a9790', lineHeight: 1.8 }}>To request deletion of your Learnpath account and all associated data, email us at <a href="mailto:contact@mrfstudios.com" style={{ color: '#d4853a' }}>contact@mrfstudios.com</a> with the subject line "Delete My Account" and the email address associated with your account. We will process your request within 30 days.</div>
      </div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#e8e6df', marginBottom: 10 }}>What gets deleted</div>
        <div style={{ fontSize: 15, color: '#9a9790', lineHeight: 1.8 }}>When you request account deletion, we permanently delete: your profile, all learning paths and progress, all flashcards, all activity and streak data, and all team associations. This data cannot be recovered after deletion.</div>
      </div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#e8e6df', marginBottom: 10 }}>What is retained</div>
        <div style={{ fontSize: 15, color: '#9a9790', lineHeight: 1.8 }}>We retain billing records for up to 7 years as required by law. Anonymous, aggregated usage statistics that cannot be linked to you personally are retained indefinitely.</div>
      </div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#e8e6df', marginBottom: 10 }}>Contact</div>
        <div style={{ fontSize: 15, color: '#9a9790', lineHeight: 1.8 }}>Questions? Email <a href="mailto:contact@mrfstudios.com" style={{ color: '#d4853a' }}>contact@mrfstudios.com</a></div>
      </div>
    </div>
  )
}
