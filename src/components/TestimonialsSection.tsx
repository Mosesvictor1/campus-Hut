import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Adunni Olatunji",
      role: "Computer Science Student, University of Lagos",
      content:
        "CampusHut's AI study assistant helped me understand complex algorithms. It's like having a personal tutor!",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5a1?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Kwame Asante",
      role: "Engineering Student, KNUST Ghana",
      content:
        "The CV builder feature got me my first internship. The templates are professional and ATS-friendly.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Fatima Hassan",
      role: "Medical Student, University of Khartoum",
      content:
        "Managing my medical school schedule was chaos until I found CampusHut. Now everything is organized!",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-gradient-to-br from-white to-campusGreen-50"
              data-aos="zoom-in"
              data-aos-delay={`${(testimonial.id % 3) * 100}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
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
