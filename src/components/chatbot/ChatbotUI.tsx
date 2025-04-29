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

  // Store initial touch position for mobile
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Handle client-side initialization
  useEffect(() => {
    setIsMounted(true);
    // Set initial position after component mounts on client-side
    setPosition({
      x: typeof window !== "undefined" ? window.innerWidth - 80 : 20,
      y: typeof window !== "undefined" ? window.innerHeight - 100 : 20,
    });
  }, []);

  // Update position for different screen sizes
  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      setPosition(() => ({
        x: window.innerWidth - 80,
        y: window.innerHeight - 100,
      }));
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
    e.preventDefault(); // Prevent default touch behavior

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
    (e: MouseEvent | Touch) => {
      if (isDragging) {
        const newX = Math.min(
          Math.max(0, e.clientX - dragOffset.x),
          window.innerWidth - 60
        );
        const newY = Math.min(
          Math.max(0, e.clientY - dragOffset.y),
          window.innerHeight - 60
        );
        setPosition({ x: newX, y: newY });

        // Check if this was actually a drag (moved more than 5px)
        if (touchStartRef.current) {
          const deltaX = Math.abs(e.clientX - touchStartRef.current.x);
          const deltaY = Math.abs(e.clientY - touchStartRef.current.y);

          if (deltaX > 5 || deltaY > 5) {
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
        handleDrag(e);
      }
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    // Touch event handlers
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleDrag(e.touches[0]);
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
    setWasDragging(false);
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
          `https://us-central1-roadtolecacy.cloudfunctions.net/api/ask?question=${encodeURIComponent(currentInputValue)}`
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
  const isMobile = isMounted && window.innerWidth <= 768;

  // Calculate the chat window's position dynamically based on viewport boundaries
  const calculateChatWindowPosition = () => {
    const CHAT_WIDTH = 320; // Width of chat window (w-80 = 320px)
    // const CHAT_HEIGHT = 400; // Approximate height of chat window
    const ICON_SIZE = 48; // Size of the chat icon

    // For icon positioned on the left side of the screen
    if (position.x < window.innerWidth / 2) {
      // If near the left edge
      if (position.x < CHAT_WIDTH / 2) {
        return {
          right: "auto",
          left: "0",
          bottom: "auto",
          top: `${position.y + ICON_SIZE}px`,
        };
      }
      // If in left half but not edge
      return {
        right: "auto",
        left: `${position.x - CHAT_WIDTH / 4}px`,
        bottom: "auto",
        top: `${position.y + ICON_SIZE}px`,
      };
    }
    // For icon positioned on the right side of the screen
    else {
      // If near the right edge
      if (window.innerWidth - position.x < CHAT_WIDTH / 2) {
        return {
          right: "0",
          left: "auto",
          bottom: "auto",
          top: `${position.y + ICON_SIZE}px`,
        };
      }
      // If in right half but not edge
      return {
        right: "auto",
        left: `${position.x - CHAT_WIDTH / 2}px`,
        bottom: "auto",
        top: `${position.y + ICON_SIZE}px`,
      };
    }
  };

  // Handle vertical positioning for chat window
  const adjustVerticalPosition = (style: React.CSSProperties) => {
    const CHAT_HEIGHT = 400; // Approximate height of chat window

    // If too close to bottom of screen, position above the icon instead
    if (position.y > window.innerHeight - CHAT_HEIGHT - 60) {
      style.bottom = `${window.innerHeight - position.y + 20}px`;
      style.top = "auto";
    }

    // If too close to top of screen, ensure it stays within bounds
    if (position.y < 10) {
      style.top = "10px";
      style.bottom = "auto";
    }

    return style;
  };

  // Get the computed style for the chat window
  const chatWindowPosition = () => {
    const style = calculateChatWindowPosition();
    return adjustVerticalPosition(style as React.CSSProperties);
  };

  if (!isMounted) {
    return null;
  }

  return isMobile ? (
    // Mobile layout uses fixed positioning
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
        className={`flex items-center justify-center rounded-full shadow-lg cursor-pointer ${isOpen ? "bg-gray-700 w-12 h-12" : "bg-transparent w-20 h-20"}`}
        // style={{ backgroundColor: "#333842" }}
        onClick={toggleChat}
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
          className="fixed w-80 rounded-lg shadow-xl overflow-hidden"
          style={{
            backgroundColor: "#1F2227",
            borderColor: "#2C3039",
            bottom: "auto",
            left: "auto",
            right: "auto",
            zIndex: 999,
            ...chatWindowPosition(),
          }}
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
  ) : (
    // Desktop layout with dynamic positioning
    <div
      ref={containerRef}
      className="fixed"
      style={{ left: `${position.x}px`, top: `${position.y}px`, zIndex: 1000 }}
    >
      {/* Chat Icon */}
      <div
        className={`flex items-center justify-center rounded-full shadow-lg cursor-pointer ${isOpen ? "bg-gray-700 w-12 h-12" : "bg-transparent w-20 h-20"}`}
        onClick={toggleChat}
        onMouseDown={handleDragStart}
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

      {/* Chat Window - Fixed position calculated based on icon position */}
      {isOpen && (
        <div
          className="fixed w-80 rounded-lg shadow-xl overflow-hidden"
          style={{
            backgroundColor: "#1F2227",
            borderColor: "#2C3039",
            zIndex: 999,
            ...chatWindowPosition(),
          }}
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
              <div className="mb-3 ml-auto">
                <div
                  className="p-2 bg-gray-700 text-white rounded-tl-none"
                  style={{ backgroundColor: "#2C3039", maxWidth: "80%" }}
                >
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-500 rounded mb-2"></div>
                    <div className="h-4 bg-gray-500 rounded mb-2"></div>
                    <div className="h-4 bg-gray-500 rounded mb-2"></div>
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
