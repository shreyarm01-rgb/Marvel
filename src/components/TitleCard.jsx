import React from "react";
import { Star } from "lucide-react";
import { PHASES, TYPE_LABEL } from "../data/marvelData.js";

export function TitleCard({ item, onOpen, isGrid = false }) {
  const phase = PHASES.find((p) => p.id === item.phase) || PHASES[0];
  const upcoming = item.status === "upcoming";
  const airing = item.status === "airing";
  const isDoctorStrange =
    item.id === 15 ||
    item.id === 35 ||
    item.title === "Doctor Strange" ||
    item.image?.includes("Dr Strange") ||
    item.title?.toLowerCase().includes("strange") ||
    item.image?.toLowerCase().includes("strange");

  return (
    <button
      className={`mcv-card snap-start group ${
        isGrid ? "w-full min-w-full max-w-full flex-1" : "w-[210px] min-w-[210px] max-w-[210px] sm:w-[225px] sm:min-w-[225px] sm:max-w-[225px] shrink-0"
      } ${upcoming ? "opacity-88 border-dashed" : "opacity-100 border-solid"}`}
      onClick={() => onOpen(item)}
      style={{
        "--card-phase-color": phase.color,
        "--card-phase-dark": phase.dark,
      }}
    >
      <div className="relative overflow-hidden w-full h-[200px] sm:h-[215px] border-b-[3px] border-[var(--ink)] bg-[var(--ink)]">
        <div
          className="mcv-card-header-inner w-full h-full flex items-center justify-center relative overflow-hidden bg-[var(--ink)]"
          style={{
            background: `linear-gradient(155deg, ${phase.color}, ${phase.dark})`,
          }}
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover object-top block z-10 transform-gpu scale-[1.08]"
            />
          )}
          {(upcoming || airing) && (
            <span
              className={`font-bangers absolute top-2 -right-1.5 text-[11px] px-2 py-0.5 border-2 border-[var(--ink)] rotate-[6deg] z-20 ${
                airing ? "bg-[var(--yellow)] text-[var(--ink)]" : "bg-[var(--ink)] text-[var(--paper)]"
              }`}
            >
              {airing ? "AIRING NOW" : "UPCOMING"}
            </span>
          )}
          {item.isLoki && (
            <Star
              size={18}
              className="mcv-card-star absolute bottom-2 left-2 z-20"
              fill="var(--yellow)"
              color="var(--ink)"
            />
          )}
        </div>
      </div>
      <div className="p-2.5 sm:p-3 relative w-full flex-1 flex flex-col justify-between min-h-[105px]">
        <div>
          <p
            className="font-bangers text-[16px] sm:text-[17px] leading-tight mb-1 m-0 line-clamp-1"
            style={{ color: phase.color }}
          >
            {item.title}
          </p>
          <p
            className="font-kalam text-[13.5px] sm:text-[14.5px] font-bold leading-snug mb-1.5 m-0 line-clamp-2"
            style={{ color: phase.dark }}
          >
            {item.blurb}
          </p>
        </div>
        <div className="flex items-end justify-between gap-1 mt-auto">
          <div>
            <p
              className="text-[10.5px] sm:text-[11.5px] font-bold tracking-wider m-0"
              style={{ color: phase.color }}
            >
              {item.date}
            </p>
            <p className="font-fredoka text-[10.5px] font-semibold tracking-wider text-black uppercase italic mt-0.5 m-0">
              {TYPE_LABEL[item.type]}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
