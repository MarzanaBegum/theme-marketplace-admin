import React, { useState } from "react";
import { productCategory } from "./../../utils/constant";
import ViewProduct from "../ViewProduct";
import classNames from "classnames";
import { ScrollContainer } from "react-indiana-drag-scroll";

const ProductCard = () => {
    const [productState, setProductState] = useState("all products");

    return (
        <div>
            <ScrollContainer className="scroll-container">
                <ul className="flex gap-[32px] ">
                    {productCategory.map((item, index) => (
                        <li
                            onClick={() => setProductState(item)}
                            key={index}
                            className={classNames(
                                "inline-block cursor-pointer capitalize font-semibold text-[14px] 3xl:text-[18px] leading-[30px] whitespace-nowrap ",
                                item === productState
                                    ? "text-[#7266FC] border-b-2 border-indigo-500"
                                    : "text-[#4B5563]"
                            )}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </ScrollContainer>

            <ViewProduct productState={productState} />
        </div>
    );
};

export default ProductCard;
