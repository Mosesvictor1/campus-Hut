import React from "react";

const cardData = [
  {
    id: 1,
    title: "Smart Reminders",
    description:
      "Stay on top of deadlines and tasks with intelligent reminders tailored to your schedule and study habits.",
    image: "/assets/quick1.jpg",
  },
  {
    id: 2,
    title: "AI Study Assistant",
    description:
      "Generate personalized study courses, quizzes, and flashcards using AI.",
    image: "/assets/quick2.jpg",
  },
  {
    id: 3,
    title: "Schedule Manager",
    description:
      "Schedule Manager helps students plan their day by organizing classes, tasks, and events, ensuring better time use and productivity.",
    image: "/assets/quick3.jpg",
  },
  {
    id: 4,
    title: "CV Builder",
    description:
      "Create professional CVs with our smart templates and AI suggestions",
    image: "/assets/quick4.jpg",
  },
];

const QuickOverview = () => {
  return (
    <section className="py-16 bg-[#EAFFE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2" data-aos="fade-up">
            Everything You Need for Academic{" "}
            <span className="text-orange-500">Success</span>
          </h2>
          <p className="text-base text-gray-700" data-aos="fade-up">
            Powerful tools designed specifically for African students
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden shadow-lg relative group min-h-[320px] flex flex-col justify-end"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              data-aos="zoom-in"
              data-aos-delay={`${(card.id % 3) * 100}`}
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#040f04] via-[#0aff054e]  group-hover:bg-opacity-70 transition-all duration-300" />
              <div className="relative z-10 p-6 text-center flex flex-col items-center justify-end h-full">
                <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                  {card.title}
                </h3>
                <p className="text-white text-sm drop-shadow-lg">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickOverview;
