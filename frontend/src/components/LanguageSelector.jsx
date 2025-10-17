import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import styles from "./LanguageSelector.module.css";

const flags = {
  hu: "/flags/hu.svg",
  en: "/flags/en.svg",
};

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className={styles.flagContainer}>
      {Object.keys(flags).map((lang) => (
        <button
          key={lang}
          className={`${styles.flagButton} ${language === lang ? styles.active : ""}`}
          onClick={() => setLanguage(lang)}
        >
          <img src={flags[lang]} alt={lang} className={styles.flagIcon} />
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;