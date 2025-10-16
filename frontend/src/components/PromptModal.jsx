import { useState, useEffect } from "react";

const PromptModal = ({ isOpen, defaultName = "", defaultPrice = 0, onConfirm, onCancel, messageKey, getText }) => {
  const [name, setName] = useState(defaultName);
  const [price, setPrice] = useState(defaultPrice);

  useEffect(() => {
    setName(defaultName);
    setPrice(defaultPrice);
  }, [defaultName, defaultPrice, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{getText(messageKey)}</h2>
        <div style={{ marginBottom: 10 }}>
          <label>{getText("serviceName")}:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>{getText("servicePrice")}:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <button onClick={() => onConfirm({ name, price })}>{getText("confirm")}</button>
        <button onClick={onCancel}>{getText("cancel")}</button>
      </div>
    </div>
  );
};

export default PromptModal;