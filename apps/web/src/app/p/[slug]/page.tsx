import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProductBySlug,
  getAllSlugs,
  formatPrice,
  getDiscountPercent,
} from "@/data/products";
import { BuyButton } from "./buy-button";
import { TrackPageView } from "./track-page-view";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.title} | Shorts Engine`;
  const description = product.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Shorts Engine",
      images: [{ url: product.image, width: 600, height: 600 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const discount = getDiscountPercent(product.price, product.originalPrice);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      url: product.affiliateUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackPageView slug={slug} />

      <main className="min-h-screen px-4 py-8 md:py-16">
        <div className="mx-auto max-w-2xl">
          {/* Back link */}
          <a
            href="/"
            className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <span aria-hidden="true">&larr;</span> 홈으로
          </a>

          {/* Product image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-900 mb-6">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            {discount && (
              <span className="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                -{discount}%
              </span>
            )}
          </div>

          {/* Video embed placeholder */}
          {product.videoId && (
            <div className="mb-6 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
                <span className="text-red-500">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
                  </svg>
                </span>
                <span className="text-sm text-zinc-400">
                  이 영상에서 발견된 제품
                </span>
              </div>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${product.videoId}${product.videoTimestamp ? `?start=${product.videoTimestamp}` : ""}`}
                  title={`${product.title} 관련 영상`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Product info */}
          <div className="space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl font-bold text-zinc-100 md:text-3xl">
              {product.title}
            </h1>

            <p className="text-zinc-400 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-zinc-100">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-zinc-600 line-through">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
            </div>

            {/* Buy button */}
            <BuyButton
              affiliateUrl={product.affiliateUrl}
              slug={product.slug}
              platform={product.platform}
            />

            {/* Platform badge */}
            <p className="text-center text-xs text-zinc-600">
              {product.platform === "coupang"
                ? "쿠팡 파트너스를 통해 구매 시 일정 수수료를 받을 수 있습니다."
                : "이 링크를 통해 구매 시 일정 수수료를 받을 수 있습니다."}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
