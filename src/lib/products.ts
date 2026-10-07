export type ProductId = "building-from-zero" | "phone-first-masterclass";

export const PRODUCTS: Record<
  ProductId,
  { id: ProductId; title: string; amountNgn: number; type: "ebook" | "course" }
> = {
  "building-from-zero": {
    id: "building-from-zero",
    title: "Building From Zero",
    amountNgn: 9900,
    type: "ebook",
  },
  "phone-first-masterclass": {
    id: "phone-first-masterclass",
    title: "Phone-First Digital Masterclass",
    amountNgn: 19500,
    type: "course",
  },
};