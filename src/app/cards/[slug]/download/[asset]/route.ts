import { getBusinessCard } from "@/lib/business-cards";
import { createCardDownload, isCardAsset } from "@/lib/card-downloads";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; asset: string }> }) {
  const { slug, asset } = await params;
  const card = getBusinessCard(slug);
  if (!card || !isCardAsset(asset)) return new Response("Not found", { status: 404 });

  const { body, contentType } = await createCardDownload(card, asset);
  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${slug}-${asset}"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
