import React, { useState } from "react";
import SearchBox from "./SearchBox";
import ReactSelectGlobal from "./ReactSelectGlobal";
import classNames from "classnames";
import LoadingAnimation from "../../components/CustomSvg/LoadingAnimation2";
import { options } from "../../utils/constant";

type NavProps = {
    title: string;
    isSearchVisible?: boolean;
    isSortVisible?: boolean;
    setFilterValue?: any;
};

const sortOptions = [
    { value: "most-view", label: "Most viewd products" },
    { value: "top-download", label: "Top downloaded" },
    { value: "trending-products", label: "Trending products" },
];

const TopNav = ({
    title,
    isSearchVisible,
    isSortVisible,
    setFilterValue,
}: NavProps) => {
    const handleFilterChange = (newValue: any) => {
        setFilterValue(newValue.value);
        console.log(newValue, "new value");
    };
    const handleChange = (newValue: any) => {};
    return (
        <div
            className={classNames(
                "flex flex-col lg:flex-row mb-[16px] lg:mb-[24px] 3xl:mb-[19px]",
                title ? "justify-between" : "justify-end"
            )}
        >
            {title && (
                <p className="text-[#252C48] lg:pt-[10px] text-[22px] leading-[30px] font-medium lg:text-[28px] lg:font-semibold capitalize 3xl:text-[32px] mb-[16px] lg:mb-0 mt-[16px]  lg:mt-0">
                    {title}
                </p>
            )}
            <div className="flex flex-col lg:flex-row justify-end gap-[16px]">
                {isSearchVisible && <SearchBox />}
                <div className="flex justify-end gap-[16px]">
                    <ReactSelectGlobal
                        options={options}
                        onChange={handleFilterChange}
                        defaultValue={options[0]}
                        className="w-[150px] 3xl:w-[180px]"
                    />
                    {isSortVisible && (
                        <ReactSelectGlobal
                            options={sortOptions}
                            onChange={handleChange}
                            defaultValue={sortOptions[0]}
                            className="w-[150px] 3xl:w-[180px] rounded-[8px]"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopNav;
