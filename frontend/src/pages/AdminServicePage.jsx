import { useState } from "react";
import { useServices } from "../hooks/useServices";
import { useTranslation } from "../hooks/useTranslation";
import ConfirmModal from "../components/ConfirmModal";
import PromptModal from "../components/PromptModal";
import styles from './AdminServicePage.module.css';

const AdminServicePage = () => {
    const { getText } = useTranslation();
    const { services, loading, addService, updateService, deleteService } = useServices();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [promptOpen, setPromptOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [actionType, setActionType] = useState(null);

    const handleDelete = (service) => {
        setSelectedService(service);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedService) return;
        await deleteService(selectedService.id);
        setConfirmOpen(false);
    };

    const handleAdd = () => {
        setActionType("add");
        setSelectedService(null);
        setPromptOpen(true);
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        setActionType("edit");
        setPromptOpen(true);
    };

    const confirmPrompt = async ({ name, price }) => {
        const numericPrice = Number(price);
        if (!name || isNaN(numericPrice)) {
            alert(getText("invalidInput"));
            return;
        }
        try {
            if (actionType === "add") {
                await addService(name, numericPrice);
            } else if (actionType === "edit" && selectedService) {
                await updateService(selectedService.id, name, numericPrice);
            }
            setPromptOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>{getText("loading")}</p>;

    return (
        <div className={styles.container}>
            <h1>{getText("services")}</h1>
            <button className={styles.button} onClick={handleAdd}>{getText("addService")}</button>
            <ul className={styles.serviceList}>
                {services.map(s => (
                    <li key={s.id} className={styles.serviceItem}>
                        {s.name} - {Number(s.price).toLocaleString("hu-HU")} Ft
                        <div>
                            <button onClick={() => handleEdit(s)}>{getText("edit")}</button>
                            <button onClick={() => handleDelete(s)}>{getText("delete")}</button>
                        </div>
                    </li>
                ))}
            </ul>

            <ConfirmModal
                isOpen={confirmOpen}
                messageKey={`${getText("confirmDeleteService")}`}
                onConfirm={confirmDelete}
                onCancel={() => setConfirmOpen(false)}
            />


            <PromptModal
                isOpen={promptOpen}
                defaultName={selectedService?.name || ""}
                defaultPrice={selectedService?.price ? Number(selectedService.price) : 0}
                messageKey={actionType === "add" ? "enterServiceDetails" : "editServiceDetails"}
                onConfirm={(data) => confirmPrompt(data)}
                onCancel={() => setPromptOpen(false)}
            />
        </div>
    );
};

export default AdminServicePage;