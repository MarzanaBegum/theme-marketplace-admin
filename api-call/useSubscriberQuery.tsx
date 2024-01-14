import { UseQueryOptions } from "react-query";
import { api } from "../api";

const useSubscriberQuery: (v?: any) => UseQueryOptions<any, any, any, any> = (
    filterData
) => ({
    queryFn: async () => {
        const { data } = await api.get(`/plans`);
        return data;
    },
    onSuccess: (data) => {
        console.log(data);
    },
    select(data) {
        if (!filterData) return data;

        const nowMilis = Date.now();
        const prevMilis = getFilterMilis(filterData);
        const filterMilis = nowMilis - prevMilis;

        return data.filter((v: any) => {
            const dataMilis = new Date(v.createdAt).getTime();
            if (dataMilis > filterMilis && v.userId.status !== "banned") {
                return v;
            }
        });
    },
    onError(err) {
        console.log(err);
    },
});

export default useSubscriberQuery;

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
