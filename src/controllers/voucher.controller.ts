import { NextFunction, Request, Response } from "express";
import { createVoucherService, deleteVoucherService, getAllVouchersService, updateVoucherService } from "../services/voucher.service";

export async function getAllVouchersController(req: Request, res: Response, next: NextFunction) {
    const { organizatorId } = req.params;
    try {
        const vouchers = await getAllVouchersService(organizatorId);

        res.status(200).send({
            status: 'Success',
            message: `Get all vouchers success`,
            data: vouchers,
        });
    } catch (err) {
        next(err);
    }
}

export async function createVoucherController(req: Request, res: Response, next: NextFunction) {
    const now = new Date();
    const {
        voucher_code,
        voucher_name,
        short_info,
        discount_amount,
        discount_percent,
        quota,
        usage_count,
        available_from,
        available_until,
        terms_conditions,
    } = req.body;
    const { organizatorId } = req.params

    const hasAmount = discount_amount !== undefined && discount_amount !== null;
    const hasPercent = discount_percent !== undefined && discount_percent !== null;

    const isValidDate = (d: string) => !isNaN(Date.parse(d));

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
        }

        const newVoucher = await createVoucherService(organizatorId, data)

        res.status(200).send({
            status: 'Success',
            message: `Create vouchers success`,
            data: newVoucher,
        });
    } catch (err) {
        next(err);
    }
}

export async function updateVoucherController(req: Request, res: Response, next: NextFunction) {
    const { code } = req.params
    const now = new Date();
    const {
        voucher_code,
        voucher_name,
        short_info,
        discount_amount,
        discount_percent,
        quota,
        usage_count,
        available_from,
        available_until,
        terms_conditions,
    } = req.body;

    const hasAmount = discount_amount !== undefined && discount_amount !== null;
    const hasPercent = discount_percent !== undefined && discount_percent !== null;

    const isValidDate = (d: string) => !isNaN(Date.parse(d));
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
        }
        const voucher = await updateVoucherService(code, data)
        res.status(200).send({
            status: 'Success',
            message: `Get all vouchers success`,
            data: voucher,
        });
    } catch (err) {
        next(err);
    }
}

export async function deleteVoucherController(req: Request, res: Response, next: NextFunction) {
    try {
        const { code } = req.params;

        const deleted = await deleteVoucherService(code);

        res.status(200).json({
            status: 'Success',
            message: 'Voucher deleted successfully',
            data: deleted
        });
    } catch (err: any) {
        next(err);
    }
}