import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, Calendar, FileText, BellPlus } from "lucide-react";

const QuickOverview = () => {
  const features = [
    {
      id: 1,
      icon: BellPlus,
      title: "Smart Reminders",
      description:
        "Stay on top of deadlines and tasks with intelligent reminders tailored to your schedule and study habits.",
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
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Academic Success
          </h2>
          <p className="text-xl text-gray-600">
            Powerful tools designed specifically for African students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              data-aos="zoom-out-up"
              data-aos-delay={`${(feature.id % 3) * 100}`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-campusGreen-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-campusGreen-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickOverview;
