import { Router } from "express";
import { addTransection, getAllTransection, editTransection, deleteTransection } from "../controllers/transectionCtrl.js";

//router object
const router = Router();

//routes
//add transection POST MEthod
router.post("/add-transection", addTransection);
//Edit transection POST MEthod
router.post("/edit-transection", editTransection);
//Delete transection POST MEthod
router.post("/delete-transection", deleteTransection);

//get transections
router.post("/get-transection", getAllTransection);

export default router;