import { FormDataType } from "@/types";
import styles from "../Form.module.css";

interface Step2Props {
  formData: FormDataType;
  errors: {
    contactNumber?: string;
    email?: string;
    emergencyContact?: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const Step2: React.FC<Step2Props> = ({
  formData,
  errors,
  handleInputChange,
  prevStep,
  nextStep,
}) => {
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
        {errors.contactNumber && (
          <p className={styles.error}>{errors.contactNumber}</p>
        )}
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
        {errors.emergencyContact && (
          <p className={styles.error}>{errors.emergencyContact}</p>
        )}
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
};
export default Step2;
