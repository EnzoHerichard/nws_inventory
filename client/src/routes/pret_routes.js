import express  from "express";
import { addReservation, getReservation, getMaterialsNotReserved, deleteReservation } from "../Pages/pret";

const router = express.Router();

router.get("/reservations", getReservation);

router.get("/materialsNR", getMaterialsNotReserved);

router.post("/createReservation", addReservation);

router.delete("/deleteReservation/:id", deleteReservation); 

export default router;