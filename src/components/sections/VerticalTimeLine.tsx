import { AnimatePresence, motion } from "framer-motion";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef, useState } from "react";

const EventSpeakerSessions = () => {
  const [activeSession, setActiveSession] = useState(0);
  const [, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // useEffect(() => {
  //   if (!titleRef) return;
  //   const ctx = gsap.context(() => {
  //     // Title animation
  //     gsap.fromTo(
  //       titleRef.current,
  //       { opacity: 0, y: 30 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 1.2,
  //         ease: "power3.out",
  //         scrollTrigger: {
  //           trigger: titleRef.current,
  //           start: "top 85%",
  //         },
  //       }
  //     );

  //     // Line animation
  //     gsap.fromTo(
  //       ".title-line",
  //       { scaleX: 0 },
  //       {
  //         scaleX: 1,
  //         duration: 1.5,
  //         ease: "power2.out",
  //         delay: 0.3,
  //         scrollTrigger: {
  //           trigger: titleRef.current,
  //           start: "top 85%",
  //         },
  //       }
  //     );
  //   }, sectionRef);

  //   // Add custom CSS to hide the default arrow
  //   const style = document.createElement("style");
  //   style.innerHTML = `
  //       .custom-accordion-trigger[data-state="open"] > svg,
  //       .custom-accordion-trigger[data-state="closed"] > svg {
  //         display: none !important;
  //       }
  //     `;
  //   document.head.appendChild(style);

  //   return () => {
  //     ctx.revert();
  //     document.head.removeChild(style);
  //   };
  // }, []);

  // Check for mobile viewport on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Sample data - replace with your actual sessions data
  const sessions = [
    {
      id: 1,
      title: "Software Engineering Session",
      time: "9:00 AM - 9:50 AM",
      speaker: "Dr. Sarah Johnson",
      role: "CTO at TechInnovate",
      image: "/images/speakers/se-domain.png",
      description:
        "Exploring modern development practices and the future of software engineering with hands-on examples and case studies.",
      location: "Main Hall",
    },
    {
      id: 2,
      title: "Cybersecurity & AI",
      time: "9:50 AM - 10:40 AM",
      speaker: "Michael Chen",
      role: "Security Researcher",
      image: "/images/speakers/cyber-domain.png",
      description:
        "Uncovering the intersection between artificial intelligence and cybersecurity challenges in today's digital landscape.",
      location: "Workshop Room A",
    },
    {
      id: 3,
      title: "Project Management & Business Analysis",
      time: "11:30 AM - 12:15 PM",
      speaker: "Emily Rodriguez",
      role: "Senior PM at GlobalTech",
      image: "/images/speakers/business-domain.png",
      description:
        "Strategic approaches to project execution and effective business analysis techniques for modern organizations.",
      location: "Conference Room B",
    },
    {
      id: 4,
      title: "Gaming Development",
      time: "2:15 PM - 3:00 PM",
      speaker: "Alex Thompson",
      role: "Lead Game Developer",
      image: "/images/speakers/game-domain.png",
      description:
        "Building immersive gaming experiences: from concept to deployment with the latest tools and technologies.",
      location: "Innovation Lab",
    },
  ];

  // Loading animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const sideNavVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="sessions"
      ref={sectionRef}
      className="py-8 pb-16 md:pb-16 bg-gradient-to-b from-[#191b1f] to-[#1f2227] relative overflow-hidden"
    >
      {!isVisible ? (
        <div className="container mx-auto px-4 flex items-center justify-center py-24">
          <div className="flex space-x-3">
            <div className="h-3 w-3 bg-white rounded-full animate-pulse"></div>
            <div className="h-3 w-3 bg-white rounded-full animate-pulse delay-150"></div>
            <div className="h-3 w-3 bg-white rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      ) : (
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-5" variants={headerVariants}>
            <h2 ref={titleRef} className="text-5xl font-bold mb-4 text-white">
              Event Sessions
            </h2>
            <div className="flex justify-center">
              <div
                className="title-line h-1 w-24 rounded-full mb-10"
                style={{ backgroundColor: "#333842" }}
              ></div>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Join our industry-leading speakers for insightful sessions
              throughout the day
            </p>
          </motion.div>

          {/* Mobile Session Navigation - Horizontal Scrollable */}
          <motion.div
            className="md:hidden mb-6 overflow-x-auto -mx-4 px-4"
            variants={contentVariants}
          >
            <div className="flex space-x-3 pb-3 min-w-max">
              {sessions.map((session, index) => (
                <div
                  key={`mobile-nav-${session.id}`}
                  className={`p-3 rounded-lg border min-w-[180px] max-w-[180px] cursor-pointer transition-all duration-300 ${
                    activeSession === index
                      ? "border-[#333842] bg-[#2c3039]"
                      : "border-[#333842]/30 bg-[#262930]"
                  }`}
                  onClick={() => setActiveSession(index)}
                >
                  <div className="flex items-center mb-1">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        activeSession === index ? "bg-white" : "bg-[#333842]"
                      }`}
                    ></div>
                    <p className="text-xs text-gray-400 truncate">
                      {session.time}
                    </p>
                  </div>
                  <p
                    className={`font-medium text-sm truncate ${
                      activeSession === index ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {session.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-4 md:gap-8">
            {/* Session Navigation - Desktop Left Side */}
            <motion.div
              className="hidden md:block md:col-span-4 lg:col-span-3"
              variants={sideNavVariants}
            >
              <div className="bg-[#262930] rounded-xl p-4 sticky top-24 border border-[#333842]/30">
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    className={`p-4 rounded-lg mb-3 cursor-pointer transition-all duration-300 ${
                      activeSession === index
                        ? "bg-[#2c3039] border border-[#333842]"
                        : "hover:bg-[#2c3039]/50 border border-transparent"
                    }`}
                    onClick={() => setActiveSession(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          activeSession === index ? "bg-white" : "bg-[#333842]"
                        }`}
                      ></div>
                      <div>
                        <p
                          className={`font-medium ${
                            activeSession === index
                              ? "text-white"
                              : "text-gray-300"
                          }`}
                        >
                          {session.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Session Details - Right Side */}
            <motion.div
              className="md:col-span-8 lg:col-span-9 flex flex-col items-center justify-center "
              variants={contentVariants}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSession}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#262930] rounded-xl overflow-hidden shadow-xl border border-[#333842]/30"
                >
                  {/* Mobile & Desktop Layout */}
                  <div className="flex flex-col md:grid md:grid-cols-7 h-full">
                    {/* Speaker Image */}
                    <div className="md:col-span-3 h-48 sm:h-64 md:h-auto relative">
                      {/* Enhanced Image Overlay - Multiple gradient layers */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#191b1f] via-transparent to-transparent z-10"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#191b1f]/70 z-10"></div>
                      <div className="absolute inset-0 bg-[#191b1f]/20 z-10"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#333842]/50 z-10"></div>

                      {/* Mesh pattern overlay */}
                      <div className="absolute inset-0 mix-blend-overlay opacity-10 z-10">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cline x1='0' y1='0' x2='100' y2='100' stroke='%23ffffff' stroke-width='0.5'/%3E%3Cline x1='100' y1='0' x2='0' y2='100' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
                            backgroundSize: "20px 20px",
                          }}
                        ></div>
                      </div>

                      <ExportedImage
                        src={sessions[activeSession].image}
                        alt={sessions[activeSession].speaker}
                        className="object-cover object-[50%_25%] md:object-[50%_50%] h-full w-full"
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />

                      {/* Mobile session title overlay on image */}
                      <div className="md:hidden absolute top-0 left-0 right-0 p-4 pt-6 bg-gradient-to-b from-[#191b1f] to-transparent">
                        <h3 className="text-xl font-bold z-10 text-white truncate">
                          {sessions[activeSession].title}
                        </h3>
                      </div>
                    </div>

                    {/* Session Info */}
                    <div className="md:col-span-4 p-4 sm:p-6 md:p-8">
                      {/* Desktop session title - hidden on mobile */}
                      <h3 className="hidden md:block text-2xl md:text-3xl font-bold text-white mb-2">
                        {sessions[activeSession].title}
                      </h3>

                      <div className="flex items-center flex-wrap gap-2 mb-4">
                        <div className="px-3 py-1 bg-[#2c3039] border border-[#333842]/50 rounded-full text-xs sm:text-sm text-gray-300">
                          {sessions[activeSession].time}
                        </div>
                      </div>

                      {/* <div className="flex items-center mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2c3039] border border-[#333842] flex items-center justify-center text-white font-bold text-sm sm:text-base">
                          {sessions[activeSession].speaker.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-white text-sm sm:text-base">
                            {sessions[activeSession].speaker}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {sessions[activeSession].role}
                          </p>
                        </div>
                      </div> */}

                      <p className="text-gray-300 mb-6 text-sm sm:text-base">
                        {sessions[activeSession].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Session Navigation Controls - Mobile & Desktop */}
              <div className="w-full flex justify-between mt-4 md:mt-6">
                <button
                  onClick={() =>
                    setActiveSession((prev) =>
                      prev === 0 ? sessions.length - 1 : prev - 1
                    )
                  }
                  className="p-2 sm:p-3 rounded-lg bg-[#262930] hover:bg-[#2c3039] border border-[#333842]/30 text-gray-300 transition-colors duration-300"
                  aria-label="Previous session"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>

                <div className="flex items-center">
                  {sessions.map((_, index) => (
                    <button
                      key={`indicator-${index}`}
                      onClick={() => setActiveSession(index)}
                      className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                        activeSession === index
                          ? "bg-white w-3"
                          : "bg-[#333842]"
                      }`}
                      aria-label={`Go to session ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setActiveSession((prev) =>
                      prev === sessions.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="p-2 sm:p-3 rounded-lg bg-[#262930] hover:bg-[#2c3039] border border-[#333842]/30 text-gray-300 transition-colors duration-300"
                  aria-label="Next session"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Decorative Mesh Background */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cline x1='0' y1='0' x2='100' y2='100' stroke='%23333842' stroke-width='0.5'/%3E%3Cline x1='100' y1='0' x2='0' y2='100' stroke='%23333842' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>
    </section>
  );
};

export default EventSpeakerSessions;
