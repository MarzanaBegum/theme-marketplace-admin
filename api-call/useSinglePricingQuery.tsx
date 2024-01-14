import { useQuery } from "react-query";
import { api } from "../api";

const useSinglePricingQuery = (id?: string) =>
    useQuery(["single-pricing-key"], {
        queryFn: async () => {
            const { data } = await api.get(`/pricings/${id}`);
            return data;
        },
        enabled: !!id,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchInterval: false,
    });

export default useSinglePricingQuery;
