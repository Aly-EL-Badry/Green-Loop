"use client";

import { useRef, useState } from "react";

interface DetailedData {
  transportation: {
    car?: {
      type: "sedan" | "suv" | "electric" | "hybrid";
      distance: number;
      days: number;
    };
    publicTransport?: {
      type: "bus" | "train" | "tram";
      distance: number;
      days: number;
    };
    bike?: {
      distance: number;
      days: number;
    };
    flights?: {
      shortHaul: number; // per year
      longHaul: number; // per year
    };
  };
  electricity: {
    source: "coal" | "gas" | "renewable" | "mixed";
    usage: number; // kWh per day
    heating: "ac" | "electric" | "gas" | "none";
    heatingUsage: number; // therms per month
  };
  food: {
    breakfast: "vegan" | "vegetarian" | "meat";
    lunch: "vegan" | "vegetarian" | "meat";
    dinner: "vegan" | "vegetarian" | "meat";
    dairy: number; // servings per day
    localProduce: boolean;
    organic: boolean;
  };
  consumption: {
    clothing: "minimal" | "moderate" | "frequent";
    electronics: "minimal" | "moderate" | "frequent";
    waste: "recycle-all" | "recycle-most" | "little-recycle";
    waterUsage: "low" | "average" | "high";
  };
}

interface Achievement {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
}

// A fixed "average lifestyle" reference point, used only to judge which
// category is relatively worse for THIS person — not shown to the user.
const BASELINE_DATA: DetailedData = {
  transportation: {
    car: { type: "sedan", distance: 25, days: 5 },
    publicTransport: { type: "bus", distance: 10, days: 2 },
    flights: { shortHaul: 2, longHaul: 1 },
  },
  electricity: {
    source: "mixed",
    usage: 18,
    heating: "ac",
    heatingUsage: 3,
  },
  food: {
    breakfast: "vegetarian",
    lunch: "meat",
    dinner: "meat",
    dairy: 2,
    localProduce: false,
    organic: false,
  },
  consumption: {
    clothing: "moderate",
    electronics: "moderate",
    waste: "recycle-most",
    waterUsage: "average",
  },
};

