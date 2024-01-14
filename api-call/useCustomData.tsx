import { useQuery } from "react-query";
import { API_URL, api } from "../api";

export interface CustomDataType {
    softwares: string[];
    categories: string[];
    tags: string[];
}

function useCustomData() {
    return useQuery<CustomDataType>(["custom-data-key"], {
        queryFn: async () => {
            const { data } = await api.get(`${API_URL}/data/index.json`);
            return data;
        },
    });
}

export default useCustomData;
