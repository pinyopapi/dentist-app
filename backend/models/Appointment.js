import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Appointment",
  tableName: "appointments",
  columns: {
    id: { primary: true, type: "int", generated: true },
    date: { type: "date" },
    time: { type: "time" },
    status: { type: "varchar", default: "pending" },
    googleEventId: { type: "varchar", nullable: true },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      eager: true,
    },
    service: {
      type: "many-to-one",
      target: "Service",
      joinColumn: true,
      eager: true,
    },
  },
});
