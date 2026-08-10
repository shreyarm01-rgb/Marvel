import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { PHASES, T } from "../data/marvelData.js";
import { TitleCard } from "../components/TitleCard.jsx";

function Hero({ goPhase }) {
  const [muted, setMuted] = useState(true);
  return (
    <section
      className="relative overflow-hidden py-8 px-4 sm:py-15 sm:px-8 w-full bg-[var(--red)] border-b-[5px] border-[var(--ink)]"
      style={{
        background: "repeating-conic-gradient(from 0deg, var(--yellow) 0deg 4deg, transparent 4deg 12deg)",
        backgroundColor: "var(--red)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(235,224,196,0.9)_0%,rgba(196,35,43,0.15)_42%,transparent_60%)]" />

      <div className="w-full max-w-full mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-9">
          <h1 className="font-bangers text-[clamp(28px,7.5vw,96px)] text-[var(--paper)] leading-none m-0 [text-shadow:4px_4px_0_var(--ink)] sm:[text-shadow:6px_6px_0_var(--ink)] [-webkit-text-stroke:1.5px_var(--ink)] sm:[-webkit-text-stroke:3px_var(--ink)]">
            MARVEL CINEMATIC UNIVERSE
          </h1>
          <p className="font-kalam text-[var(--ink)] text-[16px] sm:text-[22px] mt-2 sm:mt-3">
            An Unofficial Fan Chronicle
          </p>
        </div>

        <div className="w-full sm:w-[90%] md:w-[85%] mx-auto bg-[var(--ink)] p-1.5 sm:p-2.5 border-[3px] border-[var(--ink)] relative shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
          <div className="relative aspect-video bg-[#0c0a08] border-2 border-[var(--paper-2)] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(232,182,47,0.12)_0_2px,transparent_2px_26px)] pointer-events-none z-10" />
            <video
              autoPlay
              muted={muted}
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/marvel-theme.mp4" type="video/mp4" />
            </video>
            <button
              onClick={() => setMuted((m) => !m)}
              className="mcv-btn absolute bottom-2 right-2 sm:bottom-3.5 sm:right-3.5 z-20 text-[12px] sm:text-[14px] py-1 px-2.5 sm:py-2 sm:px-4"
            >
              {muted ? "UNMUTE 🔊" : "MUTE 🔇"}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            className="mcv-phase-tab font-bangers text-[16px] sm:text-[19px] py-2 px-4 sm:py-2.5 sm:px-6 italic"
            style={{ "--phase-tab-color": "var(--red)" }}
            onClick={() => goPhase(1)}
          >
            START AT PHASE ONE <ChevronRight size={18} className="inline align-[-2px] sm:w-[20px] sm:h-[20px]" />
          </button>

          <div className="flex flex-col items-center justify-center gap-2 mt-0.5">
            <div className="bg-[var(--paper)] border border-solid border-[var(--ink)] px-2 py-0.5 inline-block">
              <span className="font-bangers text-[var(--ink)] text-[11px] font-bold tracking-wider leading-none block">
                OR
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 px-2">
            {PHASES.filter((p) => p.id !== 1).map((p) => (
              <button
                key={p.id}
                onClick={() => goPhase(p.id)}
                className="mcv-phase-tab text-[13px] sm:text-[16px] py-1 px-2.5 sm:py-2 sm:px-4"
                style={{
                  "--phase-tab-color": p.color,
                }}
              >
                {p.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseRow({ phase, items, onOpen, sectionRef, isFirst }) {
  return (
    <div
      ref={sectionRef}
      className={`mb-8 sm:mb-13 scroll-mt-20 sm:scroll-mt-22 relative ${isFirst ? "mt-[32px] sm:mt-[56px]" : "mt-[16px] sm:mt-[20px]"}`}
    >
      <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-8 mb-3 sm:mb-4 flex-wrap">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <div
            className="text-[var(--paper)] px-3 py-1 sm:px-4 sm:py-1.5 border-[3px] border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] -rotate-[2deg] cursor-pointer"
            style={{ background: phase.color }}
          >
            <p className="font-bangers text-[var(--paper)] text-[22px] sm:text-[30px] m-0 leading-none">
              {phase.name.toUpperCase()}
            </p>
          </div>
          <div>
            <p className="font-kalam m-0 text-[17px] sm:text-[22px] font-bold leading-tight">{phase.tag}</p>
            <p className="m-0 text-[11px] sm:text-[13px] font-bold opacity-70 leading-tight">{phase.years}</p>
          </div>
        </div>
      </div>

      <div className="mcv-scrollrow snap-x snap-mandatory flex gap-4 sm:gap-6 overflow-x-auto py-2 sm:py-3 px-4 sm:px-8 pb-5 sm:pb-7 w-full max-w-full relative">
        {items.map((item, idx) => (
          <React.Fragment key={item.id}>
            <TitleCard item={item} onOpen={onOpen} isGrid={false} />
            {idx < items.length - 1 && (
              <div
                aria-hidden
                className="shrink-0 w-[24px] sm:w-[34px] self-center border-t-[3px] border-dashed border-[var(--ink)] opacity-50"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function HomePage({ onOpen, phaseRefs }) {
  const goPhase = (id) => {
    phaseRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <Hero goPhase={goPhase} />
      <section className="w-full pb-8">
        {PHASES.map((phase, idx) => (
          <PhaseRow
            key={phase.id}
            phase={phase}
            items={T.filter((t) => t.phase === phase.id)}
            onOpen={onOpen}
            sectionRef={(el) => (phaseRefs.current[phase.id] = el)}
            isFirst={idx === 0}
          />
        ))}
      </section>
    </main>
  );
}