// Pure calculation — takes any DetailedData so it can score both the
// user's current answers and the fixed baseline above.
function calculateDetailedEmissions(data: DetailedData) {
  let total = 0;
  const breakdown: Record<string, number> = {};

  // Transportation
  let transportTotal = 0;

  // Cars
  if (data.transportation.car) {
    const carEmissions: Record<string, number> = {
      sedan: 0.21,
      suv: 0.28,
      electric: 0.05,
      hybrid: 0.12,
    };
    const carKg =
      (data.transportation.car.distance *
        carEmissions[data.transportation.car.type] *
        data.transportation.car.days) /
      7;
    transportTotal += carKg;
  }

  // Public transport
  if (data.transportation.publicTransport) {
    const ptEmissions: Record<string, number> = {
      bus: 0.089,
      train: 0.041,
      tram: 0.035,
    };
    const ptKg =
      (data.transportation.publicTransport.distance *
        ptEmissions[data.transportation.publicTransport.type] *
        data.transportation.publicTransport.days) /
      7;
    transportTotal += ptKg;
  }

  // Flights (per year, convert to daily)
  if (data.transportation.flights) {
    const flightKg =
      (data.transportation.flights.shortHaul * 0.18 +
        data.transportation.flights.longHaul * 0.75) /
      365;
    transportTotal += flightKg;
  }

  breakdown.transportation = transportTotal;
  total += transportTotal;

  // Electricity & Heating
  let energyTotal = 0;

  const sourceEmissions: Record<string, number> = {
    coal: 1.0,
    gas: 0.5,
    renewable: 0.02,
    mixed: 0.4,
  };
  const electricityKg =
    data.electricity.usage * sourceEmissions[data.electricity.source];
  energyTotal += electricityKg;

  // Heating / Cooling
  if (
    data.electricity.heating === "ac" ||
    data.electricity.heating === "electric"
  ) {
    energyTotal += (data.electricity.heatingUsage * 5.3) / 30; // kWh equivalent
  } else if (data.electricity.heating === "gas") {
    energyTotal += (data.electricity.heatingUsage * 1.89) / 30; // gas to kg CO2
  }

  breakdown.energy = energyTotal;
  total += energyTotal;

  // Food
  let foodTotal = 0;

  const mealEmissions: Record<string, number> = {
    vegan: 1.5,
    vegetarian: 2.5,
    meat: 5.0,
  };

  foodTotal +=
    mealEmissions[data.food.breakfast] +
    mealEmissions[data.food.lunch] +
    mealEmissions[data.food.dinner];

  // Dairy
  foodTotal += data.food.dairy * 1.2;

  // Bonuses
  if (data.food.localProduce) foodTotal *= 0.85;
  if (data.food.organic) foodTotal *= 0.9;

  breakdown.food = foodTotal;
  total += foodTotal;

  // Consumption
  let consumptionTotal = 0;

  const clothingEmissions: Record<string, number> = {
    minimal: 1.0,
    moderate: 3.5,
    frequent: 7.0,
  };
  consumptionTotal += clothingEmissions[data.consumption.clothing];

  const electronicsEmissions: Record<string, number> = {
    minimal: 0.5,
    moderate: 2.0,
    frequent: 5.0,
  };
  consumptionTotal += electronicsEmissions[data.consumption.electronics];

  const wasteEmissions: Record<string, number> = {
    "recycle-all": 1.0,
    "recycle-most": 2.5,
    "little-recycle": 5.0,
  };
  consumptionTotal += wasteEmissions[data.consumption.waste];

  const waterEmissions: Record<string, number> = {
    low: 0.5,
    average: 1.5,
    high: 3.0,
  };
  consumptionTotal += waterEmissions[data.consumption.waterUsage];

  breakdown.consumption = consumptionTotal;
  total += consumptionTotal;

  return {
    total: parseFloat(total.toFixed(2)),
    breakdown,
  };
}

const BASELINE_EMISSIONS = calculateDetailedEmissions(BASELINE_DATA);

// Reference ceiling (kg CO2/day) used only to scale the result into a
// 0-100% bar and a Low/Medium/High label.
const SCALE_MAX = 50;

function getFootprintLevel(percentage: number) {
  if (percentage < 40) {
    return {
      label: "منخفض",
      badgeClass: "bg-eco-100 text-eco-700",
      gradient: "from-eco-500 to-eco-700",
    };
  }
  if (percentage < 70) {
    return {
      label: "متوسط",
      badgeClass: "bg-amber-100 text-amber-700",
      gradient: "from-amber-400 to-amber-600",
    };
  }
  return {
    label: "مرتفع",
    badgeClass: "bg-red-100 text-red-700",
    gradient: "from-red-500 to-red-700",
  };
}

