function Footer() {
  return (
    <footer className="w-full bg-[#F8F9FA] border-t border-gray-100 py-8 px-8 font-inter">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold tracking-widest text-slate-500 uppercase">
        <div>© 2026 SHORTLINK. THE DIGITAL ARCHITECT.</div>

        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <a
            href="#"
            className="hover:text-slate-800 transition-colors duration-200"
          >
            PRIVACY POLICY
          </a>
          <a
            href="#"
            className="hover:text-slate-800 transition-colors duration-200"
          >
            TERMS OF SERVICE
          </a>
          <a
            href="#"
            className="hover:text-slate-800 transition-colors duration-200"
          >
            API DOCUMENTATION
          </a>
          <a
            href="#"
            className="hover:text-slate-800 transition-colors duration-200"
          >
            SUPPORT
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
