import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <select value={language} onChange={handleChange}>
      <option value="en">English</option>
      <option value="hu">Magyar</option>
    </select>
  );
};

export default LanguageSelector;