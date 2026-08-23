function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - Developed by <a href="https://github.com/IcaroMatheusz" target="_blank" rel="noopener noreferrer" className="underline">icaromatheusz</a>
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
