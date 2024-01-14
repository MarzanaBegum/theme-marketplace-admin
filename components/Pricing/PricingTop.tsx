import { useAtom } from "jotai";
import React, { useState, useEffect } from "react";
import { IntervalType } from "../../pages/pricing";

type PricingTopType = {
    onChange?: (v: IntervalType) => any;
};

function PricingTop({ onChange }: PricingTopType) {
    const [open, setOpen] = useState<any>(false);
    return (
        <div className="w-full">
            <div className="lg:flex-row lg:justify-between flex flex-col text-[18px] justify-center text-center min-px-7 items-center 2xl:pt-[172px] 2xl:pb-[32px] lg:py-6 px-0">
                <h1 className="lg:text-[22px] mt-4 lg:mt-0 2xl:text-[32px] xs:text-[18px]  font-semibold text-[#252C48] ">
                    Edit Subscription Plan
                </h1>
                <div className="flex justify-center my-[24px]">
                    <h1 className="text-[14px]  lg:text-[16px] font-normal text-[#252C48] mr-[26px]">
                        Monthly
                    </h1>
                    <label
                        onClick={() => {
                            setOpen(!open);
                            onChange && onChange(open ? "monthly" : "annually");
                        }}
                        className="bg-[#7266FC] cursor-pointer relative w-[44px] mt-1 mr-[26px] h-[24px] rounded-full"
                    >
                        <span
                            className={`w-[20px] h-[20px] bg-white absolute rounded-full ${
                                open
                                    ? "top-[2px] left-[22px]"
                                    : "left-[2px] top-[2px]"
                            } transition-all duration-500`}
                        ></span>
                    </label>
                    <h1 className="lg:text-[16px] xs:text-[14px] font-normal text-[#252C48] ">
                        Yearly
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default PricingTop;
