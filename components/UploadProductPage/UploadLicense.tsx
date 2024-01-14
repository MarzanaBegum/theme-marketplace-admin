import { GetUploadProduct } from "../../context/UploadProductContext";
import React, { useEffect, useState } from "react";
import FileIcon from "../CustomSvg/FileIcon";
import UploadIcon from "../CustomSvg/UploadIcon";
import FixedTextInput from "./FixedTextInput";

function UploadLicense({
    title,
    desc,
    name,
}: {
    title: string;
    desc: string;
    name: "buyout" | "personal" | "commercial";
}) {
    const [state, dispatch] = GetUploadProduct();

    const file = state.licenses[name].pdf;

    return (
        <div className="lg:flex lg:justify-between lg:items-center lg:p-[10px]">
            <div className="pb-2 lg:pb-0">
                <div className="text-sm leading-[22px]  text-[#252C48] font-medium ">
                    {title}
                </div>
                <div className="text-sm leading-[22px] font-normal text-[#9AA5B5] ">
                    {desc}
                </div>
            </div>

            <div className="flex gap-4">
                <label
                    htmlFor={title}
                    className="bg-[#E3E0FE]  rounded-md flex items-center px-4 w-[calc(100%-116px)] lg:w-[146px] justify-center gap-4 py-[9px] cursor-pointer hover:bg-[#c3bdf8] transition-all duration-200"
                >
                    {file ? <FileIcon stroke="#7266FC" /> : <UploadIcon />}

                    <div className="text-sm max-w-[calc(100%-40px)] leading-[22px] truncate text-[#7266FC]">
                        {file
                            ? file instanceof File
                                ? file.name
                                : file
                            : "Upload pdf"}
                    </div>
                </label>
                <input
                    onChange={(e) => {
                        const files = e.target.files;
                        files?.length &&
                            dispatch({
                                type: `licenses.${name}.pdf`,
                                value: files[0],
                            });
                    }}
                    onClick={(e) => {
                        e.currentTarget.value = "";
                    }}
                    id={title}
                    className="hidden"
                    type="file"
                    accept="application/pdf"
                />
                <div className="w-[100px]">
                    <FixedTextInput
                        type="number"
                        fixedText="$"
                        className="bg-white font-medium p-[9px_10px] lg:p-[10px_9px] border-[#E5E7EB] text-center"
                        placeholder="$00.00"
                        onChange={(v) => {
                            dispatch({
                                type: `licenses.${name}.price`,
                                value: v,
                            });
                        }}
                        value={state.licenses[name].price}
                    />
                </div>
            </div>
        </div>
    );
}

export default UploadLicense;
