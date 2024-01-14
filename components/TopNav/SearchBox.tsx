import Image from "next/image";
import React, { useState } from "react";
import FilterItem from "../FilterItem";
import OutsideClickHandler from "react-outside-click-handler";
import { useAtom } from "jotai";
import { ProductFilterState } from "../../state";

const SearchBox = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useAtom(ProductFilterState);
    return (
        <div>
            <OutsideClickHandler onOutsideClick={() => setOpenFilter(false)}>
                <div className="relative">
                    <div className="w-[100%] lg:w-[340px] 3xl:w-[580px] h-[48px] 3xl:h-[48px] rounded-[4px] border border-[#E5E7EB] bg-white flex items-center px-[18px] py-[8px]">
                        <Image
                            src="/images/searchIcon.svg"
                            alt="search icon"
                            width={24}
                            height={24}
                            className="mr-[21px]"
                        />
                        <input
                            type="text"
                            name=""
                            value={filter.search}
                            placeholder="Search here"
                            onChange={(e) =>
                                setFilter((v) => ({
                                    ...v,
                                    search: e.target.value,
                                }))
                            }
                            className="w-[100%] lg:w-[236px] 3xl:w-[458px] border-none outline-none text-[12px] text-[#9AA5B5] font-normal"
                        />

                        <div className="border-l border-[#E3E0FE] ">
                            <Image
                                src="/icon/filterIcon.svg"
                                alt="filter"
                                width={16}
                                height={18}
                                className="ml-4 cursor-pointer"
                                onClick={() => setOpenFilter(!openFilter)}
                            />
                        </div>
                    </div>
                    {openFilter && <FilterItem />}
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default SearchBox;
