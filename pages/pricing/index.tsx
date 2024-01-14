import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Pricing from "../../components/Pricing/index";
import Meta from "../../components/Shared/Meta";

export interface Price {
    monthly: number;
    annually?: number;
}

export interface Feature {
    text: string;
    isValid: boolean;
    _id: string;
}

export interface PriceDataType {
    price: Price;
    _id: string;
    title: string;
    features: Feature[];
    isTrial: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export type IntervalType = "monthly" | "annually";

const Prices = () => {
    return (
        <>
            <Meta title="Pricing - Theme Gregg Admin" />

            <DefaultLayout>
                <div>
                    <Pricing />
                </div>
            </DefaultLayout>
        </>
    );
};

export default Prices;
