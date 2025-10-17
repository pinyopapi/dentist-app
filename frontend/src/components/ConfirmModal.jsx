import { useTranslation } from "../hooks/useTranslation";
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ isOpen, messageKey, onConfirm, onCancel }) => {
  const { getText } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalMessage}>{getText(messageKey)}</p>
        <div className={styles.modalButtons}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            {getText("confirm")}
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            {getText("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;