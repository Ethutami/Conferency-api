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
exports.getAllCategoriesService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const BASE_ICON_URL = 'https://mznyfinmwapfnwytaooe.supabase.co/storage/v1/object/public/';
const getAllCategoriesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield prisma.categories.findMany();
    const categoriesFixedIconURL = categories.map((item) => (Object.assign(Object.assign({}, item), { icon: `${BASE_ICON_URL}${item.icon}` })));
    return categoriesFixedIconURL;
});
exports.getAllCategoriesService = getAllCategoriesService;
