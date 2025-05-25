import { AnimatePresence, motion } from "framer-motion";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef, useState } from "react";

// Profile Image Component with fallback to letter
const ProfileImage = ({ speaker, size = "w-8 h-8 sm:w-10 sm:h-10" }: { speaker: { name: string; profileImage?: string }; size?: string }) => {
  // const [imageError, setImageError] = useState(false);

  if (!speaker.profileImage) {
    return (
      <div
        className={`${size} rounded-full mr-5 bg-[#2c3039] border border-[#333842] flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0`}
      >
        {speaker.name.charAt(0)}
      </div>
    );
  }

  return (
    <div
      className={`${size} rounded-full mr-5 border border-[#333842] overflow-hidden flex-shrink-0`}
    >
      <ExportedImage
        src={speaker.profileImage}
        alt={speaker.name}
        className="object-cover w-full h-full"
        width={40}
        height={40}
        // onError={() => setImageError(true)}
      />
    </div>
  );
};
const EventSpeakerSessions = () => {
  const [activeSession, setActiveSession] = useState(0);
  const [, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

  // Updated sessions data with real information
  const sessions = [
    {
      id: 1,
      title: "Software Engineering Session",
      company: "WSO2",
      speakers: [
        {
          name: "Omal Wijegunawardana",
          role: "Software Engineer at WSO2",
          linkedin: "https://www.linkedin.com/in/omalvindula/",
          profileImage: "/images/speakers/omal.png",
        },
        {
          name: "Nipuni Paaris",
          role: "Software Engineer",
          linkedin: "https://www.linkedin.com/in/nipuni-paaris-a0a284135/",
          profileImage: "",
        },
      ],
      image: "/images/speakers/se-domain.png",
      description:
        "Exploring modern development practices and the future of software engineering with hands-on examples and case studies from industry experts at WSO2.",
      location: "Main Hall",
    },
    {
      id: 2,
      title: "AI & Cybersecurity Session",
      company: "TIQRI",
      speakers: [
        {
          name: "Nipuna Ruhunage",
          role: "AI & Cybersecurity Expert",
          linkedin: "https://www.linkedin.com/in/nipuna-ruhunage/",
          profileImage: "",
        },
        {
          name: "Shamali Weerasinghe",
          role: "Cybersecurity Specialist",
          linkedin: "https://www.linkedin.com/in/shamali-weerasinghe-05352173/",
          profileImage: "",
        },
      ],
      image: "/images/speakers/cyber-domain.png",
      description:
        "Uncovering the intersection between artificial intelligence and cybersecurity challenges in today's digital landscape with insights from TIQRI experts.",
      location: "Workshop Room A",
    },
    {
      id: 3,
      title: "Project Management & Business Analysis",
      company: "Glass Software",
      speakers: [
        {
          name: "Hashini Perera",
          role: "Project Manager",
          linkedin:
            "https://www.linkedin.com/in/hashy-perera?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
          profileImage: "",
        },
      ],
      image: "/images/speakers/business-domain.png",
      description:
        "Strategic approaches to project execution and effective business analysis techniques for modern organizations with industry best practices.",
      location: "Conference Room B",
    },
    {
      id: 4,
      title: "Game Development Session",
      company: "Mogo",
      speakers: [
        {
          name: "Dakshina Wijayakulathilaka",
          role: "Lead Game Developer at Mogo",
          linkedin: "#",
        },
      ],
      image: "/images/speakers/game-domain.png",
      description:
        "Building immersive gaming experiences: from concept to deployment with the latest tools and technologies in the gaming industry.",
      location: "Innovation Lab",
    },
    {
      id: 5,
      title: "Panel Discussion",
      company: "Industry Leaders",
      speakers: [
        {
          name: "Dulaj Prabasha",
          role: "Software Engineer at WSO2",
          linkedin: "https://lk.linkedin.com/in/dulaj-prabasha-007",
          profileImage: "/images/speakers/dulaj.jpg",
        },
        {
          name: "Rukshan Senanayake",
          role: "Software Engineer at Enzi LLC",
          linkedin:
            "https://www.linkedin.com/in/rukshanjs?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          profileImage: "/images/speakers/rukshan.jpg",
        },
        {
          name: "Vishwajith Weerasinghe",
          role: "Senior Software Engineer at EchonLabs Private Limited",
          linkedin:
            "https://www.linkedin.com/in/vishwajith-weerasinghe-8a0225192/",
        },
      ],
      image: "/images/speakers/discussion.png",
      description:
        "An interactive panel discussion with industry professionals sharing insights about career growth, technology trends, and professional development.",
      location: "Main Hall",
    },
    {
      id: 6,
      title: "Motivational Speech",
      company: "Popcorn Teams",
      speakers: [
        {
          name: "Fahad Farook",
          role: "International Trainer & Certified Transformative Coach | Co-Founder of Popcorn Teams",
          linkedin: "http://linkedin.com/in/ffarook",
          profileImage: "",
        },
      ],
      image: "/images/speakers/motivational-speech.png",
      description:
        "An inspiring session on personal and professional transformation, leadership, and achieving excellence in your career journey.",
      location: "Main Hall",
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
                        alt={
                          sessions[activeSession].speakers[0]?.name ||
                          sessions[activeSession].title
                        }
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

                      {/* Company Badge */}
                      <div className="flex items-center flex-wrap gap-2 mb-4">
                        <div className="px-3 py-1 bg-[#2c3039] border border-[#333842]/50 rounded-full text-xs sm:text-sm text-gray-300">
                          {sessions[activeSession].company}
                        </div>
                      </div>

                      {/* Speakers Information */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          {sessions[activeSession].speakers.length > 1
                            ? "Speakers"
                            : "Speaker"}
                        </h4>
                        {sessions[activeSession].speakers.map(
                          (speaker, index) => (
                            <div
                              key={index}
                              className="flex items-start mb-4 last:mb-0"
                            >
                              {/* <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2c3039] border border-[#333842] flex items-center justify-center text-white font-bold text-sm sm:text-base mr-3 flex-shrink-0">
                              {speaker.name.charAt(0)}
                            </div> */}
                              <ProfileImage speaker={speaker} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium text-white text-sm sm:text-base truncate">
                                    {speaker.name}
                                  </p>
                                  <div className="flex gap-1">
                                    {speaker.linkedin && (
                                      <a
                                        href={speaker.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 rounded bg-[#0077B5] hover:bg-[#005885] transition-colors"
                                        aria-label={`${speaker.name}'s LinkedIn`}
                                      >
                                        <svg
                                          className="w-3 h-3 text-white"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                      </a>
                                    )}
                                    
                                  </div>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-400 leading-tight">
                                  {speaker.role}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>

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
