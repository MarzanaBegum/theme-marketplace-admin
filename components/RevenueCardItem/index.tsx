import React from "react";
import { revenueDetails } from "../../utils/constant";
import classNames from "classnames";
import PlusIcon from "./../CustomSvg/PlusIcon";
import ArrowIcon from "./../CustomSvg/ArrowIcon";

const RevenueCardItem = ({
    indexNum,
    name,
    totalNum,
    benefitPercent,
    isDoller,
    isLess,
}: any) => {
    return (
        <div
            className={classNames(
                "border border-[#E5E7EB] lg:h-[76px] 3xl:h-[95px] rounded-[6px] 3xl:px-[62px] 3xl:py-[16px] lg:px-[24px] lg:py-[8px] px-[16px] py-[8px]",
                indexNum === "1" && "bg-[#F1F0FF]",
                indexNum === "2" && "bg-[#ECFEFF]",
                indexNum === "3" && "bg-[#FFFAF3]",
                indexNum === "4" && "bg-[#E7FAF0]"
            )}
        >
            <p className="text-[#3B415A] text-[14px] font-semibold ">
                TOTAL {name}
            </p>
            <div className="flex justify-between mt-[9px]">
                <h1 className="text-[#252C48] text-[14px] lg:text-[22px] font-medium	">
                    {`${isDoller} ${totalNum || 0}`}
                </h1>
                <div
                    className={classNames(
                        "flex items-center gap-[6.5px] text-[12px] font-medium ",
                        isLess === true ? "text-[red]" : "text-[#22C55E]"
                    )}
                >
                    {isLess === true ? (
                        <div>-</div>
                    ) : (
                        <PlusIcon width={12} height={12} stroke="green" />
                    )}

                    <p>{`${Math.abs(benefitPercent).toLocaleString("automuds", {
                        maximumFractionDigits: 1,
                    })}%`}</p>
                    <div
                        className={classNames(
                            isLess === true ? "rotate-180" : "rotate-0"
                        )}
                    >
                        <ArrowIcon
                            width={7}
                            height={9}
                            stroke={isLess === true ? "red" : "#22C55E"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueCardItem;
