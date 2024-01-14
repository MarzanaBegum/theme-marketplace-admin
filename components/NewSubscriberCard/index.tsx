import React from "react";
import useSubscriberQuery from "../../api-call/useSubscriberQuery";
import { useQuery } from "react-query";
import Link from "next/link";
import moment from "moment";
import LoadingAnimation from "../../components/CustomSvg/LoadingAnimation2";

const NewSubscriberCard = ({ filterValue }: any) => {
    const ALL_SUBSCRIBER = "Get all subscriber";
    const { data, isLoading, refetch } = useQuery(
        [ALL_SUBSCRIBER],
        useSubscriberQuery(filterValue)
    );

    return (
        <div className="">
            <div className="px-[16px] py-[16px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[#252C48] text-[14px] font-medium leading-[22px]">
                        New Subscribers
                    </h1>
                    <Link href="/customers">
                        <p className="text-[#5C52D5]">See all</p>
                    </Link>
                </div>
                <p className="text-[#6B7280] text-[14px] font-normal leading-[22px] mt-[4px]">
                    Lorem ipsum dolor sit ametis.
                </p>
            </div>
            <hr />
            {/* map users  */}
            <div className="mt-[16px] px-[16px] py-[16px] flex flex-col">
                {data && data?.length > 0 ? (
                    data?.slice(0, 10).map((item: any, index: any) => (
                        <div
                            key={index}
                            className="flex flex-row justify-between mb-[16px]"
                        >
                            <div className="flex gap-[16px] w-full items-center">
                                {item?.userId?.profile ? (
                                    <img
                                        src={item?.userId?.profile}
                                        alt="profile"
                                        className="w-[36px] h-[36px] rounded-full object-cover"
                                        onError={(e: any) => {
                                            e.target.src = "/icon/profile.png";
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="/icon/profile.png"
                                        alt="profile"
                                        className="w-[36px] h-[36px] rounded-full"
                                    />
                                )}

                                <div className="flex w-[calc(100%-52px)] flex-col text-[14px] leading-[22px]">
                                    <p className="font-semibold flex items-center justify-between text-[#252C48]">
                                        <div>
                                            {item?.userId?.firstName}{" "}
                                            {item?.userId?.lastName}
                                        </div>

                                        <p className="text-[12px] text-[#9CA3AF] font-medium">
                                            {moment(item?.createdAt).fromNow()}
                                        </p>
                                    </p>
                                    <p className="text-[#9CA3AF] font-normal">
                                        {item?.userId?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : isLoading ? (
                    <div className="flex gap-3 item-center">
                        <LoadingAnimation color="#333" />
                        <div>Loading...</div>
                    </div>
                ) : (
                    <div>No data found</div>
                )}
            </div>
        </div>
    );
};

export default NewSubscriberCard;
