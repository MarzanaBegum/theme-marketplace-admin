import { dateFilterOptions, sortOptions } from "../utils/constant";
import { atom } from "jotai";

export type ProductFilterStateType = {
    type: string;
    sort: string;
    date: string;
    search: string;
    categories: string[];
    softwares: string[];
    price: string[];
};

export const ProductFilterState = atom<ProductFilterStateType>({
    type: "all products",
    sort: sortOptions[0].value,
    date: dateFilterOptions[0].value,
    categories: [],
    softwares: [],
    price: [],
    search: "",
});
