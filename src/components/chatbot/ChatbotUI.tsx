"use client";

import axios from "axios";
import { MessageSquare, Move, Send, X } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  text: string;
  isBot: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface DragOffset {
  x: number;
  y: number;
}

const ChatbotUI: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>(() => {
    // Initial position in bottom right corner
    return {
      x: typeof window !== "undefined" ? window.innerWidth - 80 : 20,
      y: typeof window !== "undefined" ? window.innerHeight - 100 : 20,
    };
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const [wasDragging, setWasDragging] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  // Store initial touch position for mobile
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Constants for sizing
  const CHAT_WIDTH = 320; // Width of chat window (w-80 = 320px)
  const CHAT_HEIGHT = 400; // Approximate height of chat window
  const ICON_SIZE = isMounted && window.innerWidth <= 768 ? 80 : 48; // Size of the chat icon
  const DRAG_THRESHOLD = 10; // Minimum pixels moved to consider it a drag rather than a tap

  // Handle client-side initialization
  useEffect(() => {
    setIsMounted(true);
    // Set initial position after component mounts on client-side
    setPosition({
      x: typeof window !== "undefined" ? window.innerWidth - 110 : 20,
      y: typeof window !== "undefined" ? window.innerHeight - 100 : 20,
    });
  }, []);

  // Update position for different screen sizes
  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      setPosition((prev) => {
        // Keep the icon within the viewport bounds when resizing
        const newX = Math.min(prev.x, window.innerWidth - 80);
        const newY = Math.min(prev.y, window.innerHeight - 100);
        return { x: newX, y: newY };
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Adjust chat window position when opened
  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      ensureChatWindowVisibility();
    }
  }, [isOpen]);

  const ensureChatWindowVisibility = () => {
    if (!chatWindowRef.current) return;

    // Get chat window dimensions
    const rect = chatWindowRef.current.getBoundingClientRect();

    // Check if the chat window is partially outside the viewport
    const isPartiallyOutsideViewport =
      rect.left < 0 ||
      rect.top < 0 ||
      rect.right > window.innerWidth ||
      rect.bottom > window.innerHeight;

    if (isPartiallyOutsideViewport) {
      // Reposition the chat window to be fully visible
      const style = chatWindowRef.current.style;

      // Adjust horizontal position
      if (rect.left < 0) {
        style.left = "10px";
        style.right = "auto";
      } else if (rect.right > window.innerWidth) {
        style.right = "10px";
        style.left = "auto";
      }

      // Adjust vertical position
      if (rect.top < 0) {
        style.top = "10px";
        style.bottom = "auto";
      } else if (rect.bottom > window.innerHeight) {
        style.bottom = "10px";
        style.top = "auto";
      }
    }
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent text selection

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsDragging(true);
    setWasDragging(false); // Reset drag tracking

    // Add a class to the body to prevent text selection during drag
    document.body.classList.add("no-select");
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Don't prevent default here as it can interfere with touch events on mobile

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];

      // Store touch start position for detecting if it was a drag or tap
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };

      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
    setIsDragging(true);
    setWasDragging(false); // Reset drag tracking

    // Add a class to the body to prevent text selection during drag
    document.body.classList.add("no-select");
  };

  const handleDrag = React.useCallback(
    (clientX: number, clientY: number) => {
      if (isDragging) {
        const newX = Math.min(
          Math.max(0, clientX - dragOffset.x),
          window.innerWidth - 60
        );
        const newY = Math.min(
          Math.max(0, clientY - dragOffset.y),
          window.innerHeight - 60
        );
        setPosition({ x: newX, y: newY });

        // Check if this was actually a drag (moved more than threshold px)
        if (touchStartRef.current) {
          const deltaX = Math.abs(clientX - touchStartRef.current.x);
          const deltaY = Math.abs(clientY - touchStartRef.current.y);

          if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
            setWasDragging(true);
          }
        } else {
          // For mouse events, we'll just set this to true
          setWasDragging(true);
        }
      }
    },
    [isDragging, dragOffset]
  );

  const handleDragEnd = () => {
    setIsDragging(false);
    // Reset touch start position
    touchStartRef.current = null;
    // Remove the no-select class
    document.body.classList.remove("no-select");
  };

  useEffect(() => {
    if (!isMounted) return;

    // Add global CSS rule to prevent text selection during drag
    const style = document.createElement("style");
    style.innerHTML = `
      .no-select {
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
      }
    `;
    document.head.appendChild(style);

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDrag(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    // Touch event handlers
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        e.preventDefault(); // Prevent scrolling while dragging
        handleDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      // Remove event listeners
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.head.removeChild(style);
    };
  }, [isDragging, handleDrag, isMounted]);

  const toggleChat = (): void => {
    // Only toggle if not dragging or wasn't dragging
    if (!wasDragging) {
      setIsOpen(!isOpen);
    }
    // Reset the wasDragging state after handling the click event
    setTimeout(() => {
      setWasDragging(false);
    }, 10);
  };

  const sendMessage = async (): Promise<void> => {
    if (inputValue.trim()) {
      setLoading(true);
      // Add user message
      setMessages([...messages, { text: inputValue, isBot: false }]);
      const currentInputValue = inputValue;
      setInputValue("");

      try {
        const response = await axios.get(
          `https://us-central1-roadtolecacy.cloudfunctions.net/api/ask-gemi?question=${encodeURIComponent(currentInputValue)}`
        );

        if (response.data) {
          setMessages((prev) => [
            ...prev,
            {
              text: response.data.answer,
              isBot: true,
            },
          ]);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, I couldn't find an answer to your question.",
            isBot: true,
          },
        ]);
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Adjust position for mobile
  // const isMobile = isMounted && window.innerWidth <= 768;

  // Improved function to calculate the best position for the chat window
  const calculateChatWindowPosition = () => {
    // Check available space in different directions
    const spaceLeft = position.x;
    const spaceRight = window.innerWidth - position.x - ICON_SIZE;
    const spaceTop = position.y;
    const spaceBottom = window.innerHeight - position.y - ICON_SIZE;

    // Default styles
    const style: React.CSSProperties = {
      zIndex: 999,
      backgroundColor: "#1F2227",
      borderColor: "#2C3039",
    };

    // Find which direction has the most available space
    const spaces = [
      { direction: "right", space: spaceRight },
      { direction: "left", space: spaceLeft },
      { direction: "bottom", space: spaceBottom },
      { direction: "top", space: spaceTop },
    ];

    // Sort spaces from most to least available
    spaces.sort((a, b) => b.space - a.space);

    // Determine the best direction based on available space
    const bestDirection = spaces[0].direction;

    // Position based on the best direction
    switch (bestDirection) {
      case "right":
        // Place to the right of the icon
        if (spaceRight >= CHAT_WIDTH) {
          style.left = `${position.x + ICON_SIZE}px`;
          style.right = "auto";
          style.top = `${Math.max(10, position.y - CHAT_HEIGHT / 2 + ICON_SIZE / 2)}px`;
          style.bottom = "auto";
          // Ensure not too close to bottom edge
          if (
            parseInt(style.top as string) + CHAT_HEIGHT >
            window.innerHeight - 10
          ) {
            style.top = `${window.innerHeight - CHAT_HEIGHT - 10}px`;
          }
        } else {
          // Not enough space, fallback to next best direction
          style.left = `${position.x - CHAT_WIDTH / 2 + ICON_SIZE / 2}px`;
          style.top =
            spaces[1].direction === "bottom"
              ? `${position.y + ICON_SIZE}px`
              : `${position.y - CHAT_HEIGHT}px`;
        }
        break;

      case "left":
        // Place to the left of the icon
        if (spaceLeft >= CHAT_WIDTH) {
          style.right = "auto";
          style.left = `${position.x - CHAT_WIDTH}px`;
          style.top = `${Math.max(10, position.y - CHAT_HEIGHT / 2 + ICON_SIZE / 2)}px`;
          style.bottom = "auto";
          // Ensure not too close to bottom edge
          if (
            parseInt(style.top as string) + CHAT_HEIGHT >
            window.innerHeight - 10
          ) {
            style.top = `${window.innerHeight - CHAT_HEIGHT - 10}px`;
          }
        } else {
          // Not enough space, fallback to next best direction
          style.left = `${position.x - CHAT_WIDTH / 2 + ICON_SIZE / 2}px`;
          style.top =
            spaces[1].direction === "bottom"
              ? `${position.y + ICON_SIZE}px`
              : `${position.y - CHAT_HEIGHT}px`;
        }
        break;

      case "bottom":
        // Place below the icon
        if (spaceBottom >= CHAT_HEIGHT) {
          style.top = `${position.y + ICON_SIZE}px`;
          style.bottom = "auto";
          // Center horizontally relative to the icon
          style.left = `${Math.max(10, position.x - CHAT_WIDTH / 2 + ICON_SIZE / 2)}px`;
          // Ensure not too close to right edge
          if (
            parseInt(style.left as string) + CHAT_WIDTH >
            window.innerWidth - 10
          ) {
            style.left = `${window.innerWidth - CHAT_WIDTH - 10}px`;
          }
        } else {
          // Not enough space, fallback to next best direction
          style.top =
            spaces[1].direction === "top"
              ? `${position.y - CHAT_HEIGHT}px`
              : `${Math.max(10, position.y - CHAT_HEIGHT / 2 + ICON_SIZE / 2)}px`;
          style.left =
            spaces[1].direction === "right"
              ? `${position.x + ICON_SIZE}px`
              : `${position.x - CHAT_WIDTH}px`;
        }
        break;

      case "top":
        // Place above the icon
        if (spaceTop >= CHAT_HEIGHT) {
          style.bottom = "auto";
          style.top = `${position.y - CHAT_HEIGHT}px`;
          // Center horizontally relative to the icon
          style.left = `${Math.max(10, position.x - CHAT_WIDTH / 2 + ICON_SIZE / 2)}px`;
          // Ensure not too close to right edge
          if (
            parseInt(style.left as string) + CHAT_WIDTH >
            window.innerWidth - 10
          ) {
            style.left = `${window.innerWidth - CHAT_WIDTH - 10}px`;
          }
        } else {
          // Not enough space, fallback to next best direction
          style.top =
            spaces[1].direction === "bottom"
              ? `${position.y + ICON_SIZE}px`
              : `${Math.max(10, position.y - CHAT_HEIGHT / 2 + ICON_SIZE / 2)}px`;
          style.left =
            spaces[1].direction === "right"
              ? `${position.x + ICON_SIZE}px`
              : `${position.x - CHAT_WIDTH}px`;
        }
        break;
    }

    // Final safety checks to ensure the chat window stays within viewport
    // Ensure left boundary
    if (style.left && parseInt(style.left as string) < 10) {
      style.left = "10px";
    }

    // Ensure right boundary
    if (
      style.left &&
      parseInt(style.left as string) + CHAT_WIDTH > window.innerWidth - 10
    ) {
      style.left = `${window.innerWidth - CHAT_WIDTH - 10}px`;
    }

    // Ensure top boundary
    if (style.top && parseInt(style.top as string) < 10) {
      style.top = "10px";
    }

    // Ensure bottom boundary
    if (
      style.top &&
      parseInt(style.top as string) + CHAT_HEIGHT > window.innerHeight - 10
    ) {
      style.top = `${window.innerHeight - CHAT_HEIGHT - 10}px`;
    }

    return style;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
      }}
    >
      {/* Chat Icon */}
      <div
        className={`flex items-center justify-center rounded-full shadow-lg cursor-pointer ${
          isOpen ? "bg-gray-700 w-12 h-12" : "bg-transparent w-20 h-20"
        }`}
        onClick={toggleChat}
        onMouseDown={handleDragStart}
        onTouchStart={handleTouchStart}
      >
        <X size={20} className={`text-white ${!isOpen ? "hidden" : "flex"}`} />

        <div className={`relative ${isOpen ? "hidden" : "flex"}`}>
          <ExportedImage
            src="/images/bot.png"
            className="w-20 h-20"
            width={30}
            height={30}
            alt="Bot"
          />
        </div>
        <Move size={14} className="absolute top-0 right-0 text-gray-400" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed w-80 rounded-lg shadow-xl overflow-hidden"
          style={calculateChatWindowPosition()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-3 border-b"
            style={{ backgroundColor: "#191B1F", borderColor: "#2C3039" }}
          >
            <div className="flex items-center">
              <MessageSquare size={18} className="text-white mr-2" />
              <h3 className="text-white font-medium">Chat Assistant</h3>
            </div>
            <X
              size={18}
              className="text-gray-400 hover:text-white cursor-pointer"
              onClick={toggleChat}
            />
          </div>

          {/* Messages Area */}
          <div
            ref={chatContainerRef}
            className="h-80 overflow-y-auto p-3"
            style={{ backgroundColor: "#262930" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 max-w-3/4 ${msg.isBot ? "mr-auto" : "ml-auto"}`}
              >
                <div
                  className={`p-2 rounded-lg inline-block ${
                    msg.isBot
                      ? "bg-gray-700 text-white rounded-tl-none"
                      : "bg-blue-600 text-white rounded-tr-none"
                  }`}
                  style={{
                    backgroundColor: msg.isBot ? "#2C3039" : "#333842",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="mb-3 mr-auto">
                <div
                  className="p-2 rounded-lg inline-block"
                  style={{ backgroundColor: "#2C3039", maxWidth: "80%" }}
                >
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-500 rounded mb-2"></div>
                    <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-500 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div
            className="p-3 border-t flex"
            style={{ backgroundColor: "#1F2227", borderColor: "#2C3039" }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-l-md text-white"
              style={{ backgroundColor: "#262930", outline: "none" }}
            />
            <button
              onClick={sendMessage}
              className="p-2 rounded-r-md"
              disabled={isLoading}
              style={{ backgroundColor: "#333842" }}
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotUI;
