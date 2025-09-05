import { PrismaClient } from "@prisma/client";
import randomCode from "../utils/randomCode";
import { iOrganizator } from "../interfaces/organizator.interface";

const prisma = new PrismaClient();

async function generateUniqueOrganizerCode(): Promise<string> {
  let code = '';
  let exists = true;

  while (exists) {
    const length = Math.floor(Math.random() * 4) + 2; // 2 - 5 karakter
    code = randomCode(length);

    const organizer_code = await prisma.organizator.findUnique({
      where: { organizer_code: code }
    });

    if (!organizer_code) {
      exists = false;
    }
  }
  return code;
}

function validateBankOwnerOrOrg(ownerName: string, organizatorName: string, bankAccount: any): boolean {
  if (!bankAccount || !bankAccount.account_holder) return false;

  const accountHolder = bankAccount.account_holder.trim().toLowerCase();
  const owner = ownerName?.trim().toLowerCase() ?? '';
  const org = organizatorName?.trim().toLowerCase() ?? '';

  return owner === accountHolder || org === accountHolder;
}

function validateNpwp(npwp: string): boolean {
  if (!npwp) return false;
  const re = /^\d{2}\.\d{3}\.\d{3}\.\d-\d{3}\.\d{3}$/;
  return re.test(npwp);
}

export const getAllOrganizatorService = async () => {
  const organizators = await prisma.organizator.findMany({
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
  return organizators
};

export const getOrganizatorService = async (id: string) => {
  const organizer = await prisma.organizator.findUnique({
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
  return organizer
}

export const createOrganizatorService = async (data: iOrganizator) => {
  const { email, owner_name, organizator_name, bank_account, npwp } = data

  const organizer_code = await generateUniqueOrganizerCode()
  const bankValid = validateBankOwnerOrOrg(owner_name, organizator_name, bank_account);
  const npwpValid = validateNpwp(npwp);

  let emailVerified = false //next create notification validation email and change this code

  const existing = await prisma.organizator.findUnique({ where: { email } });
  if (!existing) {
    emailVerified = true
  } else {
    throw new Error('Email already registered');
  }

  const status = bankValid && npwpValid && emailVerified ? 'active' : 'pending';

  const newOrganizator = await prisma.organizator.create({
    data: {
      ...data,
      organizer_code,
      status,
      verification_date: null,
    }
  });
  return newOrganizator
}

export const updateOrganizatorService = async (id: string, body: object) => {
  try {
    const existing = await prisma.organizator.findUnique({
      where: { id }
    });

    if (!existing) {
      throw new Error("Organizator not found");
    }

    const updated = await prisma.organizator.update({
      where: { id },
      data: body
    });
    return updated
  } catch (error) {
    throw error
  }
}

export const deleteOrganizatorService = async (id: string) => {
  const existing = await prisma.organizator.findUnique({
    where: { id }
  });

  if (!existing) {
    throw new Error('Organizator not found');
  }

  const deleted = await prisma.organizator.delete({
    where: { id }
  });
  return deleted;
};
