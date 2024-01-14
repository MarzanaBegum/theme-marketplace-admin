import { GetUploadProduct } from "../../context/UploadProductContext";
import _ from "lodash";
import React from "react";
import CloseIcon from "../CustomSvg/CloseIcon";
import SquarePlusIcon from "../CustomSvg/SquarePlusIcon";
import UploadIcon from "../CustomSvg/UploadIcon";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DraggablePreviewImage from "./DraggablePreviewImage";

function AddPreviewImage() {
    const [state, dispatch] = GetUploadProduct();

    const files = state.files.images;

    return (
        <div>
            <div>
                <div>
                    <label
                        htmlFor="new_preview_images"
                        className="flex items-center cursor-pointer justify-between p-[9px_16px] lg:p-[12px_16px] bg-[#F1F0FF] border border-[#C7C2FE] rounded-md "
                    >
                        <div className="flex items-center gap-2">
                            <SquarePlusIcon stroke="#6B7280" />
                            <div className="text-sm leading-[22px] font-normal text-[#7266FC]">
                                Add new preview
                            </div>
                        </div>
                        <div>
                            <UploadIcon color="#7266FC" />
                        </div>
                    </label>

                    <input
                        id="new_preview_images"
                        className="hidden"
                        type="file"
                        multiple={true}
                        accept="image/*"
                        onChange={(e) => {
                            const inputFiles = Array.from(e.target.files || []);

                            console.log(inputFiles);
                            const findString = files.filter(
                                (v) => typeof v === "string"
                            );
                            const findFiles = files.filter(
                                (v) => v instanceof File
                            );

                            const mergeFiles = [...inputFiles, ...findFiles];

                            const uniqueFiles = _.uniqBy(mergeFiles, "name");

                            const filesAndLinks = [
                                ...findString,
                                ...uniqueFiles,
                            ];

                            dispatch({
                                type: "files.images",
                                value: filesAndLinks,
                            });
                        }}
                        onClick={(e) => {
                            e.currentTarget.value = "";
                        }}
                    />
                    {files?.length ? (
                        <>
                            <div className="pt-2"></div>

                            <DraggablePreviewImage />

                            <div className="flex hidden flex-col gap-2">
                                {files.map((v, i) => (
                                    <div
                                        key={i}
                                        className="bg-white w-full flex items-center justify-between border p-[8px_16px] border-[#E5E7EB] rounded-md "
                                    >
                                        <div className="flex items-center w-[calc(100%-24px)] gap-4">
                                            <img
                                                className="w-6 h-6"
                                                src="/icon/lines.svg"
                                                alt=""
                                            />
                                            <img
                                                src={
                                                    typeof v === "string"
                                                        ? v
                                                        : URL.createObjectURL(v)
                                                }
                                                className="w-6 h-6 bg-[#F1F0FF]"
                                                alt=""
                                            />
                                            <div className="text-sm max-w-[calc(100%-80px)] truncate  leading-[22px] text-[#6B7280]">
                                                {typeof v === "string"
                                                    ? v
                                                    : v.name}
                                            </div>
                                        </div>
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => {
                                                dispatch({
                                                    type: "files.images",
                                                    value: files.filter(
                                                        (_, index) =>
                                                            index !== i
                                                    ),
                                                });
                                            }}
                                        >
                                            <CloseIcon
                                                stroke="#6B7280"
                                                color="#6B7280"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        ""
                    )}

                    <div className="pt-1"></div>
                    <div className="text-xs leading-[18px] text-[#9AA5B5] font-medium">
                        Upload JPG or PNG
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPreviewImage;
