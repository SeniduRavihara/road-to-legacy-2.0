import Social from "@/components/Social";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div>
      <Card className=" h-[500px] w-[90%] md:w-[900px] p-4">
        <CardContent className="flex gap-5 items-center justify-between w-full h-full p-0">
          {/* <Image
            src="/loginImage2.jpg"
            alt=""
            className="h-[450px] object-cover rounded-l-xl hidden md:block"
            fill
          /> */}

          <div className="flex flex-col items-center justify-between w-full h-full">
            <div className="flex flex-col items-center justify-between">
              {/* <Image fill src="./pasan.png" alt="" className="w-64" /> */}
              {/* <Image
                fill
                src="/physics_nam_think.png"
                alt=""
                className="w-56 mt-4"
              /> */}
              {/* <Image fill src="./loginWadana.png" alt="" className="w-64" /> */}
            </div>
            <Social />
            <p className="text-sm font-bold">Hotline : 0779556843</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginPage;
