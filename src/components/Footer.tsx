import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 pt-20 pb-12 border-t border-[var(--border-color)]">
      <div className="flex flex-col md:flex-row justify-between gap-16 mb-24">
        {/* Left CTA */}
        <div className="flex-[1.2] min-w-[320px]">
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-medium tracking-tight leading-[1.1] text-[var(--text-main)]">
            My Latest Scoop.<br/>
            <span className="text-[var(--text-muted)]">Right Into Your Inbox.</span>
          </h2>
        </div>

        {/* Right Links Grid */}
        <div className="flex-[1.8] grid grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <h4 className="font-medium text-[1.05rem] text-[var(--text-main)] mb-2">Navigate</h4>
            <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">Home</Link>
            <Link href="/#about-section" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">About</Link>
            <Link href="/works" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">Case Studies</Link>
            <Link href="/blog" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">Blog</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-medium text-[1.05rem] text-[var(--text-main)] mb-2">Connect</h4>
            <Link href="/contact" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">Book a call</Link>
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">Instagram</a>
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">LinkedIn</a>
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">Twitter</a>
          </div>
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1 mt-4 md:mt-0 items-center md:items-start">
            <h4 className="font-medium text-[1.05rem] text-[var(--text-main)] mb-2">Legal</h4>
            <Link href="/privacypolicy" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">Privacy Policy</Link>
            <Link href="/termsofservice" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">Terms of Service</Link>
            <Link href="/cookiepolicy" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[1.05rem] cursor-none">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[var(--border-color)] pt-8 text-center text-[var(--text-muted)] text-[0.95rem]">
        <p>&copy; 2026 Gaurav Raj Singh. Crafted with purpose.</p>
      </div>
    </footer>
  );
}