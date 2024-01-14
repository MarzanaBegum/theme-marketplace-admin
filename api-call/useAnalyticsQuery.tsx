import { UseQueryOptions } from "react-query";
import { api } from "../api";

const useAnalyticsQuery: (v?: any) => UseQueryOptions<any, any, any, any> = (
    filterData
) => ({
    queryFn: async () => {
        const { data } = await api.get("/analytics");
        return data;
    },
    onSuccess: (data) => {
        // console.log(data);
    },
    onError(err) {
        console.log(err);
    },
});

export default useAnalyticsQuery;

interface LicenseItem {
    pdf: string;
    price: string;
}

interface Licenses {
    personal: LicenseItem;
    commercial: LicenseItem;
    buyout: LicenseItem;
}

interface Files {
    images: string[];
    sourceFile: string;
    thumbnail: string;
}

interface Feature {
    heading: string;
    list: string[];
}

interface Service {
    text: string;
    price: number;
}

export interface ResponseProductType {
    licenses: Licenses;
    files: Files;
    _id: string;
    title: string;
    categories: string[];
    type: string;
    isVisible: boolean;
    description: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    features: Feature[];
    services: Service[];
    liveLink: string;
    softwares: string[];
    comments: string[];
    ratings: string[];
    views: number;
    downloads: number;
}
export interface BillingResponseType {
    _id: string;
    title: string;
    userId: string;
    status: string;
    product: string;
    plan: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export interface UserStoreResponseType {
    _id: string;
    userId: string;
    customerId: string;
    currentPlan: string;
    wishList: string[];
    notifications: string[];
    acquiredProducts: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export type AnalyticsDataType = {
    products: ResponseProductType[];
    allBilling: BillingResponseType[];
    userStore: UserStoreResponseType[];
};
