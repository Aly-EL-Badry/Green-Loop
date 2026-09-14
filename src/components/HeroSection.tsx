"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const carboFacts = [
  "مرحباً! أنا مستر كاربو 🌱 هل تعلم أن تغيير وسيلة تنقلك اليومية يمكن أن يوفر مئات الكيلوغرامات من الكربون سنوياً؟",
  "هل تعلم أن السيارة تنتج حوالي 2.3 كجم من CO₂ لكل لتر بنزين؟ جرّب المشي أو الدراجة للمسافات القصيرة! 🚲",
  "وجبة لحم بقري واحدة تنتج 27 كجم من CO₂! التنويع في غذائك يساعد كوكبنا 🌍",
  "إطفاء الأجهزة بدلاً من وضع الاستعداد يوفّر حتى 10% من استهلاك الكهرباء المنزلية! ⚡",
  "زراعة شجرة واحدة تمتص حوالي 22 كجم من CO₂ سنوياً 🌳 ابدأ اليوم!",
];

export default function HeroSection() {
  const [currentFact, setCurrentFact] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    const timer1 = setTimeout(() => setIsVisible(true), 200);
    const timer2 = setTimeout(() => setBubbleVisible(true), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const cycleFact = () => {
    setBubbleVisible(false);
    setTimeout(() => {
      setCurrentFact((prev) => (prev + 1) % carboFacts.length);
      setBubbleVisible(true);
    }, 300);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-32"
    >

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
          {/* ========================================
              Right Side (in RTL = Right visually): Text Content
              ======================================== */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-right gap-10">
            {/* Main Headline */}
            <h1
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-tight text-foreground opacity-0"
              style={{ animation: "fade-in-up 0.8s ease-out 0.3s forwards" }}
            >
              أثرك البيئي يبدأ
              <br />
              <span className="text-eco-600 inline-block mt-3">
                من عاداتك اليومية
              </span>
            </h1>

            {/* Sub-caption */}
            <p
              className="text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed font-normal opacity-0"
              style={{ animation: "fade-in-up 0.8s ease-out 0.6s forwards" }}
            >
              كل كيلومتر تقطعه، كل وجبة تتناولها، وكل كيلوواط تستهلكه يترك
              بصمة على كوكبنا. اكتشف أثرك البيئي وابدأ بالتغيير اليوم.
            </p>

            {/* CTA Button */}
            <div
              className="opacity-0"
              style={{ animation: "fade-in-up 0.8s ease-out 0.9s forwards" }}
            >
              <a
                href="#calculator"
                className="
                  inline-flex items-center gap-3
                  bg-eco-600 hover:bg-eco-700
                  text-white text-lg font-bold
                  px-8 py-4 rounded-2xl
                  shadow-glow hover:shadow-glow-lg
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5
                  group
                "
              >
                <span>جرّب الآن</span>
                {/* Leaf arrow icon */}
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </a>
            </div>

            {/* Quick stats badges */}
            <div
              className="flex flex-wrap gap-3 mt-2 opacity-0"
              style={{ animation: "fade-in-up 0.8s ease-out 1.2s forwards" }}
            >
              <span className="inline-flex items-center gap-1.5 bg-eco-50 text-eco-700 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-eco-100">
                🚗 المواصلات
              </span>
              <span className="inline-flex items-center gap-1.5 bg-eco-50 text-eco-700 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-eco-100">
                ⚡ الطاقة
              </span>
              <span className="inline-flex items-center gap-1.5 bg-eco-50 text-eco-700 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-eco-100">
                🍽️ الغذاء
              </span>
              <span className="inline-flex items-center gap-1.5 bg-eco-50 text-eco-700 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-eco-100">
                🛍️ الاستهلاك
                   
              </span>
            </div>
          </div>

          {/* ========================================
              Left Side (in RTL = Left visually): Mr. Carbo
              ======================================== */}
          <div className="relative flex-1 flex items-center justify-center lg:justify-end">
            {/* Mr. Carbo Image with entrance animation */}
            <div
              className={`relative transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ animation: isVisible ? "float 4s ease-in-out infinite 1.5s" : "none" }}
            >
              <button
                onClick={cycleFact}
                className="cursor-pointer focus:outline-none group relative"
                aria-label="انقر لنصيحة بيئية جديدة"
              >
                <Image
                  src="/mrCarbo.png"
                  alt="مستر كاربو - دليلك لحياة أقل كربوناً"
                  width={420}
                  height={520}
                  priority
                  className="drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-300 relative z-10"
                />
              </button>

              {/* Speech Bubble */}
              <div
                className={`
                  absolute -top-4 right-[60%] lg:right-[70%] z-20
                  max-w-xs w-72
                  transition-all duration-500 ease-out
                  ${
                    bubbleVisible
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-75 translate-y-3"
                  }
                `}
              >
                <div className="relative bg-white rounded-2xl p-4 shadow-lg border border-eco-100">
                  <p className="text-sm leading-relaxed text-eco-900 font-medium">
                    {carboFacts[currentFact]}
                  </p>
                  {/* Arrow pointing to Mr. Carbo's mouth */}
                  <div
                    className="absolute -bottom-2.5 right-8 w-5 h-5 bg-white border-b border-r border-eco-100 transform rotate-45"
                  />
                </div>
                {/* Click hint */}
                <p className="text-[10px] text-eco-400 mt-2 text-center opacity-70">
                  اضغط على مستر كاربو لنصيحة جديدة ☝️
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
