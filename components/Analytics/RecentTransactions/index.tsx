import Link from "next/link";
import React from "react";
import TransactionTable from "../../TransactionTable";

const RecentTransactions = ({ filterValue }: any) => {
  return (
    <div className="mt-[16px] p-[16px] lg:mt-[24px] bg-white lg:p-[24px] rounded-[6px]">
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
      <TransactionTable filterValue={filterValue} />
    </div>
  );
};

export default RecentTransactions;
