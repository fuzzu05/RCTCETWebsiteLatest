import { magazines } from "../data/magazines";

export const Magazine = () => {
  // Duplicate array multiple times for a seamless infinite scroll on wide screens
  const scrollItems = [...magazines, ...magazines, ...magazines, ...magazines, ...magazines, ...magazines];

  return (
    <section className="py-20 bg-transparent dark:bg-[#0c111c] transition-colors duration-500 overflow-hidden relative">
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }
          .marquee-container {
            display: flex;
            width: max-content;
            animation: scroll-left 40s linear infinite;
          }
          .marquee-container:hover {
            animation-play-state: paused;
          }
          .perspective-1000 {
            perspective: 1000px;
          }
          .rotate-y-12 {
            transform: rotateY(12deg);
          }
        `}
      </style>

      <div className="relative z-10 text-center mb-16 px-6 pt-4">
        <h1 className="text-4xl md:text-5xl lg:text-5xl leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tighter drop-shadow-sm select-none uppercase">
          The Rotaract Library
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted text-lg">
          A curated archive of our journals and stories.
        </p>
      </div>

      <div className="marquee-container gap-8 px-4 py-8 relative z-10">
        {scrollItems.map((mag, idx) => (
          <div
            key={`${mag.id}-${idx}`}
            className="
              group
              w-[280px] sm:w-[320px] shrink-0
              bg-white/70 dark:bg-card/80
              backdrop-blur-md
              rounded-[2rem]
              shadow-sm dark:shadow-black/40
              hover:shadow-card-light-hover hover:shadow-primary/20
              hover:-translate-y-4 hover:rotate-2
              transition-all duration-500 ease-out
              border border-stone-200/60 dark:border-white/5
            "
          >
            <div className="relative aspect-[3/4] p-5 rounded-t-[2rem] overflow-hidden bg-primary/5 dark:bg-card/40">
              <img
                src={mag.cover}
                alt={mag.title}
                loading="lazy"
                decoding="async"
                className="
                  w-full h-full
                  object-contain
                  rounded-[1.5rem]
                  transition-transform duration-700 ease-out
                  group-hover:scale-110
                  drop-shadow-xl
                "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            </div>

            <div className="px-6 pb-8 text-center relative z-10 -mt-6">
              <span className="inline-block px-3 py-1 bg-card rounded-full border border-primary/15 dark:border-white/5 shadow-sm text-xs font-bold text-primary tracking-widest mb-3">
                {mag.year}
              </span>

              <h2 className="mt-1 text-xl font-bold text-foreground">
                {mag.title}
              </h2>

              <p className="text-sm text-muted mt-2 h-10 line-clamp-2">
                {mag.tagline}
              </p>

              <a
                href={mag.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-8 py-3 bg-card dark:bg-card border border-primary/30 dark:border-white/5 rounded-full text-sm font-bold text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform group-hover:scale-105"
              >
                Open Volume 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};