import { useState } from "react";

const AdminPage = () => {
  const [summary, setSummary] = useState("Free Slot");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    if (!start || !end) {
      alert("Please select start and end time");
      return;
    }

    try {
      const res = await fetch("/calendar/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, start, end }),
      });

      if (!res.ok) throw new Error("Failed to create slot");

      alert("Free slot created!");
      setStart("");
      setEnd("");
    } catch (err) {
      console.error("Error creating slot:", err);
      alert("Could not create free slot");
    }
  };

  return (
    <div>
      <h1>Admin: Create Free Slot</h1>
      <form onSubmit={handleCreateSlot}>
        <label>
          Start:
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <br />
        <label>
          End:
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Free Slot</button>
      </form>
    </div>
  );
};

export default AdminPage;
