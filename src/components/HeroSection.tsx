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
      className="relative min-h-screen flex items-center pt-28 sm:pt-32 lg:pt-24"
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-14 lg:gap-4">
          {/* ================================
              TEXT CONTENT
              ================================ */}
          <div
            className="
              flex-1 w-full
              flex flex-col
              items-center lg:items-start
              text-center lg:text-right
              gap-7 sm:gap-8 lg:gap-9
            "
          >
            {/* Main Headline */}
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-[3.4rem]
                font-extrabold
                leading-[1.35]
                text-foreground
                opacity-0
                max-w-2xl
              "
              style={{
                animation: "fade-in-up 0.8s ease-out 0.3s forwards",
              }}
            >
              أثرك البيئي يبدأ
              <br />
              <span className="text-eco-600 inline-block mt-2 sm:mt-3">
                من عاداتك اليومية
              </span>
            </h1>

            {/* Sub-caption */}
            <p
              className="
                text-base
                sm:text-lg
                md:text-xl
                text-gray-500
                max-w-lg
                leading-[1.9]
                font-normal
                opacity-0
              "
              style={{
                animation: "fade-in-up 0.8s ease-out 0.6s forwards",
              }}
            >
              كل كيلومتر تقطعه، كل وجبة تتناولها، وكل كيلوواط تستهلكه يترك بصمة
              على كوكبنا. اكتشف أثرك البيئي وابدأ بالتغيير اليوم.
            </p>

            {/* CTA */}
            <div
              className="opacity-0"
              style={{
                animation: "fade-in-up 0.8s ease-out 0.9s forwards",
              }}
            >
              <a
                href="#calculator"
                className="
                  inline-flex items-center gap-3
                  bg-eco-600 hover:bg-eco-700
                  text-white
                  text-base sm:text-lg
                  font-bold
                  px-7 sm:px-8
                  py-3.5 sm:py-4
                  rounded-2xl
                  shadow-glow hover:shadow-glow-lg
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5
                  group
                "
              >
                <span>جرّب الآن</span>

                <svg
                  className="
                    w-5 h-5
                    transition-transform duration-300
                    group-hover:-translate-x-1
                    rtl:group-hover:translate-x-1
                  "
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

            {/* Quick stats */}
            <div
              className="
                flex flex-wrap
                justify-center lg:justify-start
                gap-2.5 sm:gap-3
                mt-1
                max-w-xl
                opacity-0
              "
              style={{
                animation: "fade-in-up 0.8s ease-out 1.2s forwards",
              }}
            >
              <span className="inline-flex items-center gap-1.5 bg-eco-50 text-eco-700 text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-1.5 rounded-full border border-eco-100">
                🚗 المواصلات
              </span>

              <span className="inline-flex items-center gap-1.5 bg-eco-50 text-eco-700 text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-1.5 rounded-full border border-eco-100">
                ⚡ الطاقة
              </span>

              <span className="inline-flex items-center gap-1.5 bg-eco-50 text-eco-700 text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-1.5 rounded-full border border-eco-100">
                🍽️ الغذاء
              </span>

              <span className="inline-flex items-center gap-1.5 bg-eco-50 text-eco-700 text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-1.5 rounded-full border border-eco-100">
                🛍️ الاستهلاك
              </span>
            </div>
          </div>

          {/* ================================
              MR. CARBO
              ================================ */}
          <div
            className="
              relative
              flex-1
              w-full
              flex items-center justify-center
              lg:justify-end
              overflow-visible
            "
          >
            <div
              className={`
                relative
                flex items-center justify-center
                transition-all duration-1000 ease-out

                /* No shift on mobile — only nudge right once there's room */
                sm:translate-x-2
                md:translate-x-4
                lg:translate-x-8
                xl:translate-x-12

                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
              style={{
                animation: isVisible
                  ? "float 4s ease-in-out infinite 1.5s"
                  : "none",
              }}
            >
              {/* Mr. Carbo */}
              <button
                onClick={cycleFact}
                className="
                  cursor-pointer
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-eco-500
                  rounded-3xl
                  group
                  relative
                  z-10
                "
                aria-label="انقر لنصيحة بيئية جديدة"
              >
                <div
                  className="
                    relative
                    w-[230px]
                    sm:w-[280px]
                    md:w-[330px]
                    lg:w-[380px]
                    xl:w-[420px]
                  "
                >
                  <Image
                    src="/mrCarbo.png"
                    alt="مستر كاربو - دليلك لحياة أقل كربوناً"
                    width={420}
                    height={520}
                    priority
                    sizes="
                      (max-width: 640px) 230px,
                      (max-width: 768px) 280px,
                      (max-width: 1024px) 330px,
                      (max-width: 1280px) 380px,
                      420px
                    "
                    className="
                      w-full
                      h-auto
                      drop-shadow-2xl
                      group-hover:scale-[1.02]
                      transition-transform duration-300
                    "
                  />
                </div>
              </button>

              {/* ================================
                  SPEECH BUBBLE
                  ================================ */}
              <div
                className={`
                  absolute
                  z-20

                  /* Mobile: stay centered above Mr. Carbo, capped at the viewport width */
                  -top-10
                  left-1/2
                  -translate-x-1/2
                  w-[85vw]
                  max-w-[240px]

                  /* sm and up: switch to the RTL upper-left offset, no vw dependency */
                  sm:left-auto
                  sm:translate-x-0
                  sm:right-[40%]
                  sm:-top-8
                  sm:w-[280px]
                  sm:max-w-none

                  lg:-top-6
                  lg:right-[60%]
                  lg:w-72

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

                  {/* Bubble arrow */}
                  <div
                    className="
                      absolute
                      -bottom-2.5
                      left-1/2 -translate-x-1/2
                      sm:left-auto sm:translate-x-0
                      sm:right-8
                      right-8
                      w-5 h-5
                      bg-white
                      border-b border-r border-eco-100
                      rotate-45
                    "
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
