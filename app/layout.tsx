import type { Metadata } from "next";
import { copy } from "@/data/projects";
import "@fontsource-variable/manrope";
import "./globals.css";
export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {/* Без скриптов блоки не появятся сами: показываем их сразу. */}
        <noscript>
          <style>{".reveal,.process-step{opacity:1;translate:none}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
