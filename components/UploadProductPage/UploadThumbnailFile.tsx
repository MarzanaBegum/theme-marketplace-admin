import { GetUploadProduct } from "../../context/UploadProductContext";
import React, { useState } from "react";
import FileIcon from "../CustomSvg/FileIcon";
import UploadIcon from "../CustomSvg/UploadIcon";

function UploadThumbnailFile({
    text,
    label,
    accept,
    field,
}: {
    text: string;
    accept: string;
    label: string;
    field: "thumbnail" | "sourceFile";
}) {
    const [state, dispatch] = GetUploadProduct();

    const file = state.files[field];

    return (
        <div>
            <label
                htmlFor={text}
                className="flex items-center justify-between p-[9px_16px] lg:p-[12px_16px] bg-[#F1F0FF] border border-[#C7C2FE] rounded-md "
            >
                <div className="flex max-w-[calc(100%-30px)]  items-center gap-2">
                    <div className="text-sm truncate  leading-[22px] font-normal text-[#7266FC]">
                        {file
                            ? file instanceof File
                                ? file.name
                                : file
                            : text}
                    </div>
                </div>
                <div className="w-[24px]">
                    {file ? (
                        <>
                            {field === "thumbnail" ? (
                                <img
                                    src={
                                        typeof file == "string"
                                            ? file
                                            : URL.createObjectURL(file)
                                    }
                                    className="w-6 h-6 bg-[#F1F0FF]"
                                    alt=""
                                />
                            ) : (
                                <FileIcon stroke="#7266FC" />
                            )}
                        </>
                    ) : (
                        <UploadIcon stroke="#7266FC" />
                    )}
                </div>
            </label>
            <input
                type="file"
                accept={accept}
                id={text}
                className="hidden"
                onChange={(e) => {
                    const files = e.target.files;
                    if (files?.length) {
                        dispatch({ type: `files.${field}`, value: files[0] });
                    }
                }}
                onClick={(e) => {
                    e.currentTarget.value = "";
                }}
            />
            <div className="pt-1"></div>
            <div className="text-xs leading-[18px] text-[#9AA5B5] font-medium">
                {label}
            </div>
        </div>
    );
}

export default UploadThumbnailFile;
