"use client";

import Image from "next/image";
import { useId, useState } from "react";

type Props = {
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
};

/**
 * Voor/na-schuifbalk. Eén native range-input: werkt met muis, touch én
 * toetsenbord, zonder animatiebibliotheek en zonder drag-handlers.
 */
export function BeforeAfter({
  beforeImage,
  beforeAlt,
  afterImage,
  afterAlt,
}: Props) {
  const [value, setValue] = useState(50);
  const id = useId();

  return (
    <figure className="relative aspect-[4/3] w-full select-none overflow-hidden md:aspect-[16/10]">
      <Image
        src={afterImage}
        alt={afterAlt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Scheidingslijn met greep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.35)]"
        style={{ left: `${value}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-md">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M9.5 7 5 12l4.5 5V7Zm5 0v10l4.5-5-4.5-5Z" />
          </svg>
        </span>
      </div>

      <span className="pointer-events-none absolute top-3 left-3 bg-black/65 px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">
        Voor
      </span>
      <span className="pointer-events-none absolute top-3 right-3 bg-brand/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">
        Na
      </span>

      <label htmlFor={id} className="sr-only-focusable absolute bottom-2 left-2 z-10 bg-white px-2 py-1 text-sm text-ink">
        Schuif om de voor- en nasituatie te vergelijken
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label="Vergelijk de situatie voor en na de werkzaamheden"
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />
    </figure>
  );
}
