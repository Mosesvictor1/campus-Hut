import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      id: 1,
      question: "Is CampusHut free to use?",
      answer:
        "Yes! CampusHut offers a robust free plan with essential features like task scheduling, campus news, and basic CV templates. Premium features are available for ₦1,500/month.",
    },
    {
      id: 2,
      question: "Can I use it on any smartphone?",
      answer:
        "Absolutely! CampusHut is available on both Android and iOS devices. You can download it from Google Play Store or Apple App Store.",
    },
    {
      id: 3,
      question: "How does the AI Study Assistant work?",
      answer:
        "Simply enter any topic you want to learn, and our AI will generate a comprehensive study course with lessons, quizzes, and flashcards tailored to your learning pace.",
    },
    {
      id: 4,
      question: "Do I need internet to use the app?",
      answer:
        "While some features require internet connectivity, many core features like your schedule, notes, and downloaded study materials work offline.",
    },
    {
      id: 5,
      question: "Is it only for university students?",
      answer:
        "While designed primarily for African university and polytechnic students, anyone pursuing higher education can benefit from CampusHut's features.",
    },
  ];

  return (
    <section className="py-16 bg-[#EAFFE9]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about CampusHut
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-gray-200 rounded-lg mb-4 px-6"
              data-aos="zoom-in"
              data-aos-delay={`${(faq.id % 3) * 100}`}
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-campusGreen-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
