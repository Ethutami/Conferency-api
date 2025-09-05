import { NextFunction, Request, Response } from "express";
import { createOrganizatorService, deleteOrganizatorService, getAllOrganizatorService, getOrganizatorService, updateOrganizatorService } from "../services/organizator.service";
import { validateEmail } from "../utils/emailValidation";

const requiredFields = [
    'organizator_name',
    'email',
    'phone',
    'address',
    'city',
    'province',
    'country',
    'npwp',
    'taxable',
    'owner_name',
    'bank_account'
];

export async function getAllOrganizatorController(req: Request, res: Response, next: NextFunction) {
    try {
        const organizator = await getAllOrganizatorService()
        res.status(200).send({
            status: 'Success',
            message: `Get all organizator success`,
            data: organizator,
        });

    } catch (err) {
        next(err);
    }
}

export async function getOrganizatorController(req: Request, res: Response, next: NextFunction) {
    const { id } = req?.params
    try {
        const organizer = await getOrganizatorService(id)
        res.status(200).send({
            status: 'Success',
            message: `Get organizer success`,
            data: organizer,
        });
    } catch (err) {
        next(err);
    }
}

export async function createOrganizatorController(req: Request, res: Response, next: NextFunction) {
    try {
        for (const field of requiredFields) {
            if (!req?.body[field]) {
                return res.status(400).json({ error: `${field} is required.` });
            }
        }

        if (!validateEmail(req.body.email)) {
            return res.status(400).json({ error: `Invalid email` });
        }

        const { bank_account } = req?.body;
        const bankFields = ['bank_name', 'account_number', 'account_holder'];
        for (const field of bankFields) {
            if (!bank_account?.[field]) {
                return res.status(400).json({ error: `bank_account.${field} is require` });
            }
        }

        const response = await createOrganizatorService(req?.body)
        res.status(200).send({
            status: 'Success',
            message: `Create account success`,
            data: response,
        });
    } catch (err) {
        next(err);
    }
}

export async function updateOrganizatorController(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const forbiddenFields = ['organizer_code', 'status', 'verification_date'];
        const allowedFields = [
            'organizator_name',
            'email',
            'phone',
            'address',
            'city',
            'province',
            'country',
            'npwp',
            'business_type',
            'taxable',
            'owner_name',
            'logo_url',
            'website_url',
            'bank_account',
            'notes'
        ];

        for (const field of forbiddenFields) {
            if (field in req.body) {
                return res.status(400).json({ error: `Field '${field}'is not allowed to be changed.` });
            }
        }

        for (const field of requiredFields) {
            if (!req?.body[field]) {
                return res.status(400).json({ error: `${field} is required.` });
            }
        }

        if (!validateEmail(req.body.email)) {
            return res.status(400).json({ error: `Invalid email` });
        }

        const { bank_account } = req?.body;
        const bankFields = ['bank_name', 'account_number', 'account_holder'];
        for (const field of bankFields) {
            if (!bank_account?.[field]) {
                return res.status(400).json({ error: `bank_account.${field} is require` });
            }
        }

        const dataToUpdate: Record<string, any> = {};
        for (const key of allowedFields) {
            if (req.body[key] !== undefined) {
                dataToUpdate[key] = req.body[key];
            }
        }
        dataToUpdate.updated_at = new Date();

        const organizer = await updateOrganizatorService(id, dataToUpdate);

        res.status(200).send({
            status: 'Success',
            message: `Update account success`,
            data: organizer,
        });

    } catch (err) {
        next(err);
    }
}

export async function deleteOrganizatorController(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const deleted = await deleteOrganizatorService(id);

        res.status(200).json({
            status: 'Success',
            message: 'Organizator deleted successfully',
            data: deleted
        });
    } catch (err: any) {
        if (err.message === 'Organizator not found') {
            return res.status(404).json({ error: err.message });
        }
        next(err);
    }
}
