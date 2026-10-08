import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur border-b border-white/10 text-white">
      <div className="w-full px-6 h-16 flex items-center gap-6">
        <a href="/#top" className="display-italic text-xl whitespace-nowrap" onClick={() => setOpen(false)}>
          DFW <span className="text-accent">SPORTS</span> PHOTOGRAPHY
        </a>

        <nav className="hidden lg:flex items-center gap-6 lg:gap-8 ml-auto">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-display text-sm tracking-widest whitespace-nowrap hover:text-accent transition-colors"
            >
              {n.label}
            </a>
          ))}
          <a
            href="/#book"
            className="font-display text-sm tracking-widest whitespace-nowrap border border-accent text-accent px-5 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            BOOK SESSION
          </a>
        </nav>
        <button
          className="lg:hidden p-2 ml-auto"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-white/10 bg-ink">
          <div className="flex flex-col p-4 gap-2">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="font-display text-lg tracking-widest py-2"
              >
                {n.label}
              </a>
            ))}
            <a
              href="/#book"
              onClick={() => setOpen(false)}
              className="font-display text-lg tracking-widest border border-accent text-accent px-4 py-2 text-center mt-2"
            >
              BOOK SESSION
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
