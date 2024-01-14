import Pagination from "../../components/Pagination";
import ProductDetail from "../../components/ViewProduct/ProductDetail";
import { productTab } from "../../utils/constant";
import classNames from "classnames";
import { useAtom } from "jotai";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import useProductQuery, {
    ProductResponseType,
} from "../../api-call/useProductQuery";
import { ProductFilterState } from "../../state";
type ItemViewType = { filterTab: string[] };

function ProductItemView({ filterTab }: ItemViewType) {
    const [filter, setFilter] = useAtom(ProductFilterState);

    const { data: newData } = useProductQuery(filter);

    return (
        <>
            <ScrollContainer
                style={{ cursor: "default" }}
                className="scroll-container"
            >
                <ul className="flex gap-[32px] ">
                    {productTab.map((item, index) => (
                        <li
                            onClick={() =>
                                setFilter((v) => ({ ...v, type: item.value }))
                            }
                            key={index}
                            className={classNames(
                                "inline-block cursor-pointer capitalize font-semibold text-[14px] 3xl:text-[18px] leading-[30px] whitespace-nowrap ",
                                item.value === filter.type &&
                                    "text-[#7266FC] border-b-2 border-indigo-500",
                                filterTab && filterTab?.includes(item.value)
                                    ? "block"
                                    : "hidden"

                                // ,"text-[#4B5563]"
                            )}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </ScrollContainer>
            <div>
                <Pagination
                    className="pt-4 !justify-end"
                    dataArr={newData as ProductResponseType[]}
                    itemsPerPage={24}
                >
                    {(currentItems) => (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 2xl:grid-cols-3  3xl:grid-cols-4 3xl:gap-6  mt-[24px]">
                                {currentItems.map((product, index) => (
                                    <ProductDetail data={product} key={index} />
                                ))}
                            </div>
                            {!currentItems.length && (
                                <p className="text-[#4B5563] text-[18px] font-semibold">
                                    No Products available !
                                </p>
                            )}
                        </>
                    )}
                </Pagination>
            </div>
        </>
    );
}

export default ProductItemView;
