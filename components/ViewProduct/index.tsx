/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Pagination, { isArray } from "../Pagination";
import useProductQuery from "../../api-call/useProductQuery";
import ProductDetail from "./ProductDetail";
import LoadingAnimation from "../../components/CustomSvg/LoadingAnimation1";

type cardProps = {
    productState: string;
};

const ViewProduct = ({ productState }: cardProps) => {
    const { data, isLoading, refetch } = useProductQuery();

    const filterData =
        productState === "all products"
            ? data?.filter((item: any) => item && item.isVisible === true)
            : data?.filter(
                  (item: any) =>
                      (item.type === productState && item.isVisible === true) ||
                      (item.isVisible === false &&
                          productState === "hidden products")
              );
    if (!filterData) return <></>;

    return (
        <>
            <Pagination
                className="pt-4 !justify-end hidden"
                dataArr={isArray(filterData)}
                itemsPerPage={24}
            >
                {(currentItems) => (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 2xl:grid-cols-3  3xl:grid-cols-4 gap-[24px] mt-[24px]">
                            {currentItems.map((product: any, index) => (
                                <ProductDetail data={product} key={index} />
                            ))}
                        </div>
                    </>
                )}
            </Pagination>

            {filterData?.length === 0 && (
                <p className="text-[#4B5563] text-[18px] font-semibold">
                    No Products available !
                </p>
            )}
            {isLoading && (
                <div className="flex items-center justify-center w-full h-[60vh]">
                    <LoadingAnimation color="#7266FC" width={50} height={50} />
                </div>
            )}
        </>
    );
};

export default ViewProduct;
