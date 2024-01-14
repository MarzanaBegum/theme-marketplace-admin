import LoadingAnimation from "../../components/CustomSvg/LoadingAnimation2";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import usePricingQuery from "../../api-call/usePricingQuery";
import { IntervalType, PriceDataType } from "../../pages/pricing";
import PricingCard from "./PricingCard";
import PricingTop from "./PricingTop";

export const Pricing = () => {
    const [interval, setInterval] = useState<IntervalType>("monthly");

    const { data, isLoading } = usePricingQuery(interval);

    if (!data) {
        return isLoading ? (
            <div className="flex items-center justify-center w-full h-screen">
                <LoadingAnimation color="#7266FC" width={50} height={50} />
            </div>
        ) : (
            <div className="flex items-center justify-center w-full h-screen">
                <div>No data found!</div>
            </div>
        );
    }

    return (
        <div className="px-4 lg:px-6 pb-[30px]">
            <div className="xl:px-[60px] 3xl:px-[200px]">
                <PricingTop onChange={(v) => setInterval(v)} />
            </div>
            <div className="flex justify-center ">
                <div>
                    <div className="flex flex-col justify-center gap-6 lg:flex-row lg:flex-wrap">
                        {data.map((v, i) => (
                            <div
                                key={i}
                                className="pricing-shadow h-auto p-[16px] xl:w-[384px] lg:p-4 w-[100%] xs:w-[343px] lg:w-[238px]  xl:pt-[40px] xl:pb-[94px] 2xl:px-[24px] bg-white group hover:bg-[#7266FC] transition-all duration-200  rounded-[6px] "
                            >
                                <PricingCard
                                    interval={interval}
                                    data={v}
                                    key={v._id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
