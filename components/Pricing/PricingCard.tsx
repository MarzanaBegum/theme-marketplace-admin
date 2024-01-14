import Link from "next/link";
import React from "react";
import { IntervalType, PriceDataType } from "../../pages/pricing";

function PricingCard({
    data,
    interval,
}: {
    data: PriceDataType;
    interval: IntervalType;
}) {
    return (
        <div className="">
            <p className="xs:mb-[14px] xs:leading-[24px] lg:leading-8 2xl:leading-10 group-hover:text-white lg:text-[28px] xs:text-[18px] 2xl:text-[28px] font-[600] text-[#252C48] pa">
                {data.title}
            </p>
            <p
                className="leading-[30px] xs:mb-[14px] group-hover:text-white text-[#374151] lg:text-[18px] 2xl:text-[32px] font-[600] xs:text-[12px] 2xl:my-[20px]
                                 lg:my-[4px]"
            >
                ${data.price[interval]}{" "}
                <span className=" text-[#374151] first-letter:uppercase group-hover:text-white lg:text-[12px] 2xl:text-[18px]">
                    / {(data.isTrial && "For Week") || interval}
                </span>
            </p>
            <Link href={`/pricing/edit/${data._id}?interval=${interval}`}>
                <button className="rounded-[4px] xs:mb-[14px] bg-white border-[#7266FC] border-[1px] font-[500] text[#7266FC] text-[14px] w-full mt-2 lg:mb-3 2xl:mb-7 text-[#7266FC] py-3">
                    Edit
                </button>
            </Link>
            <div className="flex flex-col gap-4 lg:gap-2 3xl:gap-4">
                {data?.features?.map((feature, i) => (
                    <div key={i}>
                        <li className="flex items-center justify-start gap-2 lg:gap-4">
                            <img
                                className="w-5 h-5 "
                                src={
                                    feature.isValid
                                        ? "/icon/Checkmark.svg"
                                        : "/icon/Closemark.svg"
                                }
                                alt=""
                            />
                            <span className="leading-[22px] text-[14px] group-hover:text-white text-[#3B415A] xs:leading-[18px] ">
                                {feature.text}
                            </span>
                        </li>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PricingCard;
