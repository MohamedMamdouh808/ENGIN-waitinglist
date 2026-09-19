export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-line py-8">
      <div className="container-engin flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
        <span>© {year} ENGIN — Describe it. Build it. Ship it.</span>
        <nav aria-label="Footer" className="flex gap-4 font-mono">
          <a href="#how-it-works" className="hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            How it works
          </a>
          <a href="#faq" className="hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            FAQ
          </a>
          <a href="mailto:hello@engin.dev" className="hover:text-fg">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
