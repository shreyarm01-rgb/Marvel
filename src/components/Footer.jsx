import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--ink)] text-[var(--paper)] py-5 sm:py-7 px-4 sm:px-8 border-t-4 sm:border-t-5 border-[var(--red)]">
      <div className="w-full max-w-full text-center">
        <p className="font-bangers text-[15px] sm:text-[17px] m-0 opacity-85 tracking-wide">
          NOT AFFILIATED WITH MARVEL STUDIOS — FAN-MADE TIMELINE
        </p>
        <p className="text-[11px] sm:text-[12px] mt-1 sm:mt-1.5 m-0 opacity-60">
          All Marvel characters, titles & related marks are ™ & © Marvel Entertainment. Designed in retro comic pop art style.
        </p>
      </div>
    </footer>
  );
}
