import { Router } from "express";
import { createVoucherController, deleteVoucherController, getAllVouchersController, updateVoucherController, } from "../controllers/voucher.controller";

const router = Router();

router.get("/:organizatorId", getAllVouchersController);
router.post("/:organizatorId", createVoucherController);
router.put('/:code', updateVoucherController)
router.delete('/:code', deleteVoucherController)

export default router;