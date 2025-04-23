import ExportedImage from "next-image-export-optimizer";

const SponserCard = ({
  image,
  width,
  height,
  membership,
}: {
  image: string;
  width: number;
  height: number;
  membership: string;
}) => {
  return (
    <div className="">
      <div className="bg-white px-5 py-2 pt-4 rounded-xl relative">
        <ExportedImage
          src={image}
          alt="Invitation"
          width={width}
          height={height}
          unoptimized={true}
        />

        <div className="bg-[#FFD700] absolute px-2 rounded-xl border-2 border-white -top-4 left-[50%] -translate-x-[50%]">{membership}</div>
      </div>
    </div>
  );
};

export default SponserCard;
