import ButtonLoader from "@/components/loader/ButtonLoader";
import { FormDataType } from "@/types";
import styles from "../Form.module.css";

interface Step3Props {
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
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  prevStep: () => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const Step3: React.FC<Step3Props> = ({
  formData,
  handleInputChange,
  prevStep,
  isLoading,
  handleSubmit,
}) => {
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
              checked={formData.mealPreference === "Vegetarian"}
              onChange={handleInputChange}
            />
            Vegetarian
          </label>
          <label>
            <input
              type="radio"
              name="mealPreference"
              value="Egg"
              checked={formData.mealPreference === "Egg"}
              onChange={handleInputChange}
            />
            Egg
          </label>
          <label>
            <input
              type="radio"
              name="mealPreference"
              value="Non-Vegetarian"
              checked={formData.mealPreference === "Non-Vegetarian"}
              onChange={handleInputChange}
            />
            Non-Vegetarian
          </label>
        </div>
      </div>
      {/* <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Would you like to buy the event T-shirt?
        </label>
        <label>
          <input
            type="checkbox"
            name="tShirt"
            checked={formData.tShirt}
            onChange={handleInputChange}
          />
          Yes
        </label>
       
      </div> */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          How did you hear about this event?
        </label>
        <div className={styles.formOptions}>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Social Media"
              checked={formData.hearAbout === "Social Media"}
              onChange={handleInputChange}
            />
            Social Media
          </label>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Friends"
              checked={formData.hearAbout === "Friends"}
              onChange={handleInputChange}
            />
            Friends
          </label>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Other"
              checked={formData.hearAbout === "Other"}
              onChange={handleInputChange}
            />
            Other
            {formData.hearAbout === "Other" && (
              <input
                type="text"
                name="hearAboutOther"
                placeholder="(please specify)"
                value={formData.hearAboutOther}
                onChange={handleInputChange}
                className={styles.formTextarea}
              />
            )}
          </label>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Any suggestions or expectations for the event?
        </label>
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
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`${styles.formButton} ${isLoading && "relative top-1"}`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <ButtonLoader size="w-5 h-5" /> <span>Submitting...</span>
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};
export default Step3;
