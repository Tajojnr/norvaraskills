import type { Metadata } from "next";

const shareImage = {
  url: "https://www.norvara.com.ng/norvara-share.jpg",
  width: 1200,
  height: 630,
  alt: "Norvara sales page poster",
};

export const metadata: Metadata = {
  title: { absolute: "Stop Waiting. Start Building. | A. Nova" },
  description:
    "Turn what you already know into income, step by step. 4 books and about 50 video lessons.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    type: "website",
    url: "https://www.norvara.com.ng/book",
    title: "Stop Waiting. Start Building. | A. Nova",
    description:
      "Turn what you already know into income, step by step. 4 books and about 50 video lessons.",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Waiting. Start Building. | A. Nova",
    description:
      "Turn what you already know into income, step by step. 4 books and about 50 video lessons.",
    images: [shareImage],
  },
};

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
