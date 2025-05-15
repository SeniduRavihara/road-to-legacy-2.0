// SponsorCard.tsx
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
      className="relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      
        {/* Card with theme colors */}
        <div className="relative bg-[#1f2227] rounded-xl p-6 border border-[#262930] shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#333842]/30">
          {/* Logo container - circular design for rounded logos */}
          <div className="flex items-center justify-center mb-5 relative">
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

          {/* Partner type badge */}
          <div className="text-center mb-2">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: style.accentColor }}
            >
              {partnerType}
            </span>
          </div>

          {/* Partner name */}
          <h3 className="text-lg font-semibold text-white text-center mb-3">
            {name}
          </h3>

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
