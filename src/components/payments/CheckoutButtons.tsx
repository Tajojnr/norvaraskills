"use client";

import type { ProductId } from "@/lib/products";
import { PRODUCTS } from "@/lib/products";
import { useLanguage } from "@/lib/LanguageContext";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

type Props = {
  productId: ProductId;
  className?: string;
};

const WHATSAPP_PHONE = "2348149943489";

export default function CheckoutButtons({ productId, className = "" }: Props) {
  const { lang } = useLanguage();
  const product = PRODUCTS[productId];
  const price = `₦${product.amountNgn.toLocaleString("en-NG")}`;
  const whatsappLink = (message: string) =>
    `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  const greeting = `Hi A. Nova, I'm interested in ${product.title}`;

  const options = [
    {
      message: `${greeting} for ${price}. I want to order it now. Please tell me the next steps.`,
      label: lang === "en" ? "I want this product now" : "Ina son wannan kaya yanzu",
      primary: true,
    },
    {
      message: `${greeting}. Can you tell me more about the product?`,
      label: lang === "en" ? "Tell me more about this product" : "Yi mini karin bayani game da wannan kayan",
      primary: false,
    },
    {
      message: `Hi A. Nova, can you tell me about other Norvara options besides ${product.title}?`,
      label: lang === "en" ? "Show me other options" : "Nuna mini wasu zabuka",
      primary: false,
    },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {options.map(({ message, label, primary }) => (
        <a
          key={label}
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-center text-sm font-bold transition-colors ${
            primary
              ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              : "border border-white/10 bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          {primary && <WhatsAppIcon />}
          {label}
        </a>
      ))}
      <p className="text-center text-xs text-slate-400">
        {lang === "en" ? "WhatsApp A. Nova: +234 814 994 3489" : "WhatsApp A. Nova: +234 814 994 3489"}
      </p>
    </div>
  );
}
