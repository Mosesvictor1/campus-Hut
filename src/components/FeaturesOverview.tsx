import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Brain,
  Calendar,
  FileText,
  Bell,
  MessageCircle,
} from "lucide-react";

const FeaturesOverview = () => {
  const features = [
    {
      id: 1,
      icon: BookOpen,
      title: "Syllabus Navigator",
      description:
        "Navigate through your course syllabus with ease and track your progress",
    },
    {
      id: 2,
      icon: Brain,
      title: "AI Study Assistant",
      description:
        "Generate personalized study courses, quizzes, and flashcards using AI",
    },
    {
      id: 3,
      icon: Calendar,
      title: "Schedule Manager",
      description:
        "Organize your academic schedule and never miss important dates",
    },
    {
      id: 4,
      icon: FileText,
      title: "CV Builder",
      description:
        "Create professional CVs with our smart templates and AI suggestions",
    },
    {
      id: 5,
      icon: Bell,
      title: "Smart Reminders",
      description:
        "Get intelligent notifications for exams, assignments, and deadlines",
    },
    {
      id: 6,
      icon: MessageCircle,
      title: "Campus Chatroom",
      description: "Connect and collaborate with students from your university",
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-50 mb-4" data-aos="fade-up">
            Comprehensive Learning Tools
          </h2>
          <p className="text-xl text-gray-100" data-aos="fade-up">
            Discover all the features that make CampusHut your ultimate study
            companion
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              data-aos="zoom-in"
              data-aos-delay={`${(feature.id % 3) * 100}`}
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-campusGreen-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-campusGreen-600 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-campusGreen-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
