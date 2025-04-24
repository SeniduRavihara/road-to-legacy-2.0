
// SponsorCard.tsx
import { motion } from "framer-motion";
import ExportedImage from "next-image-export-optimizer";

const SponsorCard = ({
  image,
  width,
  height,
  tier,
  name,
  website,
  isHovered,
  onHover,
  onLeave,
}: {
  image: string;
  width: number;
  height: number;
  tier: string;
  name: string;
  website: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  // Map tier to styling
  const tierStyles = {
    GOLD: {
      badge: "bg-[#FFD700]",
      text: "text-[#191b1f]",
      border: "border-[#FFD700]",
    },
    SILVER: {
      badge: "bg-[#C0C0C0]",
      text: "text-[#191b1f]",
      border: "border-[#C0C0C0]",
    },
    BRONZE: {
      badge: "bg-[#CD7F32]",
      text: "text-[#191b1f]",
      border: "border-[#CD7F32]",
    },
    PLATINUM: {
      badge: "bg-[#E5E4E2]",
      text: "text-[#191b1f]",
      border: "border-[#E5E4E2]",
    },
  };

  const style = tierStyles[tier as keyof typeof tierStyles] || tierStyles.GOLD;

  return (
    <motion.div
      className={`relative group ${isHovered ? "z-20" : "z-10"}`}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-[#1f2227] rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#333842]/30 border border-[#262930]"
      >
        <div className="flex items-center justify-center h-24 relative bg-white rounded-lg p-4">
          <ExportedImage
            src={image}
            alt={name}
            width={width}
            height={height}
            className="object-contain max-h-full"
          />

          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/5 rounded-lg flex items-center justify-center"
            >
              <span className="text-sm font-medium text-gray-700 bg-white/80 px-3 py-1 rounded-full">
                Visit website
              </span>
            </motion.div>
          )}
        </div>

        <div
          className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${style.badge} ${style.text} shadow-md border-2 border-white`}
        >
          {tier}
        </div>
      </a>
    </motion.div>
  );
};

export default SponsorCard;
