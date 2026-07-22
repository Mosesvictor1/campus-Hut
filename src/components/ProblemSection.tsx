import React from "react";
import { XCircle } from "lucide-react";
import illustration from "@/assets/campushut-illustration.png.asset.json";

const problems = [
  "Ineffective study habits",
  "No personalized learning support",
  "Poor academic planning",
  "Fragmented learning resources",
];

const ProblemSection = () => {
  return (
    <section id="problem" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              The <span className="text-campusGreen-600">Problem</span>
            </h2>
            <div className="mt-3 h-1 w-16 bg-campusGreen-500 rounded-full" />


            <p className="mt-6 text-lg text-gray-700">
              Students don't fail because they lack potential.
            </p>
            <p className="mt-4 text-lg font-semibold text-campusGreen-700">
              They struggle because…
            </p>

            <ul className="mt-6 space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-campusGreen-600 flex-shrink-0 mt-0.5" />
                  <span className="text-base sm:text-lg text-gray-800">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-left" className="relative">
            <img
              src={illustration.url}
              alt="Student struggling with fragmented study resources"
              className="w-full h-auto rounded-2xl"
              style={{
                objectFit: "cover",
                objectPosition: "top",
                maxHeight: "560px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
