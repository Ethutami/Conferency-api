"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVouchersController = getAllVouchersController;
exports.createVoucherController = createVoucherController;
exports.updateVoucherController = updateVoucherController;
exports.deleteVoucherController = deleteVoucherController;
const voucher_service_1 = require("../services/voucher.service");
function getAllVouchersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { organizatorId } = req.params;
        try {
            const vouchers = yield (0, voucher_service_1.getAllVouchersService)(organizatorId);
            res.status(200).send({
                status: 'Success',
                message: `Get all vouchers success`,
                data: vouchers,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function createVoucherController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        const { voucher_code, voucher_name, short_info, discount_amount, discount_percent, quota, usage_count, available_from, available_until, terms_conditions, } = req.body;
        const { organizatorId } = req.params;
        const hasAmount = discount_amount !== undefined && discount_amount !== null;
        const hasPercent = discount_percent !== undefined && discount_percent !== null;
        const isValidDate = (d) => !isNaN(Date.parse(d));
        try {
            if (available_from) {
                if (!isValidDate(available_from)) {
                    return res.status(400).json({ error: 'Invalid format date' });
                }
                if (new Date(available_from) < now) {
                    return res.status(400).json({ error: 'available_from should be current date or above' });
                }
            }
            if (available_until) {
                if (!isValidDate(available_until)) {
                    return res.status(400).json({ error: 'Invalid format date' });
                }
                if (available_from && new Date(available_until) < new Date(available_from)) {
                    return res.status(400).json({ error: 'available_until must be after available_from' });
                }
            }
            if (hasAmount && hasPercent) {
                return res.status(400).json({
                    error: 'Please provide only one discount type: either discount_amount or discount_percent, not both.',
                });
            }
            if (!hasAmount && !hasPercent) {
                return res.status(400).json({
                    error: 'Please provide a discount value: either discount_amount or discount_percent.',
                });
            }
            const data = {
                voucher_code,
                voucher_name,
                short_info,
                discount_amount: hasAmount ? discount_amount : null,
                discount_percent: hasPercent ? discount_percent : null,
                quota,
                usage_count,
                available_from: available_from ? new Date(available_from) : null,
                available_until: available_until ? new Date(available_until) : null,
                terms_conditions,
            };
            const newVoucher = yield (0, voucher_service_1.createVoucherService)(organizatorId, data);
            res.status(200).send({
                status: 'Success',
                message: `Create vouchers success`,
                data: newVoucher,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function updateVoucherController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { code } = req.params;
        const now = new Date();
        const { voucher_code, voucher_name, short_info, discount_amount, discount_percent, quota, usage_count, available_from, available_until, terms_conditions, } = req.body;
        const hasAmount = discount_amount !== undefined && discount_amount !== null;
        const hasPercent = discount_percent !== undefined && discount_percent !== null;
        const isValidDate = (d) => !isNaN(Date.parse(d));
        try {
            if (available_from) {
                if (!isValidDate(available_from)) {
                    return res.status(400).json({ error: 'Invalid format date' });
                }
                if (new Date(available_from) < now) {
                    return res.status(400).json({ error: 'available_from should be current date or above' });
                }
            }
            if (available_until) {
                if (!isValidDate(available_until)) {
                    return res.status(400).json({ error: 'Invalid format date' });
                }
                if (available_from && new Date(available_until) < new Date(available_from)) {
                    return res.status(400).json({ error: 'available_until must be after available_from' });
                }
            }
            if (hasAmount && hasPercent) {
                return res.status(400).json({
                    error: 'Please provide only one discount type: either discount_amount or discount_percent, not both.',
                });
            }
            if (!hasAmount && !hasPercent) {
                return res.status(400).json({
                    error: 'Please provide a discount value: either discount_amount or discount_percent.',
                });
            }
            const data = {
                voucher_code,
                voucher_name,
                short_info,
                discount_amount: hasAmount ? discount_amount : null,
                discount_percent: hasPercent ? discount_percent : null,
                quota,
                usage_count,
                available_from: available_from ? new Date(available_from) : null,
                available_until: available_until ? new Date(available_until) : null,
                terms_conditions,
            };
            const voucher = yield (0, voucher_service_1.updateVoucherService)(code, data);
            res.status(200).send({
                status: 'Success',
                message: `Get all vouchers success`,
                data: voucher,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function deleteVoucherController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code } = req.params;
            const deleted = yield (0, voucher_service_1.deleteVoucherService)(code);
            res.status(200).json({
                status: 'Success',
                message: 'Voucher deleted successfully',
                data: deleted
            });
        }
        catch (err) {
            next(err);
        }
    });
}
