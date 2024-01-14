/* eslint-disable @next/next/no-img-element */
import ArrowIcon from "../../components/CustomSvg/ArrowIcon";
import PlusIcon from "../../components/CustomSvg/PlusIcon";
import classNames from "classnames";
import React from "react";

const ProductDetailCardItem = ({
    title,
    image,
    totalProducts,
    benefitPercent,
    isViewed,
    isLess,
}: any) => {
    return (
        <div className="w-[100%] bg-[#FFFFFF] px-[16px] pt-[8px] pb-[12px] lg:py-[16px] 3xl:p-[24px] border border-[#E5E7EB] rounded-[6px]">
            <h2 className="text-[14px] leading-[22px] mb-[8px] lg:mb-[24px] 3xl:mb-[32px] font-medium text-[#6B7280]">
                {title}
            </h2>
            <div className="flex flex-wrap items-center justify-between xl:justify-start lg:gap-[62px]">
                <div>
                    <img
                        src={image}
                        alt="image"
                        className="w-[53.06px] h-[40px] lg:w-[79.59px] lg:h-[60px] 3xl:w-[130px] 3xl:h-[98px]"
                    />
                </div>
                <div>
                    {isViewed === true ? (
                        <div className="flex items-center gap-[10px] mb-[8px]">
                            <img
                                src="/images/most-view.svg"
                                alt="view-icon"
                                className="w-[20px] h-[16px]"
                            />
                            <h2 className="text-[14px] leading-[22px] font-medium lg:text-[18px] lg:leading-[30px] lg:font-semibold text-[#252C48]">
                                {totalProducts}
                            </h2>
                        </div>
                    ) : (
                        <h2 className="mb-[8px] text-[14px] leading-[22px] font-medium lg:text-[18px] lg:leading-[30px] lg:font-semibold text-[#252C48]">
                            {totalProducts}
                        </h2>
                    )}
                    <div
                        className={classNames(
                            "flex items-center gap-[6.5px] text-[12px] font-medium",
                            isLess === true ? "text-[red]" : "text-[#22C55E]"
                        )}
                    >
                        {isLess === true ? (
                            <div>-</div>
                        ) : (
                            <PlusIcon width={12} height={12} stroke="green" />
                        )}
                        <p>{`${Math.abs(benefitPercent).toLocaleString(
                            "automuds",
                            { maximumFractionDigits: 1 }
                        )}%`}</p>
                        <div
                            className={classNames(
                                isLess === true ? "rotate-180" : "routate-0"
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
        </div>
    );
};

export default ProductDetailCardItem;
