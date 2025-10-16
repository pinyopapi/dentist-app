import { useServices } from "../hooks/useServices";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./UserServicesPage.module.css";

const UserServicesPage = () => {
  const { services, loading, error } = useServices();
  const { getText } = useTranslation();

  if (loading) return <p className={styles.loading}>{getText("loading")}</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{getText("services")}</h1>
      <ul className={styles.serviceList}>
        {services.map((s) => (
          <li key={s.id} className={styles.serviceItem}>
            <span className={styles.serviceName}>{s.name}</span>
            <span className={styles.servicePrice}>
              {Number(s.price).toLocaleString("hu-HU")} Ft
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserServicesPage;