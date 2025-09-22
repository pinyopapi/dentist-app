import express from "express";
import { getServices, createService, editService, removeService } from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", createService);
router.put("/:id", editService);
router.delete("/:id", removeService);

export default router;
