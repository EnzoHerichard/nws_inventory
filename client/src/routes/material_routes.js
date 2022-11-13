import express  from "express";
import { getMaterials, addMaterial, updateMaterials, deleteMaterials } from "../Pages/materiel";

const router = express.Router();

router.get("/materials", getMaterials);

router.post("/create", addMaterial);

router.put("/update/:id", updateMaterials);

router.delete("/delete/:id", deleteMaterials); 

export default router;