import React from "react";
import { Button } from "@/components/ui/button";
import {
  UserCircle2,
  Brain,
  Sparkles,
  GraduationCap,
  BookMarked,
  Target,
  Clock,
  Activity,
  ClipboardList,
  Calendar,
  Layers,
  CheckSquare,
  BookOpen,
  Download,
} from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest text-campusGreen-600 uppercase"
            data-aos="fade-up"
          >
            How It Works
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
            data-aos="fade-up"
          >
            Your Personalized Learning{" "}
            <span className="text-campusGreen-600">Journey Starts Here</span>
          </h2>
          <p
            className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed"
            data-aos="fade-up"
          >
            CampusHut doesn't just generate study materials; it continuously
            learns how you study and adapts to help you achieve better academic
            outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Step 1 */}
          <div
            className="relative bg-gradient-to-br from-white to-[#EAFFE9] rounded-3xl p-8 border border-campusGreen-100 shadow-lg hover:shadow-xl transition-all"
            data-aos="fade-up"
          >
            <div className="absolute -top-4 left-8 bg-campusGreen-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              STEP 1
            </div>
            <div className="w-14 h-14 rounded-2xl bg-campusGreen-600 flex items-center justify-center mb-5">
              <UserCircle2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Build Your Academic Profile
            </h3>
            <p className="text-gray-600 mb-5">Tell CampusHut about:</p>
            <ul className="space-y-3">
              {[
                { icon: GraduationCap, text: "Your university" },
                { icon: Layers, text: "Level" },
                { icon: BookMarked, text: "Courses" },
                { icon: Activity, text: "Current CGPA" },
                { icon: Target, text: "Academic goals" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-gray-800">
                  <Icon className="w-4 h-4 text-campusGreen-600" />
                  <span className="text-sm sm:text-base">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step 2 */}
          <div
            className="relative bg-gradient-to-br from-white to-[#EAFFE9] rounded-3xl p-8 border border-campusGreen-100 shadow-lg hover:shadow-xl transition-all"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="absolute -top-4 left-8 bg-campusGreen-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              STEP 2
            </div>
            <div className="w-14 h-14 rounded-2xl bg-campusGreen-600 flex items-center justify-center mb-5">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Let AI Learn How You Learn
            </h3>
            <p className="text-gray-600 mb-5">CampusHut studies:</p>
            <ul className="space-y-3">
              {[
                { icon: BookOpen, text: "Study habits" },
                { icon: Activity, text: "Learning behaviour" },
                { icon: Target, text: "Strong courses" },
                { icon: ClipboardList, text: "Weak courses" },
                { icon: Clock, text: "Preferred study times" },
                { icon: Sparkles, text: "Academic progress" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-gray-800">
                  <Icon className="w-4 h-4 text-campusGreen-600" />
                  <span className="text-sm sm:text-base">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step 3 */}
          <div
            className="relative bg-gradient-to-br from-white to-[#EAFFE9] rounded-3xl p-8 border border-campusGreen-100 shadow-lg hover:shadow-xl transition-all"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="absolute -top-4 left-8 bg-campusGreen-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              STEP 3
            </div>
            <div className="w-14 h-14 rounded-2xl bg-campusGreen-600 flex items-center justify-center mb-5">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Receive Personalized Academic Guidance
            </h3>
            <p className="text-gray-600 mb-5">Receive:</p>
            <ul className="space-y-3">
              {[
                { icon: Calendar, text: "AI Study Plans" },
                { icon: Sparkles, text: "Daily Recommendations" },
                { icon: BookOpen, text: "Personalized Courses" },
                { icon: Layers, text: "AI Flashcards" },
                { icon: CheckSquare, text: "AI Quizzes" },
                { icon: GraduationCap, text: "Exam Preparation" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-gray-800">
                  <Icon className="w-4 h-4 text-campusGreen-600" />
                  <span className="text-sm sm:text-base">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center" data-aos="fade-up">
          <a
            href="https://play.google.com/store/apps/details?id=com.campushut.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white px-8 py-6 text-base sm:text-lg rounded-full shadow-lg shadow-campusGreen-600/30">
              <Download className="w-5 h-5 mr-2" />
              Start Learning Smarter Today
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
