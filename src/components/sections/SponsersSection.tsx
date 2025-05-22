"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import SponsorCard from "../SponserCard";

const sponsors = [
  {
    id: 6,
    name: "TIQRI",
    image: "/images/sponsers/tiqri.png",
    width: 200,
    height: 50,
    partnerType: "Platinum sponsor and Knowledge  Partner",
    // website: "https://fortude.co",
  },
  {
    id: 1,
    name: "HackSL",
    image: "/images/sponsers/hacksl-logo.png",
    width: 100,
    height: 50,
    partnerType: "Official Media Partner",
    // website: "https://wso2.com",
  },
  {
    id: 2,
    name: "Canon - Metropolitan",
    image: "/images/sponsers/metropoliton-logo.png",
    width: 200,
    height: 50,
    partnerType: "Official Imaging Partner",
    // website: "https://fortude.co",
  },
  {
    id: 3,
    name: "Ragama Pharmacy",
    image: "/images/sponsers/ragama-pharmacy.png",
    width: 200,
    height: 50,
    partnerType: "Sponsor",
    // website: "https://fortude.co",
  },
  {
    id: 4,
    name: "ICTS",
    image: "/images/sponsers/icts.png",
    width: 200,
    height: 50,
    partnerType: "Supported By",
    // website: "https://fortude.co",
  },
  {
    id: 5,
    name: "WSO2",
    image: "/images/sponsers/wso2-logo.png",
    width: 200,
    height: 50,
    partnerType: "Official Knowledge Partner",
    // website: "https://fortude.co",
  },
];

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SponsorsSection = () => {
  const [hoveredSponsor, setHoveredSponsor] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Refs for animated elements
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onApiReady = (api: CarouselApi) => {
    if (!api) return;

    setApi(api);
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  };

  // Animation setup
  useEffect(() => {
    // Initial state - hide elements
    gsap.set(
      [
        badgeRef.current,
        titleRef.current,
        descriptionRef.current,
        buttonRef.current,
      ],
      {
        autoAlpha: 0,
        y: 30,
      }
    );

    gsap.set(dividerRef.current, {
      width: 0,
      autoAlpha: 1,
    });

    gsap.set(sponsorsRef.current, {
      autoAlpha: 0,
    });

    // Create the scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });

    // Add animations to timeline
    tl.to(badgeRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    })
      .to(
        titleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        dividerRef.current,
        {
          width: 120,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.3"
      )
      .to(
        descriptionRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(sponsorsRef.current, {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(
        buttonRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => {
      // Clean up ScrollTrigger
      if (ScrollTrigger) ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Container variants for staggered appearance
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.15,
  //     },
  //   },
  // };

  const handlePartnershipAction = () => {
    // Email option - mailto link
    window.location.href =
      "mailto:itlegacy.team@gmail.com?subject=Partnership%20Inquiry&body=I'm%20interested%20in%20partnering%20with%20your%20event.";
  };

  return (
    <section
      ref={sectionRef}
      className="pt-20 pb-24 px-6 relative overflow-hidden bg-[#191b1f] text-white"
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#333842 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Subtle glow elements */}
      <div
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(77,150,255,0.05) 0%, rgba(0,0,0,0) 70%)",
        }}
      ></div>
      <div
        className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,215,0,0.05) 0%, rgba(0,0,0,0) 70%)",
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header content with animation */}
        <div className="text-center mb-16">
          <span
            ref={badgeRef}
            className="inline-block px-4 py-1 rounded-full bg-[#262930] text-white font-medium text-sm mb-4 border border-[#333842]"
          >
            PARTNERS
          </span>

          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Our Valued Partners
          </h2>

          <div
            ref={dividerRef}
            className="h-1 bg-[#FFD700] mx-auto mb-8 rounded-full"
          ></div>

          <p ref={descriptionRef} className="text-gray-300 max-w-2xl mx-auto">
            We extend our heartfelt gratitude to our partners who make Road to
            Legacy 2.0 possible. Their support helps us empower the next
            generation of IT professionals.
          </p>
        </div>

        {/* Responsive Carousel */}
        <div ref={sponsorsRef} className="mb-16">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={onApiReady}
          >
            <CarouselContent>
              {sponsors.map((sponsor) => (
                <CarouselItem
                  key={sponsor.id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="flex justify-center p-4">
                    <div className="w-full max-w-xs">
                      <SponsorCard
                        image={sponsor.image}
                        width={sponsor.width}
                        height={sponsor.height}
                        partnerType={sponsor.partnerType}
                        name={sponsor.name}
                        // website={sponsor.website}
                        isHovered={hoveredSponsor === sponsor.id}
                        onHover={() => setHoveredSponsor(sponsor.id)}
                        onLeave={() => setHoveredSponsor(null)}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-6">
            {sponsors.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className="relative w-8 h-2 mx-1 focus:outline-none"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      currentIndex === index ? "#FFD700" : "#262930",
                    transform:
                      currentIndex === index ? "scaleX(1.2)" : "scaleX(1)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Become a partner button */}
        <div className="text-center">
          <button
            ref={buttonRef}
            onClick={handlePartnershipAction}
            className="inline-flex items-center px-6 py-3 rounded-full bg-[#262930] hover:bg-[#2c3039] text-white font-medium transition-all border border-[#333842] shadow-lg hover:shadow-xl"
          >
            Become a Partner
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
