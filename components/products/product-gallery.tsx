"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-[4/5] bg-sand">
        <Image src={current} alt={`${name}，圖片 ${active + 1}`} fill priority className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
      </div>
      {images.length > 1 ? (
        <ul className="mt-3 flex gap-3">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                aria-label={`查看${name}的圖片 ${index + 1}`}
                aria-current={index === active}
                className="relative h-20 w-16 bg-sand"
                onClick={() => setActive(index)}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="64px" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
