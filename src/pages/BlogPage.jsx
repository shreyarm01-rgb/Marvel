import React, { useRef } from "react";
import { PHASES, T } from "../data/marvelData.js";
import { TitleCard } from "../components/TitleCard.jsx";

export function BlogPage({ onOpen }) {
  const blogPhaseRefs = useRef({});
  const jump = (id) => blogPhaseRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="py-6 px-4 sm:py-10 sm:px-8 pb-12 sm:pb-15 w-full max-w-full">
      <div className="mb-5 sm:mb-6.5 text-center">
        <h1 className="font-bangers text-[36px] sm:text-[52px] my-0 mb-1 sm:mb-1.5">
          THE DISPATCH
        </h1>
        <p className="font-kalam text-[16px] sm:text-[20px] m-0 font-bold">
          Issue write-ups for every film and series, sorted phase by phase.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 mb-6 sm:mb-9">
        {PHASES.map((p) => (
          <button
            key={p.id}
            onClick={() => jump(p.id)}
            className="mcv-btn text-[13px] sm:text-[15px] px-3 py-1.5 sm:px-4 sm:py-2 text-[var(--paper)]"
            style={{ background: p.color }}
          >
            {p.name.toUpperCase()}
          </button>
        ))}
      </div>

      {PHASES.map((phase) => (
        <section
          key={phase.id}
          ref={(el) => (blogPhaseRefs.current[phase.id] = el)}
          className="mb-8 sm:mb-12 scroll-mt-20 sm:scroll-mt-22 w-full"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 pb-2.5 border-b-[3px] border-[var(--ink)] mb-4 sm:mb-5 flex-wrap">
            <span
              className="font-bangers text-[var(--paper)] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[17px] sm:text-[20px] border-2 border-[var(--ink)]"
              style={{ background: phase.color }}
            >
              {phase.name.toUpperCase()}
            </span>
            <span className="font-kalam text-[14px] sm:text-[16px] font-bold">{phase.tag}</span>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5 sm:gap-4.5 lg:gap-5.5 w-full">
            {T.filter((t) => t.phase === phase.id).map((item) => (
              <TitleCard item={item} onOpen={onOpen} key={item.id} isGrid={true} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
