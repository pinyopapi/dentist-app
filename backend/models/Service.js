import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Service",
  tableName: "services",
  columns: {
    id: { primary: true, type: "int", generated: true },
    name: { type: "varchar" },
    description: { type: "text" },
    price: { type: "numeric" },
  },
});