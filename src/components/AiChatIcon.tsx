import { JSX, useEffect, useRef, useState } from "react";

// Define interfaces for state
interface Position {
  x: number | null;
  y: number | null;
}

interface DragOffset {
  x: number;
  y: number;
}

export default function AiChatIcon(): JSX.Element {
  const [position, setPosition] = useState<Position>({ x: null, y: null });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const botRef = useRef<HTMLDivElement | null>(null);

  // Set initial position to bottom right corner
  useEffect(() => {
    if (position.x === null && position.y === null) {
      const initialX = window.innerWidth - 120;
      const initialY = window.innerHeight - 120;
      setPosition({ x: initialX, y: initialY });
    }
  }, [position]);

  // Handle window resize to keep bot in view
  useEffect(() => {
    const handleResize = (): void => {
      setPosition((prev) => {
        const newX = Math.min(prev.x ?? 0, window.innerWidth - 100);
        const newY = Math.min(prev.y ?? 0, window.innerHeight - 100);
        return { x: newX, y: newY };
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Drag start handler
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Prevent default to avoid text selection
    e.preventDefault();

    if (botRef.current) {
      const rect = botRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  // Touch start handler for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (botRef.current && e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const rect = botRef.current.getBoundingClientRect();
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  // Drag handler with improved smoothness
  const handleMouseMove = (e: MouseEvent): void => {
    if (!isDragging) return;

    // Prevent selection during drag
    if (e.preventDefault) {
      e.preventDefault();
    }

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Keep within viewport bounds
    const boundedX = Math.max(0, Math.min(window.innerWidth - 100, newX));
    const boundedY = Math.max(0, Math.min(window.innerHeight - 100, newY));

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setPosition({ x: boundedX, y: boundedY });
    });
  };

  // Touch move handler for mobile devices with improved smoothness
  const handleTouchMove = (e: TouchEvent): void => {
    if (!isDragging || !e.touches || !e.touches[0]) return;

    // Prevent scrolling and selection
    e.preventDefault();

    const touch = e.touches[0];
    const newX = touch.clientX - dragOffset.x;
    const newY = touch.clientY - dragOffset.y;

    // Keep within viewport bounds
    const boundedX = Math.max(0, Math.min(window.innerWidth - 100, newX));
    const boundedY = Math.max(0, Math.min(window.innerHeight - 100, newY));

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setPosition({ x: boundedX, y: boundedY });
    });
  };

  // Drag end handler
  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  // Set up event listeners for drag operations
  useEffect(() => {
    if (isDragging) {
      // Disable text selection on body during dragging
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
    //   document.body.style.msUserSelect = "none";
    //   document.body.style.mozUserSelect = "none";

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleMouseUp);
    } else {
      // Re-enable text selection when not dragging
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
    //   document.body.style.msUserSelect = "";
    //   document.body.style.mozUserSelect = "";

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    }

    return () => {
      // Reset text selection on cleanup
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      document.body.style.userSelect = "";
      document.body.style.userSelect = "";

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const handleClick = (): void => {
    // Add your chat opening logic here
    console.log("Bot clicked - open chat interface");
  };

  return (
    <div
      ref={botRef}
      className={`fixed w-20 h-20 cursor-pointer z-50 transition-shadow duration-300 rounded-full overflow-hidden ${isDragging ? "cursor-grabbing shadow-lg" : "hover:shadow-md"}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: isDragging ? "none" : "auto",
        willChange: "transform", // Optimize for animations
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={isDragging ? undefined : handleClick}
    >
      {/* WhatsApp Bot SVG - Updated colors to match WhatsApp branding */}
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="whatsappGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#25D366" />
            <stop offset="100%" stopColor="#075E54" />
          </linearGradient>

          <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#25D366" floodOpacity="0.3" result="glow" />
            <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M100,45 C65,45 35,70 35,100 C35,112 40,123 48,132 L40,160 L70,147 C79,153 89,155 100,155 C135,155 165,130 165,100 C165,70 135,45 100,45 Z"
          fill="url(#whatsappGradient)"
          filter="url(#subtle-glow)"
        >
          <animate
            attributeName="d"
            values="M100,45 C65,45 35,70 35,100 C35,112 40,123 48,132 L40,160 L70,147 C79,153 89,155 100,155 C135,155 165,130 165,100 C165,70 135,45 100,45 Z;
                    M100,47 C67,47 37,72 37,100 C37,112 42,122 49,131 L42,158 L71,145 C79,151 89,153 100,153 C133,153 163,128 163,100 C163,72 133,47 100,47 Z;
                    M100,45 C65,45 35,70 35,100 C35,112 40,123 48,132 L40,160 L70,147 C79,153 89,155 100,155 C135,155 165,130 165,100 C165,70 135,45 100,45 Z"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        <rect x="75" y="75" width="50" height="45" rx="10" ry="10" fill="white">
          <animate
            attributeName="y"
            values="75;77;75"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        <circle cx="85" cy="95" r="5" fill="#075E54">
          <animate
            attributeName="r"
            values="5;6;5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="115" cy="95" r="5" fill="#075E54">
          <animate
            attributeName="r"
            values="6;5;6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        <line
          x1="100"
          y1="75"
          x2="100"
          y2="65"
          stroke="white"
          strokeWidth="3"
        />
        <circle cx="100" cy="60" r="5" fill="white">
          <animate
            attributeName="cy"
            values="60;58;60"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="5;6;5"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>

        <rect x="85" y="110" width="30" height="5" rx="2" ry="2" fill="#075E54">
          <animate
            attributeName="width"
            values="20;30;20"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x"
            values="90;85;90"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>

        <path
          d="M70,100 C65,100 60,100 55,100"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M70,100 C65,105 60,105 55,105"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0"
            dur="2s"
            begin="0.3s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M70,100 C65,95 60,95 55,95"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0"
            dur="2s"
            begin="0.6s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M130,100 C135,100 140,100 145,100"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0"
            dur="2s"
            begin="1s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M130,100 C135,105 140,105 145,105"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0"
            dur="2s"
            begin="1.3s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M130,100 C135,95 140,95 145,95"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0"
            dur="2s"
            begin="1.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Ripple effect when clicking */}
      {!isDragging && (
        <div className="absolute inset-0 bg-transparent overflow-hidden rounded-full">
          <span
            className="absolute inset-0 bg-[#333842] opacity-0 scale-0 rounded-full transform origin-center
                          hover:animate-ping hover:opacity-10 transition-all duration-300"
          ></span>
        </div>
      )}
    </div>
  );
}
