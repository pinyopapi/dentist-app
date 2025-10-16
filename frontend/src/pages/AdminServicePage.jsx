import { useState } from "react";
import { useServices } from "../hooks/useServices";
import ConfirmModal from "../components/ConfirmModal";
import PromptModal from "../components/PromptModal";
import { useTranslation } from "../hooks/useTranslation";

const AdminServicesPage = () => {
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
        await deleteService(selectedService.id);
        setConfirmOpen(false);
    };

    const handleAdd = () => {
        setActionType("add");
        setPromptOpen(true);
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        setActionType("edit");
        setPromptOpen(true);
    };

    const confirmPrompt = async ({ name, price }) => {
        try {
            if (actionType === "add") {
                await addService(name, price);
            } else if (actionType === "edit" && selectedService) {
                await updateService(selectedService.id, name, price);
            }
            setPromptOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>{getText("loading")}</p>;

    return (
        <div>
            <h1>{getText("services")}</h1>
            <button onClick={handleAdd}>{getText("addService")}</button>
            <ul>
                {services.map(s => (
                    <li key={s.id}>
                        {s.name} - {Number(s.price).toLocaleString("hu-HU")} Ft
                        <button onClick={() => handleEdit(s)}>{getText("edit")}</button>
                        <button onClick={() => handleDelete(s)}>{getText("delete")}</button>
                    </li>
                ))}
            </ul>

            <ConfirmModal
                isOpen={confirmOpen}
                messageKey="confirmDeleteService"
                onConfirm={confirmDelete}
                onCancel={() => setConfirmOpen(false)}
            />

            <PromptModal
                isOpen={promptOpen}
                defaultName={selectedService?.name || ""}
                defaultPrice={selectedService?.price || 0}
                getText={getText}
                messageKey={actionType === "add" ? "enterServiceDetails" : "editServiceDetails"}
                onConfirm={(data) => confirmPrompt(data)}
                onCancel={() => setPromptOpen(false)}
            />

        </div>
    );
};

export default AdminServicesPage;