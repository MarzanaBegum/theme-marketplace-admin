import { useQuery } from "react-query";
import { api } from "../api";
import { CustomerFilterType } from "../context/CustomerFilterContext";
import { FilterDataByDate } from "./useTransactionsQuery";

const CUSTOMER_QUERY_KEY = "customer-query-key";

const useCustomerQuery = (filterData?: CustomerFilterType) =>
    useQuery<CustomerDataType[]>([CUSTOMER_QUERY_KEY], {
        queryFn: async () => {
            const { data } = await api.get(`/user-store`);
            return data;
        },
        select(data) {
            if (!filterData) return data;
            let newData = data;

            if (filterData?.date) {
                newData = FilterDataByDate(newData, filterData.date);
            }

            if (filterData?.status) {
                newData =
                    filterData.status === "all"
                        ? newData
                        : newData.filter(
                              (v) => v?.userId?.status == filterData?.status
                          );
            }

            if (filterData?.sort) {
                newData =
                    filterData.sort === "all"
                        ? newData
                        : newData.filter(
                              (v) => v.currentPlan?.priceId == filterData.sort
                          );
            }

            return newData;
        },
    });

interface UserId {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profile: string;
    googleAuth: boolean;
    status: string;
    userStore: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface CurrentPlan {
    _id: string;
    userId: string;
    planName: string;
    planPrice: number;
    interval: string;
    downloadLimit: number;
    planStart: Date;
    planEnd: Date;
    priceId: string;
    isTrial: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface CustomerDataType {
    _id: string;
    userId: UserId;
    customerId: string;
    notifications: any[];
    wishList: any[];
    downloadProducts: any[];
    freebieUse: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    currentPlan?: CurrentPlan;
}

export default useCustomerQuery;
