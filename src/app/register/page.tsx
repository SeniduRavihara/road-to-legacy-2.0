"use client";

import { registerDelegates } from "@/firebase/api";
import { FormDataType } from "@/types";
import { useState } from "react";
import "./register.css";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    university: "",
    faculty: "",
    department: "",
    regNumber: "",
    alYear: "",
    contactNumber: "",
    email: "",
    emergencyContact: "",
    mealPreference: "",
    tshirt: "",
    howHeard: "",
    certificateName: "",
    suggestions: "",
  });
  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormDataType> = {};
    const textFields = [
      "firstName",
      "lastName",
      "university",
      "faculty",
      "department",
      "certificateName",
    ];
    textFields.forEach((field) => {
      if (!/^[A-Za-z ]+$/.test(formData[field as keyof FormDataType] || "")) {
        newErrors[field as keyof FormDataType] = "Only letters and spaces allowed";
      }
    });

    if (!/^[A-Za-z0-9]+$/.test(formData.regNumber)) {
      newErrors.regNumber = "Alphanumeric characters only";
    }
    if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Enter a 10-digit number";
    }
    if (!/^[0-9]{10}$/.test(formData.emergencyContact)) {
      newErrors.emergencyContact = "Enter a 10-digit number";
    }
    if (
      !/^[0-9]{4}$/.test(formData.alYear) ||
      parseInt(formData.alYear) < 2000 ||
      parseInt(formData.alYear) > 2025
    ) {
      newErrors.alYear = "Enter a valid 4-digit year (2000-2025)";
    }
    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const { success } = await registerDelegates(formData);
      if (success) alert("Form submitted successfully!");
    } else {
      alert("Please correct the errors in the form.");
    }
  };

  return (
    <div className="bg-[#191B1F] flex-col min-h-screen flex items-center justify-center">
      <div className="container ">
        <h1>Event Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            <div className="left-column">
              {Object.keys(formData)
                .slice(0, 7)
                .map((field) => (
                  <div key={field} className="form-group">
                    <label htmlFor={field}>
                      {field.replace(/([A-Z])/g, " $1")} *
                    </label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={formData[field as keyof FormDataType]}
                      onChange={handleChange}
                      className={errors[field as keyof FormDataType] ? "error" : ""}
                    />
                    {errors[field as keyof FormDataType] && (
                      <span className="error-text">
                        {errors[field as keyof FormDataType]}
                      </span>
                    )}
                  </div>
                ))}
            </div>
            <div className="right-column">
              {Object.keys(formData)
                .slice(7, 14)
                .map((field) => (
                  <div key={field} className="form-group">
                    <label htmlFor={field}>
                      {field.replace(/([A-Z])/g, " $1")} *
                    </label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={formData[field as keyof FormDataType]}
                      onChange={handleChange}
                      className={errors[field as keyof FormDataType] ? "error" : ""}
                    />
                    {errors[field as keyof FormDataType] && (
                      <span className="error-text">
                        {errors[field as keyof FormDataType]}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="suggestions">Any Other Suggestions</label>
            <textarea
              id="suggestions"
              name="suggestions"
              value={formData.suggestions}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
