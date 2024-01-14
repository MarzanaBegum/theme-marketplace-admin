import { UseQueryOptions, useQuery } from "react-query";
import { api } from "../api";
import { PriceDataType } from "../pages/pricing";

const PRICING_KEY = "pricing-query-key";

const usePricingQuery = (filterData?: string) =>
    useQuery<PriceDataType[]>([PRICING_KEY], {
        queryFn: async () => {
            const { data } = await api.get(`/pricings`);
            return data;
        },
        select(data) {
            if (!filterData) return data;
            return data.filter((v: any) => filterData in v.price);
        },
    });

export default usePricingQuery;
