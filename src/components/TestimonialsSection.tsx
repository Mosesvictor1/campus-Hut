import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      content:
        "As a student, CampusHut has been a game-changer in my software development journey. Its resources on Java and frontend development gave me clarity and confidence about the real-world skills I need after graduation.",
      name: "Mustapha Ramon",
      role: "Computer Science Student, Federal College of Fisheries and Marine Technology, Lagos.",
    },
    {
      id: 2,
      content:
        "CampusHut's AI Study Assistant helped me understand difficult topics like statistical analysis. It breaks things down in simple language, like a real tutor. Studying feels less overwhelming now, I actually get things I used to skip before.",
      name: "Eniola Babalola",
      role: "Demography and Social Statistics Student, Obafemi Awolowo University (OAU).",
    },
    {
      id: 3,
      content:
        "As someone who forget deadlines a lot, CampusHut's Schedule Manager has been a lifesaver. I now organize my classes, assignments, to-dos, and daily tasks in one place. The reminders keep me on track without the stress of missing anything.",
      name: "Bernard immaculatacarol",
      role: "Animal Breeding and Genetics Student, Federal University of Agriculture Abeokuta.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
          >
            What Students Are Saying
          </h2>
          <p className="text-xl text-gray-600" data-aos="fade-up">
            Join thousands of satisfied students across Africa
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border border-campusGreen-100 bg-campusGreen-100 shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
              data-aos="zoom-in"
              data-aos-delay={`${(testimonial.id % 3) * 100}`}
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-0 h-full w-1 bg-campusGreen-500 group-hover:bg-campusGreen-600 transition-colors duration-300" />
              <CardContent className="p-5 sm:p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-black text-sm sm:text-base md:text-lg md:text-balance mb-4 italic flex-1">
                  “{testimonial.content}”
                </p>
                <div className="mt-auto">
                  <div className="font-semibold text-campusGreen-700 text-sm sm:text-base md:text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-800">
                    {testimonial.role}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
