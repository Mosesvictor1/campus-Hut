import React from "react";
import { Button } from "@/components/ui/button";
import {
  Brain,
  BookOpen,
  StickyNote,
  CheckCircle2,
  CalendarClock,
  BellRing,
  Library,
  Download,
  ArrowDown,
} from "lucide-react";

const learns = [
  "Study consistency",
  "Learning behaviour",
  "Weak topics",
  "Strong subjects",
  "Course engagement",
  "Academic goals",
];

const personalizes = [
  "Study plans",
  "AI courses",
  "Quizzes",
  "Flashcards",
  "Revision schedules",
  "Daily recommendations",
];

const featureCards = [
  {
    icon: Brain,
    title: "AI Study Assistant",
    desc: "Get instant answers, explanations, and guidance tailored to your courses.",
  },
  {
    icon: BookOpen,
    title: "AI Course Generator",
    desc: "Generate full personalized courses on any topic in seconds.",
  },
  {
    icon: StickyNote,
    title: "AI Flashcards",
    desc: "Auto-generated flashcards that focus on what you need to master.",
  },
  {
    icon: CheckCircle2,
    title: "AI Quizzes",
    desc: "Practice with smart quizzes that adapt to your progress.",
  },
  {
    icon: CalendarClock,
    title: "Smart Study Planner",
    desc: "A study schedule built around your goals and preferred study times.",
  },
  {
    icon: BellRing,
    title: "Assignment Reminder",
    desc: "Never miss a deadline with timely, intelligent reminders.",
  },
  {
    icon: Library,
    title: "Learning Resources",
    desc: "Curated resources aligned with your courses and academic level.",
  },
];

const AILearningSection = () => {
  return (
    <section id="ai-features" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest text-campusGreen-600 uppercase"
            data-aos="fade-up"
          >
            AI Learning
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
            data-aos="fade-up"
          >
            AI That Understands{" "}
            <span className="text-campusGreen-600">Every Student</span>
          </h2>
          <p
            className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed"
            data-aos="fade-up"
          >
            Unlike traditional learning platforms, CampusHut continuously adapts
            to each student's learning style and academic journey.
          </p>
        </div>

        {/* Personalized Academic Intelligence */}
        <div className="rounded-3xl bg-[#EAFFE9] p-8 sm:p-12 mb-16">
          <h3
            className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10"
            data-aos="fade-up"
          >
            Personalized Academic Intelligence
          </h3>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-md"
              data-aos="fade-right"
            >
              <h4 className="text-lg font-bold text-campusGreen-700 mb-5">
                CampusHut learns:
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {learns.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-campusGreen-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-md relative"
              data-aos="fade-left"
            >
              <div className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-campusGreen-600 items-center justify-center shadow-lg">
                <ArrowDown className="w-5 h-5 text-white -rotate-90" />
              </div>
              <div className="md:hidden flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-campusGreen-600 flex items-center justify-center">
                  <ArrowDown className="w-5 h-5 text-white" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-campusGreen-700 mb-5">
                CampusHut personalizes:
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {personalizes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-campusGreen-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Built Around Your Learning Journey */}
        <div className="mb-10 text-center">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
            data-aos="fade-up"
          >
            Built Around Your{" "}
            <span className="text-campusGreen-600">Learning Journey</span>
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featureCards.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              data-aos="fade-up"
              data-aos-delay={`${(i % 4) * 80}`}
            >
              <div className="w-12 h-12 rounded-xl bg-campusGreen-100 flex items-center justify-center mb-4 group-hover:bg-campusGreen-600 transition-colors">
                <Icon className="w-6 h-6 text-campusGreen-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center" data-aos="fade-up">
          <p className="text-lg text-gray-700 mb-5 font-medium">
            Ready to experience personalized learning?
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.campushut.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white px-8 py-6 text-base sm:text-lg rounded-full shadow-lg shadow-campusGreen-600/30">
              <Download className="w-5 h-5 mr-2" />
              Download App
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AILearningSection;
