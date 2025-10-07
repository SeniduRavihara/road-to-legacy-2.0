"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What is Road to Legacy?",
    answer:
      "Road to Legacy is an event designed to bridge the gap between industry leaders and aspiring IT professionals, providing students with valuable insights, essential skills, and career guidance.",
  },
  {
    question: "Who are the collaboration partners for Road to Legacy?",
    answer:
      "The event is a collaboration between the IEEE student branch of University of Sri Jayewardenepura, Students in University of colombo , Students in University of Moratuwa",
  },
  {
    question: "What is the purpose of Road to Legacy?",
    answer:
      " The purpose is to unlock potential and shape futures, guiding first-year undergraduates to shape their journey with purpose while forging lasting connections across universities.",
  },
  {
    question: "What is IT Legacy?",
    answer:
      "A community of IT students from UOM, USJ, and UOC, united to explore technology, innovation, and collaboration.",
  },
];

// Custom motion variants for animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export default function FAQ() {
  const faqRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Line animation
      gsap.fromTo(
        ".title-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );
    }, faqRef);

    // Add custom CSS to hide the default arrow
    const style = document.createElement("style");
    style.innerHTML = `
      .custom-accordion-trigger[data-state="open"] > svg,
      .custom-accordion-trigger[data-state="closed"] > svg {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      ctx.revert();
      document.head.removeChild(style);
    };
  }, []);

  const handleAccordionChange = (value: string) => {
    setActiveAccordion(value === activeAccordion ? null : value);
  };

  return (
    <div
      ref={faqRef}
      className="py-20 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "#191b1f" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-5">
          <h2 ref={titleRef} className="text-5xl font-bold mb-4 text-white">
            FAQs
          </h2>
          <div className="flex justify-center">
            <div
              className="title-line h-1 w-24 rounded-full mb-10"
              style={{ backgroundColor: "#333842" }}
            ></div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to know about our services and processes
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="space-y-4"
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="overflow-hidden"
            >
              <div
                className="rounded-lg mb-4"
                style={{
                  backgroundColor: "#262930",
                  borderLeft:
                    activeAccordion === String(index + 1)
                      ? "4px solid #333842"
                      : "4px solid transparent",
                  transition: "border-left 0.3s ease",
                }}
              >
                <Accordion
                  type="single"
                  collapsible
                  value={activeAccordion || ""}
                  onValueChange={handleAccordionChange}
                  className="w-full"
                >
                  <AccordionItem
                    value={String(index + 1)}
                    className="border-none"
                  >
                    <AccordionTrigger className="custom-accordion-trigger px-6 py-5 hover:no-underline group flex items-center justify-between text-lg font-medium text-white">
                      <span>{item.question}</span>
                      <div
                        className={`flex items-center justify-center rounded-full transition-all duration-300 p-2 ${
                          activeAccordion === String(index + 1)
                            ? "bg-opacity-100"
                            : "bg-opacity-60"
                        }`}
                        style={{
                          backgroundColor:
                            activeAccordion === String(index + 1)
                              ? "#333842"
                              : "#2c3039",
                        }}
                      >
                        <IoIosArrowDown
                          className={`text-white transition-transform duration-300 ${
                            activeAccordion === String(index + 1)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-gray-400">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
