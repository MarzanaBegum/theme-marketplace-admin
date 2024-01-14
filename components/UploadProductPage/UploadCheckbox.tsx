import { GetUploadProduct } from "../../context/UploadProductContext";
import React, { useState } from "react";

function UploadCheckbox({
    text,
    type,
}: {
    text: string;
    type: "categories" | "softwares";
}) {
    const [state, dispatch] = GetUploadProduct();
    const selectType = state[type];
    const index = selectType.indexOf(text);
    const handleCheckChange = () => {
        if (index !== -1) {
            const newType = selectType;
            newType.splice(index, 1);
            dispatch({ type: type, value: newType });
        } else {
            const newType = selectType;
            newType.push(text);
            dispatch({ type: type, value: newType });
        }
    };

    return (
        <div
            onClick={handleCheckChange}
            className="flex items-center gap-[11px] lg:gap-[19px]"
        >
            <div className="w-4 h-4">
                {index != -1 ? (
                    <img src="/icon/box-checked.svg" alt="" />
                ) : (
                    <img src="/icon/box-outline.svg" alt="" />
                )}
            </div>
            <div className="text-sm leading-[22px]  text-[#374151] lg:text-base lg:leading-[24px] cursor-pointer ">
                {text}
            </div>
        </div>
    );
}

export default UploadCheckbox;