export default function AdvancedCarbonCalculator() {
  const [step, setStep] = useState(1);
  const tipsRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DetailedData>({
    transportation: {
      car: { type: "sedan", distance: 25, days: 5 },
      publicTransport: { type: "bus", distance: 10, days: 2 },
      flights: { shortHaul: 2, longHaul: 1 },
    },
    electricity: {
      source: "mixed",
      usage: 18,
      heating: "ac",
      heatingUsage: 3,
    },
    food: {
      breakfast: "vegetarian",
      lunch: "meat",
      dinner: "meat",
      dairy: 2,
      localProduce: false,
      organic: false,
    },
    consumption: {
      clothing: "moderate",
      electronics: "moderate",
      waste: "recycle-most",
      waterUsage: "average",
    },
  });

  // Detailed calculation for the user's current answers
  const emissions = calculateDetailedEmissions(data);

  const percentage = Math.min(100, (emissions.total / SCALE_MAX) * 100);
  const footprintLevel = getFootprintLevel(percentage);

  // Achievements
  const getAchievements = (): Achievement[] => {
    const achievements: Achievement[] = [];

    // Transportation achievements
    if (
      data.transportation.car?.type === "electric" ||
      data.transportation.car?.type === "hybrid"
    ) {
      achievements.push({
        icon: "⚡",
        title: "سائق أخضر",
        description: "استخدام سيارة كهربائية أو هجينة",
        unlocked: true,
      });
    }

    if (
      data.transportation.publicTransport &&
      data.transportation.publicTransport.days >= 3
    ) {
      achievements.push({
        icon: "🚌",
        title: "راكب المواصلات",
        description: "استخدام المواصلات العامة 3+ أيام أسبوعياً",
        unlocked: true,
      });
    }

    // Food achievements
    const veganMeals =
      (data.food.breakfast === "vegan" ? 1 : 0) +
      (data.food.lunch === "vegan" ? 1 : 0) +
      (data.food.dinner === "vegan" ? 1 : 0);

    if (veganMeals >= 2) {
      achievements.push({
        icon: "🌱",
        title: "نباتي واعي",
        description: "وجبتان نباتيتان يومياً",
        unlocked: true,
      });
    }

    if (data.food.localProduce && data.food.organic) {
      achievements.push({
        icon: "🥬",
        title: "صديق المحلي",
        description: "شراء منتجات محلية وعضوية",
        unlocked: true,
      });
    }

    // Consumption achievements
    if (data.consumption.waste === "recycle-all") {
      achievements.push({
        icon: "♻️",
        title: "معيد تدوير مثالي",
        description: "إعادة تدوير جميع النفايات",
        unlocked: true,
      });
    }

    if (data.consumption.clothing === "minimal") {
      achievements.push({
        icon: "👕",
        title: "استهلاك واعي",
        description: "استهلاك ملابس منخفض جداً",
        unlocked: true,
      });
    }

    // Energy achievements
    if (data.electricity.source === "renewable") {
      achievements.push({
        icon: "☀️",
        title: "طاقة نظيفة",
        description: "استخدام الطاقة المتجددة 100%",
        unlocked: true,
      });
    }

    // Overall achievements
    if (emissions.total < 5) {
      achievements.push({
        icon: "🌍",
        title: "محارب المناخ",
        description: "بصمة كربونية منخفضة جداً (أقل من 5 كجم)",
        unlocked: true,
      });
    }

    if (
     (data.transportation.flights?.longHaul ?? 0) === 0 &&
     (data.transportation.flights?.shortHaul ?? 0) === 0
    ) {
      achievements.push({
        icon: "✈️",
        title: "لا للرحلات الجوية",
        description: "عدم السفر بالطائرات",
        unlocked: true,
      });
    }

    return achievements.slice(0, 6);
  };

  const achievements = getAchievements();

  // Comparisons
  const getComparisons = () => {
    const daily = emissions.total;
    const yearly = daily * 365;

    return {
      treesNeeded: Math.ceil(yearly / 22), // one tree absorbs 22kg per year
      carsPerYear: Math.ceil(yearly / 4600), // average car emits 4600kg per year
      flightsNYLA: Math.ceil(yearly / 1800), // approximate round trip
      streamsHours: Math.ceil(yearly / 0.036), // 1 hour video = 36g CO2
    };
  };

  const comparisons = getComparisons();

  // Tips — tagged by category so they can be prioritized by the actual result
  const generateAdvancedTips = () => {
    const tips: { category: string; text: string }[] = [];

    // Transport tips
    if (
      data.transportation.car?.type === "sedan" &&
      data.transportation.car?.distance > 20
    ) {
      tips.push({
        category: "transportation",
        text: "🚗 تبديل السيارة الكلاسيكية بسيارة كهربائية يوفر ~80% من انبعاثات المواصلات",
      });
    }

    if (
      !data.transportation.publicTransport ||
      data.transportation.publicTransport.days < 3
    ) {
      tips.push({
        category: "transportation",
        text: "🚌 زيادة استخدام المواصلات العامة إلى 3+ أيام أسبوعياً توفر ~2 كجم CO2 يومياً",
      });
    }

    if (
     (data.transportation.flights?.longHaul ?? 0) > 1 ||
     (data.transportation.flights?.shortHaul ?? 0) > 4
    ) {
      tips.push({
        category: "transportation",
        text: "✈️ تقليل الرحلات الجوية هو أسرع طريقة لخفض الانبعاثات (رحلة طويلة = شهر من الانبعاثات)",
      });
    }

    // Energy tips
    if (
      data.electricity.heating === "ac" &&
      data.electricity.heatingUsage > 200
    ) {
      tips.push({
        category: "energy",
        text: "❄️ رفع حرارة التكييف درجة أو درجتين فقط يوفر حتى 10% من استهلاك التبريد",
      });
    }

    if (data.electricity.source !== "renewable") {
      tips.push({
        category: "energy",
        text: "☀️ التحول للطاقة المتجددة يقلل انبعاثات الكهرباء بمعدل 80-90%",
      });
    }

    if (data.electricity.usage > 20) {
      tips.push({
        category: "energy",
        text: "⚡ استخدام أجهزة موفرة للطاقة و LED يوفر 30-40% من فاتورة الكهرباء",
      });
    }

    // Food tips
    const veganMeals =
      (data.food.breakfast === "vegan" ? 1 : 0) +
      (data.food.lunch === "vegan" ? 1 : 0) +
      (data.food.dinner === "vegan" ? 1 : 0);

    if (veganMeals < 2) {
      tips.push({
        category: "food",
        text: "🌱 جعل وجبتين نباتيتين يومياً يقلل انبعاثات الغذاء بمعدل 40%",
      });
    }

    if (!data.food.localProduce) {
      tips.push({
        category: "food",
        text: "🥬 شراء المنتجات المحلية يوفر انبعاثات النقل (15% توفير)",
      });
    }

    if (!data.food.organic) {
      tips.push({
        category: "food",
        text: "🍃 المنتجات العضوية توفر 10% من انبعاثات الإنتاج",
      });
    }

    // Consumption tips
    if (data.consumption.clothing !== "minimal") {
      tips.push({
        category: "consumption",
        text: "👕 شراء ملابس مستعملة أو من مصادر مستدامة يوفر 60% من الانبعاثات",
      });
    }

    if (data.consumption.waste !== "recycle-all") {
      tips.push({
        category: "consumption",
        text: "♻️ إعادة تدوير كاملة تقلل نفايات الاستهلاك إلى الحد الأدنى",
      });
    }

    return tips;
  };

  const rawTips = generateAdvancedTips();

  // Prioritize tips from whichever category is relatively worse than an
  // average lifestyle — comparing raw kg would almost always point to food
  // since its baseline number is naturally larger than e.g. transportation.
  const dominantCategory = Object.keys(emissions.breakdown).sort((a, b) => {
    const ratioA =
      emissions.breakdown[a] / (BASELINE_EMISSIONS.breakdown[a] || 1);
    const ratioB =
      emissions.breakdown[b] / (BASELINE_EMISSIONS.breakdown[b] || 1);
    return ratioB - ratioA;
  })[0];

  const tips = [...rawTips].sort((a, b) => {
    if (a.category === dominantCategory && b.category !== dominantCategory)
      return -1;
    if (b.category === dominantCategory && a.category !== dominantCategory)
      return 1;
    return 0;
  });

  const categoryLabels: Record<string, string> = {
    transportation: "المواصلات",
    energy: "الطاقة",
    food: "الغذاء",
    consumption: "الاستهلاك",
  };

  const allSteps = [
    {
      num: 1,
      title: "المواصلات",
      icon: "🚗",
      desc: "السيارة والمواصلات العامة والطيران",
    },
    {
      num: 2,
      title: "الطاقة",
      icon: "⚡",
      desc: "الكهرباء والتدفئة والتبريد",
    },
    {
      num: 3,
      title: "الغذاء",
      icon: "🍽️",
      desc: "نوع النظام الغذائي واختيارات الطعام",
    },
    {
      num: 4,
      title: "الاستهلاك",
      icon: "🛍️",
      desc: "الملابس والإلكترونيات والنفايات",
    },
  ];

  return (
    <section
      id="calculator"
      className="relative min-h-screen bg-gradient-to-b from-white to-eco-50/40 py-16 md:py-24 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.3] py-2 bg-gradient-to-r from-eco-600 to-eco-700 bg-clip-text text-transparent mb-2">
            حاسبة البصمة الكربونية المتقدمة
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            اكتشف تأثيرك البيئي بتفاصيل دقيقة واحصل على نصائح مخصصة لتقليل
            انبعاثاتك
          </p>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
          {allSteps.map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`p-4 rounded-2xl border-2 transition-all ${
                step === s.num
                  ? "bg-eco-600 border-eco-600 text-white shadow-lg"
                  : "bg-white border-eco-200 text-gray-700 hover:border-eco-400"
              }`}
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="font-bold text-sm">{s.title}</p>
              <p className="text-xs opacity-75">{s.desc}</p>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Transportation */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  🚗 تفاصيل المواصلات
                </h3>

                {/* Car */}
                <div className="bg-white rounded-3xl border border-eco-200/60 p-6 md:p-8">
                  <h4 className="text-xl font-bold mb-4 text-foreground">
                    السيارة الشخصية
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        نوع السيارة
                      </label>
                      <select
                        value={data.transportation.car?.type || "sedan"}
                        onChange={(e) =>
                          setData({
                            ...data,
                            transportation: {
                              ...data.transportation,
                              car: {
                                ...data.transportation.car!,
                                type: e.target.value as any,
                              },
                            },
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 focus:ring-2 focus:ring-eco-100 outline-none"
                      >
                        <option value="sedan">🚗 سيدان عادية</option>
                        <option value="suv">🚙 SUV</option>
                        <option value="hybrid">🔋 سيارة هجينة</option>
                        <option value="electric">⚡ سيارة كهربائية</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          المسافة اليومية (كم)
                        </label>
                        <input
                          type="number"
                          value={data.transportation.car?.distance || 0}
                          onChange={(e) =>
                            setData({
                              ...data,
                              transportation: {
                                ...data.transportation,
                                car: {
                                  ...data.transportation.car!,
                                  distance: parseFloat(e.target.value) || 0,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          أيام في الأسبوع
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="7"
                          value={data.transportation.car?.days || 0}
                          onChange={(e) =>
                            setData({
                              ...data,
                              transportation: {
                                ...data.transportation,
                                car: {
                                  ...data.transportation.car!,
                                  days: parseFloat(e.target.value) || 0,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Public Transport */}
                <div className="bg-white rounded-3xl border border-eco-200/60 p-6 md:p-8">
                  <h4 className="text-xl font-bold mb-4 text-foreground">
                    المواصلات العامة
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        نوع المواصلة
                      </label>
                      <select
                        value={
                          data.transportation.publicTransport?.type || "bus"
                        }
                        onChange={(e) =>
                          setData({
                            ...data,
                            transportation: {
                              ...data.transportation,
                              publicTransport: {
                                ...data.transportation.publicTransport!,
                                type: e.target.value as any,
                              },
                            },
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 focus:ring-2 focus:ring-eco-100 outline-none"
                      >
                        <option value="bus">🚌 حافلة</option>
                        <option value="train">🚆 قطار</option>
                        <option value="tram">🚊 ترام</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          المسافة اليومية (كم)
                        </label>
                        <input
                          type="number"
                          value={
                            data.transportation.publicTransport?.distance || 0
                          }
                          onChange={(e) =>
                            setData({
                              ...data,
                              transportation: {
                                ...data.transportation,
                                publicTransport: {
                                  ...data.transportation.publicTransport!,
                                  distance: parseFloat(e.target.value) || 0,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          أيام في الأسبوع
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="7"
                          value={data.transportation.publicTransport?.days || 0}
                          onChange={(e) =>
                            setData({
                              ...data,
                              transportation: {
                                ...data.transportation,
                                publicTransport: {
                                  ...data.transportation.publicTransport!,
                                  days: parseFloat(e.target.value) || 0,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flights */}
                <div className="bg-white rounded-3xl border border-eco-200/60 p-6 md:p-8">
                  <h4 className="text-xl font-bold mb-4 text-foreground">
                    الرحلات الجوية (سنوياً)
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        رحلات قصيرة
                      </label>
                      <input
                        type="number"
                        value={data.transportation.flights?.shortHaul || 0}
                        onChange={(e) =>
                          setData({
                            ...data,
                            transportation: {
                              ...data.transportation,
                              flights: {
                                ...data.transportation.flights!,
                                shortHaul: parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        رحلات طويلة
                      </label>
                      <input
                        type="number"
                        value={data.transportation.flights?.longHaul || 0}
                        onChange={(e) =>
                          setData({
                            ...data,
                            transportation: {
                              ...data.transportation,
                              flights: {
                                ...data.transportation.flights!,
                                longHaul: parseFloat(e.target.value) || 0,
                              },
                            },
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Energy */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  ⚡ الطاقة والتدفئة
                </h3>

                <div className="bg-white rounded-3xl border border-eco-200/60 p-6 md:p-8 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      التكييف / التدفئة
                    </label>
                    <select
                      value={data.electricity.heating}
                      onChange={(e) =>
                        setData({
                          ...data,
                          electricity: {
                            ...data.electricity,
                            heating: e.target.value as any,
                          },
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 focus:ring-2 focus:ring-eco-100 outline-none"
                    >
                      <option value="ac">❄️ تكييف</option>
                      <option value="electric">⚡ كهربائية</option>
                      <option value="gas">🔥 غاز</option>
                      <option value="none">❌ بدون تدفئة/تبريد</option>
                    </select>
                  </div>

                  {data.electricity.heating !== "none" && (
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        الاستهلاك الشهري (
                        {data.electricity.heating === "gas"
                          ? "ثيرم"
                          : "كيلوواط"}
                        )
                      </label>
                      <input
                        type="number"
                        value={data.electricity.heatingUsage}
                        onChange={(e) =>
                          setData({
                            ...data,
                            electricity: {
                              ...data.electricity,
                              heatingUsage: parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      مصدر الكهرباء
                    </label>
                    <select
                      value={data.electricity.source}
                      onChange={(e) =>
                        setData({
                          ...data,
                          electricity: {
                            ...data.electricity,
                            source: e.target.value as any,
                          },
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 focus:ring-2 focus:ring-eco-100 outline-none"
                    >
                      <option value="renewable">☀️ متجددة 100%</option>
                      <option value="mixed">🔄 مختلطة</option>
                      <option value="gas">💨 غاز طبيعي</option>
                      <option value="coal">⚫ فحم</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      الاستهلاك اليومي (كيلوواط/ساعة)
                    </label>
                    <input
                      type="number"
                      value={data.electricity.usage}
                      onChange={(e) =>
                        setData({
                          ...data,
                          electricity: {
                            ...data.electricity,
                            usage: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      💡 المتوسط: 15-20 كيلوواط/ساعة
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Food */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  🍽️ خيارات الغذاء
                </h3>

                <div className="bg-white rounded-3xl border border-eco-200/60 p-6 md:p-8 space-y-6">
                  {/* Meals */}
                  {["breakfast", "lunch", "dinner"].map((meal, idx) => (
                    <div key={meal}>
                      <label className="block text-sm font-semibold mb-3">
                        {idx === 0
                          ? "🌅 الإفطار"
                          : idx === 1
                            ? "🌞 الغداء"
                            : "🌙 العشاء"}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["vegan", "vegetarian", "meat"].map((type) => (
                          <button
                            key={type}
                            onClick={() =>
                              setData({
                                ...data,
                                food: {
                                  ...data.food,
                                  [meal]: type,
                                },
                              })
                            }
                            className={`py-3 rounded-xl font-semibold transition-all ${
                              data.food[meal as keyof typeof data.food] === type
                                ? "bg-eco-600 text-white"
                                : "bg-eco-50 text-eco-700 border-2 border-eco-200"
                            }`}
                          >
                            {type === "vegan" && "🌱 نباتي"}
                            {type === "vegetarian" && "🥬 خضار"}
                            {type === "meat" && "🥩 لحم"}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Dairy */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      حصص الألبان يومياً
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={data.food.dairy}
                      onChange={(e) =>
                        setData({
                          ...data,
                          food: {
                            ...data.food,
                            dairy: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:border-eco-600 outline-none"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-4 border-t border-eco-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.food.localProduce}
                        onChange={(e) =>
                          setData({
                            ...data,
                            food: {
                              ...data.food,
                              localProduce: e.target.checked,
                            },
                          })
                        }
                        className="w-5 h-5 text-eco-600 rounded"
                      />
                      <span className="font-medium text-gray-700">
                        🏪 شراء منتجات محلية
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.food.organic}
                        onChange={(e) =>
                          setData({
                            ...data,
                            food: {
                              ...data.food,
                              organic: e.target.checked,
                            },
                          })
                        }
                        className="w-5 h-5 text-eco-600 rounded"
                      />
                      <span className="font-medium text-gray-700">
                        🌿 منتجات عضوية
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Consumption */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  🛍️ الاستهلاك والنفايات
                </h3>

                <div className="bg-white rounded-3xl border border-eco-200/60 p-6 md:p-8 space-y-6">
                  {/* Clothing */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      👕 شراء الملابس
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["minimal", "moderate", "frequent"].map((level) => (
                        <button
                          key={level}
                          onClick={() =>
                            setData({
                              ...data,
                              consumption: {
                                ...data.consumption,
                                clothing: level as any,
                              },
                            })
                          }
                          className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                            data.consumption.clothing === level
                              ? "bg-eco-600 text-white"
                              : "bg-eco-50 text-eco-700 border-2 border-eco-200"
                          }`}
                        >
                          {level === "minimal" && "قليل"}
                          {level === "moderate" && "معتدل"}
                          {level === "frequent" && "متكرر"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Electronics */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      📱 شراء الإلكترونيات
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["minimal", "moderate", "frequent"].map((level) => (
                        <button
                          key={level}
                          onClick={() =>
                            setData({
                              ...data,
                              consumption: {
                                ...data.consumption,
                                electronics: level as any,
                              },
                            })
                          }
                          className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                            data.consumption.electronics === level
                              ? "bg-eco-600 text-white"
                              : "bg-eco-50 text-eco-700 border-2 border-eco-200"
                          }`}
                        >
                          {level === "minimal" && "قليل"}
                          {level === "moderate" && "معتدل"}
                          {level === "frequent" && "متكرر"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Waste */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      ♻️ إعادة التدوير
                    </label>
                    <div className="space-y-2">
                      {["recycle-all", "recycle-most", "little-recycle"].map(
                        (level) => (
                          <label
                            key={level}
                            className="flex items-center gap-3 p-3 rounded-xl border border-eco-200/50 hover:bg-eco-50/50 cursor-pointer transition-colors"
                          >
                            <input
                              type="radio"
                              name="waste"
                              checked={data.consumption.waste === level}
                              onChange={() =>
                                setData({
                                  ...data,
                                  consumption: {
                                    ...data.consumption,
                                    waste: level as any,
                                  },
                                })
                              }
                              className="w-4 h-4 text-eco-600"
                            />
                            <span className="font-medium text-gray-700">
                              {level === "recycle-all" &&
                                "✅ أعيد تدوير كل شيء"}
                              {level === "recycle-most" &&
                                "🟡 أعيد تدوير معظمه"}
                              {level === "little-recycle" &&
                                "❌ إعادة تدوير قليلة"}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Water */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      💧 استخدام المياه
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["low", "average", "high"].map((level) => (
                        <button
                          key={level}
                          onClick={() =>
                            setData({
                              ...data,
                              consumption: {
                                ...data.consumption,
                                waterUsage: level as any,
                              },
                            })
                          }
                          className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                            data.consumption.waterUsage === level
                              ? "bg-eco-600 text-white"
                              : "bg-eco-50 text-eco-700 border-2 border-eco-200"
                          }`}
                        >
                          {level === "low" && "منخفض"}
                          {level === "average" && "معتدل"}
                          {level === "high" && "مرتفع"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Next/Prev Buttons */}
            <div className="flex justify-between gap-4 mt-8">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6 py-3 rounded-xl font-semibold bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                ← السابق
              </button>
              {step < 4 ? (
                <button
                  onClick={() => setStep(Math.min(4, step + 1))}
                  className="px-6 py-3 rounded-xl font-semibold bg-eco-600 text-white hover:bg-eco-700 transition-colors"
                >
                  التالي →
                </button>
              ) : (
                <button
                  onClick={() =>
                    tipsRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                  className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-eco-600 to-eco-700 text-white hover:shadow-lg transition-all"
                >
                  💡 شاهد توصيات خفض البصمة
                </button>
              )}
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            {/* Main Result */}
            <div
              className={`bg-gradient-to-br ${footprintLevel.gradient} rounded-3xl p-8 text-white text-center transition-colors duration-500`}
            >
              <span
                className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-4 ${footprintLevel.badgeClass}`}
              >
                {footprintLevel.label}
              </span>
              <p className="text-sm opacity-90 mb-2">بصمتك الكربونية اليومية</p>
              <p className="text-6xl font-black mb-2">{emissions.total}</p>
              <p className="text-lg font-semibold mb-4">كيلوغرام CO₂</p>
              <p className="text-sm opacity-90">
                {(emissions.total * 365).toFixed(0)} كجم سنوياً
              </p>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-3xl border border-eco-200/60 p-6 shadow-md">
              <h4 className="font-bold text-foreground mb-4">📊 التفصيل</h4>
              <div className="space-y-3">
                {Object.entries(emissions.breakdown).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-2"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {key === "transportation" && "🚗 المواصلات"}
                      {key === "energy" && "⚡ الطاقة"}
                      {key === "food" && "🍽️ الغذاء"}
                      {key === "consumption" && "🛍️ الاستهلاك"}
                    </span>
                    <span className="font-bold text-eco-600">
                      {value.toFixed(2)} كجم
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparisons */}
            <div className="bg-eco-50 rounded-3xl border border-eco-300 p-6">
              <h4 className="font-bold text-foreground mb-4">🌍 المقارنات</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    🌳 أشجار مطلوبة (سنوياً)
                  </span>
                  <span className="font-bold text-eco-700">
                    {comparisons.treesNeeded}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">🚗 سيارات مكافئة</span>
                  <span className="font-bold text-eco-700">
                    {comparisons.carsPerYear}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">✈️ رحلات طيران</span>
                  <span className="font-bold text-eco-700">
                    {comparisons.flightsNYLA}
                  </span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            {/* {achievements.length > 0 && (
              <div className="bg-white rounded-3xl border border-amber-200 p-6">
                <h4 className="font-bold text-foreground mb-3">🏆 الإنجازات</h4>
                <div className="grid grid-cols-2 gap-2">
                  {achievements.map((a, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-2 text-center border-2 border-amber-200"
                    >
                      <div className="text-2xl mb-1">{a.icon}</div>
                      <p className="text-xs font-bold text-gray-700">
                        {a.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Tips Section */}
        {tips.length > 0 && (
          <div ref={tipsRef} className="mt-12 scroll-mt-6">
            <div className="bg-gradient-to-r from-eco-500/10 to-eco-600/10 border-2 border-eco-300/50 rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">💡</span>
                <h4 className="text-2xl font-bold text-foreground">
                  نصائح مخصصة لتقليل أثرك
                </h4>
              </div>

              {dominantCategory && (
                <p className="text-sm text-eco-700 font-semibold mb-6">
                  🔍 أكبر مصدر لبصمتك حالياً هو{" "}
                  <span className="underline">
                    {categoryLabels[dominantCategory]}
                  </span>
                  ، لذلك رتّبنا التوصيات التالية لتبدأ منه.
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl p-5 border transition-all ${
                      tip.category === dominantCategory
                        ? "border-eco-400 shadow-md"
                        : "border-eco-200/60 hover:border-eco-400/60 hover:shadow-md"
                    }`}
                  >
                    <p className="text-gray-700 font-medium">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
