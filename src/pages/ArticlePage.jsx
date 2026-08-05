import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PHASES, TYPE_LABEL, T } from "../data/marvelData.js";
import { TitleCard } from "../components/TitleCard.jsx";

function RelatedCarousel({ phase, onOpen }) {
  const scrollRef = useRef(null);
  const items = T.filter((t) => t.phase === phase.id);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-11 w-full">
      <div className="flex items-center justify-between border-b-[3px] border-[var(--ink)] pb-2 mb-4">
        <div className="font-oswald font-bold text-[20px] tracking-widest uppercase">
          RELATED DISPATCHES IN {phase.name.toUpperCase()} ({items.length} ISSUES)
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="mcv-btn px-3 py-1 text-[14px] bg-[var(--paper)] text-[var(--ink)]"
            aria-label="Scroll left"
          >
            ◄
          </button>
          <button
            onClick={() => scroll(1)}
            className="mcv-btn px-3 py-1 text-[14px] bg-[var(--paper)] text-[var(--ink)]"
            aria-label="Scroll right"
          >
            ►
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mcv-scrollrow flex gap-6 overflow-x-auto py-3 px-1.5 pb-7 w-full max-w-full relative scroll-smooth"
      >
        {items.map((item, idx) => (
          <React.Fragment key={item.id}>
            <TitleCard item={item} onOpen={onOpen} isGrid={false} />
            {idx < items.length - 1 && (
              <div
                aria-hidden
                className="shrink-0 w-[34px] self-center border-t-[3px] border-dashed border-[var(--ink)] opacity-50"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function ArticlePage({ onOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const itemId = parseInt(id, 10);
  const item = T.find((t) => t.id === itemId) || T[0];
  const phase = PHASES.find((p) => p.id === item.phase) || PHASES[0];

  const handleBack = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenItem = (newItem) => {
    if (onOpen) onOpen(newItem);
    navigate(`/article/${newItem.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full max-w-full py-4 px-6 pb-16">
      <div className="w-full max-w-[1180px] mx-auto">
        {/* MASTHEAD */}
        <div className="border-t-[6px] border-b-[3px] border-[var(--ink)] py-4 pb-3 mb-5 w-full">
          <div className="flex items-center justify-center relative gap-5">
            <div
              className="absolute left-0 shrink-0 w-[86px] h-[86px] rounded-full border-[3px] border-[var(--ink)] text-[var(--paper)] flex flex-col items-center justify-center font-bangers leading-none -rotate-[8deg] shadow-[3px_3px_0_var(--ink)]"
              style={{ background: phase.color }}
            >
              <span className="text-[14px] tracking-wider">PHASE</span>
              <span className="text-[34px]">0{item.phase}</span>
            </div>
            <div className="text-center mx-auto">
              <h1 className="font-bangers text-[clamp(40px,7vw,82px)] tracking-widest text-[var(--ink)] m-0 leading-none [text-shadow:2.5px_2.5px_0_var(--yellow)]">
                THE MULTIVERSE HERALD
              </h1>
              <div
                className="font-oswald text-[12px] tracking-[4px] uppercase mt-1.5 font-semibold"
                style={{ color: phase.dark }}
              >
                Sacred Timeline Dispatch · Est. Phase One
              </div>
            </div>
          </div>
        </div>

        {/* KICKER & HEADLINE - CENTERED */}
        <div className="flex items-center justify-center gap-3.5 flex-wrap my-6 mb-3.5">
          <span
            className="inline-block font-oswald font-bold text-[12px] tracking-widest uppercase text-[var(--paper)] py-1.25 px-3.5 -skew-x-[8deg]"
            style={{ background: phase.color }}
          >
            <span className="inline-block skew-x-[8deg]">
              {TYPE_LABEL[item.type]} Desk · {item.title}
            </span>
          </span>
          <span
            className="font-oswald font-semibold text-[12px] tracking-widest uppercase border-l-[3px] border-[var(--ink)] pl-3"
            style={{ color: phase.dark }}
          >
            {item.date} Edition
          </span>
        </div>

        <h1 className="font-bangers text-[clamp(34px,5.5vw,62px)] leading-tight tracking-wide my-0 mb-4 text-[var(--ink)] text-center">
          {item.title.toUpperCase()}: <span className="text-[var(--paper)] bg-[var(--ink)] px-2.5">{item.blurb.toUpperCase()}</span>
        </h1>

        <div className="font-oswald text-[13px] tracking-widest uppercase text-[#4a3b2c] border-y-2 border-[var(--ink)] py-2 mb-8 flex items-center justify-center flex-wrap gap-x-4.5 gap-y-1.5">
          <span>By <b style={{ color: phase.color }}>The Herald Fan Desk</b></span>
          <span>·</span>
          <span>5 min read</span>
          <span>·</span>
          <span>Filed under {phase.name}</span>
        </div>

        {/* HERO ROW */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6.5 mb-7.5">
          <div>
            <div className="relative border-4 border-[var(--ink)] shadow-[7px_7px_0_var(--ink)] -rotate-[2deg] bg-[var(--ink)] overflow-hidden">
              <div
                className="aspect-[3/4] w-full relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${phase.color}, ${phase.dark})` }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-fill scale-[1.15]"
                  />
                ) : (
                  <div className="font-bangers absolute inset-0 flex items-center justify-center text-[var(--yellow)] text-[22px] p-5 text-center">
                    {item.title}
                  </div>
                )}
              </div>
              <div className="bg-[var(--yellow)] border-t-4 border-[var(--ink)] font-oswald font-semibold text-[11px] tracking-widest uppercase text-center text-[var(--ink)] py-1.75 px-1.5">
                FIG. 1 — OFFICIAL {item.type.toUpperCase()} CHRONICLE
              </div>
            </div>
          </div>

          {/* Lead Story */}
          <div className="font-fredoka text-[17px] leading-relaxed text-black">
            <p className="mcv-dropcap mb-3.5">
              {item.blurb} As part of Marvel Cinematic Universe's {phase.name} ({phase.years}), {item.title} stands as a pivotal milestone in the sacred continuity.
            </p>
            <p className="m-0">
              {item.isLoki
                ? "After stealing the Tesseract during the events of Avengers: Endgame, Loki is captured by the Time Variance Authority — a bureaucracy policing the sacred timeline. Rather than being erased, Loki is recruited to help hunt a dangerous variant."
                : `Released on ${item.date}, ${item.title} expanded the continuity with unmatched spectacle, character dynamics, and lasting ramifications across the multiverse timeline.`}
            </p>
          </div>
        </div>

        {/* ARTICLE BODY */}
        <article className="font-fredoka text-[16.5px] leading-relaxed text-black mt-6">
          <h2
            className="font-bangers text-[28px] tracking-wide my-0 mt-8 mb-2.5"
            style={{ color: phase.dark }}
          >
            THE NEXUS IMPACT
          </h2>
          <p className="mb-4">
            From the foundational origins of Phase One to the cosmic fractures of Phase Six, every story entry adds another layer of depth to the sacred continuity. {item.title} brought key character moments that resonate throughout subsequent releases.
          </p>

          {/* BURST QUOTE CALLOUT */}
          <blockquote
            className="relative my-7.5 py-5.5 px-6 text-[var(--paper)] border-[3px] border-[var(--ink)] shadow-[6px_6px_0_var(--ink)] rotate-[1deg] font-oswald font-semibold text-[19px] tracking-wide"
            style={{ background: phase.color }}
          >
            <div className="absolute -top-4 -left-4 w-9 h-9 bg-[var(--yellow)] border-[3px] border-[var(--ink)] rounded-full flex items-center justify-center text-[var(--ink)] text-[16px] -rotate-[15deg]">
              ★
            </div>
            "{item.blurb}" — ARCHIVAL RECORD #{item.id}
          </blockquote>

          <h2
            className="font-bangers text-[28px] tracking-wide my-0 mt-8 mb-2.5"
            style={{ color: phase.dark }}
          >
            TIMELINE CONTINUITY NOTES
          </h2>
          <p className="m-0">
            Positioned in {phase.name} ({phase.tag}), this release connects directly with the overarching saga narrative. Explore adjacent titles in Phase {item.phase} to follow the complete viewing order.
          </p>
        </article>

        {/* CTA BUTTON */}
        <div className="my-6 mb-7.5 flex justify-start">
          <button
            onClick={handleBack}
            className="mcv-btn inline-flex items-center gap-1.5 text-[15px] text-[var(--paper)] -rotate-[2deg]"
            style={{ background: phase.color }}
          >
            RETURN TO TIMELINE CHRONICLE ➔
          </button>
        </div>

        {/* RELATED DISPATCHES CAROUSEL */}
        <RelatedCarousel phase={phase} onOpen={handleOpenItem} />
      </div>
    </main>
  );
}
