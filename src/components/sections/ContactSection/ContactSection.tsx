"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoIosCall } from "react-icons/io";
import "./ContactSection.css";

gsap.registerPlugin(ScrollTrigger);

  const teamMembers = [
    {
      name: "Dheeshana Alagiyawanna",
      position: "Co chief organizer",
      image: "/images/contacts/Dheeshana.jpg",
      email: { email: "dheeshanaalagiyawanna@gmail.com", icon: <FiMail /> },
      linkedIn: {
        linkedIn:
          "https://www.linkedin.com/in/dheeshana-alagiyawanna-901948283",
        icon: <FaLinkedin />,
      },
      phone: {
        phone: "0714835998",
        icon: <IoIosCall />,
      },
    },
    {
      name: "Pasindu Mendis",
      position: "Co chief organizer",
      image: "/images/contacts/Pasindu.jpg",
      email: { email: "pasinduudana12m2@gmail.com", icon: <FiMail /> },
      linkedIn: {
        linkedIn: "https://www.linkedin.com/in/pasindu-udana-mendis-a45504307",
        icon: <FaLinkedin />,
      },
      phone: {
        phone: "0719367720",
        icon: <IoIosCall />,
      },
    },
    {
      name: "Oshadi Liyanage",
      position: "Co chief organizer",
      image: "/images/contacts/Oshadi.jpg",
      email: { email: "liyanageoshadi99@gmail.com", icon: <FiMail /> },
      linkedIn: {
        linkedIn: "https://www.linkedin.com/in/oshadi-liyanage",
        icon: <FaLinkedin />,
      },
      phone: {
        phone: "0702502890",
        icon: <IoIosCall />,
      },
    },
    {
      name: "Umaya Walpola",
      position: "Co chief organizer",
      image: "/images/contacts/Umaya.jpg",
      email: { email: "umayawalpola@gmail.com", icon: <FiMail /> },
      linkedIn: {
        linkedIn: "https://www.linkedin.com/in/umaya-walpola-a24a31201",
        icon: <FaLinkedin />,
      },
      phone: {
        phone: "0765408463",
        icon: <IoIosCall />,
      },
    },
    {
      name: "Asiri Harischandra",
      position: "Co chief organizer",
      image: "/images/contacts/Harischandra.jpg",
      email: { email: "asiriharischandra33@gmail.com", icon: <FiMail /> },
      linkedIn: {
        linkedIn: "https://www.linkedin.com/in/asiri-harischandra-2209b3305/",
        icon: <FaLinkedin />,
      },
      phone: {
        phone: "0705758091",
        icon: <IoIosCall />,
      },
    },
    {
      name: "Hesanda Nimneth",
      position: "Co chief organizer",
      image: "/images/contacts/Hesanda.jpg",
      email: { email: "nhesanda@gmail.com", icon: <FiMail /> },
      linkedIn: {
        linkedIn: "https://www.linkedin.com/in/hesanda-liyanage/",
        icon: <FaLinkedin />,
      },
      phone: {
        phone: "0752069515",
        icon: <IoIosCall />,
      },
    },
  ];

const ContactSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    }, sectionRef);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".section-title", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Subtitle animation
      gsap.from(".section-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Card animations with staggered effect
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".cards-container",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="contact"
      ref={sectionRef}
      className="px-4 md:px-10  flex flex-col items-center justify-start"
      style={{ backgroundColor: "#191b1f" }}
    >
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-5xl font-bold mb-6 text-white">
            CONTACT US
          </h2>
          <div className="flex justify-center">
            <div
              className="title-line h-1 w-24 rounded-full mb-10"
              style={{ backgroundColor: "#333842" }}
            ></div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Connect with our team of organizers
          </p>
        </div>

        {/* <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 section-title text-white">
            CONTACT US
          </h2>
          <p className="text-lg max-w-xl mx-auto section-subtitle text-gray-400">
            Connect with our team of organizers
          </p>
        </div> */}

        <div className="cards-container relative w-full ">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="py-4">
              {teamMembers.map((member, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 "
                >
                  <div
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="h-full"
                  >
                    <Card
                      className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
                        hoveredIndex === index
                          ? "shadow-lg shadow-black/30 translate-y-[-8px]"
                          : "shadow-md shadow-black/20"
                      }`}
                      style={{
                        backgroundColor: "#262930",
                        borderColor: "#2c3039",
                      }}
                    >
                      <div className="relative w-full h-64 overflow-hidden">
                        <div
                          className="absolute inset-0 z-10 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(to bottom, rgba(25,27,31,0) 0%, rgba(25,27,31,0.7) 100%)`,
                            opacity: hoveredIndex === index ? "100%" : "80%",
                          }}
                        ></div>
                        <ExportedImage
                          src={member.image}
                          alt={member.name}
                          width={300}
                          height={300}
                          className="object-cover w-full h-full transition-transform duration-500 ease-out"
                          style={{
                            transform:
                              hoveredIndex === index
                                ? "scale(1.05)"
                                : "scale(1)",
                          }}
                          priority
                          unoptimized={true}
                        />
                      </div>

                      <div
                        className="p-6"
                        style={{ backgroundColor: "#262930" }}
                      >
                        <h3 className="text-xl font-bold mb-1 text-white">
                          {member.name}
                        </h3>
                        <p
                          className="text-sm font-medium mb-4"
                          style={{ color: "#9ca3af" }}
                        >
                          {member.position}
                        </p>

                        <div className="flex justify-center gap-4 text-lg">
                          <a
                            href={`mailto:${member.email.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full hover:text-white transition-all duration-300 transform hover:scale-110"
                            style={{
                              backgroundColor: "#2c3039",
                              color: "#9ca3af",
                            }}
                            aria-label={`Email ${member.name}`}
                          >
                            {member.email.icon}
                          </a>
                          <a
                            href={member.linkedIn.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full hover:text-white transition-all duration-300 transform hover:scale-110"
                            style={{
                              backgroundColor: "#2c3039",
                              color: "#9ca3af",
                            }}
                            aria-label={`LinkedIn profile of ${member.name}`}
                          >
                            {member.linkedIn.icon}
                          </a>
                          <a
                            href={`tel:${member.phone.phone}`}
                            className="p-3 rounded-full hover:text-white transition-all duration-300 transform hover:scale-110"
                            style={{
                              backgroundColor: "#2c3039",
                              color: "#9ca3af",
                            }}
                            aria-label={`Call ${member.name}`}
                          >
                            {member.phone.icon}
                          </a>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious
                className="relative static translate-y-0 text-white border-none"
                style={{ backgroundColor: "#2c3039" }}
              />
              <CarouselNext
                className="relative static translate-y-0 text-white border-none"
                style={{ backgroundColor: "#2c3039" }}
              />
            </div> */}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
