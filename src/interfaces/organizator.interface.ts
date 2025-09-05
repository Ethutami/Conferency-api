export interface iOrganizator {
    organizator_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    country?: string;
    npwp: string;
    business_type?: string;
    taxable: boolean;
    owner_name: string;
    logo_url?: string;
    website_url?: string;
    bank_account: {
        bank_name: string;
        account_number: string;
        account_holder: string;
    };
    verification_date?: string | Date;
    notes?: string;
};
