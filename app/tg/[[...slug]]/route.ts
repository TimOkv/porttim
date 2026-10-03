import { NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { getContactLink, getProjectContactLink } from "@/lib/telegram";

/**
 * Короткие ссылки для резюме, QR-кодов и соцсетей:
 * `/tg` — общее обращение, `/tg/<id кейса>` — обращение по конкретному проекту.
 *
 * Сделано обработчиком, а не `redirects()` в next.config.ts: там Next.js декодирует
 * кириллицу в `destination`, и ответ падает с невалидным заголовком Location.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const project = slug?.length === 1 ? projects.find(({ id }) => id === slug[0]) : undefined;
  const link = project ? getProjectContactLink(project) : getContactLink();

  // Без настроенного username ведем к контактному блоку сайта, а не на чужой аккаунт.
  return NextResponse.redirect(link ?? new URL("/#contact", request.url), 307);
}
