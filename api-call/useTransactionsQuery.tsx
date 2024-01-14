import { UseQueryOptions } from "react-query";
import { api } from "../api";

const useTransactionsQuery: (v?: any) => UseQueryOptions<any, any, any, any> = (
    filterData
) => ({
    queryFn: async () => {
        const { data } = await api.get(`/billing`);
        return data;
    },
    select(data) {
        return FilterDataByDate(data, filterData);
    },
});

export function FilterDataByDate<T>(data: T[], dateStr?: string): T[] {
    if (!dateStr) return data;
    const nowMilis = Date.now();
    const prevMilis = getFilterMilis(dateStr);
    const filterMilis = nowMilis - prevMilis;
    return data.filter((v: any) => {
        const dataMilis = new Date(v.createdAt).getTime();
        if (dataMilis > filterMilis) {
            return v;
        }
    });
}

const getFilterMilis = (filter: string): number => {
    switch (filter) {
        case "month":
            return 2.628e9;
        case "hour":
            return 3.6e6;
        case "week":
            return 6.048e8;
        case "year":
            return 3.154e10;
        default:
            return 0;
    }
};

export default useTransactionsQuery;
