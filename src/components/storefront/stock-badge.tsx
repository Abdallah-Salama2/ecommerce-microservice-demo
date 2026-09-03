import { Badge } from "@/components/ui/badge";

type StockState = "instock" | "low" | "soldout";

function stockState(stock: number): StockState {
  if (stock <= 0) return "soldout";
  if (stock <= 5) return "low";
  return "instock";
}

/** Stock status badge — mono count included so inventory reads consistently.
 *  Accepts `undefined` for when stock data is still loading (renders nothing). */
export function StockBadge({ stock, showCount = true }: { stock: number | undefined; showCount?: boolean }) {
  // Don't show anything while stock data is still loading
  if (stock === undefined) return null;

  const state = stockState(stock);

  if (state === "soldout") return <Badge variant="soldout">Sold out</Badge>;

  if (state === "low")
    return <Badge variant="low">{showCount ? `Only ${stock} left` : "Low stock"}</Badge>;

  return <Badge variant="instock">{showCount ? `${stock} in stock` : "In stock"}</Badge>;
}

export function SaleBadge({ children = "Sale" }: { children?: React.ReactNode }) {
  return <Badge variant="sale">{children}</Badge>;
}
