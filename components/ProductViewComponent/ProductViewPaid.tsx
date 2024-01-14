import React from "react";
import _ from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { productSupportData } from "../../data/fixed";
import LicenseItem from "./LicenseItem";
import { ProductType } from "../../pages/products/upload/preview/[id]";

type FormType = {
    license: LicenseType;
    services: number[];
    support: number;
};

type LicenseType = "personal" | "commercial" | "buyout";

function ProductViewPaid({ data }: { data: ProductType }) {
    return (
        <div className="bg-white rounded-md p-[10px] sm:p-5 w-full">
            <div className="flex items-center justify-between">
                <div className="text-xl leading-[30px] font-medium text-neutral sm:text-2xl capitalize">
                    {data?.type}
                </div>
            </div>
            {/* already downloaded  */}

            <AnimatePresence initial={false}>
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "fit-content" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                >
                    <div className="pt-5"></div>

                    <div className="text-lg font-medium leading-6 sm:text-xl sm:leading-[1.5] text-neutral">
                        Choose a license
                    </div>
                    <div className="pt-[10px]"></div>
                    <div>
                        <LicenseItem
                            name="Personal license"
                            desc="Get 3 months of support"
                            price={data?.licenses?.personal?.price}
                            active={false}
                            onClick={() => {}}
                        />

                        <LicenseItem
                            name="Commercial license"
                            desc="Get 6 months of support"
                            price={data?.licenses?.commercial?.price}
                            active={false}
                            onClick={() => {}}
                        />

                        <LicenseItem
                            name="Buyout license"
                            desc="Get 12 months of support"
                            price={data?.licenses?.buyout?.price}
                            active={false}
                            onClick={() => {}}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="pt-[20px]"></div>
            {/* Popular service  */}

            {data?.services?.length && (
                <div>
                    <div className="text-xl leading-[30px] font-semibold text-neutral sm:text-2xl">
                        Popular Service
                    </div>
                    <div className="pt-4"></div>
                    <div className="flex flex-col gap-[10px] sm:gap-3">
                        {data?.services?.map((v, i) => (
                            <label
                                key={i}
                                className="flex  items-center justify-between"
                            >
                                <div className="flex  items-center flex-grow gap-2">
                                    <input
                                        onClick={() => {}}
                                        className="h-[15px] group-hover:border-brand transit w-[15px] sm:w-4 sm:h-4"
                                        type="checkbox"
                                        onChange={() => {}}
                                    />
                                    <div className=" w-[calc(100%-42px)] transit group-hover:text-brand text-xs  text-[#252C48] sm:text-sm leading-[1.5]">
                                        {v.text}
                                    </div>
                                </div>
                                <div className="text-sm group-hover:text-brand transit leading-[21px] font-medium">
                                    {`$${v.price}`}
                                </div>
                            </label>
                        ))}
                    </div>
                    <div className="pt-6"></div>
                </div>
            )}

            <div>
                <div className="flex items-center justify-between">
                    <div className="text-xl leading-[30px] font-semibold text-neutral sm:text-2xl">
                        Support
                    </div>
                </div>
                <div className="pt-4"></div>
                <div className="flex flex-col gap-[10px] sm:gap-3">
                    {productSupportData?.map((v, i) => (
                        <label
                            key={i}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center flex-grow gap-2">
                                <input
                                    onClick={() => {}}
                                    onChange={() => {}}
                                    className="h-[15px] group-hover:border-brand transit w-[15px] sm:w-4 sm:h-4"
                                    type="checkbox"
                                />
                                <div className=" group-hover:text-brand transit w-[calc(100%-42px)] text-xs  text-[#252C48] sm:text-sm leading-[1.5]">
                                    {v.text}
                                </div>
                            </div>
                            <div className="text-sm group-hover:text-brand transit leading-[21px] font-medium">
                                {`$${v.price}`}
                            </div>
                        </label>
                    ))}
                </div>
                <div className="pt-4"></div>
                <div className="text-brand cursor-pointer text-sm leading-[21px]">
                    How does support work?
                </div>
            </div>

            <div className="pt-[30px]"></div>
            <div className="bg-[#EFF3FB] px-[10px] py-5 rounded-md">
                <div className="text-sm leading-[21px] text-center">
                    This is item is included in your Individual - Trial
                    subscription!
                </div>
                <div className="pt-4"></div>
                <button className="h-[48px] disabled:bg-[#9AA5B5] transit hover:bg-[#473EAE] text-sm bg-brand rounded-md text-white w-full">
                    Download
                </button>
            </div>
        </div>
    );
}

export default ProductViewPaid;
