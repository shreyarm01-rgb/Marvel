import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { PHASES, T, TYPE_LABEL } from "../data/marvelData.js";

function NavSearch({ onOpen, closeMobileMenu }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setQuery("");
      setIsOpen(false);
    }
  };

  const filtered = query.trim()
    ? T.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.blurb.toLowerCase().includes(query.toLowerCase()) ||
          (item.type && item.type.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSelectItem = (item) => {
    setQuery("");
    setIsOpen(false);
    if (closeMobileMenu) closeMobileMenu();
    if (onOpen) onOpen(item);
    else navigate(`/article/${item.id}`);
  };

  return (
    <div ref={searchRef} className="relative w-full md:w-[360px]">
      <div className="relative flex items-center">
        <Search
          size={16}
          className="absolute left-2.5 text-[var(--ink)] pointer-events-none z-10 opacity-70"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies and titles..."
          className="w-full bg-[var(--paper)] text-[var(--ink)] placeholder-[rgba(24,19,14,0.55)] font-fredoka text-[14px] font-normal italic pl-8 pr-7 py-1.5 border-[2px] border-[var(--paper)] focus:outline-none focus:border-[var(--yellow)] transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-2 text-[var(--ink)] opacity-70 hover:opacity-100 cursor-pointer p-0.5 bg-transparent border-none"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="mcv-search-dropdown absolute top-[calc(100%+6px)] left-0 right-0 w-full bg-[var(--paper)] border-[3px] border-[var(--ink)] shadow-[6px_6px_0_var(--ink)] z-100 max-h-[380px] overflow-y-auto p-2">
          <div className="px-2 py-1 border-b border-[rgba(24,19,14,0.15)] mb-1 flex items-center justify-between">
            <span className="font-bangers text-[13px] text-[var(--red)] tracking-wider">
              SEARCH RESULTS ({filtered.length})
            </span>
            <span className="text-[11px] font-fredoka opacity-60">ESC to close</span>
          </div>

          {filtered.length > 0 ? (
            <div className="flex flex-col gap-1">
              {filtered.map((item) => {
                const phaseObj = PHASES.find((p) => p.id === item.phase);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className="flex items-center gap-3 w-full p-2 text-left bg-transparent hover:bg-[rgba(24,19,14,0.08)] border-b border-dashed border-[rgba(24,19,14,0.15)] last:border-none cursor-pointer transition-colors"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-12 object-cover border border-[var(--ink)] shrink-0 shadow-[1px_1px_0_var(--ink)]"
                      />
                    ) : (
                      <div
                        className="w-10 h-12 shrink-0 border border-[var(--ink)] flex items-center justify-center font-bangers text-[12px] text-[var(--paper)] shadow-[1px_1px_0_var(--ink)]"
                        style={{ background: phaseObj?.color || "var(--ink)" }}
                      >
                        MCU
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-fredoka font-medium text-[14px] text-[var(--ink)] truncate m-0 leading-tight">
                          {item.title}
                        </p>
                        <span
                          className="font-bangers text-[10px] px-1.5 py-0.5 text-[var(--paper)] shrink-0"
                          style={{ background: phaseObj?.color || "var(--ink)" }}
                        >
                          {TYPE_LABEL[item.type] || item.type}
                        </span>
                      </div>
                      <p className="font-fredoka text-[12px] italic text-[rgba(24,19,14,0.7)] truncate m-0 mt-0.5">
                        {item.blurb}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] font-bold opacity-60">
                        <span>{phaseObj ? phaseObj.name : `Phase ${item.phase}`}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="font-bangers text-[16px] text-[var(--ink)] m-0">NO HEROES OR SAGAS FOUND</p>
              <p className="font-fredoka text-[13px] italic opacity-70 m-0 mt-1">
                Try searching for "Iron Man", "Loki", "Avengers", or "Phase 3"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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
                  className={`mcv-mega-item flex items-center justify-between gap-2 w-full text-left bg-transparent border-none py-2 px-4 cursor-pointer font-fredoka ${
                    isDesktop ? "border-b border-dashed border-[rgba(24,19,14,0.2)] text-[var(--ink)] opacity-100 hover:bg-[rgba(24,19,14,0.06)]" : "border-none text-[var(--paper)] opacity-85"
                  }`}
                >
                  <span className="text-[16px] font-medium italic">
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
      <div className="w-full max-w-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            aria-label="Go to home page"
            className="bg-[var(--red)] border-[3px] border-[var(--paper)] px-3 py-1 sm:px-4 sm:py-1 -skew-x-[8deg] cursor-pointer shadow-[3px_3px_0_var(--paper)] transition-transform duration-200 hover:scale-105"
          >
            <span className="font-bangers inline-block skew-x-[8deg] text-[var(--paper)] text-[22px] sm:text-[29px] italic leading-none">
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

        <div className="hidden md:block">
          <NavSearch onOpen={onOpen} />
        </div>

        <button
          className="flex md:hidden bg-transparent border-none text-[var(--paper)] cursor-pointer p-1.5 hover:text-[var(--yellow)] transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="block md:hidden px-4 sm:px-6 pt-2.5 pb-5 border-t border-[rgba(235,224,196,0.2)] max-h-[82vh] overflow-y-auto">
          <div className="mb-3">
            <NavSearch onOpen={onOpen} closeMobileMenu={() => setOpen(false)} />
          </div>
          <div className="flex flex-wrap gap-2.5 mb-2">
            <button
              className="mcv-navlink text-[17px] py-1 px-2"
              onClick={() => { navigate("/"); setOpen(false); }}
            >
              HOME
            </button>
          </div>
          <p className="font-bangers text-[var(--yellow)] text-[16px] my-2 border-t border-[rgba(235,224,196,0.15)] pt-2">
            BLOG & CHRONICLES
          </p>
          <BlogMegaMenu onOpen={onOpen} closeMenu={() => setOpen(false)} variant="mobile" />
        </div>
      )}
    </header>
  );
}

