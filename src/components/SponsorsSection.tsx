"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative py-24 md:py-32 overflow-hidden bg-eco-100/60 z-10"
    >
      {/* Section Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header & Thank You Message */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-eco-200/80 text-eco-700 text-sm font-semibold mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-eco-500 animate-pulse" />
            <span>صُنّاع الحدث وشركاء النجاح</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
            شكراً لمن منحنا <span className="text-eco-600">هذه الفرصة</span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            نتقدم بخالص الشكر والتقدير إلى صُنّاع هذا الحدث والجهات الكريمة
            الراعية على إتاحة هذه الفرصة القيمة وثقتهم ودعمهم المتواصل لنشر
            الوعي البيئي وتحقيق مستقبل أكثر خضرة واستدامة.
          </p>
        </div>

        {/* Event Makers Logos Showcase */}
        <div
          className={`relative group max-w-5xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-eco-300/40 via-eco-400/40 to-eco-500/40 opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500" />

          {/* Main Card Container */}
          <div className="relative bg-white/95 backdrop-blur-md rounded-3xl border border-eco-200/90 p-6 sm:p-10 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center">
            {/* Logos Image Banner */}
            <div className="w-full flex items-center justify-center py-2 sm:py-4">
              <Image
                src="/eventmakers.png"
                alt="صناع الحدث ورعاة المبادرة"
                width={1800}
                height={360}
                className="w-full h-auto max-h-[140px] sm:max-h-[180px] md:max-h-[220px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
            </div>

            {/* Highlights / Badges */}
            <div className="mt-8 pt-6 border-t border-eco-100 w-full flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-eco-500" />
                رعاية علمية وبحثية رائدة
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-eco-200 hidden sm:block" />
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-eco-500" />
                دعم الابتكار والوعي المناخي
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-eco-200 hidden sm:block" />
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-eco-500" />
                معاً لتقليل البصمة الكربونية
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
