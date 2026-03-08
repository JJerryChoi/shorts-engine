"use client";

interface BuyButtonProps {
  affiliateUrl: string;
  slug: string;
  platform: "coupang" | "amazon";
}

export function BuyButton({ affiliateUrl, slug, platform }: BuyButtonProps) {
  const handleClick = () => {
    // Privacy-friendly click tracking via beacon
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(
        "/api/track",
        JSON.stringify({ event: "click", slug, platform }),
      );
    }
  };

  const label = platform === "coupang" ? "쿠팡에서 구매하기" : "Buy Now";

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-500 active:bg-blue-700"
    >
      {label}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
}
