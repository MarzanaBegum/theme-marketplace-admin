import React from "react";
import RevenueCard from "./../RevenueCard/index";
import SalesRevenueChart from "./../SalesRevenueChart/index";
import NewSubscriberCard from "./../NewSubscriberCard/index";
import TransactionTable from "./../TransactionTable/index";
import Link from "next/link";

const DashboardHome = ({ data, filterValue }: any) => {
    return (
        <div className="">
            <RevenueCard data={data} filterValue={filterValue} />

            {/* chart section  */}

            <div className="mt-[16px] ">
                <div className="flex flex-col 3xl:flex-row">
                    <div className="3xl:w-[70%] w-[100%]">
                        <SalesRevenueChart />
                        <div>
                            <div className="mt-[24px] bg-white px-[24px] py-[24px] rounded-[6px]">
                                <div className="mb-[24px] flex items-center justify-between">
                                    <p className="lg:text-[22px] 3xl:text-[28px] text-[#3B415A] font-semibold">
                                        Recent Transactions{" "}
                                    </p>
                                    <Link href="/transactions">
                                        <h3 className="text-[14px] font-medium text-[#7266FC] cursor-pointer">
                                            See All
                                        </h3>
                                    </Link>
                                </div>
                                <div className="relative">
                                    <TransactionTable
                                        filterValue={filterValue}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="3xl:w-[28%] w-[100%] 3xl:ml-[2%] bg-white  rounded-[6px] border border-[#E5E7EB] mt-[16px] 3xl:mt-0 overflow-hidden">
                        <NewSubscriberCard filterValue={filterValue} />
                    </div>
                </div>
                <div className="pt-8 lg:hidden"></div>
            </div>
        </div>
    );
};

export default DashboardHome;
