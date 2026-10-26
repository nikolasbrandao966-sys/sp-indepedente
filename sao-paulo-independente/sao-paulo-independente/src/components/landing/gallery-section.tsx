"use client"

import { Camera } from "lucide-react"
import { GALLERY } from "@/lib/images"

const SPAN_CLASS: Record<string, string> = {
  wide: "sm:col-span-2",
  tall: "lg:row-span-2",
  normal: "",
}

export function GallerySection() {
  return (
    <section id="galeria" className="scroll-mt-24 border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Nossa São Paulo
            </p>
            <h2 className="font-head text-4xl leading-none text-white sm:text-5xl md:text-6xl">
              ISSO VALE A PENA <span className="text-red-500">DEFENDER</span>
            </h2>
          </div>
          <p className="flex max-w-xs items-start gap-2 text-sm leading-relaxed text-zinc-500">
            <Camera className="mt-0.5 size-4 shrink-0 text-red-500/70" aria-hidden />
            Da Paulista ao Porto de Santos, do interior à capital: um estado
            inteiro que merece escolher o próprio destino.
          </p>
        </div>

        <div className="grid auto-rows-[230px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((photo) => (
            <figure
              key={photo.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-card ${SPAN_CLASS[photo.span]}`}
            >
              <img
                src={photo.url}
                alt={`${photo.title} — ${photo.subtitle}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-head text-2xl leading-none tracking-wide text-white">
                  {photo.title.toUpperCase()}
                </p>
                <p className="mt-1.5 max-w-[90%] text-xs leading-relaxed text-zinc-300 opacity-90 transition-all duration-500 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                  {photo.subtitle}
                </p>
              </figcaption>
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl ring-0 ring-red-500/60 transition-all duration-500 group-hover:ring-2 group-hover:ring-inset"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
