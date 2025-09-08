import { PrismaClient } from "@prisma/client";
import { iVoucherInput } from "../interfaces/voucher.interface";

const prisma = new PrismaClient();

export const getAllVouchersService = async (id: string) => {
    const vouchers = await prisma.voucher.findMany({
        where: {
            organizer_id: id,
        },
    });
    return vouchers
};

export const createVoucherService = async (id: string, data: iVoucherInput) => {
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
    } = data;
    try {
        const organizer_code = await prisma.organizator.findUnique({
            where: { id },
            select: { organizer_code: true },
        });

        if (!organizer_code) throw new Error('Organizer not found');

        const code = `${organizer_code?.organizer_code}_${voucher_code}`

        const existingVoucher = await prisma.voucher.findFirst({
            where: { voucher_code: code },
            select: { id: true },
        });

        if (existingVoucher) throw new Error(`Voucher code ${voucher_code} already exist.`);

        const voucher = await prisma.voucher.create({
            data: {
                voucher_code: code,
                voucher_name,
                short_info,
                discount_amount: discount_amount ?? null,
                discount_percent: discount_percent ?? null,
                quota: quota ?? null,
                usage_count: usage_count ?? null,
                available_from: available_from ? new Date(available_from) : null,
                available_until: available_until ? new Date(available_until) : null,
                terms_conditions: terms_conditions ?? null,
                organizer_id: id,
            },
        });
        const response = {
            ...voucher,
            terms_conditions: voucher.terms_conditions
                ? voucher.terms_conditions.split('\n').map((item) => item.trim())
                : [],
        };
        return response
    } catch (error) {
        throw error
    }
}

export const updateVoucherService = async (code: string, data: iVoucherInput) => {
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
    } = data;

    const existing = await prisma.voucher.findFirst({ where: { voucher_code: code } });
    if (!existing) throw new Error(`Voucher with code '${code}' not found.`);

    const newCode = `${code.split("_")[0]}_${voucher_code}`;

    if (newCode !== existing.voucher_code) {
        const dupe = await prisma.voucher.findFirst({ where: { voucher_code: newCode } });
        if (dupe) throw new Error(`Voucher code '${voucher_code}' already exists.`);
    }

    const isUnchanged =
        newCode === existing.voucher_code &&
        voucher_name === existing.voucher_name &&
        short_info === existing.short_info &&
        discount_amount?.toString() === existing.discount_amount?.toString() &&
        discount_percent?.toString() === existing.discount_percent?.toString() &&
        quota === existing.quota &&
        usage_count === existing.usage_count &&
        terms_conditions === existing.terms_conditions;

    if (isUnchanged) return existing;

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
};

export const deleteVoucherService = async (code: string) => {
    const existing = await prisma.voucher.findFirst({
        where: { voucher_code: code }
    });

    if (!existing) {
        throw new Error('Voucher not found');
    }

    const deleted = await prisma.voucher.delete({
        where: { id: existing.id }
    });
    return deleted;
};