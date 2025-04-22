"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoIosCall } from "react-icons/io";
import "./ContactSection.css";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const teamMembers = [
    {
      name: "Dheeshana Alagiyawanna",
      position: "Co chief organizer",
      image: "/images/contacts/Dheeshana.jpg",
      email: { email: "dheeshanaalagiyawanna@gmail.com", icon: <FiMail /> },
      linkedIn: {
        linkedIn:
          "https://www.linkedin.com/in/dheeshana-alagiyawanna-901948283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
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
        linkedIn:
          "https://www.linkedin.com/in/oshadi-liyanage?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
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
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="contact"
      ref={sectionRef}
      className="px-10 md:pb-40 flex flex-col items-center justify-start py-12"
    >
      <h2 className="text-4xl font-bold text-center mb-8 section-title">
        CONTACT US
      </h2>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {teamMembers.map((member, index) => (
            <CarouselItem
              key={index}
              className="basis-full xsm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex items-center justify-center"
            >
              <div
                className="p-2"
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
              >
                <Card className="rounded-xl shadow-md w-[250px] h-[300px]">
                  <CardContent className="w-full h-full flex flex-col text-center items-center justify-between p-6 space-y-">
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
                      <a
                        href={`mailto:${member.email.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition"
                      >
                        {member.email.icon}
                      </a>
                      <a
                        href={member.linkedIn.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition"
                      >
                        {member.linkedIn.icon}
                      </a>
                      <a
                        href={`tel:${member.phone.phone}`}
                        className="hover:text-blue-500 transition"
                      >
                        {member.phone.icon}
                      </a>
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
