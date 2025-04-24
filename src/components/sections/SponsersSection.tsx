import { useState, useEffect, useRef } from "react";
import SponsorCard from "../SponserCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sponsors = [
  {
    id: 1,
    name: "WSO2",
    image: "/images/sponsers/wso2-logo.png",
    width: 100,
    height: 50,
    tier: "GOLD",
    website: "https://wso2.com",
  },
  {
    id: 2,
    name: "Fortude",
    image: "/images/sponsers/fortude-logo.png",
    width: 200,
    height: 50,
    tier: "GOLD",
    website: "https://fortude.co",
  },
];


// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SponsorsSection = () => {
  // Data centralization for easier management
  
  const [hoveredSponsor, setHoveredSponsor] = useState<number | null>(null);

  // Create refs for animated elements
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sponsorRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          width: 96, // 24rem in pixels
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

    // Create individual animations for each sponsor card with staggered effect
    if (sponsorRefs.current.length > 0) {
      gsap.fromTo(
        sponsorRefs.current,
        {
          y: 40,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sponsorsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger
      if (ScrollTrigger) ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Set up sponsor refs array when sponsors data changes
  useEffect(() => {
    sponsorRefs.current = sponsorRefs.current.slice(0, sponsors.length);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-10 top-10 mb-20 px-6 text-center relative overflow-hidden bg-[#191b1f] text-white"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <span
          ref={badgeRef}
          className="inline-block px-4 py-1 rounded-full bg-[#333842] text-white font-medium text-sm mb-4"
        >
          SUPPORTERS
        </span>

        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
        >
          Our Valued Sponsors
        </h2>

        <div
          ref={dividerRef}
          className="h-1 bg-[#FFD700] mx-auto mb-8 rounded-full"
        ></div>

        <p
          ref={descriptionRef}
          className="text-gray-300 max-w-2xl mx-auto mb-16"
        >
          We extend our heartfelt gratitude to our sponsors who make Road to
          Legacy 2.0 possible. Their support helps us empower the next
          generation of IT professionals.
        </p>

        <div
          ref={sponsorsRef}
          className="flex flex-wrap justify-center items-center gap-10"
        >
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
              ref={(el) => {
                sponsorRefs.current[index] = el;
              }}
              className="sponsor-card-wrapper"
            >
              <SponsorCard
                image={sponsor.image}
                width={sponsor.width}
                height={sponsor.height}
                tier={sponsor.tier}
                name={sponsor.name}
                website={sponsor.website}
                isHovered={hoveredSponsor === sponsor.id}
                onHover={() => setHoveredSponsor(sponsor.id)}
                onLeave={() => setHoveredSponsor(null)}
              />
            </div>
          ))}
        </div>

        <button
          ref={buttonRef}
          className="mt-16 inline-flex items-center px-6 py-3 rounded-full bg-[#262930] hover:bg-[#333842] text-white font-medium transition-all border border-[#333842]"
        >
          Become a Sponsor
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
    </section>
  );
};

export default SponsorsSection;
