import { UseQueryOptions } from "react-query";
import { api } from "../api";

const allUserQuery: (v?: any) => UseQueryOptions<any, any, any, any> = (
    defaultData
) => ({
    initialData: defaultData,
    queryFn: async () => {
        const { data } = await api.get(`/users/all-user`);
        return data;
    },
    onSuccess: (data) => {
        console.log(data);
    },
    onError(err) {
        console.log(err);
    },
});

export default allUserQuery;
