import React from "react";
import { Button } from "@/components/ui/button";
import {
  Flame,
  CalendarCheck,
  GraduationCap,
  Briefcase,
  ClipboardList,
  BellRing,
  Brain,
  Layers,
  CheckSquare,
  CalendarClock,
  TrendingUp,
  Rocket,
  Download,
} from "lucide-react";

const sections = [
  {
    label: "Section A",
    title: "Better Study Habits",
    accent: "bg-campusGreen-600",
    icon: Flame,
    items: [
      { icon: Flame, text: "Daily study streak" },
      { icon: TrendingUp, text: "Consistent learning routine" },
      { icon: Brain, text: "Focused study sessions" },
    ],
  },
  {
    label: "Section B",
    title: "Better Academic Planning",
    accent: "bg-orange-500",
    icon: CalendarCheck,
    items: [
      { icon: ClipboardList, text: "Assignments" },
      { icon: CalendarClock, text: "Calendar" },
      { icon: BellRing, text: "Reminders" },
    ],
  },
  {
    label: "Section C",
    title: "Smarter Exam Preparation",
    accent: "bg-campusGreen-600",
    icon: GraduationCap,
    items: [
      { icon: Brain, text: "AI-powered study" },
      { icon: Layers, text: "Flashcards" },
      { icon: CheckSquare, text: "Quizzes" },
      { icon: CalendarClock, text: "Study plans" },
    ],
  },
  {
    label: "Section D",
    title: "Career Readiness",
    accent: "bg-orange-500",
    icon: Briefcase,
    items: [
      { icon: Briefcase, text: "Career opportunities" },
      { icon: Rocket, text: "Professional growth" },
    ],
  },
];

const StudentSuccessSection = () => {
  return (
    <section id="student-success" className="py-16 sm:py-20 bg-[#EAFFE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest text-campusGreen-600 uppercase"
            data-aos="fade-up"
          >
            Student Success
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
            data-aos="fade-up"
          >
            Helping Students Reach Their{" "}
            <span className="text-campusGreen-600">Academic Potential</span>
          </h2>
          <p
            className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed"
            data-aos="fade-up"
          >
            CampusHut helps students build better study habits, stay organized,
            improve academic performance, and prepare for life after graduation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-white hover:shadow-2xl hover:-translate-y-1 transition-all"
                data-aos="fade-up"
                data-aos-delay={`${i * 80}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${s.accent} flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    {s.label}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {s.title}
                </h3>
                <ul className="space-y-3">
                  {s.items.map(({ icon: I, text }) => (
                    <li
                      key={text}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <I className="w-4 h-4 text-campusGreen-600 flex-shrink-0" />
                      <span className="text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center" data-aos="fade-up">
          <a
            href="https://play.google.com/store/apps/details?id=com.campushut.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white px-8 py-6 text-base sm:text-lg rounded-full shadow-lg shadow-campusGreen-600/30">
              <Download className="w-5 h-5 mr-2" />
              Become the Next Student Success Story
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default StudentSuccessSection;
