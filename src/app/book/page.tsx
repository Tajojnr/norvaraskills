"use client";
/* eslint-disable @next/next/no-img-element */
// /book : the client's "Independent Income Report" sales letter (cream + green editorial style).
// Images are loaded from /public/book/. Self-contained: styles are scoped under .nb and injected below.
import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";

// Flutterwave payment links, one per tier. Set these in .env.local (sandbox) and in Vercel (live links).
const FLW_LINKS: Record<"ng" | "africa" | "intl", string | undefined> = {
  ng: process.env.NEXT_PUBLIC_FLW_LINK_NG,
  africa: process.env.NEXT_PUBLIC_FLW_LINK_AFRICA,
  intl: process.env.NEXT_PUBLIC_FLW_LINK_INTL,
};

// Set to "/book/founder.png" once the client sends the author photo (the block stays hidden until then).
const FOUNDER_PHOTO: string | null = null;

type Region = "ng" | "africa" | "intl";
const TIERS: Record<Region, { display: string; label: string }> = {
  ng: { display: "₦9,900", label: "Nigeria" },
  africa: { display: "$10", label: "Africa" },
  intl: { display: "$29", label: "the rest of the world" },
};
const COPY: Record<Region, Record<string, string>> = {
  "ng": {
    "phone": "₦39,000 phone",
    "day": "₦50,000",
    "best": "₦93,000",
    "million": "₦1,000,000",
    "audience": "in Nigeria",
    "daily": "around ₦5,000 to ₦10,000 a day. Later, on my good days, it was ₦50,000 and more.",
    "note": "One payment. Pay securely by card, bank transfer or USSD.",
    "faq": "No. It is written for readers everywhere, but everything works perfectly here in Nigeria. My whole business was built here."
  },
  "africa": {
    "phone": "₦39,000 (about $29) phone",
    "day": "₦50,000 (about $37)",
    "best": "₦93,000 (about $69)",
    "million": "₦1,000,000 (about $740)",
    "daily": "around ₦5,000 to ₦10,000 (about $4 to $7) a day. Later, on my good days, it was ₦50,000 (about $37) and more.",
    "note": "One payment. Pay securely by card. The price is in US dollars.",
    "audience": "across Africa",
    "faq": "No. It is written for readers everywhere. Where something depends on your country, such as payment apps, prices or ad budgets, the books tell you exactly what to check."
  },
  "intl": {
    "phone": "₦39,000 (about $29) phone",
    "day": "₦50,000 (about $37)",
    "best": "₦93,000 (about $69)",
    "million": "₦1,000,000 (about $740)",
    "daily": "around ₦5,000 to ₦10,000 (about $4 to $7) a day. Later, on my good days, it was ₦50,000 (about $37) and more.",
    "note": "One payment. Pay securely by card. The price is in US dollars.",
    "audience": "wherever you live",
    "faq": "No. It is written for readers everywhere. My story happened in Nigeria, but the method works in any country, in your own currency. Where something depends on your country, the books tell you what to check."
  }
};

// Best-effort guess from the device time zone (no server needed). Visitors can switch below the letter.
function detectRegion(): Region {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz === "Africa/Lagos") return "ng";
    if (tz.startsWith("Africa/")) return "africa";
  } catch {}
  return "intl";
}

