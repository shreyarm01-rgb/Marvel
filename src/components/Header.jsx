import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { PHASES, T } from "../data/marvelData.js";

function BlogMegaMenu({ onOpen, variant = "desktop", closeMenu }) {
  const [expanded, setExpanded] = useState(1);
  const isDesktop = variant === "desktop";
  const navigate = useNavigate();

  const handleOpenItem = (item) => {
    if (onOpen) onOpen(item);
    if (closeMenu) closeMenu();
    navigate(`/article/${item.id}`);
  };

  const handleGoBlog = () => {
    if (closeMenu) closeMenu();
    navigate("/blog");
  };

  return (
    <div
      className={
        isDesktop
          ? "w-[680px] max-w-[calc(100vw-40px)] bg-[var(--paper)] border-[3px] border-[var(--ink)] shadow-[6px_6px_0_var(--ink)] p-4 absolute top-[calc(100%+10px)] left-0 z-100 grid grid-cols-[200px_1fr] gap-4"
          : "w-full bg-transparent p-0 block mt-3"
      }
    >
      <div className="flex flex-col gap-1.5">
        <button
          onClick={handleGoBlog}
          className="mcv-btn w-full text-[14px] py-2 px-3 mb-1.5 bg-[var(--red)] text-[var(--paper)]"
        >
          ALL BLOGS CASES ➔
        </button>
        {PHASES.map((p) => (
          <button
            key={p.id}
            onClick={() => setExpanded(p.id)}
            className="text-left flex items-center justify-between w-full border-none py-2.5 px-4 cursor-pointer font-bangers text-[15px] tracking-wide"
            style={{
              background: expanded === p.id ? p.color : isDesktop ? "var(--paper)" : "transparent",
              color: isDesktop ? (expanded === p.id ? "var(--paper)" : "var(--ink)") : "var(--paper)",
            }}
          >
            {p.name.toUpperCase()} <span>{expanded === p.id ? "▴" : "▾"}</span>
          </button>
        ))}
      </div>

      <div
        className={
          isDesktop
            ? "max-h-[360px] overflow-y-auto pr-1.5 mt-0"
            : "max-h-none overflow-y-visible pr-0 mt-3"
        }
      >
        {PHASES.map((p) => (
          <div key={p.id} className={expanded === p.id ? "block" : "hidden"}>
            <p
              className="font-bangers m-0 mb-2.5 text-[16px] border-b-2 pb-1"
              style={{
                color: p.color,
                borderColor: p.color,
              }}
            >
              {p.name.toUpperCase()} — {p.tag.toUpperCase()}
            </p>
            <div>
              {T.filter((t) => t.phase === p.id).map((it) => (
                <button
                  key={it.id}
                  onClick={() => handleOpenItem(it)}
                  className={`mcv-mega-item flex items-center justify-between gap-2 w-full text-left bg-transparent border-none py-2 px-4 cursor-pointer font-comic ${
                    isDesktop ? "border-b border-dashed border-[rgba(24,19,14,0.2)] text-[var(--ink)] opacity-100 hover:bg-[rgba(24,19,14,0.06)]" : "border-none text-[var(--paper)] opacity-85"
                  }`}
                >
                  <span className="text-[16px] font-bold italic">
                    {it.title}{it.isLoki ? (it.id === 26 ? " (S1)" : " (S2)") : ""}
                  </span>
                  {isDesktop && (
                    <span className="text-[14px] italic opacity-65 whitespace-nowrap">
                      {it.date}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Header({ onOpen }) {
  const [open, setOpen] = useState(false);
  const [blogMenuOpen, setBlogMenuOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setBlogMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="bg-[var(--ink)] border-b-[4px] border-[var(--ink)] sticky top-0 z-50 w-full">
      <div className="w-full max-w-full px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            aria-label="Go to home page"
            className="bg-[var(--red)] border-[3px] border-[var(--paper)] px-4 py-1 -skew-x-[8deg] cursor-pointer shadow-[3px_3px_0_var(--paper)] transition-transform duration-200 hover:scale-105"
          >
            <span className="font-bangers inline-block skew-x-[8deg] text-[var(--paper)] text-[29px] italic">
              MARVEL
            </span>
          </button>

          <div ref={navRef} className="hidden md:flex items-center gap-1.5 relative">
            <button
              className="mcv-navlink"
              onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              HOME
            </button>
            <div className="relative">
              <button
                className="mcv-navlink"
                onClick={() => setBlogMenuOpen((o) => !o)}
                aria-expanded={blogMenuOpen}
              >
                BLOG ▾
              </button>
              {blogMenuOpen && (
                <BlogMegaMenu
                  onOpen={onOpen}
                  closeMenu={() => setBlogMenuOpen(false)}
                />
              )}
            </div>
          </div>
        </div>

        <button
          className="flex md:hidden bg-transparent border-none text-[var(--paper)] cursor-pointer p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="block md:hidden px-6 pt-2 pb-4 border-t border-[rgba(235,224,196,0.2)]">
          <div className="flex flex-wrap gap-2.5 mb-1.5">
            <button
              className="mcv-navlink"
              onClick={() => { navigate("/"); setOpen(false); }}
            >
              HOME
            </button>
          </div>
          <p className="font-bangers text-[var(--yellow)] text-[15px] my-1.5">BLOG</p>
          <BlogMegaMenu onOpen={onOpen} closeMenu={() => setOpen(false)} variant="mobile" />
        </div>
      )}
    </header>
  );
}
