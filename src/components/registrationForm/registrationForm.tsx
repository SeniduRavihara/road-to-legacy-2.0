"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import tShirtImage from '../../public/assets/tshirt.jpg';
import styles from './Form.module.css';
import { motion, AnimatePresence } from "framer-motion";
import GradientText from './GradientText/GradientText';
import Threads from './Threads/Threads';

interface FormData {
    firstName: string;
    lastName: string;
    certificateName: string;
    nic: string;
    university: string;
    faculty: string;
    department: string;
    universityRegNo: string;
    alYear: string;
    contactNumber: string;
    email: string;
    emergencyContact: string;
    mealPreference: string;
    tShirt: boolean;
    hearAbout: string;
    hearAboutOther: string;
    suggestions: string;
}

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

const RegistrationForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        certificateName: '',
        nic: '',
        university: '',
        faculty: '',
        department: '',
        universityRegNo: '',
        alYear: '',
        contactNumber: '',
        email: '',
        emergencyContact: '',
        mealPreference: '',
        tShirt: false,
        hearAbout: '',
        hearAboutOther: '',
        suggestions: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: FormErrors = {};

        if (step === 1) {
            if (!formData.firstName) {
                newErrors.firstName = 'First name is required';
                isValid = false;
            }
            if (!formData.lastName) {
                newErrors.lastName = 'Last name is required';
                isValid = false;
            }
            if (!formData.certificateName) {
                newErrors.certificateName = 'Certificate name is required';
                isValid = false;
            }
            if (!formData.nic) {
                newErrors.nic = 'NIC number is required';
                isValid = false;
            } else if (!/^\d{9}[vVxX]$|^\d{12}$/.test(formData.nic)) {
                newErrors.nic = 'Enter a valid Sri Lankan NIC number';
                isValid = false;
            }
            if (!formData.university) {
                newErrors.university = 'University is required';
                isValid = false;
            }
            if (!formData.faculty) {
                newErrors.faculty = 'Faculty is required';
                isValid = false;
            }
            if (!formData.department) {
                newErrors.department = 'Department is required';
                isValid = false;
            }
            if (!formData.universityRegNo) {
                newErrors.universityRegNo = 'University registration number is required';
                isValid = false;
            }
            if (!formData.alYear) {
                newErrors.alYear = 'A/L year is required';
                isValid = false;
            } else if (!/^\d{4}$/.test(formData.alYear) || parseInt(formData.alYear) < 1900 || parseInt(formData.alYear) > new Date().getFullYear()) {
                newErrors.alYear = 'Enter a valid year';
                isValid = false;
            }
        } else if (step === 2) {
            if (!formData.contactNumber) {
                newErrors.contactNumber = 'Contact number is required';
                isValid = false;
            } else if (!/^(?:\+94|0)?(?:7[0-9]{8})$/.test(formData.contactNumber)) {
                newErrors.contactNumber = 'Enter a valid mobile number';
                isValid = false;
            }
            if (!formData.email) {
                newErrors.email = 'Email address is required';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Invalid email address';
                isValid = false;
            }
            if (!formData.emergencyContact) {
                newErrors.emergencyContact = 'Emergency contact number is required';
                isValid = false;
            } else if (!/^(?:\+94|0)?(?:7[0-9]{8})$/.test(formData.emergencyContact)) {
                newErrors.emergencyContact = 'Enter a valid mobile number';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Certificate Name</label>
                            <input
                                type="text"
                                name="certificateName"
                                value={formData.certificateName}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.certificateName && <p className={styles.error}>{errors.certificateName}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>NIC no</label>
                            <input
                                type="text"
                                name="nic"
                                value={formData.nic}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.nic && <p className={styles.error}>{errors.nic}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>University</label>
                            <input
                                type="text"
                                name="university"
                                value={formData.university}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.university && <p className={styles.error}>{errors.university}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Faculty</label>
                            <input
                                type="text"
                                name="faculty"
                                value={formData.faculty}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.faculty && <p className={styles.error}>{errors.faculty}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.department && <p className={styles.error}>{errors.department}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>University Registration Number</label>
                            <input
                                type="text"
                                name="universityRegNo"
                                value={formData.universityRegNo}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.universityRegNo && <p className={styles.error}>{errors.universityRegNo}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Year you have done your A/L’s</label>
                            <input
                                type="text"
                                name="alYear"
                                value={formData.alYear}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.alYear && <p className={styles.error}>{errors.alYear}</p>}
                        </div>
                        <button onClick={nextStep} className={styles.formButton}>
                            Next
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.contactNumber && <p className={styles.error}>{errors.contactNumber}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.email && <p className={styles.error}>{errors.email}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Emergency Contact Number</label>
                            <input
                                type="text"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                            {errors.emergencyContact && <p className={styles.error}>{errors.emergencyContact}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <button onClick={prevStep} className={styles.formButton}>
                                Previous
                            </button>
                            <button onClick={nextStep} className={styles.formButton}>
                                Next
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Meal Preference:</label>
                            <div className={styles.formOptions}>
                                <label>
                                    <input
                                        type="radio"
                                        name="mealPreference"
                                        value="Vegetarian"
                                        checked={formData.mealPreference === 'Vegetarian'}
                                        onChange={handleInputChange}
                                    />
                                    Vegetarian
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="mealPreference"
                                        value="Egg"
                                        checked={formData.mealPreference === 'Egg'}
                                        onChange={handleInputChange}
                                    />
                                    Egg
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="mealPreference"
                                        value="Non-Vegetarian"
                                        checked={formData.mealPreference === 'Non-Vegetarian'}
                                        onChange={handleInputChange}
                                    />
                                    Non-Vegetarian
                                </label>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Would you like to buy the event T-shirt?</label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="tShirt"
                                    checked={formData.tShirt}
                                    onChange={handleInputChange}
                                />
                                Yes
                            </label>
                            {formData.tShirt && (
                                <div>
                                    <Image src={tShirtImage} alt="T-shirt Design" width={200} height={200} />
                                </div>
                            )}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>How did you hear about this event?</label>
                            <div className={styles.formOptions}>
                                <label>
                                    <input
                                        type="radio"
                                        name="hearAbout"
                                        value="Social Media"
                                        checked={formData.hearAbout === 'Social Media'}
                                        onChange={handleInputChange}
                                    />
                                    Social Media
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="hearAbout"
                                        value="Friends"
                                        checked={formData.hearAbout === 'Friends'}
                                        onChange={handleInputChange}
                                    />
                                    Friends
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="hearAbout"
                                        value="Other"
                                        checked={formData.hearAbout === 'Other'}
                                        onChange={handleInputChange}
                                    />
                                    Other
                                    {formData.hearAbout === 'Other' && (
                                        <input
                                            type="text"
                                            name="hearAboutOther"
                                            placeholder='(please specify)'
                                            value={formData.hearAboutOther}
                                            onChange={handleInputChange}
                                            className={styles.formTextarea}
                                        />
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Any suggestions or expectations for the event?</label>
                            <textarea
                                name="suggestions"
                                value={formData.suggestions}
                                onChange={handleInputChange}
                                className={styles.formInput}
                            />
                        </div>
                        <button onClick={prevStep} className={styles.formButton}>
                            Previous
                        </button>
                        <button onClick={handleSubmit} className={styles.formButton}>
                            Submit
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderSidebar = () => {
        const steps = ['Participant Details', 'Contact Information', 'Additional Information'];

        return (
            <div className={styles.sidebar}>
                {steps.map((title, index) => (
                    <div
                        key={index}
                        className={`${styles.step} ${index + 1 === step ? styles.activeStep : index + 1 < step ? styles.completedStep : styles.pendingStep
                            }`}
                    >
                        {index + 1 < step && <span className={styles.checkMark}>&#10003;</span>}
                        {title}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.container}>
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
                className={styles.formContainer}
            >
                <div className={styles.formHeader}>
                    <GradientText
                        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                        animationSpeed={6}
                        showBorder={false}
                        className="custom-class"
                    >
                        <h1 className={styles.formTitle}>Registration</h1>
                    </GradientText>
                    <p className={styles.formSubtitle}>ROAD TO LEGACY 2.0</p>
                </div>
                <div className={styles.formWrapper}>
                    {renderSidebar()}

                    <motion.div
                        layout // Ensures smooth height changes
                        className={styles.content}
                    >
                        <form onSubmit={handleSubmit}>
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
                        </form>
                    </motion.div>
                </div>
            </motion.div>

        </div>
    );
};

export default RegistrationForm;