const CSS = "html{scroll-behavior:smooth}\n:where(.nb) *{margin:0;padding:0;box-sizing:border-box}\n.nb{font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.85;color:#2b2b2b;background:#f4f1ea}\n.nb .container{max-width:760px;margin:0 auto;background:#fff;padding:0 0 40px}\n.nb .sec{padding:0 44px}\n.nb p{margin:0 0 18px}\n.nb strong{color:#0f3d24}\n.nb .label{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;color:#1a6644;margin:44px 0 12px}\n.nb h2{font-family:Georgia,serif;font-size:30px;line-height:1.25;color:#0f3d24;margin:0 0 20px}\n.nb .masthead{border-bottom:3px double #0f3d24;padding:26px 44px 16px;text-align:center}\n.nb .mast-title{font-size:26px;font-weight:700;color:#0f3d24;letter-spacing:.5px}\n.nb .mast-sub{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#777;margin-top:4px}\n.nb .art-head{padding:34px 44px 10px}\n.nb .art-cat{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c0653a;margin-bottom:12px}\n.nb h1{font-size:38px;line-height:1.18;color:#111;margin-bottom:16px}\n.nb .art-meta{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;color:#888;border-bottom:1px solid #eee;padding-bottom:22px;margin-bottom:28px}\n.nb .pull{font-style:italic;font-size:22px;line-height:1.5;color:#0f3d24;border-left:4px solid #d8a13a;padding:4px 0 4px 22px;margin:28px 0}\n.nb .illus{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;color:#999;margin:-6px 0 18px}\n.nb .moment{background:linear-gradient(135deg,#f9fdf9 0%,#f0faf4 100%);border-left:5px solid #1a6644;border-radius:0 10px 10px 0;padding:24px 28px;margin:26px 0}\n.nb .founder-photo{width:100%;max-width:340px;display:block;margin:10px auto 8px;border-radius:12px}\n.nb .photo-cap{text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;color:#888;margin-bottom:24px}\n.nb .curiosity{background:#0a1f12;color:#e8efe9;border-radius:12px;padding:30px 32px;margin:30px 0}\n.nb .curiosity .ct{color:#5ecf90;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px}\n.nb .curiosity ul{list-style:none}\n.nb .curiosity li{padding:9px 0 9px 28px;position:relative;border-bottom:1px solid rgba(255,255,255,.08)}\n.nb .curiosity li:before{content:'→';position:absolute;left:0;color:#d8a13a}\n.nb .curiosity strong{color:#fff}\n.nb .disclaim{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;color:#8aa597;margin-top:16px;font-style:italic}\n.nb .hero{background:#071810;color:#fff;text-align:center;padding:52px 40px;margin:40px 0}\n.nb .hero .hk{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#d8a13a}\n.nb .hero .ht{font-size:40px;line-height:1.1;font-weight:700;margin:14px 0}\n.nb .hero .hs{font-style:italic;color:#cfe3d6;font-size:19px;margin-bottom:26px}\n.nb .bundle img{width:100%;display:block;border-radius:10px;box-shadow:0 10px 26px rgba(0,0,0,.5);margin-top:10px}\n.nb .notbox{background:#fbf6ec;border:1px solid #ecdfc4;border-radius:12px;padding:24px 28px;margin:24px 0}\n.nb .notbox li{list-style:none;padding:6px 0 6px 28px;position:relative}\n.nb .notbox li:before{content:'✗';position:absolute;left:0;color:#c0653a;font-weight:700}\n.nb .paths{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0}\n.nb .path{border-radius:12px;padding:24px}\n.nb .path.a{background:#0f3d24;color:#e8efe9}\n.nb .path.b{background:#f6f0e3}\n.nb .path .pk{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#d8a13a}\n.nb .path.b .pk{color:#c0653a}\n.nb .path .pt{font-size:22px;font-weight:700;margin:6px 0 10px}\n.nb .path.a .pt{color:#fff}\n.nb .path.b .pt{color:#0f3d24}\n.nb .path p{font-size:16px;line-height:1.6;margin:0}\n.nb .book{display:flex;gap:22px;align-items:flex-start;border:1px solid #e6e1d6;border-radius:12px;padding:22px;margin:18px 0}\n.nb .book img{width:130px;flex:none;border-radius:6px;box-shadow:0 6px 14px rgba(0,0,0,.2)}\n.nb .book .bk{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c0653a}\n.nb .book .bt{font-size:22px;font-weight:700;color:#0f3d24;margin:2px 0 2px}\n.nb .book .bs{font-style:italic;color:#777;font-size:15px;margin-bottom:8px}\n.nb .book p{font-size:16px;line-height:1.65;margin:0}\n.nb .bonus-head{text-align:center;background:#fff8e8;border:2px dashed #d8a13a;border-radius:12px;padding:26px;margin:36px 0 20px}\n.nb .bonus-head .bh{font-size:26px;font-weight:700;color:#0f3d24}\n.nb .bonus{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid #eee}\n.nb .bonus .bn{flex:none;width:38px;height:38px;border-radius:50%;background:#1a6644;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-weight:700;display:flex;align-items:center;justify-content:center}\n.nb .bonus .bt{font-weight:700;color:#0f3d24}\n.nb .bonus p{font-size:16px;line-height:1.6;margin:2px 0 0}\n.nb .offer{background:#f0faf4;border:2px solid #1a6644;border-radius:14px;padding:30px;margin:36px 0;text-align:center}\n.nb .offer ul{list-style:none;text-align:left;max-width:460px;margin:0 auto 20px}\n.nb .offer li{padding:7px 0 7px 30px;position:relative;font-size:17px}\n.nb .offer li:before{content:'✓';position:absolute;left:0;color:#1a6644;font-weight:700}\n.nb .price-label{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#777}\n.nb .price-new{font-size:56px;font-weight:700;color:#0f3d24;line-height:1.1;margin:6px 0 4px}\n.nb .price-note{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;color:#777;margin-bottom:20px}\n.nb .cta-button{display:inline-block;background:linear-gradient(135deg,#1f8a55 0%,#1a6644 100%);color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-weight:800;font-size:18px;letter-spacing:.5px;text-transform:uppercase;text-decoration:none;padding:18px 34px;border-radius:10px;box-shadow:0 8px 20px rgba(26,102,68,.35)}\n.nb .cta-sub{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;color:#777;margin-top:12px}\n.nb .daily{background:#fbf6ec;border-left:5px solid #d8a13a;border-radius:0 12px 12px 0;padding:26px 30px;margin:26px 0}\n.nb .guarantee-section{background:#EFF6FF;border:3px solid #1976D2;border-radius:15px;padding:30px;margin:40px 0;text-align:center}\n.nb .guarantee-title{font-size:26px;font-weight:700;color:#0d47a1;margin-bottom:12px}\n.nb .faq-q{font-weight:700;color:#0f3d24;margin:18px 0 4px}\n.nb .faq-a{margin:0 0 8px}\n.nb .choice-container{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0}\n.nb .choice{border-radius:12px;padding:22px}\n.nb .choice.no{background:#f4f4f4;color:#666}\n.nb .choice.yes{background:#f0faf4;border:2px solid #1a6644}\n.nb .choice .cht{font-weight:700;margin-bottom:6px}\n.nb .choice.yes .cht{color:#0f3d24}\n.nb .author-footer{text-align:center;font-style:italic;color:#777;padding:30px 44px 10px;border-top:1px solid #eee;margin-top:30px}\n.nb .mobile-sticky-cta{display:none;position:fixed;bottom:0;left:0;right:0;background:linear-gradient(135deg,#0f3d24 0%,#071810 100%);padding:12px 15px;z-index:1000;box-shadow:0 -4px 15px rgba(0,0,0,.25);opacity:0;transition:opacity .4s ease}\n.nb .mobile-sticky-cta.show{opacity:1}\n.nb .mobile-sticky-cta a{display:block;background:linear-gradient(135deg,#1f8a55 0%,#1a6644 100%);color:#fff;text-align:center;padding:14px 18px;font-size:16px;font-weight:700;text-decoration:none;border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}\n@media (max-width:768px){.nb .sec,.nb .art-head,.nb .masthead{padding-left:20px;padding-right:20px}\n.nb .container{padding-bottom:80px}\n.nb h1{font-size:28px}\n.nb h2{font-size:24px}\n.nb .hero{padding:40px 20px}\n.nb .hero .ht{font-size:30px}\n.nb .covers{grid-template-columns:repeat(2,1fr)}\n.nb .paths,.nb .choice-container{grid-template-columns:1fr}\n.nb .book{flex-direction:column;align-items:center;text-align:center}\n.nb .book img{width:150px}\n.nb .price-new{font-size:44px}\n.nb .cta-button{font-size:16px;padding:16px 22px}\n.nb .mobile-sticky-cta{display:block}\n}\n@media (max-width:480px){.nb{font-size:16px}\n.nb h1{font-size:25px}\n.nb .pull{font-size:19px}\n}\n\n.nb .mobile-sticky-cta{padding-bottom:calc(12px + env(safe-area-inset-bottom,0px))}\n.nb .mobile-sticky-cta a{cursor:pointer}\n.nb .cta-button{cursor:pointer}\n.nb .nv-region{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;color:#888;text-align:center;padding:0 20px 20px;line-height:1.7}\n.nb .nv-region button{background:none;border:0;color:#1a6644;text-decoration:underline;cursor:pointer;font:inherit;padding:0 4px}\n.nb .nv-overlay{position:fixed;inset:0;background:rgba(7,24,16,.65);display:flex;align-items:center;justify-content:center;padding:20px;z-index:2000}\n.nb .nv-modal{background:#fff;border-radius:14px;padding:28px;max-width:420px;width:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.5;color:#2b2b2b;font-size:15px}\n.nb .nv-modal h3{font-family:Georgia,serif;font-size:22px;color:#0f3d24;margin-bottom:6px}\n.nb .nv-modal p{font-size:14px;color:#666;margin-bottom:16px}\n.nb .nv-modal input{width:100%;border:1px solid #cfd8d2;border-radius:8px;padding:13px 14px;font-size:16px;margin-bottom:12px}\n.nb .nv-modal .nv-pay{width:100%;border:0;border-radius:8px;padding:15px;font-size:16px;font-weight:700;color:#fff;background:linear-gradient(135deg,#1f8a55 0%,#1a6644 100%);cursor:pointer}\n.nb .nv-modal .nv-pay:disabled{opacity:.6;cursor:wait}\n.nb .nv-modal .nv-cancel{display:block;margin:12px auto 0;background:none;border:0;color:#777;cursor:pointer;font-size:13px}\n.nb .nv-err{color:#c0392b;font-size:13px;margin-bottom:10px}\n\n/* ===== responsive layer ===== */\n.nb{overflow-x:hidden;font-size:clamp(16px,.35vw + 14.6px,19px)}\n.nb img{max-width:100%;height:auto}\n.nb .container{overflow-wrap:break-word}\n.nb h1{font-size:clamp(26px,4.6vw,44px)}\n.nb h2{font-size:clamp(23px,3.4vw,32px)}\n.nb .mast-title{font-size:clamp(20px,3.4vw,28px)}\n.nb .hero .ht{font-size:clamp(30px,6vw,50px)}\n.nb .hero .hs{font-size:clamp(16px,2.2vw,20px)}\n.nb .pull{font-size:clamp(19px,2.6vw,23px)}\n.nb .price-new{font-size:clamp(44px,8vw,60px)}\n.nb .cta-button{display:block;max-width:560px;margin:0 auto;text-align:center;line-height:1.3;font-size:clamp(15px,2vw,18px);padding:clamp(15px,2vw,19px) clamp(18px,3vw,34px)}\n.nb .mobile-sticky-cta{pointer-events:none}\n.nb .mobile-sticky-cta.show{pointer-events:auto}\n@media (max-width:768px){\n .nb .curiosity{padding:24px 20px}\n .nb .offer,.nb .guarantee-section,.nb .bonus-head{padding:22px 18px}\n .nb .daily,.nb .moment,.nb .notbox{padding:20px}\n .nb .book{padding:18px}\n .nb .bonus{gap:12px}\n .nb .label{margin-top:34px}\n .nb .nv-region button{padding:8px 6px}\n}\n@media (max-width:360px){\n .nb .sec,.nb .art-head,.nb .masthead{padding-left:16px;padding-right:16px}\n .nb .paths,.nb .choice-container{gap:12px}\n}\n@media (min-width:900px){\n .nb{padding:28px 20px 40px}\n .nb .container{max-width:940px;border-radius:18px;box-shadow:0 1px 0 #e6e1d6,0 24px 60px rgba(15,61,36,.08);padding-bottom:56px;overflow:hidden}\n .nb .sec,.nb .art-head,.nb .masthead{padding-left:88px;padding-right:88px}\n .nb .hero{padding:64px 72px}\n .nb .books{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:18px 0}\n .nb .books .book{flex-direction:column;align-items:center;text-align:center;margin:0}\n .nb .books .book img{width:170px}\n .nb .offer{padding:40px}\n}\n.nb .nv-alt{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;color:#777;margin-top:16px}\n.nb .nv-alt a{color:#1a6644;text-decoration:underline}\n";

