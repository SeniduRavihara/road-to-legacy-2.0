"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ExportedImage from "next-image-export-optimizer";
import { FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoIosCall } from "react-icons/io";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./ContactSection.css";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const teamMembers = [
    {
      name: "VIHAN MENDIS",
      position: "Co chief organizer",
      image: "/images/contacts/Dheeshana.jpg",
      icon: <FiMail />,
      icon2: <FaLinkedin />,
      icon3: <IoIosCall />,
    },
    {
      name: "VIHANGA RATHNASEKERA",
      position: "Co chief organizer",
      image: "/images/contacts/Pasindu.jpg",
      icon: <FiMail />,
      icon2: <FaLinkedin />,
      icon3: <IoIosCall />,
    },
    {
      name: "AMIRTHA BALENDRAN",
      position: "Co chief organizer",
      image: "/images/contacts/Oshadi.jpg",
      icon: <FiMail />,
      icon2: <FaLinkedin />,
      icon3: <IoIosCall />,
    },
    {
      name: "LEYANA DABARE",
      position: "Co chief organizer",
      image: "/images/contacts/Umaya.jpg",
      icon: <FiMail />,
      icon2: <FaLinkedin />,
      icon3: <IoIosCall />,
    },
    {
      name: "LEYANA DABARE",
      position: "Co chief organizer",
      image: "/images/contacts/Harischandra.jpg",
      icon: <FiMail />,
      icon2: <FaLinkedin />,
      icon3: <IoIosCall />,
    },
    {
      name: "LEYANA DABARE",
      position: "Co chief organizer",
      image: "/images/contacts/Hesanda.jpg",
      icon: <FiMail />,
      icon2: <FaLinkedin />,
      icon3: <IoIosCall />,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="px-10 md:pb-40 flex flex-col items-center justify-start py-12"
    >
      <h2 className="text-4xl font-bold text-center mb-8 section-title">
        OUR TEAM
      </h2>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {teamMembers.map((member, index) => (
            <CarouselItem
              key={index}
              className="basis-full xsm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex items-center justify-center"
            >
              <div className="p-2" ref={(el) => (cardsRef.current[index] = el)}>
                <Card className="rounded-xl shadow-md w-[250px] h-[300px]">
                  <CardContent className="flex flex-col text-center items-center justify-center p-6 space-y-4">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#333842] shadow">
                      <ExportedImage
                        src={member.image}
                        alt={member.name}
                        width={112}
                        height={112}
                        className="object-cover w-full h-full"
                        priority
                        unoptimized={true}
                      />
                    </div>

                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.position}</p>

                    <div className="flex gap-4 text-xl text-gray-700">
                      {member.icon}
                      {member.icon2}
                      {member.icon3}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ContactSection;
