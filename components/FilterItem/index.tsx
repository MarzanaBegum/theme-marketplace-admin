import { useAtom } from "jotai";
import _ from "lodash";
import React from "react";
import { useQuery } from "react-query";
import useProductQuery, {
    ProductResponseType,
    PRODUCT_QUERY_KEY,
} from "../../api-call/useProductQuery";
import { ProductFilterState } from "../../state";

import Checkbox from "../Checkbox";

const FilterItem = () => {
    const typeStyle = "text-[#252C48] text-[16px] font-medium mb-[27px]";

    const [filter, setFilter] = useAtom(ProductFilterState);

    const { data } = useProductQuery();

    let categoriesFilter: string[] = [];
    let softwaresFilter: string[] = [];

    (data || []).forEach((v) => {
        categoriesFilter = _.uniq(categoriesFilter.concat(v.categories));
        softwaresFilter = _.uniq(softwaresFilter.concat(v.softwares));
    });

    return (
        <div className="w-[100%] lg:w-[340px] 3xl:w-[580px] max-h-[85vh] bg-white absolute top-[47px] 3xl:top-[45px] right-0 border border-[#E5E7EB] z-50 container1 drawer">
            <div className="container2 max-h-[85vh]">
                <div className="px-[24px] py-[24px]">
                    <div>
                        <form action="">
                            <h1 className={typeStyle}>Category</h1>
                            <div className="grid grid-cols-2  3xl:grid 3xl:grid-cols-3 gap-[30px]">
                                {categoriesFilter.map((category, index) => (
                                    <div key={index} className="">
                                        <Checkbox
                                            label={category}
                                            value={category}
                                            labelstyle="font-[14px] text-[#252C48] font-normal capitalize"
                                            handleOnChange={(e: any) => {
                                                const value = e.target.value;
                                                let prevArr: string[] =
                                                    filter.categories;

                                                const findIndex =
                                                    prevArr.indexOf(value);
                                                if (findIndex != -1) {
                                                    prevArr.splice(
                                                        findIndex,
                                                        1
                                                    );
                                                } else {
                                                    prevArr.push(value);
                                                }
                                                setFilter((v) => ({
                                                    ...v,
                                                    categories: prevArr,
                                                }));
                                            }}
                                            checked={
                                                filter.categories.includes(
                                                    category
                                                )
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                    <div className="mt-[43px]">
                        <form action="">
                            <h1 className={typeStyle}>Software used</h1>
                            <div className="grid grid-cols-2 gap-[30px]">
                                {softwaresFilter.map((category, index) => (
                                    <div key={index} className="flex flex-wrap">
                                        <Checkbox
                                            label={category}
                                            value={category}
                                            labelstyle="font-[14px] text-[#252C48] font-normal capitalize"
                                            handleOnChange={(e: any) => {
                                                const value = e.target.value;
                                                let prevArr: string[] =
                                                    filter.softwares;

                                                const findIndex =
                                                    prevArr.indexOf(value);
                                                if (findIndex != -1) {
                                                    prevArr.splice(
                                                        findIndex,
                                                        1
                                                    );
                                                } else {
                                                    prevArr.push(value);
                                                }
                                                setFilter((v) => ({
                                                    ...v,
                                                    softwares: prevArr,
                                                }));
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterItem;
