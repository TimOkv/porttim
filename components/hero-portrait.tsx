"use client";
import Image from "next/image";
import { useState } from "react";
// Портрет-фон первого экрана. Не загрузился — блока нет совсем, без битой картинки.
export function HeroPortrait({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <div className="hero-portrait">
      <Image
        // Ошибка загрузки могла случиться до гидрации: тогда onError не сработает.
        ref={(image) => {
          if (image?.complete && image.naturalWidth === 0) setFailed(true);
        }}
        src={src}
        alt={alt}
        fill
        preload
        sizes="(max-width: 760px) 86vw, 52vw"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
