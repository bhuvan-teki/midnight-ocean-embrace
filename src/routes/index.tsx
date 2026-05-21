import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, X } from "lucide-react";

const STORY_PARAGRAPHS = [
  "Hyderabad, India to Sogod, Cebu — We are 4,968 kilometres apart.",
  "There are 8.2 billion people on this planet, spread across 195 countries and infinite timelines. And somehow, out of all of it, on a random website on a Thursday morning [10 / 07 / 2025], you didn't skip.",
  "I was in India, and you were in Sogod. We were separated by different oceans, different time zones, and honestly, entirely different worlds. But here we are, 316 days later, and the physical distance hasn't moved me a single inch away from you.",
  "Happy 19th, Laddu. The probability of us meeting was exactly 0.0000001%, but I would beat those odds a billion times for you.",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A message for you" },
      { name: "description", content: "Bhuvy sent you something..." },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Italianno&family=Jost:wght@200;300&family=Inter:wght@200;300&display=swap",
      },
    ],
  }),
  component: CinematicExperience,
});

type Scene = 1 | 2;

function CinematicExperience() {
  const [scene, setScene] = useState<Scene>(1);
  const [mapOpen, setMapOpen] = useState(false);
  const [storyStarted, setStoryStarted] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overflow = prev;
    };
  }, []);

  // Preload + try autoplay on both videos immediately
  useEffect(() => {
    [video1Ref.current, video2Ref.current].forEach((v) => {
      if (!v) return;
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    });
  }, []);

  // Sync browser back/forward with scenes
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const s = (e.state && e.state.scene) || 1;
      setScene(s === 2 ? 2 : 1);
    };
    window.history.replaceState({ scene: 1 }, "");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const goToScene2 = () => {
    window.history.pushState({ scene: 2 }, "", "#scene2");
    setScene(2);
    const v = video2Ref.current;
    if (v) {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  const goToScene1 = () => {
    setStoryStarted(false);
    setMapOpen(false);
    if (window.history.state?.scene === 2) {
      window.history.back();
    } else {
      setScene(1);
    }
  };

  // Trigger story reveal 1.5s after entering scene 2
  useEffect(() => {
    if (scene !== 2) {
      setStoryStarted(false);
      return;
    }
    const t = setTimeout(() => setStoryStarted(true), 1500);
    return () => clearTimeout(t);
  }, [scene]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!mapOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMapOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mapOpen]);

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white select-none">
      {/* Scene 1 */}
      <section
        aria-hidden={scene !== 1}
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: scene === 1 ? 1 : 0,
          pointerEvents: scene === 1 ? "auto" : "none",
        }}
      >
        <video
          ref={video1Ref}
          src="/videos/loveuladduladingpagevideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Soft dark overlay with deep blue tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03060f]/70 via-[#04132b]/55 to-[#020615]/85" />

        {/* Bottom-right glowing message */}
        <button
          onClick={goToScene2}
          className="group absolute bottom-8 right-6 sm:bottom-12 sm:right-12 text-right outline-none"
          style={{ fontFamily: "'Italianno', cursive" }}
        >
          <span
            className="block text-4xl sm:text-6xl md:text-7xl leading-none tracking-wide text-white/95 transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-[0.98]"
            style={{
              textShadow:
                "0 0 12px rgba(173, 200, 255, 0.55), 0 0 30px rgba(110, 160, 255, 0.45), 0 0 60px rgba(70, 120, 220, 0.35)",
              animation: "softGlow 3.2s ease-in-out infinite",
            }}
          >
            Bhuvy sent you something...
          </span>
        </button>
      </section>

      {/* Scene 2 */}
      <section
        aria-hidden={scene !== 2}
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: scene === 2 ? 1 : 0,
          pointerEvents: scene === 2 ? "auto" : "none",
        }}
      >
        <video
          ref={video2Ref}
          src="/videos/beachbg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Cinematic dark blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02061a]/75 via-[#03102e]/55 to-[#01030f]/90" />

        {/* Back button */}
        <button
          onClick={goToScene1}
          aria-label="Go back"
          className="absolute top-5 left-5 sm:top-7 sm:left-7 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm ring-1 ring-white/15 text-white/90 transition hover:bg-white/10 hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Content: map + story */}
        <div className="relative z-10 h-full w-full overflow-hidden px-5 pt-20 pb-8 sm:px-10 sm:pt-24 sm:pb-12">
          <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
            {/* Floating map image — click to open */}
            <button
              type="button"
              onClick={() => setMapOpen(true)}
              aria-label="View map full size"
              className="group relative shrink-0 w-[55vw] max-w-[240px] sm:w-[30vw] sm:max-w-[300px] aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              style={{
                boxShadow:
                  "0 20px 60px -10px rgba(0, 8, 30, 0.85), 0 8px 24px -8px rgba(40, 80, 160, 0.4)",
                animation: "floatY 6s ease-in-out infinite",
              }}
            >
              <img
                src="/images/mapphind.jpeg"
                alt="Map from Hyderabad to Sogod, Cebu"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#02061a]/40 to-transparent" />
            </button>

            {/* Story text — constrained to top-right area beside the map */}
            <StoryTypingAnimation 
              paragraphs={STORY_PARAGRAPHS} 
              started={storyStarted} 
              onComplete={() => setTypingFinished(true)} 
            />

          </div>
          
          </div>

          {/* --- HORIZONTAL DIVIDER UNDERNEATH MAP & TEXT --- */}
          <div 
            className={`h-px w-full bg-white/30 rounded-full mt-6 shrink-0 transition-opacity duration-1000 delay-300 ${typingFinished ? "opacity-100" : "opacity-0"}`} 
          />

          {/* --- JOURNEY HEADING --- */}
          <h2
            className={`w-full text-center mt-12 mb-6 text-4xl sm:text-5xl md:text-6xl text-white/95 transition-all duration-1000 delay-700 ${typingFinished ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              fontFamily: "'Black Mango', serif",
              textShadow: "0 0 15px rgba(173, 200, 255, 0.4), 0 0 30px rgba(110, 160, 255, 0.2)",
            }}
          >
            How It All Started...
          </h2>
          
        </div>
      </section>

      {/* Map Lightbox */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-300"
        style={{
          opacity: mapOpen ? 1 : 0,
          pointerEvents: mapOpen ? "auto" : "none",
        }}
        onClick={() => setMapOpen(false)}
      >
        <button
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            setMapOpen(false);
          }}
          className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 text-white/90 transition hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
        <img
          src="/images/mapphind.jpeg"
          alt="Map full size"
          onClick={(e) => e.stopPropagation()}
          className="max-h-[92vh] max-w-[94vw] rounded-xl object-contain shadow-2xl"
          draggable={false}
          style={{
            transform: mapOpen ? "scale(1)" : "scale(0.96)",
            transition: "transform 300ms ease-out",
          }}
        />
      </div>

      <style>{`
        @font-face {
          font-family: 'Black Mango';
          src: url('/fonts/blackmango.ttf') format('truetype');
        }

        @keyframes softGlow {
          0%, 100% { filter: brightness(1); text-shadow: 0 0 12px rgba(173,200,255,0.5), 0 0 30px rgba(110,160,255,0.4), 0 0 60px rgba(70,120,220,0.3); }
          50% { filter: brightness(1.1); text-shadow: 0 0 18px rgba(190,215,255,0.75), 0 0 42px rgba(130,180,255,0.55), 0 0 80px rgba(90,140,230,0.45); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes lineReveal {
          0% { opacity: 0; filter: blur(6px); transform: translateY(8px); }
          60% { opacity: 0.9; filter: blur(1px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        html, body, #root { height: 100%; overscroll-behavior: none; }
      `}</style>
    </main>
    );
}

   function StoryTypingAnimation({ paragraphs, started, onComplete }: { paragraphs: string[], started: boolean, onComplete?: () => void }) {
  const [completedParagraphs, setCompletedParagraphs] = useState<string[]>([]);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (!started) {
      setCompletedParagraphs([]);
      setCurrentParagraphIndex(0);
      setCurrentText("");
      return;
    }

    if (currentParagraphIndex >= paragraphs.length) {
      if (onComplete) onComplete();
      return;
    }

    const fullText = paragraphs[currentParagraphIndex];

    if (currentText.length < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, 30); // Speed of typing (30ms per letter)
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCompletedParagraphs((prev) => [...prev, fullText]);
        setCurrentText("");
        setCurrentParagraphIndex((prev) => prev + 1);
      }, 600); // Small pause before starting the next paragraph
      return () => clearTimeout(timer);
    }
  }, [started, currentText, currentParagraphIndex, paragraphs]);

  const isFinished = currentParagraphIndex >= paragraphs.length;

  return (
    <div
      className="flex-1 w-full min-w-0 self-start max-h-[55vh] sm:max-h-[60vh] overflow-y-auto pr-1 text-white/90"
      style={{
        fontFamily: "'Plateau', 'Jost', 'Inter', system-ui, sans-serif",
        fontWeight: 200,
        letterSpacing: "0.015em",
      }}
    >
      {/* Renders paragraphs that are completely typed */}
      {completedParagraphs.map((p, i) => (
        <p key={i} className="mb-4 text-[14px] sm:text-[15px] md:text-base leading-relaxed sm:leading-[1.7]" style={{ textShadow: "0 1px 12px rgba(0, 10, 30, 0.6)" }}>
          {p}
        </p>
      ))}
      
      {/* Renders the current paragraph with the blinking block cursor */}
      {started && !isFinished && (
        <p className="mb-4 text-[14px] sm:text-[15px] md:text-base leading-relaxed sm:leading-[1.7]" style={{ textShadow: "0 1px 12px rgba(0, 10, 30, 0.6)" }}>
          {currentText}
          <span className="animate-pulse ml-1 text-white">▌</span>
        </p>
      )}
    </div>
  );
}
