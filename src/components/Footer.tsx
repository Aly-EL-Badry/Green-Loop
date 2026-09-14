export default function Footer() {
  return (
    <footer id="contact" className="relative bg-eco-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="white"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                opacity="0.3"
              />
              <path
                d="M20 8C20 8 28 14 28 22C28 26 24 30 20 30C16 30 12 26 12 22C12 18 16 14 20 14"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="rgba(255,255,255,0.08)"
              />
            </svg>
            <span className="font-bold text-lg">Green Loop</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/50 font-medium">
            © {new Date().getFullYear()} Green-Loop — حلقة الاستدامة الخضراء.
            جميع الحقوق محفوظة.
          </p>

          {/* Contact links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@greenloop.sa"
              className="text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
