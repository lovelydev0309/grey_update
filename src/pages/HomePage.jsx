import { useEffect, useRef, useState } from 'react'
import { featuredStories } from '../data/siteContent'
import { originHomeSlideAt } from '../data/greyManifestData'

function isVideoUrl(src) {
  return typeof src === 'string' && /\.(mp4|webm|mov)(\?|$)/i.test(src)
}

export default function HomePage() {
  const slides = featuredStories.map((story, index) => {
    const origin = originHomeSlideAt(index)
    const imageUrl =
      origin?.image ||
      (typeof story.image === 'string' ? story.image : story.image)
    const videoUrl = origin?.video || null
    return {
      id: story.slug,
      kicker: story.client,
      title: story.title,
      copy: story.description,
      image: imageUrl,
      video: videoUrl,
      imageAlt: story.title,
    }
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef(null)

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return undefined

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 8 || isAnimating) return

      setIsAnimating(true)
      setActiveIndex((current) => {
        if (event.deltaY > 0) return (current + 1) % slides.length
        return (current - 1 + slides.length) % slides.length
      })
    }

    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel)
  }, [isAnimating, slides.length])

  useEffect(() => {
    if (!isAnimating) return undefined
    const timer = window.setTimeout(() => setIsAnimating(false), 420)
    return () => window.clearTimeout(timer)
  }, [isAnimating])

  const active = slides[activeIndex]
  const showVideo = active.video && isVideoUrl(active.video)

  return (
    <section
      className="relative flex min-h-[72vh] w-full items-center overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 md:p-10"
      ref={carouselRef}
    >
      <div aria-live="polite" className="w-full">
        <article key={active.id} className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {active.kicker}
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              {active.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              {active.copy}
            </p>
          </div>
          {showVideo ? (
            <video
              key={active.video}
              src={active.video}
              className="h-full min-h-[280px] w-full rounded-xl border border-white/10 object-cover shadow-2xl shadow-cyan-950/50"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          ) : active.image ? (
            <img
              src={active.image}
              className="h-full min-h-[280px] w-full rounded-xl border border-white/10 object-cover shadow-2xl shadow-cyan-950/50"
              alt={active.imageAlt}
            />
          ) : (
            <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-white/10 bg-slate-800/50 text-slate-500">
              No media
            </div>
          )}
        </article>
      </div>

      <div className="absolute bottom-5 right-5 flex gap-2" aria-hidden="true">
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === activeIndex ? 'bg-cyan-300' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
