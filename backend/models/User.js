import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: { primary: true, type: "int", generated: true },
    name: { type: "varchar" },
    email: { type: "varchar", unique: true },
    role: { type: "varchar", default: "user" },
    googleId: { type: "varchar", nullable: true },
  },
});
