import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import translations from "../i18n";

export const useTranslation = () => {
    const { language } = useContext(LanguageContext);
    const getText = (key) => translations[key]?.[language] || key;
    return { getText };
};