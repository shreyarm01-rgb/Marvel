import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--ink)] text-[var(--paper)] py-7 px-8 border-t-5 border-[var(--red)]">
      <div className="w-full max-w-full text-center">
        <p className="font-bangers text-[17px] m-0 opacity-85">
          NOT AFFILIATED WITH MARVEL STUDIOS — FAN-MADE TIMELINE
        </p>
        <p className="text-[12px] mt-1.5 m-0 opacity-60">
          All Marvel characters, titles & related marks are ™ & © Marvel Entertainment. Designed in retro comic pop art style.
        </p>
      </div>
    </footer>
  );
}
