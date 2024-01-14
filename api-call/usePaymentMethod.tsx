import { useQuery } from "react-query";
import { api } from "../api";

const usePaymentMethod = (customer: string) => {
    return useQuery(["payment-query-key"], {
        queryFn: async () => {
            const { data } = await api.get(
                `/payments/customer/${customer}/payment-method`
            );
            return data;
        },
        enabled: !!customer,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export default usePaymentMethod;
