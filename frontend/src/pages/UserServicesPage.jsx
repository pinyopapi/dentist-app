import { useServices } from "../hooks/useServices";
import { useTranslation } from "../hooks/useTranslation";

const UserServicesPage = () => {
  const { services, loading, error } = useServices();
  const { getText } = useTranslation();

  if (loading) return <p>{getText("loading")}</p>;
  if (error) return <p style={{ color: "red" }}>{getText("genericError")}</p>;

  const formatPrice = (price) =>
    `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ft`;

  return (
    <div>
      <h1>{getText("services")}</h1>
      <ul>
        {services.map((s) => (
          <li key={s.id}>
            {s.name}: <strong>{formatPrice(s.price)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserServicesPage;