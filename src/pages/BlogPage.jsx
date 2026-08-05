import React, { useRef } from "react";
import { PHASES, T } from "../data/marvelData.js";
import { TitleCard } from "../components/TitleCard.jsx";

export function BlogPage({ onOpen }) {
  const blogPhaseRefs = useRef({});
  const jump = (id) => blogPhaseRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="py-10 px-8 pb-15 w-full max-w-full">
      <div className="mb-6.5 text-center">
        <h1 className="font-bangers text-[52px] my-0 mb-1.5">
          THE DISPATCH
        </h1>
        <p className="font-kalam text-[20px] m-0 font-bold">
          Issue write-ups for every film and series, sorted phase by phase.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 mb-9">
        {PHASES.map((p) => (
          <button
            key={p.id}
            onClick={() => jump(p.id)}
            className="mcv-btn text-[15px] px-4 py-2 text-[var(--paper)]"
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
          className="mb-12 scroll-mt-22 w-full"
        >
          <div className="flex items-center gap-3 pb-2.5 border-b-[3px] border-[var(--ink)] mb-5">
            <span
              className="font-bangers text-[var(--paper)] px-3 py-1 text-[20px] border-2 border-[var(--ink)]"
              style={{ background: phase.color }}
            >
              {phase.name.toUpperCase()}
            </span>
            <span className="font-kalam text-[16px] font-bold">{phase.tag}</span>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5.5 w-full">
            {T.filter((t) => t.phase === phase.id).map((item) => (
              <TitleCard item={item} onOpen={onOpen} key={item.id} isGrid={true} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
