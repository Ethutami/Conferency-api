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
exports.getAllOrganizatorController = getAllOrganizatorController;
exports.getOrganizatorController = getOrganizatorController;
exports.createOrganizatorController = createOrganizatorController;
exports.updateOrganizatorController = updateOrganizatorController;
exports.deleteOrganizatorController = deleteOrganizatorController;
const organizator_service_1 = require("../services/organizator.service");
const emailValidation_1 = require("../utils/emailValidation");
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
function getAllOrganizatorController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const organizator = yield (0, organizator_service_1.getAllOrganizatorService)();
            res.status(200).send({
                status: 'Success',
                message: `Get all organizator success`,
                data: organizator,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function getOrganizatorController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req === null || req === void 0 ? void 0 : req.params;
        try {
            const organizer = yield (0, organizator_service_1.getOrganizatorService)(id);
            res.status(200).send({
                status: 'Success',
                message: `Get organizer success`,
                data: organizer,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function createOrganizatorController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const field of requiredFields) {
                if (!(req === null || req === void 0 ? void 0 : req.body[field])) {
                    return res.status(400).json({ error: `${field} is required.` });
                }
            }
            if (!(0, emailValidation_1.validateEmail)(req.body.email)) {
                return res.status(400).json({ error: `Invalid email` });
            }
            const { bank_account } = req === null || req === void 0 ? void 0 : req.body;
            const bankFields = ['bank_name', 'account_number', 'account_holder'];
            for (const field of bankFields) {
                if (!(bank_account === null || bank_account === void 0 ? void 0 : bank_account[field])) {
                    return res.status(400).json({ error: `bank_account.${field} is require` });
                }
            }
            const response = yield (0, organizator_service_1.createOrganizatorService)(req === null || req === void 0 ? void 0 : req.body);
            res.status(200).send({
                status: 'Success',
                message: `Create account success`,
                data: response,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function updateOrganizatorController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
                if (!(req === null || req === void 0 ? void 0 : req.body[field])) {
                    return res.status(400).json({ error: `${field} is required.` });
                }
            }
            if (!(0, emailValidation_1.validateEmail)(req.body.email)) {
                return res.status(400).json({ error: `Invalid email` });
            }
            const { bank_account } = req === null || req === void 0 ? void 0 : req.body;
            const bankFields = ['bank_name', 'account_number', 'account_holder'];
            for (const field of bankFields) {
                if (!(bank_account === null || bank_account === void 0 ? void 0 : bank_account[field])) {
                    return res.status(400).json({ error: `bank_account.${field} is require` });
                }
            }
            const dataToUpdate = {};
            for (const key of allowedFields) {
                if (req.body[key] !== undefined) {
                    dataToUpdate[key] = req.body[key];
                }
            }
            dataToUpdate.updated_at = new Date();
            const organizer = yield (0, organizator_service_1.updateOrganizatorService)(id, dataToUpdate);
            res.status(200).send({
                status: 'Success',
                message: `Update account success`,
                data: organizer,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function deleteOrganizatorController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deleted = yield (0, organizator_service_1.deleteOrganizatorService)(id);
            res.status(200).json({
                status: 'Success',
                message: 'Organizator deleted successfully',
                data: deleted
            });
        }
        catch (err) {
            if (err.message === 'Organizator not found') {
                return res.status(404).json({ error: err.message });
            }
            next(err);
        }
    });
}
