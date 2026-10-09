import type { Metadata } from "next";
import { copy } from "@/data/projects";
import "@fontsource-variable/manrope";
import "./globals.css";
import styles from "@/components/portfolio/portfolio.module.css";
export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={styles.document}>
        {/* Без скриптов блоки не появятся сами: показываем их сразу. */}
        <noscript>
          <style>{`
            .reveal,.process-step{opacity:1;translate:none}
            [data-portfolio] [data-reveal], [data-portfolio] [data-mask-title]{opacity:1!important;transform:none!important}
            [data-portfolio] [data-intro]{display:none!important}
            [data-portfolio] [data-static-count]{display:inline!important}
            [data-portfolio] [data-animated-count]{display:none!important}
            [data-portfolio] [data-mobile-menu]{display:none!important}
            [data-portfolio] nav{display:flex!important;position:static!important;flex-wrap:wrap;padding:8px!important}
            [data-portfolio] header{flex-wrap:wrap}
          `}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
