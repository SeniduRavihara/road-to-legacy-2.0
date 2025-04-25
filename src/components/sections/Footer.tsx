import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import { useState } from "react";
import Social from "../Social";
import { Button } from "../ui/button";

const Footer = () => {
  const [, setIsHovered] = useState(false);

  const currentYear = new Date().getFullYear();

  // Social media data with lucide icons and actual URLs
  const socialMedia = [
    {
      name: "instagram",
      icon: <Instagram size={16} />,
      url: "https://www.instagram.com",
    },
    {
      name: "facebook",
      icon: <Facebook size={16} />,
      url: "https://www.facebook.com",
    },
    {
      name: "linkedin",
      icon: <Linkedin size={16} />,
      url: "https://www.linkedin.com",
    },
  ];

  return (
    <footer className="relative text-white py-12 overflow-hidden pb-28 pt-32">
      {/* Background color that matches the bottom wave */}
      {/* <div className="absolute bottom-0 left-0 right-0  h-[160px] bg-[#333842] opacity-50 z-0"></div> */}

      {/* Animated background waves */}
      <div className="absolute inset-0 z-0 ">
        {/* First wave */}
        <div className="absolute bottom-40 left-0 right-0 h-96">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className={cn(
              "transform transition-transform duration-10000 ease-in-out duration-500"
              // isHovered ? "scale-110" : "scale-100"
            )}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              bottom: 0,
            }}
          >
            <path
              fill="#2a2e38"
              fillOpacity="0.6"
              d="M0,64L34.3,69.3C68.6,75,137,85,206,122.7C274.3,160,343,224,411,234.7C480,245,549,203,617,186.7C685.7,171,754,181,823,160C891.4,139,960,85,1029,101.3C1097.1,117,1166,203,1234,229.3C1302.9,256,1371,224,1406,208L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Second wave */}
        <div className="absolute bottom-40 left-0 right-0 h-96">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className={cn(
              "transform transition-transform duration-10000 ease-in-out duration-500"
              // isHovered ? "scale-110" : "scale-100"
            )}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              bottom: 0,
            }}
          >
            <path
              fill="#333842"
              fillOpacity="0.4"
              d="M0,160L40,170.7C80,181,160,203,240,202.7C320,203,400,181,480,165.3C560,149,640,139,720,154.7C800,171,880,213,960,218.7C1040,224,1120,192,1200,176C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Extended solid color background - responsive height */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#333842] opacity-[40%] h-[160px] z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 bg-[#333842] opacity-[40%] h-[160px] z-0"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-30 z-0"></div>

      {/* Footer content */}
      <div
        className="relative z-10 container mx-auto px-4 text-center mt-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-center space-y-2">
          {/* Copyright text with modern styling */}
          <div className="space-y-2">
            <p className="text-lg font-medium tracking-wide">
              © {currentYear}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Road To Legacy 2.0
              </span>
            </p>
            <p className="text-sm text-gray-300">Powered by ITlegacy</p>
          </div>

          {/* IEEE Logo and contribution text */}
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-300">In collaboration with</p>
            <div className="relative rounded-md flex items-center justify-center">
              <ExportedImage
                src="/images/logos/ieee-logo-white.png"
                alt="IEEE Logo"
                width={220}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Social media icons */}
          <div className="flex space-x-4 mt-4">
            {socialMedia.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                aria-label={platform.name}
              >
                {platform.icon}
              </a>
            ))}
          </div>

          {/* Admin button with improved styling */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="mt-2 rounded-full px-6 py-2 hover:bg-white/10 transition-all duration-300 border border-white/20"
              >
                Admin Portal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-5 gap-10 flex flex-col items-center justify-center sm:rounded-xl rounded-xl">
              <DialogHeader>
                <DialogTitle>Login with Google</DialogTitle>
              </DialogHeader>
              <Social />
              <DialogFooter />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
