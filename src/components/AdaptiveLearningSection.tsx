import React from "react";
import {
  Brain,
  BarChart3,
  Target,
  TrendingUp,
  Clock,
  Calendar,
  Lightbulb,
  Layers,
  Star,
  Trophy,
} from "lucide-react";

const understands = [
  { icon: Brain, label: "Your study habits" },
  { icon: BarChart3, label: "Your learning patterns" },
  { icon: Target, label: "Your goals & aspirations" },
  { icon: TrendingUp, label: "Your progress & challenges" },
  { icon: Clock, label: "Your preferred study time" },
];

const receives = [
  { icon: Calendar, label: "Personalized study plans" },
  { icon: Lightbulb, label: "AI recommendations" },
  { icon: Layers, label: "Smart quizzes & flashcards" },
  { icon: Star, label: "Daily learning guidance" },
  { icon: Trophy, label: "Better grades & outcomes" },
];

const AdaptiveLearningSection = () => {
  return (
    <section id="ai-learning" className="py-16 sm:py-20 bg-[#EAFFE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            data-aos="fade-up"
          >
            Learning That Adapts to You,{" "}
            <span className="text-campusGreen-600">
              Not the Other Way Around
            </span>
          </h2>
          <p
            className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed"
            data-aos="fade-up"
          >
            Unlike traditional learning platforms that provide the same
            experience for every student,{" "}
            <span className="font-semibold text-campusGreen-700">
              CampusHut
            </span>{" "}
            builds a personalized academic profile for each learner. Our AI
            continuously learns your study habits, strengths, and preferred
            study times — then recommends what to study, when to study, and how
            to study more effectively.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* CampusHut understands */}
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-campusGreen-100"
            data-aos="fade-right"
          >
            <h3 className="text-lg font-bold text-campusGreen-700 mb-6">
              CampusHut understands:
            </h3>
            <ul className="space-y-4">
              {understands.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-campusGreen-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-campusGreen-600" />
                  </div>
                  <span className="text-gray-800 font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI brain center */}
          <div
            className="flex flex-col items-center justify-center py-6"
            data-aos="zoom-in"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-campusGreen-400/30 blur-2xl animate-pulse" />
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-campusGreen-500 to-campusGreen-700 flex items-center justify-center shadow-2xl">
                <Brain className="w-14 h-14 text-white" />
              </div>
            </div>
            <p className="mt-4 text-center">
              <span className="block font-bold text-lg text-gray-900">
                CampusHut AI
              </span>
              <span className="text-sm text-campusGreen-700">
                learns how you learn
              </span>
            </p>
          </div>

          {/* So you receive */}
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-campusGreen-100"
            data-aos="fade-left"
          >
            <h3 className="text-lg font-bold text-campusGreen-700 mb-6">
              So you receive:
            </h3>
            <ul className="space-y-4">
              {receives.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-campusGreen-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-campusGreen-600" />
                  </div>
                  <span className="text-gray-800 font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdaptiveLearningSection;
