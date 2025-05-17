import { FormDataType } from "@/types";
import styles from "../Form.module.css";

interface Step1Props {
  formData: FormDataType;
  errors: {
    firstName?: string;
    lastName?: string;
    certificateName?: string;
    nic?: string;
    university?: string;
    faculty?: string;
    department?: string;
    universityRegNo?: string;
    alYear?: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({
  formData,
  errors,
  handleInputChange,
  nextStep,
}) => {
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
        <label className={styles.formLabel}>
          Certificate Name (Name for the E-Certificate)
        </label>
        <input
          type="text"
          name="certificateName"
          value={formData.certificateName}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        {errors.certificateName && (
          <p className={styles.error}>{errors.certificateName}</p>
        )}
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
        {errors.university && (
          <p className={styles.error}>{errors.university}</p>
        )}
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
        {errors.department && (
          <p className={styles.error}>{errors.department}</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          University Registration Number
        </label>
        <input
          type="text"
          name="universityRegNo"
          value={formData.universityRegNo}
          onChange={handleInputChange}
          className={styles.formInput}
        />
        {errors.universityRegNo && (
          <p className={styles.error}>{errors.universityRegNo}</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Year you have done your A/L’s
        </label>
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
};

export default Step1;
