import { useEffect, useMemo, useState } from 'react';

export default function InstagramServiceGallery({
  images = [],
  title = 'Service gallery',
  accentColor = '#0d9488',
  showStack = true,
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleStack = useMemo(
    () => (images.length ? [0, 1, 2].map((offset) => images[(activeIndex + offset) % images.length]) : []),
    [activeIndex, images]
  );
  const captionId = `gallery-caption-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  useEffect(() => {
    setActiveIndex((current) => (images.length ? Math.min(current, images.length - 1) : 0));
  }, [images.length]);

  if (!images.length) return null;

  const activeImage = images[activeIndex];

  const showNextImage = () => setActiveIndex((current) => (current + 1) % images.length);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showNextImage();
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + images.length) % images.length);
    }
  };

  return (
    <div className={`rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-4 ${className}`}>
      <button
        type="button"
        onClick={showNextImage}
        onKeyDown={handleKeyDown}
        className="group relative block w-full overflow-visible rounded-2xl text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-100"
        style={{ aspectRatio: '16 / 9' }}
        aria-describedby={captionId}
        aria-label={`Show next ${title} image`}
      >
        {/* Stack layers behind */}
        {showStack && visibleStack.slice(1).reverse().map((image, stackIndex) => {
          const depth = stackIndex + 1;
          return (
            <div
              key={`${image.src}-${activeIndex}-${depth}`}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-white shadow-lg transition-all duration-500 ease-out"
              style={{
                transform: `translate(${depth * 8}px, ${depth * 8}px) scale(${1 - depth * 0.04})`,
                opacity: 0.35 - depth * 0.08,
                zIndex: depth,
                background: '#0f172a',
              }}
            >
              <img
                src={image.src}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-contain"
                style={{ background: '#0f172a' }}
              />
            </div>
          );
        })}

        {/* Active image */}
        <div
          key={activeImage.src}
          className="absolute inset-0 z-10 overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-shadow duration-500 ease-out animate-[galleryFadeIn_420ms_ease-out] group-hover:shadow-[0_24px_56px_rgba(15,23,42,0.28)]"
          style={{ background: '#0f172a' }}
        >
          <img
            src={activeImage.src}
            alt={activeImage.alt || activeImage.caption}
            className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ background: '#0f172a' }}
          />

          {/* Progress bars */}
          <div className="absolute left-3 top-3 flex gap-1.5">
            {images.map((image, index) => (
              <span
                key={`${image.src}-story-${index}`}
                className="h-1 w-8 rounded-full bg-white/30 shadow-sm"
              >
                <span
                  className="block h-full rounded-full bg-white transition-all duration-300"
                  style={{ width: index <= activeIndex ? '100%' : '0%' }}
                />
              </span>
            ))}
          </div>

          {/* Counter */}
          <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-gray-700 shadow-sm backdrop-blur">
            {activeIndex + 1}/{images.length}
          </div>
        </div>
      </button>

      {/* Caption + dot nav */}
      <div className="mt-4 px-1">
        <p
          id={captionId}
          className="min-h-[2.5rem] text-sm font-bold leading-snug text-charcoal sm:text-base"
          aria-live="polite"
        >
          {activeImage.caption}
        </p>
        <div className="mt-3 flex gap-1.5">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100"
              aria-label={`Show gallery image ${index + 1}`}
            >
              <span
                className="block h-full rounded-full transition-all duration-300"
                style={{
                  width: index === activeIndex ? '100%' : '0%',
                  background: accentColor,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
