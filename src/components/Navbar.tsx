"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";

const navLinks = [
  { name: "Works", path: "/works" },
  { name: "CV", path: "/cv", tooltip: "Not available yet" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="sticky top-6 z-50 mb-20 w-full max-w-[1200px] mx-auto md:px-0">
      <nav className="flex justify-between items-center px-4 py-3 bg-[var(--nav-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-400">
        
        {/* Left: Logo & Tabs */}
        <div className="flex items-center gap-6">
          <Magnetic>
            <Link href="/">
                <img 
                src="/images/logo.svg" 
                alt="Gaurav Logo" 
                className="w-11 h-11 rounded-full object-cover border border-[var(--border-color)] bg-[var(--surface-color)] hover:scale-105 transition-transform" 
                />
            </Link>
          </Magnetic>

          <Link href="/" className="md:hidden font-semibold text-lg tracking-tight">
            Gaurav
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.path}
                    className={`px-5 py-2.5 rounded-full text-[0.95rem] font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--nav-tab-active-bg)] text-[var(--nav-tab-active-text)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--hover-bg)]"
                    } ${link.name === "CV" ? "group-hover:text-red-500 group-hover:bg-red-500/10" : ""}`}
                  >
                    {link.name}
                  </Link>
                  {link.tooltip && (
                    <span className="absolute top-[130%] left-1/2 -translate-x-1/2 translate-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--text-main)] px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-md transition-all duration-300 pointer-events-none">
                      {link.tooltip}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Theme Toggle & Mobile Menu Btn */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Magnetic>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-2 px-5 py-2.5 border border-[var(--border-color)] rounded-full font-medium text-[0.95rem] hover:bg-[var(--hover-bg)] hover:-translate-y-[1px] transition-all"
              >
                {mounted && theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                <span>Theme</span>
              </button>
            </Magnetic>
          </div>

          <button
            className="md:hidden w-11 h-11 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-[calc(100%+0.8rem)] right-0 w-full bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[20px] shadow-xl p-3 flex flex-col gap-1 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl font-medium flex justify-between items-center transition-colors ${
                pathname === link.path
                  ? "bg-[var(--hover-bg)] text-[var(--text-main)] font-semibold"
                  : "text-[var(--text-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-main)]"
              }`}
            >
              {link.name}
              {link.tooltip && <span className="text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded-full">{link.tooltip}</span>}
            </Link>
          ))}
          <div className="h-[1px] bg-[var(--border-color)] my-2" />
          <button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setMobileMenuOpen(false);
            }}
            className="px-4 py-3 rounded-xl font-medium text-[var(--text-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-main)] flex justify-between items-center"
          >
            Toggle Theme
            {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      )}
    </div>
  );
}