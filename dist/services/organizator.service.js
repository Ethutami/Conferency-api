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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganizatorService = exports.updateOrganizatorService = exports.createOrganizatorService = exports.getOrganizatorService = exports.getAllOrganizatorService = void 0;
const client_1 = require("@prisma/client");
const randomCode_1 = __importDefault(require("../utils/randomCode"));
const prisma = new client_1.PrismaClient();
function generateUniqueOrganizerCode() {
    return __awaiter(this, void 0, void 0, function* () {
        let code = '';
        let exists = true;
        while (exists) {
            const length = Math.floor(Math.random() * 4) + 2; // 2 - 5 karakter
            code = (0, randomCode_1.default)(length);
            const organizer_code = yield prisma.organizator.findUnique({
                where: { organizer_code: code }
            });
            if (!organizer_code) {
                exists = false;
            }
        }
        return code;
    });
}
function validateBankOwnerOrOrg(ownerName, organizatorName, bankAccount) {
    var _a, _b;
    if (!bankAccount || !bankAccount.account_holder)
        return false;
    const accountHolder = bankAccount.account_holder.trim().toLowerCase();
    const owner = (_a = ownerName === null || ownerName === void 0 ? void 0 : ownerName.trim().toLowerCase()) !== null && _a !== void 0 ? _a : '';
    const org = (_b = organizatorName === null || organizatorName === void 0 ? void 0 : organizatorName.trim().toLowerCase()) !== null && _b !== void 0 ? _b : '';
    return owner === accountHolder || org === accountHolder;
}
function validateNpwp(npwp) {
    if (!npwp)
        return false;
    const re = /^\d{2}\.\d{3}\.\d{3}\.\d-\d{3}\.\d{3}$/;
    return re.test(npwp);
}
const getAllOrganizatorService = () => __awaiter(void 0, void 0, void 0, function* () {
    const organizators = yield prisma.organizator.findMany({
        orderBy: {
            created_at: 'desc'
        },
        select: {
            id: true,
            organizer_code: true,
            organizator_name: true,
            owner_name: true,
            email: true,
            phone: true,
            address: true,
            city: true,
            province: true,
            country: true,
            status: true,
            business_type: true,
            logo_url: true,
            website_url: true,
            created_at: true,
            updated_at: true,
        }
    });
    return organizators;
});
exports.getAllOrganizatorService = getAllOrganizatorService;
const getOrganizatorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const organizer = yield prisma.organizator.findUnique({
        where: { id },
        select: {
            id: true,
            organizer_code: true,
            organizator_name: true,
            email: true,
            phone: true,
            address: true,
            city: true,
            province: true,
            country: true,
            status: true,
            npwp: true,
            business_type: true,
            taxable: true,
            owner_name: true,
            logo_url: true,
            website_url: true,
            bank_account: true,
            verification_date: true,
            notes: true,
            created_at: true,
            updated_at: true
        }
    });
    return organizer;
});
exports.getOrganizatorService = getOrganizatorService;
const createOrganizatorService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, owner_name, organizator_name, bank_account, npwp } = data;
    const organizer_code = yield generateUniqueOrganizerCode();
    const bankValid = validateBankOwnerOrOrg(owner_name, organizator_name, bank_account);
    const npwpValid = validateNpwp(npwp);
    let emailVerified = false; //next create notification validation email and change this code
    const existing = yield prisma.organizator.findUnique({ where: { email } });
    if (!existing) {
        emailVerified = true;
    }
    else {
        throw new Error('Email already registered');
    }
    const status = bankValid && npwpValid && emailVerified ? 'active' : 'pending';
    const newOrganizator = yield prisma.organizator.create({
        data: Object.assign(Object.assign({}, data), { organizer_code,
            status, verification_date: null })
    });
    return newOrganizator;
});
exports.createOrganizatorService = createOrganizatorService;
const updateOrganizatorService = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existing = yield prisma.organizator.findUnique({
            where: { id }
        });
        if (!existing) {
            throw new Error("Organizator not found");
        }
        const updated = yield prisma.organizator.update({
            where: { id },
            data: body
        });
        return updated;
    }
    catch (error) {
        throw error;
    }
});
exports.updateOrganizatorService = updateOrganizatorService;
const deleteOrganizatorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma.organizator.findUnique({
        where: { id }
    });
    if (!existing) {
        throw new Error('Organizator not found');
    }
    const deleted = yield prisma.organizator.delete({
        where: { id }
    });
    return deleted;
});
exports.deleteOrganizatorService = deleteOrganizatorService;
