export interface iVoucherInput {
    voucher_code: string;
    voucher_name: string;
    short_info?: string;
    discount_amount?: number | null | string;
    discount_percent?: number | null | string;
    quota?: number | null;
    usage_count?: number | null;
    available_from?: Date | null;
    available_until?: Date | null;
    terms_conditions?: string | null;
}