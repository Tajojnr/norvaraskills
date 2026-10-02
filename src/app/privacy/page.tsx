import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4 max-w-4xl mx-auto space-y-6 text-slate-300 text-sm leading-relaxed">
        <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
        <p>At Norvara, accessible from norvara.com.ng, your privacy is extremely important to us.</p>
        <h2 className="text-xl font-bold text-white mt-6">1. Information We Collect</h2>
        <p>We collect basic account information such as your name and email address when you register or make a purchase, solely for content delivery and access verification.</p>
        <h2 className="text-xl font-bold text-white mt-6">2. Data Security</h2>
        <p>We use industry-standard encryption for payments and dynamic email watermarking for document security. We never sell your personal data to third parties.</p>
      </main>
      <Footer />
    </div>
  );
}