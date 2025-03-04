import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import Social from "../Social"; // Assuming this component handles Google login or other social logins

const Footer = () => {
  return (
    <div className="text-white py-6 text-center relative">
      <div className="mx-auto relative z-10">
        <p className="text-lg">
          © 2025 Road To Legacy 2.0. All Rights Reserved.
        </p>
        <p className="text-sm mt-2">Powered by [Your University Name]</p>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Admin</Button>
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

      <div className="absolute bottom-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#333842"
            fillOpacity="0.5"
            d="M0,64L34.3,69.3C68.6,75,137,85,206,122.7C274.3,160,343,224,411,234.7C480,245,549,203,617,186.7C685.7,171,754,181,823,160C891.4,139,960,85,1029,101.3C1097.1,117,1166,203,1234,229.3C1302.9,256,1371,224,1406,208L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Footer;
