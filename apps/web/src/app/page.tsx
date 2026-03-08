import { products, formatPrice, getDiscountPercent } from "@/data/products";

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-8 md:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-100 mb-3">
            Shorts Engine
          </h1>
          <p className="text-zinc-400 text-lg">
            쇼츠에서 발견한 인기 제품을 만나보세요.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const discount = getDiscountPercent(
              product.price,
              product.originalPrice,
            );
            return (
              <a
                key={product.slug}
                href={`/p/${product.slug}`}
                className="group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-colors hover:border-zinc-700"
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-800">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  {discount && (
                    <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
                      -{discount}%
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-base font-semibold text-zinc-100 line-clamp-2">
                    {product.title}
                  </h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-zinc-100">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-zinc-600 line-through">
                        {formatPrice(product.originalPrice, product.currency)}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
