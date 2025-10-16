import { useState, useEffect } from "react";

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/services");
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const addService = async (name, price) => {
    const res = await fetch("/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    if (!res.ok) throw new Error("Failed to add service");
    const data = await res.json();
    setServices(prev => [...prev, data]);
  };

  const updateService = async (id, name, price) => {
    const res = await fetch(`/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    if (!res.ok) throw new Error("Failed to update service");
    const updated = await res.json();
    setServices(prev => prev.map(s => s.id === id ? updated : s));
  };

  const deleteService = async (id) => {
    const res = await fetch(`/services/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete service");
    setServices(prev => prev.filter(s => s.id !== id));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { services, loading, error, addService, updateService, deleteService, fetchServices };
};