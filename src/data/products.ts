import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import editorial from "@/assets/editorial.jpg";

export type CategorySlug = "furniture" | "lighting" | "textiles" | "objects";

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  categoryName: string;
  price: number;
  compareAt?: number;
  stock: number;
  material: string;
  dimensions: string;
  description: string;
  images: string[];
}

export const categories: Category[] = [
  {
    slug: "furniture",
    name: "Furniture",
    blurb: "Quality pieces built to last and enhance your space.",
    image: p1,
  },
  {
    slug: "lighting",
    name: "Lighting",
    blurb: "Thoughtfully designed lighting for every room.",
    image: p2,
  },
  {
    slug: "textiles",
    name: "Textiles",
    blurb: "Comfortable fabrics for everyday living.",
    image: p3,
  },
  {
    slug: "objects",
    name: "Objects",
    blurb: "Carefully curated items for your home.",
    image: p5,
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "halden-lounge-chair",
    name: "Halden Lounge Chair",
    category: "furniture",
    categoryName: "Furniture",
    price: 1240,
    stock: 6,
    material: "White oak, bouclé wool",
    dimensions: "74 × 82 × 71 cm",
    description:
      "A low, deliberately quiet chair. The frame is cut from a single run of white oak and joined without visible hardware; the seat is upholstered in an undyed bouclé that softens with use.",
    images: [p1, editorial, p4],
  },
  {
    id: "2",
    slug: "ora-ribbed-table-lamp",
    name: "Ora Ribbed Table Lamp",
    category: "lighting",
    categoryName: "Lighting",
    price: 268,
    compareAt: 320,
    stock: 3,
    material: "Glazed stoneware, linen shade",
    dimensions: "48 cm h × 26 cm ⌀",
    description:
      "Hand-thrown ribbed base with a matte glaze that catches the light differently at every hour. Shipped with a dimmable warm bulb.",
    images: [p2, editorial],
  },
  {
    id: "3",
    slug: "washed-linen-throw-set",
    name: "Washed Linen Throw Set",
    category: "textiles",
    categoryName: "Textiles",
    price: 145,
    stock: 24,
    material: "Stonewashed European flax",
    dimensions: "130 × 180 cm, set of three",
    description:
      "Three weights of stonewashed flax in oat, bone and clay. Loosely woven so they breathe in summer and layer in winter.",
    images: [p3, editorial],
  },
  {
    id: "4",
    slug: "pell-travertine-side-table",
    name: "Pell Travertine Side Table",
    category: "furniture",
    categoryName: "Furniture",
    price: 680,
    stock: 9,
    material: "Solid unfilled travertine",
    dimensions: "45 cm h × 52 cm ⌀",
    description:
      "Turned from a single block of unfilled travertine. Every table carries its own pattern of pores and veining — no two are alike.",
    images: [p4, editorial],
  },
  {
    id: "5",
    slug: "stoneware-vase-trio",
    name: "Stoneware Vase Trio",
    category: "objects",
    categoryName: "Objects",
    price: 78,
    compareAt: 92,
    stock: 41,
    material: "Glazed and raw stoneware",
    dimensions: "14 / 19 / 22 cm h",
    description:
      "A set of three small vessels, half-dipped in a cream glaze and left raw below the waist. Watertight and meant to be used.",
    images: [p5, editorial],
  },
  {
    id: "6",
    slug: "field-wool-area-rug",
    name: "Field Wool Area Rug",
    category: "textiles",
    categoryName: "Textiles",
    price: 860,
    stock: 0,
    material: "Hand-loomed undyed wool",
    dimensions: "200 × 300 cm",
    description:
      "Flat-woven on a hand loom in broad ink and oat bands. Reversible, and dense enough to sit directly on stone floors.",
    images: [p6, editorial],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, limit = 3) {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const rest = products.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export type StockState = "instock" | "low" | "soldout";

export function stockState(stock: number): StockState {
  if (stock <= 0) return "soldout";
  if (stock <= 5) return "low";
  return "instock";
}

export const heroImage = editorial;
