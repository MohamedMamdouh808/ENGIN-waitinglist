export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} ENGIN</span>
        <span className="font-mono">Describe it. Specify it. Compile it. Ship it.</span>
      </div>
    </footer>
  );
}
