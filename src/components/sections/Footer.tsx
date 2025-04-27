import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import Social from "../Social";
import { Button } from "../ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social media data with lucide icons and actual URLs
  const socialMedia = [
    {
      name: "instagram",
      icon: <Instagram size={18} />,
      url: "https://www.instagram.com",
    },
    {
      name: "facebook",
      icon: <Facebook size={18} />,
      url: "https://www.facebook.com",
    },
    {
      name: "linkedin",
      icon: <Linkedin size={18} />,
      url: "https://www.linkedin.com",
    },
  ];

  return (
    <footer className="relative text-white py-12 overflow-hidden pb-24 pt-32 bg-green-30">
      {/* Animated background waves */}
      <div className="absolute inset-0 z-0">
        {/* First wave */}
        <div className="absolute bottom-[160px] left-0 right-0 h-96">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="transform transition-transform duration-10000 ease-in-out"
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
          <div className="absolute  -bottom-[384px] left-0 right-0 h-96 opacity-[60%] bg-[#2a2e38]"></div>
        </div>

        {/* Second wave */}
        <div className="absolute bottom-[0px] left-0 right-0 h-96">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="transform transition-transform duration-10000 ease-in-out"
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
          {/* <div className="absolute  -bottom-[500px] left-0 right-0 h-[500px] opacity-[60%] bg-[#2a2e38]"></div> */}
        </div>
      </div>

      {/* Footer content */}
      <div className="z-[1000] relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Social media icons */}
          <div className="flex space-x-4">
            {socialMedia.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                aria-label={platform.name}
              >
                {platform.icon}
              </a>
            ))}
          </div>

          {/* IEEE logos */}
          <div className="flex flex-col items-center space-y-2 my-4">
            <p className="text-sm text-gray-300">Powered by</p>
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
              <ExportedImage
                src="/images/logos/LogoXSmall.png"
                alt="Logo"
                width={200}
                height={40}
                className="object-contain"
              />
              <span className="text-gray-300">and</span>
              <ExportedImage
                src="/images/logos/ieee-logo-white.png"
                alt="IEEE Logo"
                width={300}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Copyright text */}
          <p className="text-sm text-gray-300">
            © {currentYear}{" "}
            <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Road To Legacy 2.0
            </span>
            . All rights reserved.
          </p>

          {/* Admin button */}
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
