import { notFound, redirect } from "next/navigation";
import { NEWS } from "@/lib/data/site";

export function generateStaticParams() {
  return NEWS.map((item) => ({ slug: item.slug }));
}

export default function NoticiaPage({ params }: { params: { slug: string } }) {
  const exists = NEWS.some((item) => item.slug === params.slug);
  if (!exists) notFound();
  redirect(`/noticias?noticia=${params.slug}`);
}
