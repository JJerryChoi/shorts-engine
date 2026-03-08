export interface Product {
  slug: string;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  currency: string;
  platform: "coupang" | "amazon";
  affiliateUrl: string;
  videoId?: string;
  videoTimestamp?: number;
  tags: string[];
}

// Sample products — will be replaced by pipeline-generated data
export const products: Product[] = [
  {
    slug: "portable-mini-projector",
    title: "휴대용 미니 빔프로젝터",
    description:
      "유튜브 쇼츠에서 화제가 된 초소형 미니 빔프로젝터. 스마트폰과 무선 연결로 어디서든 100인치 대화면을 즐길 수 있습니다.",
    image: "/images/placeholder-product.svg",
    price: 89000,
    originalPrice: 149000,
    currency: "KRW",
    platform: "coupang",
    affiliateUrl: "https://www.coupang.com/vp/products/placeholder-1",
    videoId: "dQw4w9WgXcQ",
    videoTimestamp: 15,
    tags: ["전자기기", "빔프로젝터", "가성비"],
  },
  {
    slug: "led-sunset-lamp",
    title: "LED 선셋 무드등",
    description:
      "틱톡과 쇼츠에서 수백만 뷰를 기록한 선셋 무드등. 방 분위기를 한순간에 바꿔주는 감성 조명.",
    image: "/images/placeholder-product.svg",
    price: 15900,
    originalPrice: 29900,
    currency: "KRW",
    platform: "coupang",
    affiliateUrl: "https://www.coupang.com/vp/products/placeholder-2",
    videoId: "dQw4w9WgXcQ",
    videoTimestamp: 8,
    tags: ["인테리어", "조명", "감성"],
  },
  {
    slug: "wireless-earbuds-pro",
    title: "무선 블루투스 이어버드 Pro",
    description:
      "쇼츠 리뷰어들이 극찬한 가성비 무선 이어버드. 노이즈 캔슬링, 30시간 배터리, IPX5 방수.",
    image: "/images/placeholder-product.svg",
    price: 34900,
    originalPrice: 59900,
    currency: "KRW",
    platform: "coupang",
    affiliateUrl: "https://www.coupang.com/vp/products/placeholder-3",
    tags: ["전자기기", "이어폰", "가성비"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function formatPrice(price: number, currency: string): string {
  if (currency === "KRW") {
    return `₩${price.toLocaleString("ko-KR")}`;
  }
  return `$${price.toLocaleString("en-US")}`;
}

export function getDiscountPercent(
  price: number,
  originalPrice?: number,
): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
