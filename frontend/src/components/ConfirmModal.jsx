import React from "react";
import { useTranslation } from "../hooks/useTranslation";

const ConfirmModal = ({ isOpen, messageKey, onConfirm, onCancel }) => {
  const { getText } = useTranslation();

  if (!isOpen) return null;

  return (
    <div style={modalStyle}>
      <p>{getText(messageKey)}</p>
      <button onClick={onConfirm} style={{ marginRight: 10 }}>{getText("yes")}</button>
      <button onClick={onCancel}>{getText("no")}</button>
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: 20,
  zIndex: 1000,
  border: "1px solid #ccc",
  borderRadius: 5,
};

export default ConfirmModal;