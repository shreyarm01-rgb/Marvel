import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export function DoomsdayModal({ onClose }) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const target = new Date("2026-12-18T00:00:00");

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function tick() {
      const now = new Date();
      let diff = target - now;
      if (diff < 0) diff = 0;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    }

    tick();
    const interval = setInterval(tick, 1000);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 bg-[rgba(13,18,16,0.88)] backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="doomsday-modal-title"
    >
      <div
        className="relative w-full max-w-[540px] max-h-[96vh] overflow-hidden rounded-lg border-[4px] border-[#0d1210] shadow-[8px_8px_0_#0d1210] bg-[#10732A] text-[#f4ecd8] font-fredoka flex flex-col items-center justify-between pt-4 px-4 sm:pt-5 sm:px-5 md:pt-6 md:px-6 pb-0 select-none"
        style={{
          background:
            "radial-gradient(120% 95% at 50% 15%, #147c30 0%, #10732A 55%, #084017 100%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-50 bg-[#f2c14e] text-[#0d1210] border-[2px] border-[#0d1210] p-1 rounded-full hover:bg-[#c1272d] hover:text-[#f4ecd8] cursor-pointer shadow-[2px_2px_0_#0d1210] transition-all transform hover:scale-110 active:scale-95"
        >
          <X size={20} strokeWidth={3} />
        </button>

        {/* Halftone Overlay */}
        <div
          className="absolute -top-[60px] left-1/2 -translate-x-1/2 w-[800px] max-w-[180vw] h-[450px] pointer-events-none z-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(#f2c14e 2.4px, transparent 2.6px)",
            backgroundSize: "16px 16px",
            maskImage: "radial-gradient(ellipse 50% 50% at 50% 35%, black 40%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 35%, black 40%, transparent 72%)",
          }}
        />

        {/* Caution Tape Banner */}
        <div
          className="absolute top-[65px] sm:top-[75px] -left-[12%] w-[124%] h-[30px] sm:h-[38px] pointer-events-none z-10 opacity-90 -rotate-[3.2deg] shadow-[0_4px_0_rgba(0,0,0,0.35)]"
          style={{
            background: "repeating-linear-gradient(-45deg, #f2c14e 0 22px, #0d1210 22px 44px)",
          }}
        />

        {/* Eyebrow */}
        <div className="relative z-20 font-fredoka font-bold tracking-[0.28em] text-[10px] sm:text-[12px] text-[#f2c14e] uppercase mt-1 [text-shadow:0_2px_0_rgba(0,0,0,0.6)]">
          Marvel Studios
        </div>

        {/* Title */}
        <h1
          id="doomsday-modal-title"
          className="relative z-20 font-bangers font-normal tracking-[0.02em] text-[30px] sm:text-[46px] md:text-[58px] leading-[0.95] text-center text-[#f4ecd8] mt-1 px-2 [text-shadow:3px_3px_0_#0d1210,-2px_-2px_0_#0d1210,2px_-2px_0_#0d1210,-2px_2px_0_#0d1210,0_8px_18px_rgba(0,0,0,0.55)]"
        >
          DAYS TO <span className="text-[#36E58F] [text-shadow:3px_3px_0_#0d1210,-2px_-2px_0_#0d1210,2px_-2px_0_#0d1210,-2px_2px_0_#0d1210,0_0_20px_rgba(54,229,143,0.55),0_8px_18px_rgba(0,0,0,0.55)]">DOOMSDAY</span>
        </h1>

        {/* Subtitle */}
        

        {/* Countdown Grid */}
        <div className="relative z-20 flex gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 flex-nowrap shrink-0">
          {/* Days */}
          <div className="relative w-[58px] sm:w-[76px] md:w-[92px] bg-[#f4ecd8] border-[3px] border-[#0d1210] rounded-md py-1.5 sm:py-2 px-1 text-center shadow-[4px_4px_0_#0d1210] -rotate-[2.5deg]">
            <span className="font-bangers text-[26px] sm:text-[36px] md:text-[44px] text-[#10732A] leading-none block tracking-wide">
              {timeLeft.days}
            </span>
            <span className="block mt-0.5 font-fredoka font-semibold text-[9px] sm:text-[11px] tracking-[0.12em] uppercase text-[#c1272d]">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="relative w-[58px] sm:w-[76px] md:w-[92px] bg-[#f4ecd8] border-[3px] border-[#0d1210] rounded-md py-1.5 sm:py-2 px-1 text-center shadow-[4px_4px_0_#0d1210] rotate-[1.6deg]">
            <span className="font-bangers text-[26px] sm:text-[36px] md:text-[44px] text-[#10732A] leading-none block tracking-wide">
              {timeLeft.hours}
            </span>
            <span className="block mt-0.5 font-fredoka font-semibold text-[9px] sm:text-[11px] tracking-[0.12em] uppercase text-[#c1272d]">
              Hrs
            </span>
          </div>

          {/* Minutes */}
          <div className="relative w-[58px] sm:w-[76px] md:w-[92px] bg-[#f4ecd8] border-[3px] border-[#0d1210] rounded-md py-1.5 sm:py-2 px-1 text-center shadow-[4px_4px_0_#0d1210] -rotate-[1.4deg]">
            <span className="font-bangers text-[26px] sm:text-[36px] md:text-[44px] text-[#10732A] leading-none block tracking-wide">
              {timeLeft.minutes}
            </span>
            <span className="block mt-0.5 font-fredoka font-semibold text-[9px] sm:text-[11px] tracking-[0.12em] uppercase text-[#c1272d]">
              Min
            </span>
          </div>

          {/* Seconds */}
          <div className="relative w-[58px] sm:w-[76px] md:w-[92px] bg-[#f4ecd8] border-[3px] border-[#0d1210] rounded-md py-1.5 sm:py-2 px-1 text-center shadow-[4px_4px_0_#0d1210] rotate-[2.2deg] animate-pulse">
            <span className="font-bangers text-[26px] sm:text-[36px] md:text-[44px] text-[#10732A] leading-none block tracking-wide">
              {timeLeft.seconds}
            </span>
            <span className="block mt-0.5 font-fredoka font-semibold text-[9px] sm:text-[11px] tracking-[0.12em] uppercase text-[#c1272d]">
              Sec
            </span>
          </div>
        </div>

        {/* Poster Image */}
        <div className="relative z-10 w-[calc(100%+2rem)] sm:w-[calc(100%+2.5rem)] md:w-[calc(100%+3rem)] -mx-4 sm:-mx-5 md:-mx-6 mt-0.5 sm:mt-1 flex items-end justify-center shrink-0 pointer-events-none p-0 leading-none">
          <img
            src="/images/poster.png"
            alt="Avengers: Doomsday Poster"
            className="w-full h-auto opacity-[0.99] drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] m-0 p-0 block"
          />
        </div>

        {/* Footer Note */}

      </div>
    </div>
  );
}
