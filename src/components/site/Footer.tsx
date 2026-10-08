import { Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl tracking-wide">
            DFW <span className="text-accent">SPORTS</span> PHOTOGRAPHY
          </div>
          <p className="mt-3 text-white/70 max-w-xs">
            Capturing every play, every huddle, every moment. Youth sports photography in the Dallas–Fort Worth metroplex.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg tracking-wider text-accent">Explore</h4>
          <ul className="mt-3 space-y-2">
            <li><a href="#gallery" className="hover:text-accent">Gallery</a></li>
            <li><a href="#pricing" className="hover:text-accent">Pricing</a></li>
            <li><a href="#faq" className="hover:text-accent">FAQ</a></li>
            <li><a href="#book" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg tracking-wider text-accent">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-white/80">
            <li className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> Dallas–Fort Worth, TX</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-accent" /> contact@dfwsportsphotography.com</li>
            <li className="flex items-center gap-2"><Instagram size={16} className="text-accent" /> @dfwsportsphotography</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-white/50 flex justify-between">
          <span>© {new Date().getFullYear()} DFW Sports Photography</span>
          <span>Made with heart in DFW</span>
        </div>
      </div>
    </footer>
  );
}
