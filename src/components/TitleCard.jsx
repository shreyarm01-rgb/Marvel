import React from "react";
import { Star } from "lucide-react";
import { PHASES, TYPE_LABEL } from "../data/marvelData.js";

export function TitleCard({ item, onOpen, isGrid = false }) {
  const phase = PHASES.find((p) => p.id === item.phase) || PHASES[0];
  const upcoming = item.status === "upcoming";
  const airing = item.status === "airing";

  return (
    <button
      className={`mcv-card snap-start group ${
        isGrid
          ? "w-full max-w-[200px] sm:max-w-[215px] mx-auto min-w-0"
          : "w-[160px] xs:w-[175px] sm:w-[195px] md:w-[210px] max-w-[210px] min-w-[160px] xs:min-w-[175px] sm:min-w-[195px] md:min-w-[210px] shrink-0"
      } ${upcoming ? "opacity-88 border-dashed" : "opacity-100 border-solid"}`}
      onClick={() => onOpen(item)}
      style={{
        "--card-phase-color": phase.color,
        "--card-phase-dark": phase.dark,
      }}
    >
      <div className="relative overflow-hidden w-full aspect-[3/4] max-h-[250px] border-b-[3px] border-[var(--ink)]">
        <div
          className="mcv-card-header-inner w-full h-full flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(155deg, ${phase.color}, ${phase.dark})`,
          }}
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover object-top block z-10"
            />
          )}
          {(upcoming || airing) && (
            <span
              className={`font-bangers absolute top-1.5 -right-1 text-[9px] sm:text-[10px] px-1.5 py-0.5 border border-[var(--ink)] sm:border-2 rotate-[6deg] z-20 ${
                airing ? "bg-[var(--yellow)] text-[var(--ink)]" : "bg-[var(--ink)] text-[var(--paper)]"
              }`}
            >
              {airing ? "AIRING NOW" : "UPCOMING"}
            </span>
          )}
          {item.isLoki && (
            <Star
              size={16}
              className="mcv-card-star absolute bottom-1.5 left-1.5 z-20 sm:w-[18px] sm:h-[18px]"
              fill="var(--yellow)"
              color="var(--ink)"
            />
          )}
        </div>
      </div>
      <div className="p-2 sm:p-2.5 relative w-full flex-1 flex flex-col justify-between">
        <div>
          <p
            className="font-bangers text-[14px] sm:text-[16px] leading-tight mb-1 m-0"
            style={{ color: phase.color }}
          >
            {item.title}
          </p>
          <p
            className="font-kalam text-[12px] sm:text-[14px] font-bold leading-snug mb-1.5 sm:mb-2 m-0 line-clamp-2"
            style={{ color: phase.dark }}
          >
            {item.blurb}
          </p>
        </div>
        <div className="flex items-end justify-between gap-1">
          <div>
            <p
              className="text-[9px] sm:text-[10px] font-bold tracking-wider m-0"
              style={{ color: phase.color }}
            >
              {item.date}
            </p>
            <p className="font-fredoka text-[9px] sm:text-[10px] font-semibold tracking-wider text-black uppercase italic mt-0.5 m-0">
              {TYPE_LABEL[item.type]}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
