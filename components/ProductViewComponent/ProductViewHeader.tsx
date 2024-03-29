import Link from "next/link";
import React from "react";
import RatingStar from "../Shared/RatingStar";
import PlayIcon from "../CustomSvg/PlayIcon";
import moment from "moment";
import { ProductType } from "../../pages/products/upload/preview/[id]";
import { API_URL } from "../../api";

function ProductViewHeader({ data }: { data: ProductType }) {
    const { rating, totalRating } = useRatingsData(data);

    return (
        <div>
            <div className="capitalize text-2xl sm:text-[32px] sm:tracking-[.25%] sm:w-[70%] sm:leading-[42px] xl:text-[40px] xl:leading-[60px] xl:font-semibold leading-[36px] lg:w-[50%] text-neutral font-medium">
                {data?.title}
            </div>
            <div className="pt-4 sm:pt-[18px] xl:pt-2"></div>
            <div className="xl:flex justify-between min-h-[48px]">
                <div className="flex flex-col gap-4 sm:flex-row lg:items-center">
                    <div className="flex items-center gap-2 text-sm leading-[18px] font-medium lg:text-base lg:leading-[27px]">
                        <div className="text-neutral-shade">
                            {moment(data?.createdAt).fromNow()}
                        </div>

                        <RatingStar className="gap-1" rating={rating} />
                        <div className="text-neutral">({totalRating})</div>
                    </div>
                    <div className="text-success py-[7px] w-[150px] text-xs leading-[18px] font-semibold bg-[rgba(19,206,102,.1)] text-center rounded-lg">
                        Recently Updated
                    </div>
                    <div className="flex items-center gap-4">
                        {data?.softwares?.map((v, i: number) => (
                            <div key={i}>
                                <img
                                    className="w-6 h-6"
                                    src={`${API_URL}/softwares/${v}.png`}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-10"></div>
                {data?.liveLink && (
                    <div className="group flex items-center justify-center w-full border border-brand xl:w-[300px] hover:bg-brand  transition-all duration-200 text-brand h-[48px] rounded-md gap-1">
                        <PlayIcon
                            className="w-[18px] h-[18px]"
                            groupClassName="group-hover:stroke-white"
                        />
                        <div className="text-sm leading-[18px] font-medium group-hover:text-white">
                            Live Preview
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductViewHeader;

export function useRatingsData(data: ProductType) {
    let rating = 0;
    let totalRating = 0;
    return { rating, totalRating };
}
