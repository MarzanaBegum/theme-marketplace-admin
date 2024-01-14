import { useQuery } from "react-query";
import { api } from "../api";
import { ProductFilterStateType } from "../state";

export const PRODUCT_QUERY_KEY = "product-query";

const useProductQuery = (filter?: ProductFilterStateType) =>
    useQuery<ProductResponseType[]>([PRODUCT_QUERY_KEY], {
        queryFn: async () => {
            const { data } = await api.get(`/products`);
            return data;
        },
        select: (d) => {
            if (!filter) return d;
            let newData = d;

            const { type, date, sort, search, categories, softwares } = filter;

            if (type) {
                newData = newData.filter((v: any) => {
                    if (type === "all products") {
                        return true;
                    } else if (type === "hidden products") {
                        return v.isVisible === false;
                    } else {
                        return v.type === type;
                    }
                });
            }

            if (date) {
                const nowMilis = Date.now();
                const prevMilis = getFilterMilis(date);
                const filterMilis = nowMilis - prevMilis;

                newData = newData.filter((v: any) => {
                    const dataMilis = new Date(v.createdAt).getTime();
                    if (dataMilis > filterMilis) {
                        return v;
                    }
                });
            }

            if (sort) {
                if (sort === "most-viewed") {
                    newData = newData.sort((a, b) => a.views - b.views);
                }
                if (sort === "top-download") {
                    newData = newData.sort((a, b) => a.downloads - b.downloads);
                }
                if (sort === "trending") {
                    // create trending algorithm
                    newData = TrendingAlgorithm(newData);
                }
            }

            if (search) {
                newData = newData.filter((v) =>
                    v.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            if (categories.length) {
                newData = newData.filter((v) =>
                    v?.categories?.some((n) => categories.includes(n))
                );
            }

            if (softwares.length) {
                newData = newData.filter((v) =>
                    v?.softwares?.some((n) => softwares.includes(n))
                );
            }

            return newData;
        },
    });

// trending algorithm
function TrendingAlgorithm(data: ProductResponseType[]): ProductResponseType[] {
    return data;
}

export const getFilterMilis = (filter: string): number => {
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

export interface ProductResponseType {
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
    views: number;
    downloads: number;
}

export default useProductQuery;
