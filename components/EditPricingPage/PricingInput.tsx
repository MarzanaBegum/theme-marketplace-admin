import React, { InputHTMLAttributes } from "react";

type PricingInputType = {
    label?: string;
    rootClass?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function PricingInput({
    label,
    className,
    rootClass,
    ...rest
}: PricingInputType) {
    return (
        <div className={rootClass}>
            <label className="lg:leading-[30px] lg:text-[22px] xs:leading-[22px] xs:text-[14px] font-[500] text-[#252C48] mb-2">
                {label}
            </label>
            {label && <div className="pt-[8px]"></div>}
            <div>
                <input
                    className={`rounded-[6px]  w-full h-[48px] bg-[#F1F0FF] text-[#252C48] placeholder:text-[#252C48] placeholder:font-[400] placeholder:text-[14px] text-[14px] font-[400] px-4 py-3 border-[#E3E0FE] border-[1px] focus:outline-none ${className} `}
                    {...rest}
                />
            </div>
        </div>
    );
}

export default PricingInput;
