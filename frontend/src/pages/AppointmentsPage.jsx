import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AppointmentsCalendar from "../components/AppointmentsCalendar";

const AppointmentsPage = () => {
  const { token } = useContext(AuthContext);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo.start);
    console.log("Selected appointment:", slotInfo.start);
  };

  return (
    <div>
      <h1>Appointments</h1>
      <AppointmentsCalendar onSelectSlot={handleSelectSlot} />
      
      {selectedSlot && (
        <div style={{ marginTop: "20px" }}>
          <p>Selected time: {selectedSlot.toLocaleString()}</p>
          <button
            onClick={async () => {
              const res = await fetch("/appointments", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  user_id: 1,
                  service_id: 1,
                  appointment_date: selectedSlot,
                }),
              });
              if (res.ok) alert("Appointment booked!");
            }}
          >
            Book this time
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;