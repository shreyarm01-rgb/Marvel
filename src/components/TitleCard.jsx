import React from "react";
import { Star } from "lucide-react";
import { PHASES, TYPE_LABEL } from "../data/marvelData.js";

export function TitleCard({ item, onOpen, isGrid = false }) {
  const phase = PHASES.find((p) => p.id === item.phase) || PHASES[0];
  const upcoming = item.status === "upcoming";
  const airing = item.status === "airing";

  return (
    <button
      className={`mcv-card group ${
        isGrid ? "w-full min-w-full max-w-full flex-1" : "w-[275px] min-w-[275px] max-w-[275px] shrink-0"
      } ${upcoming ? "opacity-88 border-dashed" : "opacity-100 border-solid"}`}
      onClick={() => onOpen(item)}
      style={{
        "--card-phase-color": phase.color,
        "--card-phase-dark": phase.dark,
      }}
    >
      <div className="relative overflow-hidden w-full h-[260px] border-b-[3px] border-[var(--ink)]">
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
              className="absolute inset-0 w-full h-full object-fill block z-10 scale-[1.22]"
            />
          )}
          {(upcoming || airing) && (
            <span
              className={`font-bangers absolute top-2 -right-1.5 text-[12px] px-2.5 py-0.5 border-2 border-[var(--ink)] rotate-[6deg] z-20 ${
                airing ? "bg-[var(--yellow)] text-[var(--ink)]" : "bg-[var(--ink)] text-[var(--paper)]"
              }`}
            >
              {airing ? "AIRING NOW" : "UPCOMING"}
            </span>
          )}
          {item.isLoki && (
            <Star
              size={22}
              className="mcv-card-star absolute bottom-2 left-2 z-20"
              fill="var(--yellow)"
              color="var(--ink)"
            />
          )}
        </div>
      </div>
      <div className="p-4 relative w-full flex-1 flex flex-col justify-between">
        <div>
          <p
            className="font-bangers text-[19px] leading-tight mb-2 m-0"
            style={{ color: phase.color }}
          >
            {item.title}
          </p>
          <p
            className="font-kalam text-[18px] font-bold leading-snug mb-3 m-0"
            style={{ color: phase.dark }}
          >
            {item.blurb}
          </p>
        </div>
        <div className="flex items-end justify-between gap-1.5">
          <div>
            <p
              className="text-[12px] font-bold tracking-wider m-0"
              style={{ color: phase.color }}
            >
              {item.date}
            </p>
            <p className="font-fredoka text-[12px] font-semibold tracking-wider text-black uppercase italic mt-0.5 m-0">
              {TYPE_LABEL[item.type]}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
