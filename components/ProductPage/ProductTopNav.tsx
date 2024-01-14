import ReactSelectGlobal from "../../components/TopNav/ReactSelectGlobal";
import SearchBox from "../../components/TopNav/SearchBox";
import { dateFilterOptions, sortOptions } from "../../utils/constant";
import { useAtom } from "jotai";
import React from "react";
import { ProductFilterState } from "../../state";

function ProductTopNav() {
    const [filter, setFilter] = useAtom(ProductFilterState);

    return (
        <div className="flex flex-col lg:flex-row mb-[16px] lg:mb-[24px] 3xl:mb-[19px] justify-end">
            <div className="flex flex-col lg:flex-row justify-end gap-[16px]">
                <SearchBox />
                <div className="flex justify-end gap-[16px]">
                    <ReactSelectGlobal
                        options={dateFilterOptions}
                        defaultValue={dateFilterOptions[0]}
                        onChange={(e: any) => {
                            setFilter((v) => ({ ...v, date: e.value }));
                        }}
                        className="w-[150px] 3xl:w-[180px]"
                    />

                    <ReactSelectGlobal
                        options={sortOptions}
                        defaultValue={sortOptions[0]}
                        className="w-[160px] 3xl:w-[180px] rounded-[8px]"
                        onChange={(e: any) => {
                            setFilter((v) => ({ ...v, sort: e.value }));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductTopNav;
