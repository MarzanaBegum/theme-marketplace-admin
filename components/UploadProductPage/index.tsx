import DefaultLayout from "../../components/DefaultLayout";
import {
    DefaultError,
    GetUploadProduct,
} from "../../context/UploadProductContext";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../api";
import ConditionalRender from "./ConditionalRender";
import LoadingDialog from "./LoadingDialog";

type LoadingType = {
    status: boolean;
    list: {
        file: File;
        progress: number;
    }[];
};

type DispatchType = { type: string; value: any };

const Default_Loading = {
    status: false,
    list: [],
};
const Loading_Action = (state: LoadingType, action: DispatchType) => {
    const { type, value } = action;
    const newState = _.set({ ...state }, type, value);
    return newState;
};

function UploadProductPage({
    split,
    title,
    isUpdate,
    id,
}: {
    isUpdate: boolean;
    split?: number;
    title: string;
    id?: string;
}) {
    const [state] = GetUploadProduct();
    const [error, setError] = useState(DefaultError);

    const [loading, setLoading] = useReducer(Loading_Action, Default_Loading);
    const [responseError, setResponseError] = useState("");

    function returnError(field: string, message: string) {
        setError({ ...DefaultError, [field]: message });
        const ele = document.getElementById(field);
        ele?.scrollIntoView({ behavior: "smooth" });
    }

    const recursiveCheck = (obj: Object, arr?: any[]): boolean => {
        const isEmpty = arr || [];
        Object.values(obj).forEach((v) => {
            if (typeof v === "object") {
                recursiveCheck(v, isEmpty);
                return;
            }

            if (v === "") {
                isEmpty.push(true);
            }
            if (Array.isArray(v) && v.length === 0) {
                isEmpty.push(true);
            }
        });
        return !!isEmpty.length;
    };

    const newArr = Object.keys(state);
    const leftArr = newArr.slice(0, split);
    const rightArr = newArr.slice(split);

    const router = useRouter();

    const onSubmit = async () => {
        for (const key in state) {
            switch (key) {
                case "title":
                    if (!state.title) {
                        returnError("title", "Product title is required");
                        return;
                    }
                    break;

                case "licenses":
                    if (recursiveCheck(state.licenses)) {
                        returnError(
                            "licenses",
                            "All license and price are required"
                        );
                        return;
                    }
                    break;

                case "services":
                    if (state.services.length) {
                        const findService = state.services.find((v) => {
                            return (
                                (v.price && !v.text) ||
                                (!v.price && v.text) ||
                                (!v.price && !v.text)
                            );
                        });
                        if (findService) {
                            returnError(
                                "services",
                                "Please make sure you write title and price"
                            );
                            return;
                        }
                    }
                    break;

                case "features":
                    if (state.features.length) {
                        const findFeatures = state.features.find((v) => {
                            const checkList = v.list.filter(
                                (j) => j != ""
                            ).length;
                            return (
                                (v.heading && !checkList) ||
                                (!v.heading && checkList) ||
                                (!v.heading && !checkList)
                            );
                        });
                        if (findFeatures) {
                            returnError(
                                "features",
                                "Please make sure you write heading with at least one features"
                            );
                            return;
                        }
                    }
                    break;

                case "files":
                    if (
                        "images" in state["files"] &&
                        !state.files.images.length
                    ) {
                        returnError(
                            "upload",
                            "Thumbnail, Preview images and source file is required"
                        );
                        return;
                    }

                    if (
                        "thumbnail" in state["files"] &&
                        !state.files.thumbnail
                    ) {
                        returnError(
                            "upload",
                            "Thumbnail, Preview images and source file is required"
                        );
                        return;
                    }

                    if (
                        "sourceFile" in state["files"] &&
                        !state.files.sourceFile
                    ) {
                        returnError(
                            "upload",
                            "Thumbnail, Preview images and source file is required"
                        );
                        return;
                    }
                    break;
                case "categories":
                    if (!state.categories.length) {
                        returnError(
                            "categories",
                            "Select atleast one categories"
                        );
                        return;
                    }
                    break;
                case "tags":
                    if (!state.tags.length) {
                        returnError("tags", "Atleast one tag required");
                        return;
                    }
                    break;
                case "softwares":
                    if (!state.softwares.length) {
                        returnError(
                            "softwares",
                            "Select atleast one software used"
                        );
                        return;
                    }
                    break;
                case "description":
                    if (!state.description) {
                        returnError(
                            "description",
                            "Product description is required"
                        );
                        return;
                    }
                    break;
            }
        }
        try {
            if (loading.status) return;
            setLoading({ type: "status", value: true });
            const newState = _.cloneDeep(state);
            const readyObject = await objectMap(newState);

            if (!isUpdate) {
                const { data } = await api.post("/products", readyObject);
                toast.success("Product created successfully");
            } else if (id) {
                const { data } = await api.put(`/products/${id}`, readyObject);
                toast.success("Product updated successfully");
            }

            setLoading({ type: "list", value: [] });
            setLoading({ type: "status", value: false });

            await router.push("/products");
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            setResponseError(errMessage);
            toast.error(errMessage);
            setLoading({ type: "list", value: [] });
            setLoading({ type: "status", value: false });
        }
    };
    const onPreview = async () => {
        for (const key in state) {
            switch (key) {
                case "title":
                    if (!state.title) {
                        returnError("title", "Product title is required");
                        return;
                    }
                    break;

                case "licenses":
                    if (recursiveCheck(state.licenses)) {
                        returnError(
                            "licenses",
                            "All license and price are required"
                        );
                        return;
                    }
                    break;

                case "services":
                    if (state.services.length) {
                        const findService = state.services.find((v) => {
                            return (
                                (v.price && !v.text) ||
                                (!v.price && v.text) ||
                                (!v.price && !v.text)
                            );
                        });
                        if (findService) {
                            returnError(
                                "services",
                                "Please make sure you write title and price"
                            );
                            return;
                        }
                    }
                    break;

                case "features":
                    if (state.features.length) {
                        const findFeatures = state.features.find((v) => {
                            const checkList = v.list.filter(
                                (j) => j != ""
                            ).length;
                            return (
                                (v.heading && !checkList) ||
                                (!v.heading && checkList) ||
                                (!v.heading && !checkList)
                            );
                        });
                        if (findFeatures) {
                            returnError(
                                "features",
                                "Please make sure you write heading with at least one features"
                            );
                            return;
                        }
                    }
                    break;

                case "files":
                    if (
                        "images" in state["files"] &&
                        !state.files.images.length
                    ) {
                        returnError(
                            "upload",
                            "Thumbnail, Preview images and source file is required"
                        );
                        return;
                    }

                    if (
                        "thumbnail" in state["files"] &&
                        !state.files.thumbnail
                    ) {
                        returnError(
                            "upload",
                            "Thumbnail, Preview images and source file is required"
                        );
                        return;
                    }

                    if (
                        "sourceFile" in state["files"] &&
                        !state.files.sourceFile
                    ) {
                        returnError(
                            "upload",
                            "Thumbnail, Preview images and source file is required"
                        );
                        return;
                    }
                    break;
                case "categories":
                    if (!state.categories.length) {
                        returnError(
                            "categories",
                            "Select atleast one categories"
                        );
                        return;
                    }
                    break;
                case "tags":
                    if (!state.tags.length) {
                        returnError("tags", "Atleast one tag required");
                        return;
                    }
                    break;
                case "softwares":
                    if (!state.softwares.length) {
                        returnError(
                            "softwares",
                            "Select atleast one software used"
                        );
                        return;
                    }
                    break;
                case "description":
                    if (!state.description) {
                        returnError(
                            "description",
                            "Product description is required"
                        );
                        return;
                    }
                    break;
            }
        }
        try {
            const newState = _.cloneDeep(state);
            const readyJsonObj = await createObjectUrlMap(newState);

            const jsonString = JSON.stringify(readyJsonObj);
            localStorage.setItem("f716ef525a8", jsonString);

            const a = document.createElement("a");
            a.href = "/products/upload/preview/f716ef525a8";
            a.target = "_blank";
            a.click();
        } catch (err: any) {
            console.log(err);
        }
    };

    async function createObjectUrlMap(obj: any) {
        let object: any = obj || {};
        for (let [key, value] of Object.entries(object)) {
            if (typeof value === "object") {
                object[key] = await createObjectUrlMap(value);
            }

            if (value instanceof File) {
                object[key] = await URL.createObjectURL(value);
            }
        }
        return object;
    }

    async function objectMap(obj: any) {
        let object: any = obj || {};
        for (let [key, value] of Object.entries(object)) {
            if (typeof value === "object") {
                object[key] = await objectMap(value);
            }

            if (value instanceof File) {
                object[key] = await uploadFile(value);
            }
        }
        return object;
    }

    async function uploadFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        const newList = loading.list;
        newList.push({ file, progress: 0 });
        setLoading({ type: "list", value: newList });

        const { data } = await api.post("/files/upload", formData, {
            onUploadProgress: (e) => {
                if (e.progress) {
                    const list = [...loading.list];
                    list[list.length - 1].progress = e.progress * 100;
                    setLoading({ type: "list", value: list });
                }
            },
        });
        return data;
    }

    return (
        <DefaultLayout>
            <div className="px-4 ">
                <div className="pt-4 lg:pt-6"></div>
                <div className="text-[22px] lg:text-[28px] lg:leading-[40px] lg:font-semibold leading-[30px] text-[#252C48] font-medium">
                    {isUpdate ? "Edit" : "Upload"}{" "}
                    <span className="capitalize">{title}</span>
                </div>

                <div className="3xl:flex 3xl:gap-6">
                    <div className="left-section 3xl:w-[calc(50%-12px)]">
                        <ConditionalRender arr={leftArr} error={error} />
                    </div>
                    <div className="right-section 3xl:w-[calc(50%-12px)]">
                        <ConditionalRender arr={rightArr} error={error} />
                        {/* buttons   */}
                        <div className="mt-10"></div>
                        <div className="flex justify-end gap-4 lg:gap-6">
                            <button
                                onClick={onPreview}
                                type="button"
                                className="border flex items-center justify-center transit hover:text-white lg:max-w-[200px] rounded-md w-full h-[48px] group border-[#7266FC] text-[#7266FC] hover:bg-[#7266FC] text-sm leading-[22px] font-medium"
                            >
                                View a preview
                            </button>
                            {/* bg-[#9AA5B5] */}
                            <button
                                onClick={onSubmit}
                                className="border hover:bg-[#473EAE] bg-[#7266FC] lg:max-w-[200px]  rounded-md w-full h-[48px] border-[#9AA5B5] text-white text-sm leading-[22px] font-medium"
                            >
                                {isUpdate ? "Update" : "Publish"} Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-10"></div>
            </div>
            <LoadingDialog
                list={loading.list}
                isOpen={loading.status}
                handleModal={() => {}}
                error={responseError}
                isUpdate={isUpdate}
            />
        </DefaultLayout>
    );
}

export default UploadProductPage;
