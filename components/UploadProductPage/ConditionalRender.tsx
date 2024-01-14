import UploadInput from "../Shared/UploadInput";
import {
    DefaultErrorType,
    GetUploadProduct,
} from "../../context/UploadProductContext";
import React from "react";
import AddPreviewImage from "./AddPreviewImage";
import AddTagsComponent from "./AddTagsComponent";
import CategoriesSection from "./CategoriesSection";
import FeaturesNameSection from "./FeaturesNameSection";
import PopularServiceSection from "./PopularServiceSection";
import SoftwareUsedSection from "./SoftwareUsedSection";
import UploadCard, { UploadCardHeader } from "./UploadCard";
import UploadLicense from "./UploadLicense";
import UploadThumbnailFile from "./UploadThumbnailFile";

function ConditionalRender({
    arr,
    error,
}: {
    arr: string[];
    error: DefaultErrorType;
}) {
    const [state, dispatch] = GetUploadProduct();
    return (
        <div>
            {arr.includes("title") && (
                <div className="mt-4">
                    <UploadCard id="title" error={error.title}>
                        <UploadCardHeader text="Title" />
                        <div className="pt-2"></div>
                        <UploadInput
                            onChange={(e) =>
                                dispatch({
                                    type: "title",
                                    value: e.target.value,
                                })
                            }
                            placeholder="Write title here"
                            value={state.title}
                        />
                    </UploadCard>
                </div>
            )}
            {arr.includes("licenses") && (
                <div className="mt-4">
                    <UploadCard id="licenses" error={error.licenses}>
                        <UploadCardHeader text="Choose a license" />

                        <div className="pt-2"></div>
                        <div className="flex flex-col gap-4 lg:gap-2">
                            <UploadLicense
                                title="Personal License"
                                desc="Get 3 month of support"
                                name="personal"
                            />
                            <UploadLicense
                                title="Commercial License"
                                desc="Get 6 month of support"
                                name="commercial"
                            />
                            <UploadLicense
                                title="Buyout License"
                                desc="Get 12 month of support"
                                name="buyout"
                            />
                        </div>
                    </UploadCard>
                </div>
            )}
            {arr.includes("services") && (
                <div className="mt-4">
                    <UploadCard id="services" error={error.services}>
                        <PopularServiceSection />
                    </UploadCard>
                </div>
            )}
            {arr.includes("features") && (
                <div className="mt-4">
                    <UploadCard id="features" error={error.features}>
                        <FeaturesNameSection />
                    </UploadCard>
                </div>
            )}
            {arr.includes("files") && (
                <div className="mt-4">
                    <UploadCard id="upload" error={error.upload}>
                        <div className="flex flex-col gap-4">
                            {"thumbnail" in state["files"] && (
                                <UploadThumbnailFile
                                    accept="image/*"
                                    text="Choose thumbnail"
                                    label="Upload JPG or PNG (340X212)"
                                    field="thumbnail"
                                />
                            )}
                            {"images" in state["files"] && <AddPreviewImage />}
                            {"sourceFile" in state["files"] && (
                                <UploadThumbnailFile
                                    accept=".zip,.rar,.7zip"
                                    text="Upload source file "
                                    label="ZIP - All files for customer, not including preview images"
                                    field="sourceFile"
                                />
                            )}
                        </div>
                    </UploadCard>
                </div>
            )}
            {arr.includes("categories") && (
                <div className="mt-4">
                    <UploadCard id="categories" error={error.categories}>
                        <CategoriesSection />
                    </UploadCard>
                </div>
            )}
            {arr.includes("tags") && (
                <div className="mt-4">
                    <UploadCard id="tags" error={error.tags}>
                        <UploadCardHeader text="Add Tags" />
                        <div className="pt-3"></div>
                        <AddTagsComponent />
                    </UploadCard>
                </div>
            )}
            {arr.includes("softwares") && (
                <div className="mt-4">
                    <UploadCard id="softwares" error={error.softwares}>
                        <SoftwareUsedSection />
                    </UploadCard>
                </div>
            )}
            {arr.includes("liveLink") && (
                <div className="mt-4">
                    <UploadCard id="liveLink" error={error.liveLink}>
                        <UploadCardHeader text="Live website url" />
                        <div className="pt-3"></div>
                        <div>
                            <input
                                type="text"
                                value={state.liveLink}
                                onChange={(e) =>
                                    dispatch({
                                        type: "liveLink",
                                        value: e.target.value,
                                    })
                                }
                                className="bg-[#F1F0FF] placeholder:text-[#9AA5B5]  rounded-md resize-y  focus:outline-none w-full text-sm leading-[22px] lg:px-4 text-[#252C48] h-[40px] lg:h-[48px] 3xl: px-4"
                                placeholder="Project live link"
                            />
                        </div>
                    </UploadCard>
                </div>
            )}
            {arr.includes("description") && (
                <div className="mt-4">
                    <UploadCard id="description" error={error.description}>
                        <UploadCardHeader text="Description" />
                        <div className="pt-3"></div>
                        <div>
                            <textarea
                                value={state.description}
                                onChange={(e) =>
                                    dispatch({
                                        type: "description",
                                        value: e.target.value,
                                    })
                                }
                                placeholder="Type description here"
                                className="bg-[#F1F0FF] placeholder:text-[#9AA5B5] lg:h-[175px] rounded-md resize-y h-[95px] focus:outline-none w-full text-sm leading-[22px] lg:p-4 text-[#252C48] py-2 px-4"
                            ></textarea>
                        </div>
                    </UploadCard>
                </div>
            )}
        </div>
    );
}

export default ConditionalRender;
