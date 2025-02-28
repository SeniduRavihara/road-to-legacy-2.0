import { UOC, UOM, USJ } from "@/assets"; // Assuming these are your image imports
import Image from "next/image";

const Uni3Section = () => {
  return (
    <div className="w-full p-3 mb-6 flex gap-5 items-center justify-center">
      {/* University of Sri Jayawardenepura */}
      <div className="w-1/3 relative group">
        <Image
          src={USJ}
          alt="University of Sri Jayawardenepura"
          className="w-full h-auto rounded-lg shadow-lg"
          width={500} // You can set a fixed width and height for optimization
          height={300}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 bg-transparent text-white">
          <span className="block text-sm opacity-80">Started in 1978</span>
          <h3 className="font-bold text-xl mt-2">
            University of Sri Jayawardenepura
          </h3>
          <div className="mt-4 text-base opacity-80">
            Known for its excellence in technology and related disciplines.
          </div>
          <a
            href="https://sjp.ac.lk/"
            className="inline-flex items-center mt-4 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200"
          >
            <span>LEARN MORE</span>
            <i className="fa fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>

      {/* University of Moratuwa */}
      <div className="w-1/3 relative group">
        <Image
          src={UOM}
          alt="University of Moratuwa"
          className="w-full h-auto rounded-lg shadow-lg"
          width={500}
          height={300}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 bg-transparent text-white">
          <span className="block text-sm opacity-80">Started in 1978</span>
          <h3 className="font-bold text-xl mt-2">University of Moratuwa</h3>
          <div className="mt-4 text-base opacity-80">
            Known for its excellence in technology and related disciplines.
          </div>
          <a
            href="https://uom.lk/"
            className="inline-flex items-center mt-4 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200"
          >
            <span>LEARN MORE</span>
            <i className="fa fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>

      {/* University of Colombo */}
      <div className="w-1/3 relative group">
        <Image
          src={UOC}
          alt="University of Colombo"
          className="w-full h-auto rounded-lg shadow-lg"
          width={500}
          height={300}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 bg-transparent text-white">
          <span className="block text-sm opacity-80">Started in 1978</span>
          <h3 className="font-bold text-xl mt-2">University of Colombo</h3>
          <div className="mt-4 text-base opacity-80">
            Known for its excellence in technology and related disciplines.
          </div>
          <a
            href="https://www.cmb.ac.lk/"
            className="inline-flex items-center mt-4 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200"
          >
            <span>LEARN MORE</span>
            <i className="fa fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Uni3Section;
