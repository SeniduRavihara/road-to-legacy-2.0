import { motion } from "framer-motion";
import ExportedImage from "next-image-export-optimizer";

const SponsorCard = ({
  image,
  width,
  height,
  partnerType,
  name,
  // website,
  isHovered,
  onHover,
  onLeave,
}: {
  image: string;
  width: number;
  height: number;
  partnerType?: string;
  name: string;
  website?: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  // Partner type styles with theme colors as accents
  const partnerStyles = {
    "Official Photography Partner": {
      accentColor: "#4D96FF", // Blue accent
      borderColor: "border-[#4D96FF]",
      glowColor: "shadow-[#4D96FF]/20",
    },
    "Official Media Partner": {
      accentColor: "#00D26A", // Green accent
      borderColor: "border-[#00D26A]",
      glowColor: "shadow-[#00D26A]/20",
    },
    "Official Imaging Partner": {
      accentColor: "#FF6B6B", // Red accent
      borderColor: "border-[#FF6B6B]",
      glowColor: "shadow-[#FF6B6B]/20",
    },
    "Official Knowledge Partner": {
      accentColor: "#9D4EDD", // Purple accent
      borderColor: "border-[#9D4EDD]",
      glowColor: "shadow-[#9D4EDD]/20",
    },
    "Supported By": {
      accentColor: "#00B4D8", // Light blue accent
      borderColor: "border-[#00B4D8]",
      glowColor: "shadow-[#00B4D8]/20",
    },
    "Sponsor": {
      accentColor: "#FF9E00", // Orange accent
      borderColor: "border-[#FF9E00]",
      glowColor: "shadow-[#FF9E00]/20",
    },
    "Platinum Sponsor": {
      accentColor: "#7F7F7F", // Medium platinum/gray for better contrast
      borderColor: "border-[#7F7F7F]",
      glowColor: "shadow-[#7F7F7F]/20",
    },
    "Platinum sponsor and Knowledge  Partner": {
      accentColor: "#7F7F7F", // Medium platinum/gray for better contrast
      borderColor: "border-[#7F7F7F]",
      glowColor: "shadow-[#7F7F7F]/20",
    },
  };

  const style = partnerStyles[partnerType as keyof typeof partnerStyles] || {
    accentColor: "#FFD700", // Gold accent (default)
    borderColor: "border-[#FFD700]",
    glowColor: "shadow-[#FFD700]/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="w-full h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Card with fixed dimensions */}
      <div className="relative bg-[#1f2227] rounded-xl p-6 border border-[#262930] shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#333842]/30 h-64 w-full flex flex-col items-center justify-between">
        {/* Logo container - circular design for rounded logos */}
        <div className="flex items-center justify-center mb-4 relative">
          {/* Circular logo background with accent ring */}
          <div
            className={`w-24 h-24 rounded-full bg-[#191b1f] flex items-center justify-center p-1 ${isHovered ? "ring-2" : "ring-1"} ring-offset-2 ring-offset-[#1f2227]`}
            style={{
              // ringColor: style.accentColor,
              boxShadow: isHovered
                ? `0 0 15px ${style.accentColor}30`
                : "none",
            }}
          >
            {/* White circular background for logo */}
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-2">
              <ExportedImage
                src={image}
                alt={name}
                width={width}
                height={height}
                className="object-contain max-h-full max-w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center flex-grow justify-center">
          {/* Partner name */}
          <h3 className="text-lg font-semibold text-white text-center mb-3">
            {name}
          </h3>

          {/* Partner type badge */}
          <div className="text-center">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: style.accentColor }}
            >
              {partnerType}
            </span>
          </div>
        </div>

        {/* Visit website button - appears on hover */}
        {/* <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden text-center"
        >
          <span className="inline-block mt-2 px-4 py-2 rounded-full bg-[#262930] hover:bg-[#2c3039] text-white text-sm border border-[#333842] transition-colors">
            Visit Website
          </span>
        </motion.div> */}
      </div>
    </motion.div>
  );
};

export default SponsorCard;