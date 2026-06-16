import SiteImage from "@/components/ui/SiteImage";

export function CardGrid({
  items,
}: {
  items: readonly { title?: string; name?: string; description?: string; type?: string; image: string }[];
}) {
  return (
    <div className="container-wide grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const label = item.title ?? item.name ?? "";
        return (
          <article
            key={label}
            className="group overflow-hidden rounded-3xl border border-earth/8 bg-white card-hover"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <SiteImage
                src={item.image}
                alt={label}
                fill
                className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              {item.type && <p className="eyebrow !text-[10px]">{item.type}</p>}
              <h3 className="heading-md mt-1">{label}</h3>
              {item.description && (
                <p className="mt-2 font-sans text-sm leading-relaxed text-earth/70">
                  {item.description}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
