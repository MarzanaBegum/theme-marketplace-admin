import React, { useEffect, useState } from "react";
import ProductViewHeader from "../../../../components/ProductViewComponent/ProductViewHeader";

import ProductViewLeft from "../../../../components/ProductViewComponent/ProductViewLeft";
import ProductViewRight from "../../../../components/ProductViewComponent/ProductViewRight";
import LoadingAnimation from "../../../../components/CustomSvg/LoadingAnimation2";
import { useRouter } from "next/router";

function ProductPreview() {
    const [data, setData] = useState<ProductType>();

    const router = useRouter();

    const { id } = router.query as any;

    useEffect(() => {
        const getData = localStorage.getItem(id);
        if (getData) {
            setData(JSON.parse(getData));
        }
    }, [id]);

    return (
        <div className="bg-[#EFF3FB] ">
            {!data ? (
                <div className="min-h-screen w-full flex items-center justify-center">
                    <LoadingAnimation color="#7266FC" width={50} height={50} />
                </div>
            ) : (
                <div className=" container">
                    <div className=" py-[40px] sm:pt-[60px] lg:pt-[80px]">
                        <div>
                            <ProductViewHeader data={data} />
                        </div>
                        <div className="pt-5 lg:pt-[30px]"></div>
                        <div className="flex flex-col lg:flex-row-reverse lg:justify-between">
                            <ProductViewRight data={data} />
                            <div className="pt-5 lg:pt-[30px]"></div>

                            <ProductViewLeft data={data} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export interface Personal {
    pdf: string;
    price: string;
}

export interface Commercial {
    pdf: string;
    price: string;
}

export interface Buyout {
    pdf: string;
    price: string;
}

export interface Licenses {
    personal: Personal;
    commercial: Commercial;
    buyout: Buyout;
}

export interface Files {
    images: string[];
    sourceFile: string;
    thumbnail: string;
}

export interface Feature {
    heading: string;
    list: string[];
}

export interface Service {
    text: string;
    price: number;
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
}

export interface Rating {
    _id: string;
    user: User;
    text: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ProductType {
    licenses: Licenses;
    files: Files;
    _id: string;
    title: string;
    categories: string[];
    isVisible: boolean;
    description: string;
    features?: Feature[];
    services?: Service[];
    liveLink?: string;
    softwares: string[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    ratings: Rating[] | string[];
    downloads: number;
    views: number;
    type: string;
    comments?: string[];
    buyout?: string;
}

export default ProductPreview;
