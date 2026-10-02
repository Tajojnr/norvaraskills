import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4 max-w-4xl mx-auto space-y-6 text-slate-300 text-sm leading-relaxed">
        <h1 className="text-3xl font-black text-white">Terms of Service</h1>
        <p>Welcome to Norvara (norvara.com.ng). By accessing our digital products, e-books, or courses, you agree to these terms.</p>
        <h2 className="text-xl font-bold text-white mt-6">1. Digital Product Delivery</h2>
        <p>All e-books and masterclass materials are delivered digitally upon payment completion. Access is provided for personal use only.</p>
        <h2 className="text-xl font-bold text-white mt-6">2. Intellectual Property & Security</h2>
        <p>All course content, PDF books, and video materials are protected. Reselling, unauthorized sharing, or distributing content is strictly prohibited and subject to legal action.</p>
        <h2 className="text-xl font-bold text-white mt-6">3. Refund Policy</h2>
        <p>Due to the instant downloadable nature of digital information, all sales are final once access is granted unless explicitly stated otherwise.</p>
      </main>
      <Footer />
    </div>
  );
}