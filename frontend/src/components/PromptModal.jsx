import { useState } from "react";
import styles from './PromptModal.module.css';

const PromptModal = ({ isOpen, defaultName, defaultPrice, getText, messageKey, onConfirm, onCancel }) => {
  const [name, setName] = useState(defaultName || "");
  const [price, setPrice] = useState(defaultPrice || 0);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({ name, price });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalMessage}>{getText(messageKey)}</p>
        <div className={styles.inputGroup}>
          <label>{getText("serviceName")}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <label>{getText("servicePrice")}</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className={styles.modalButtons}>
          <button className={styles.confirmButton} onClick={handleConfirm}>{getText("confirm")}</button>
          <button className={styles.cancelButton} onClick={onCancel}>{getText("cancel")}</button>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;