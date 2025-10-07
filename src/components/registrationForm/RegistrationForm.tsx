"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
// import tShirtImage from "../../public/assets/tshirt.jpg";
import { FormDataType } from "@/types";
import styles from "./Form.module.css";
import GradientText from "./GradientText/GradientText";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { registerDelegates } from "@/firebase/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  certificateName?: string;
  nic?: string;
  university?: string;
  faculty?: string;
  department?: string;
  universityRegNo?: string;
  alYear?: string;
  contactNumber?: string;
  email?: string;
  emergencyContact?: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    certificateName: "",
    nic: "",
    university: "",
    faculty: "",
    department: "",
    universityRegNo: "",
    alYear: "",
    contactNumber: "",
    email: "",
    emergencyContact: "",
    mealPreference: "",
    // tShirt: false,
    hearAbout: "",
    hearAboutOther: "",
    suggestions: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
        isValid = false;
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
        isValid = false;
      }
      if (!formData.certificateName) {
        newErrors.certificateName = "Certificate name is required";
        isValid = false;
      }
      if (!formData.nic) {
        newErrors.nic = "NIC number is required";
        isValid = false;
      } else if (!/^\d{9}[vVxX]$|^\d{12}$/.test(formData.nic)) {
        newErrors.nic = "Enter a valid Sri Lankan NIC number";
        isValid = false;
      }
      if (!formData.university) {
        newErrors.university = "University is required";
        isValid = false;
      }
      if (!formData.faculty) {
        newErrors.faculty = "Faculty is required";
        isValid = false;
      }
      if (!formData.department) {
        newErrors.department = "Department is required";
        isValid = false;
      }
      if (!formData.universityRegNo) {
        newErrors.universityRegNo =
          "University registration number is required";
        isValid = false;
      }
      if (!formData.alYear) {
        newErrors.alYear = "A/L year is required";
        isValid = false;
      } else if (
        !/^\d{4}$/.test(formData.alYear) ||
        parseInt(formData.alYear) < 1900 ||
        parseInt(formData.alYear) > new Date().getFullYear()
      ) {
        newErrors.alYear = "Enter a valid year";
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.contactNumber) {
        newErrors.contactNumber = "Contact number is required";
        isValid = false;
      } else if (!/^(?:\+94|0)?(?:7[0-9]{8})$/.test(formData.contactNumber)) {
        newErrors.contactNumber = "Enter a valid mobile number";
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = "Email address is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email address";
        isValid = false;
      }
      if (!formData.emergencyContact) {
        newErrors.emergencyContact = "Emergency contact number is required";
        isValid = false;
      } else if (
        !/^(?:\+94|0)?(?:7[0-9]{8})$/.test(formData.emergencyContact)
      ) {
        newErrors.emergencyContact = "Enter a valid mobile number";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: undefined });
  };

  const nextStep = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setOpenDialog(true);
      const { success, error } = await registerDelegates(formData);
      if (success) {
        setSubmited(true);
        await delay(3000);
        // alert("Form submitted successfully!");

        // router.push(
        //   `/thankyou?email=${encodeURIComponent(
        //     formData.email
        //   )}&name=${encodeURIComponent(formData.certificateName)}&uni=${encodeURIComponent(formData.university)}`
        // );

         router.push("/");

        setStep(1);
        setFormData({
          firstName: "",
          lastName: "",
          certificateName: "",
          nic: "",
          university: "",
          faculty: "",
          department: "",
          universityRegNo: "",
          alYear: "",
          contactNumber: "",
          email: "",
          emergencyContact: "",
          mealPreference: "",
          // tShirt: false,
          hearAbout: "",
          hearAboutOther: "",
          suggestions: "",
        });
        setErrors({});
      } else if (error) {
        alert("Error submitting form: " + error);
        setIsLoading(false);
        setStep(1);
      }

      setStep(1);
      setErrors({});
      setIsLoading(false);
      setSubmited(false);
      setOpenDialog(false);

     
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={formData}
            nextStep={nextStep}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            nextStep={nextStep}
            prevStep={prevStep}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  const renderSidebar = () => {
    const steps = [
      "Participant Details",
      "Contact Information",
      "Additional Information",
    ];

    return (
      <div className={styles.sidebar}>
        {steps.map((title, index) => (
          <div
            key={index}
            className={`${styles.step} ${
              index + 1 === step
                ? styles.activeStep
                : index + 1 < step
                  ? styles.completedStep
                  : styles.pendingStep
            }`}
          >
            {index + 1 < step && (
              <span className={styles.checkMark}>&#10003;</span>
            )}
            {title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex m-0  p-2 py-10 w-full min-h-[100vh] justify-center items-center ">
      {/* <div style={{ width: '100dvw', height: '100vh', position: 'absolute' }}>
                <Threads
                    color={[255, 255, 255]}
                    amplitude={1}
                    distance={0.1}
                    enableMouseInteraction={false}
                />
            </div> */}
      <motion.div
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`flex flex-col w-[96%] sm:w-[90%] lg:w-[80%] p-2 md:p-5 rounded-xl bg-[#1f22279d] shadow-custom-dark backdrop-blur-sm`}
      >
        <Link
          href="/"
          className="flex flex-col items-center justify-center relative"
        >
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={6}
            showBorder={false}
            className="custom-class"
          >
            <h1 className="text-[2.3rem] font-bold">Registration</h1>
          </GradientText>

          <p className="text-[0.8rem] relative left-20 -top-3 italic text-white">
            ROAD TO LEGACY 2.0
          </p>
        </Link>

        <div className="flex flex-col md:flex-row bg-[#1f203100]">
          {renderSidebar()}

          <motion.div
            layout // Ensures smooth height changes
            className="flex-1 items-start mr-[5px]"
          >
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] flex flex-col items-center justify-center bg-[#1f2227] border border-[#333842] text-white">
          <DialogTitle className="text-center text-white text-lg font-medium">
            {submited ? "Registration Complete" : "Please Wait..."}
          </DialogTitle>

          <div className="py-6 flex justify-center items-center">
            {isLoading && !submited && (
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-[#262930] border-t-[#4079ff] animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full border-4 border-[#262930] border-b-[#40ffaa] animate-spin animate-delay-150"></div>
                </div>
              </div>
            )}

            {/* ✅ Approved Animation */}
            {submited && (
              <div className="relative">
                <div className="w-16 h-16 bg-[#262930] rounded-full flex items-center justify-center">
                  <svg
                    className="checkmark w-8 h-8 text-[#40ffaa]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      className="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                      stroke="#262930"
                      strokeWidth="2"
                    />
                    <path
                      className="checkmark__check"
                      fill="none"
                      stroke="#40ffaa"
                      strokeWidth="4"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      strokeDasharray="48"
                      strokeDashoffset="48"
                      style={{
                        animation: "dash 0.8s ease-in-out forwards",
                      }}
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-gray-400 text-sm px-4">
            {isLoading && !submited
              ? "Please wait while we process your registration..."
              : "Your registration is complete! If you are selected for the event, you will be notified via email."}
          </p>

          <style jsx>{`
            @keyframes dash {
              from {
                stroke-dashoffset: 48;
              }
              to {
                stroke-dashoffset: 0;
              }
            }

            @keyframes delay-spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            .animate-delay-150 {
              animation-delay: 150ms;
              animation-direction: reverse;
            }
          `}</style>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrationForm;