export default function BookPage() {
  const [region, setRegion] = useState<Region>("ng");
  const [bar, setBar] = useState(false);
  const [atCheckout, setAtCheckout] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("nv_region");
      if (s && s in TIERS) { setRegion(s as Region); return; }
    } catch {}
    setRegion(detectRegion());
  }, []);

  useEffect(() => {
    const on = () => window.scrollY > 500 && setBar(true);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const el = document.getElementById("checkout");
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setAtCheckout(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = (r: Region) => {
    setRegion(r);
    try { localStorage.setItem("nv_region", r); } catch {}
  };
  const c = { ...COPY[region], price: TIERS[region].display } as any;
  const link = FLW_LINKS[region];
  const waHref = "https://wa.me/2349034111438?text=" + encodeURIComponent(`Hi A. Nova, I want the complete system (${TIERS[region].display})`);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="nb">
      <div className="container">


<div className="masthead">
  <div className="mast-title">📖 The Independent Income Report</div>
  <div className="mast-sub">Practical ideas for financial self-reliance · by A. Nova</div>
</div>


<div className="art-head">
  <div className="art-cat">Financial independence · Self-reliance · Taking action</div>
  <h1>Nobody Told You It Would Feel Like This, But There Is a Way Out</h1>
  <div className="art-meta">By A. Nova · 7 min read</div>
</div>


<div className="sec">
<p>You did everything you were supposed to do. You worked hard. You tried to be responsible. You stayed patient. You believed that if you kept doing the right things, life would eventually move in the right direction.</p>
<p>And yet, here you are. <strong>Still waiting.</strong></p>
<p>Waiting for better opportunities. Waiting for more income. Waiting for someone to finally give you a chance. Waiting for life to become what you thought it would be.</p>
<p>The painful part isn't that you're lazy. You aren't. The painful part is that you know you're capable of more.</p>
<p>You have ideas. You have ambition. You know things other people would pay to learn. But somehow, your reality hasn't caught up with what you know is possible.</p>
<p>You watch other people move forward, building businesses, creating income, creating freedom. And you wonder: <em>"What do they know that I don't?"</em></p>
<div className="pull">The problem is rarely intelligence. It is rarely talent. The problem is waiting.</div>
</div>


<div className="sec">
<div className="label">The real story</div>
<p>Imagine someone we'll call Alex.</p>
<div className="illus">(Alex is an illustrative example, not a real customer.)</div>
<p>Maybe Alex is 27. Maybe 35. Maybe 42. The age and the place don't matter. What matters is the feeling.</p>
<p>Alex isn't a failure. Alex shows up every day and handles responsibilities without complaint. But late at night, when the house is quiet, Alex feels something hard to put into words. A quiet frustration. A sense that something important is passing by.</p>
<p>Every month follows the same pattern. Work. Bills. Responsibilities. Repeat. The money comes in. The money goes out.</p>
<p>Alex knows things. A school subject. A skill. A way of doing something that people always ask about. Alex has ideas for turning that into income. But there is always a reason to wait:</p>
<p><em>"I need more money first." "I need more knowledge." "I need more confidence." "I need better timing."</em></p>
<p>Months become years. The waiting becomes a habit.</p>
<p>Until one day Alex notices something. The people making real progress aren't necessarily smarter or luckier. <strong>They simply started before they felt ready, with what they already had.</strong></p>
</div>


<div className="sec">
<div className="label">The discovery</div>
<div className="pull">Self-reliant people do not wait for opportunities. They create them.</div>
<p>They stop asking, "Who will give me a chance?" and start asking, <strong>"What do I already know that someone would pay to learn?"</strong></p>
<p>They stop waiting for perfect conditions. They start with what they have: a phone, and the knowledge in their head.</p>
<p>The problem was never a lack of opportunity. The problem was waiting.</p>
</div>


<div className="sec">
<div className="label">The story behind this guide</div>
<h2>Let Me Introduce Myself</h2>
{FOUNDER_PHOTO && (<><img className="founder-photo" src={FOUNDER_PHOTO} alt="A. Nova, the author" /><div className="photo-cap">A. Nova</div></>)}
<p>Alex's story is not just an example. In many ways, it is my own.</p>
<div className="moment">
<p>I was a university student doing my Teaching Practice in a secondary school. There wasn't enough space for us in the staff room, so some of us sat outside, under a tree. I looked around and asked myself one quiet question:</p>
<p style={{margin:'0'}}><strong>"Is this really the future I want?"</strong></p>
</div>
<p>Years earlier, I had dreamed of becoming a medical doctor. I didn't get the grades. I ended up studying English Education. I told myself I would get a Master's, then a PhD, then become a professor.</p>
<p>But sitting under that tree, I realised that if I wanted a different future, I couldn't wait for it. <strong>I had to build it.</strong></p>
<div className="curiosity">
  <div className="ct">What happened next is inside</div>
  <ul>
    <li>How I applied to <strong>57 universities in America</strong>, and what happened when one of them said yes. Did I go, or did I choose something else?</li>
    <li>How I started with a <strong>{c.phone}</strong> and an idea I almost rejected</li>
    <li>How I made <strong>{c.day} in a single day</strong>, and later {c.best} on my best day</li>
    <li>How I crossed my <strong>first {c.million} month</strong>. In Nigeria, that is more than many workers earn in a whole year</li>
    <li>And <strong>what it really cost me</strong>: the mistakes, the sacrifices, and the lessons I paid for</li>
  </ul>
  <div className="disclaim">These are my own results, shared honestly. They are not a promise of what you will earn.</div>
</div>
</div>


<div className="sec">
<p>If any part of that story felt familiar, it isn't because you're lazy. It isn't because you lack potential.</p>
<p>Most people simply never learn a practical, step-by-step way to turn what they know into income.</p>
<p><strong>That's exactly why I created this.</strong></p>
</div>


<div className="hero">
  <div className="hk">Introducing the complete package</div>
  <div className="ht">STOP WAITING.<br />START BUILDING.</div>
  <div className="hs">How I Went From Nothing to My First Million — And What It Really Cost Me.</div>
  <picture className="bundle">
    <source media="(max-width:480px)" srcSet="/book/bundle-tall.png" />
    <img src="/book/bundle-wide.png" alt="The four books: Stop Waiting. Start Building., Find Your Idea, Create Your Digital Product, Teach Your Idea" />
  </picture>
</div>


<div className="sec">
<p>Not just a book. A complete system: four books, step-by-step video courses, and everything I learned building my own income from nothing.</p>
<div className="notbox">
<ul>
<li>Not a motivational speech full of empty inspiration</li>
<li>Not a get-rich-quick promise that requires no effort</li>
<li>Not recycled theory from someone who never did it</li>
</ul>
</div>
<p><strong>This is a practical, honest roadmap</strong>, built from real experience, for ordinary people {c.audience} who are ready to stop waiting and start building.</p>
</div>


<div className="sec">
<div className="label">Two paths. Choose yours.</div>
<p>Everything begins with <strong>one idea</strong>: something you already know. Then you choose how to earn from it.</p>
<div className="paths">
  <div className="path a"><div className="pk">Path 1</div><div className="pt">Create a Digital Product</div><p>Package what you know into a guide, video lessons or voice lessons. Build it once, sell it many times.</p></div>
  <div className="path b"><div className="pk">Path 2</div><div className="pt">Teach Your Idea</div><p>One-to-one or in groups. In person or online. In your country or abroad. Income from students every month.</p></div>
</div>
<p>You can start with one and add the other later.</p>
</div>


<div className="sec">
<div className="label">What's inside: the four books</div>
<div className="books">
<div className="book"><img src="/book/cover-story.png" alt="" /><div><div className="bk">Book 1 · My story</div><div className="bt">Stop Waiting. Start Building.</div><div className="bs">How I Went From Nothing to My First Million — And What It Really Cost Me.</div><p>The full journey, from sitting under a tree to my first million-naira month. Every failure, every turning point and every lesson, told honestly, with a practical guide at the end.</p></div></div>
<div className="book"><img src="/book/cover-idea.png" alt="" /><div><div className="bk">Book 2 · The starting guide</div><div className="bt">Find Your Idea</div><div className="bs">Turn what you already know into something people will pay for</div><p>Discover what you know that people will pay for: school knowledge, hand skills or work knowledge. Includes the AI interview that helps you choose, the Idea Checklist and your one-page Idea Sheet. Use it again for every new idea.</p></div></div>
<div className="book"><img src="/book/cover-product.png" alt="" /><div><div className="bk">Book 3 · Path 1</div><div className="bt">Create Your Digital Product</div><div className="bs">Test it, build it, sell it</div><p>Test your idea with ads before you build it, then create it, price it, deliver it and sell it, step by step. Facebook, TikTok and Instagram ads, WhatsApp Business, Telegram channels, the calling method, getting paid from abroad, and what to do when things go wrong. Includes 10 ready-to-use tools and a 21-day plan.</p></div></div>
<div className="book"><img src="/book/cover-teach.png" alt="" /><div><div className="bk">Book 4 · Path 2</div><div className="bt">Teach Your Idea</div><div className="bs">One-to-One or in Groups · In Person or Online · In Your Country or Abroad</div><p>Find students, teach well and get paid: house to house, online in your country, and teaching people outside your country. For school subjects and for any skill.</p></div></div>
</div>
</div>


<div className="sec">
<div style={{textAlign:'center',margin:'10px 0 30px'}}><a className="cta-button" href="#checkout">YES, I WANT THE COMPLETE SYSTEM FOR {c.price}</a><div className="cta-sub">🔒 Secure checkout · Instant access · 30-day money-back guarantee</div></div>
</div>


<div className="sec">
<div className="bonus-head"><div className="bh">🎁 Plus: Step-by-Step Video Courses</div><p style={{margin:'8px 0 0'}}>Instead of sending you to YouTube to figure everything out alone, you get a video course for every tool you need.</p></div>
<div className="bonus"><div className="bn">1</div><div><div className="bt">Facebook</div><p>Setting up your page, boosting, and Ads Manager.</p></div></div>
<div className="bonus"><div className="bn">2</div><div><div className="bt">TikTok</div><p>Setting up your account, and TikTok Ads.</p></div></div>
<div className="bonus"><div className="bn">3</div><div><div className="bt">Instagram</div><p>Setting up your account, and Instagram Ads.</p></div></div>
<div className="bonus"><div className="bn">4</div><div><div className="bt">WhatsApp Business</div><p>The full setup, so you're ready when buyers message you.</p></div></div>
<div className="bonus"><div className="bn">5</div><div><div className="bt">Telegram</div><p>Setting up channels and groups to deliver your product and support your buyers.</p></div></div>
<div className="bonus"><div className="bn">6</div><div><div className="bt">AI Video Creation</div><p>Make your ads and lessons with AI video, or with images. Either way, you don't have to show your face.</p></div></div>
<div className="bonus"><div className="bn">7</div><div><div className="bt">Selling with Selar, and Selling Outside Nigeria</div><p>Selar is an online store for digital products. You put your product on it, buyers pay by card or bank transfer, and the product is delivered to them automatically, even while you sleep. The money comes to your bank account. Learn how to set it up, and how to sell to buyers in other countries.</p></div></div>
<div className="bonus"><div className="bn">8</div><div><div className="bt">Starting a YouTube Channel</div><p>How to start your channel, post videos that bring viewers, grow your followers and point them to your product.</p></div></div>
<div className="bonus"><div className="bn">9</div><div><div className="bt">Turning Your Product Into Content</div><p>Use what you created to attract buyers and build trust, so people come to you.</p></div></div>
<div className="bonus"><div className="bn">10</div><div><div className="bt">And more</div><p>Everything taught step by step, in one place.</p></div></div>
</div>


<div className="sec">
<div className="label">Money for your daily life, and for your big plans</div>
<p>Maybe you have something big you want to do: get married, start a business, pay school fees, rent a better place, help your parents. But you don't have the money, and you've been waiting until you do.</p>
<p><strong>This is where you can start.</strong></p>
<div className="daily">
<p>This is how my own days went once it was running: I would wake up with nothing in my account except the money for boosting my ads. By night, I had enough to buy what I needed, and some left over to keep.</p>
<p>In the early days, it was {c.daily}</p>
<p style={{margin:'0'}}>It became money that came in daily, on the days I worked. Not a salary at the end of the month. Not waiting for someone to give me a chance.</p>
</div>
<p className="disclaim" style={{color:'#888'}}>These are my own results. What you earn depends on your product, your market and the work you put in. But the method is the same, and it's all inside.</p>
</div>


<div className="sec">
<div className="label">Why the price is affordable</div>
<p>Everything here is taught step by step, in one place. A course like this could easily be sold for much more.</p>
<p>But my goal is not to make it expensive. My goal is for people who are unemployed, people who are struggling, and anyone who wants to earn a living and support their family, to learn from what I went through, then create their own product or teach what they know, and build their own income.</p>
</div>


<div className="sec">
<div className="offer">
  <div className="label" style={{marginTop:'0'}}>Everything you get</div>
  <ul>
    <li>Book 1: Stop Waiting. Start Building. (my story)</li>
    <li>Book 2: Find Your Idea</li>
    <li>Book 3: Create Your Digital Product</li>
    <li>Book 4: Teach Your Idea</li>
    <li>All 10 bonus video courses</li>
    <li>Instant access</li>
    <li>30-day money-back guarantee</li>
  </ul>
  <div className="price-label">Your price today</div>
  <div className="price-new">{c.price}</div>
  <div className="price-note">{c.note}</div>
  <a className="cta-button" href="#checkout">YES, GIVE ME INSTANT ACCESS</a>
  <div className="cta-sub">🔒 Secure checkout · Instant access</div>
</div>
</div>


<div className="sec">
<div className="guarantee-section">
  <div className="guarantee-title">🛡️ My 30-Day Money-Back Guarantee</div>
  <p>Read the books. Watch the videos. Start applying what you learn.</p>
  <p style={{margin:'0'}}>If, within 30 days, you genuinely feel it wasn't valuable for you, contact me and I'll refund you. No complicated process.</p>
</div>
</div>


<div className="sec">
<div className="label">Questions people ask</div>
<div className="faq-q">Do I need a laptop?</div><div className="faq-a">No. Everything I built, I built with a phone.</div>
<div className="faq-q">Do I need to show my face?</div><div className="faq-a">No. You can use AI video, images with your voice, or a single image.</div>
<div className="faq-q">Is this only for Nigeria?</div><div className="faq-a">{c.faq}</div>
<div className="faq-q">I've never sold anything. Can I still do this?</div><div className="faq-a">Yes. The books start from finding your idea and go step by step.</div>
<div className="faq-q">Should I choose a digital product or teaching?</div><div className="faq-a">Book 2 helps you decide. You can start with one and add the other later.</div>
<div className="faq-q">Is this get-rich-quick?</div><div className="faq-a">No. It is real work, explained honestly. The books show you how. The results depend on what you do.</div>
<div className="faq-q">How do I receive everything?</div><div className="faq-a">Instant access right after payment.</div>
</div>


<div className="sec">
<div className="label">Why you can trust this</div>
<p>Everything in these books comes from what I actually did: the ads I ran, the products I built, the students I taught, the mistakes that cost me money, and the methods that finally worked. No invented stories, no fake reviews. Just my real experience, written down step by step so you don't have to learn it the hard way.</p>
</div>


<div className="sec">
<h2>One Last Thing Before You Leave</h2>
<p>A year from today, one of two things will be true.</p>
<p>You will still be telling yourself that you'll start "one day."</p>
<p>Or you'll look back and be grateful that you made one small decision that changed your direction.</p>
<div className="choice-container">
  <div className="choice no"><div className="cht">Option 1: Close this page</div>Keep waiting. Hope things change on their own.</div>
  <div className="choice yes"><div className="cht">Option 2: Start today</div>Get the complete system. Find your idea. Build your income.</div>
</div>
<div style={{textAlign:'center',margin:'10px 0 30px'}}><a className="cta-button" href="#checkout">YES, I'M READY TO START BUILDING · {c.price}</a><div className="cta-sub">🔒 Secure checkout · Instant access · 30-day money-back guarantee</div></div>
</div>


<div className="sec" id="checkout" style={{ scrollMarginTop: 20 }}>
        <div className="offer">
          <div className="label" style={{ marginTop: 0 }}>Complete your order</div>
          <div className="price-label">Your price</div>
          <div className="price-new">{c.price}</div>
          <div className="price-note">{c.note}</div>
          {link ? (
            <a className="cta-button" href={link} rel="noopener">Pay {c.price} securely</a>
          ) : (
            <a className="cta-button" href={waHref} target="_blank" rel="noopener noreferrer">Order on WhatsApp · {c.price}</a>
          )}
          <div className="cta-sub">🔒 Secure checkout · Instant access · 30-day money-back guarantee</div>
          {link && (
            <div className="nv-alt">
              Prefer to order by chat? <a href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp 09034111438</a>
            </div>
          )}
        </div>
      </div>

      <div className="author-footer">Stop waiting. Start building.<br />A. Nova</div>
</div>

        <div className="nv-region">
          Prices shown for {TIERS[region].label}. Not right?
          {(Object.keys(TIERS) as Region[]).filter((r) => r !== region).map((r) => (
            <button key={r} type="button" onClick={() => pick(r)}>{TIERS[r].label}</button>
          ))}
        </div>

        <div className={"mobile-sticky-cta" + (bar && !atCheckout ? " show" : "")} id="stickyBar">
          <a href="#checkout">Get the complete system · {c.price} 👉</a>
        </div>
      </div>
      <div className="pb-20 md:pb-0"><Footer /></div>
    </>
  );
}