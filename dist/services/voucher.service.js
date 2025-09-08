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
exports.deleteVoucherService = exports.updateVoucherService = exports.createVoucherService = exports.getAllVouchersService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllVouchersService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vouchers = yield prisma.voucher.findMany({
        where: {
            organizer_id: id,
        },
    });
    return vouchers;
});
exports.getAllVouchersService = getAllVouchersService;
const createVoucherService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { voucher_code, voucher_name, short_info, discount_amount, discount_percent, quota, usage_count, available_from, available_until, terms_conditions, } = data;
    try {
        const organizer_code = yield prisma.organizator.findUnique({
            where: { id },
            select: { organizer_code: true },
        });
        if (!organizer_code)
            throw new Error('Organizer not found');
        const code = `${organizer_code === null || organizer_code === void 0 ? void 0 : organizer_code.organizer_code}_${voucher_code}`;
        const existingVoucher = yield prisma.voucher.findFirst({
            where: { voucher_code: code },
            select: { id: true },
        });
        if (existingVoucher)
            throw new Error(`Voucher code ${voucher_code} already exist.`);
        const voucher = yield prisma.voucher.create({
            data: {
                voucher_code: code,
                voucher_name,
                short_info,
                discount_amount: discount_amount !== null && discount_amount !== void 0 ? discount_amount : null,
                discount_percent: discount_percent !== null && discount_percent !== void 0 ? discount_percent : null,
                quota: quota !== null && quota !== void 0 ? quota : null,
                usage_count: usage_count !== null && usage_count !== void 0 ? usage_count : null,
                available_from: available_from ? new Date(available_from) : null,
                available_until: available_until ? new Date(available_until) : null,
                terms_conditions: terms_conditions !== null && terms_conditions !== void 0 ? terms_conditions : null,
                organizer_id: id,
            },
        });
        const response = Object.assign(Object.assign({}, voucher), { terms_conditions: voucher.terms_conditions
                ? voucher.terms_conditions.split('\n').map((item) => item.trim())
                : [] });
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.createVoucherService = createVoucherService;
const updateVoucherService = (code, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { voucher_code, voucher_name, short_info, discount_amount, discount_percent, quota, usage_count, available_from, available_until, terms_conditions, } = data;
    const existing = yield prisma.voucher.findFirst({ where: { voucher_code: code } });
    if (!existing)
        throw new Error(`Voucher with code '${code}' not found.`);
    const newCode = `${code.split("_")[0]}_${voucher_code}`;
    if (newCode !== existing.voucher_code) {
        const dupe = yield prisma.voucher.findFirst({ where: { voucher_code: newCode } });
        if (dupe)
            throw new Error(`Voucher code '${voucher_code}' already exists.`);
    }
    const isUnchanged = newCode === existing.voucher_code &&
        voucher_name === existing.voucher_name &&
        short_info === existing.short_info &&
        (discount_amount === null || discount_amount === void 0 ? void 0 : discount_amount.toString()) === ((_a = existing.discount_amount) === null || _a === void 0 ? void 0 : _a.toString()) &&
        (discount_percent === null || discount_percent === void 0 ? void 0 : discount_percent.toString()) === ((_b = existing.discount_percent) === null || _b === void 0 ? void 0 : _b.toString()) &&
        quota === existing.quota &&
        usage_count === existing.usage_count &&
        terms_conditions === existing.terms_conditions;
    if (isUnchanged)
        return existing;
    return prisma.voucher.update({
        where: { id: existing.id },
        data: {
            voucher_code: newCode,
            voucher_name,
            short_info,
            discount_amount,
            discount_percent,
            quota,
            usage_count,
            available_from,
            available_until,
            terms_conditions,
        },
    });
});
exports.updateVoucherService = updateVoucherService;
const deleteVoucherService = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma.voucher.findFirst({
        where: { voucher_code: code }
    });
    if (!existing) {
        throw new Error('Voucher not found');
    }
    const deleted = yield prisma.voucher.delete({
        where: { id: existing.id }
    });
    return deleted;
});
exports.deleteVoucherService = deleteVoucherService;
