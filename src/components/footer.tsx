const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="h-24 flex items-center justify-center text-sm text-on-background">
      © {year} Dylan Roussel. Made with caffeine, crafted with care.
    </footer>
  )
}
