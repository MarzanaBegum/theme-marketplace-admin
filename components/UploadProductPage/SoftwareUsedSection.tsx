import React, { useState } from "react";
import FilterCheckbox from "./UploadCheckbox";
import { UploadCardHeader } from "./UploadCard";
import UploadInput from "../Shared/UploadInput";
import PlusIcon from "../../components/CustomSvg/PlusIcon";
import NewUploadIcon from "../../components/CustomSvg/NewUploadIcon";
import LoadingAnimation from "../../components/CustomSvg/LoadingAnimation2";
import useCustomData from "../../api-call/useCustomData";
import { api } from "../../api";

function SoftwareUsedSection() {
    const { data } = useCustomData();
    const [fieldOpen, setFieldOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center">
                <UploadCardHeader text="Software Used" />
                <button
                    onClick={() => setFieldOpen(!fieldOpen)}
                    className="p-[6px]  lg:p-[9px_12px] disabled:bg-[#9AA5B5] disabled:hover:bg-[#9AA5B5] cursor-pointer text-sm text-[#7266FC] font-medium leading-[22px] text-center  rounded-md"
                >
                    Add more
                </button>
            </div>
            <div className="pt-4"></div>
            {/* <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 lg:gap-y-5 lg:gap-x-11"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 3xl:grid-cols-4 gap-4 lg:gap-y-5 lg:gap-x-11">
                {data?.softwares?.map((v, i) => (
                    <FilterCheckbox type="softwares" key={i} text={v} />
                ))}
            </div>
            {fieldOpen && <AddCustomSoftwareUsed />}
            <div className="pt-3"></div>
        </div>
    );
}

function AddCustomSoftwareUsed() {
    const { refetch } = useCustomData();
    const [value, setValue] = useState("");
    const [file, setFile] = useState<File | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        if (!file || !value) return;
        if (loading) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("img", file);
            await api.post(`/customs/software?filename=${value}`, formData);
            setValue("");
            setFile(undefined);
            refetch();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };
    return (
        <div className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="md:w-[calc(50%-28px)] lg:w-[calc(50%-32px)]">
                <label className="w-full gap-3 p-[8px_16px] flex items-center h-10 rounded cursor-pointer bg-[#f1f0ff]">
                    <NewUploadIcon color="#7266FC" />
                    {file?.name ? (
                        <div className="text-sm text-[#7266FC] w-[calc(100%-40px)]">
                            {file?.name}
                        </div>
                    ) : (
                        <div className="text-sm text-[#6B7280] w-[calc(100%-40px)]">
                            Select a png icon
                        </div>
                    )}

                    <input
                        type="file"
                        className="hidden"
                        accept="image/png"
                        onChange={(e) => {
                            const files = e.target.files;
                            files?.length && setFile(files[0]);
                        }}
                        onClick={(e) => {
                            e.currentTarget.value = "";
                        }}
                    />
                </label>
            </div>

            <div className="flex md:w-[calc(50%+28px)] lg:w-[calc(50%+32px)] gap-4 ">
                <div className="w-[calc(100%-56px)] lg:w-[calc(100%-64px)] flex-col flex items-center gap-4">
                    <UploadInput
                        className="lg:!p-[8px_16px]"
                        placeholder="type software used"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={value && file ? false : true}
                    className="enabled:hover:bg-[#473EAE] flex items-center justify-center disabled:bg-[#9AA5B5]  bg-[#7266FC]  rounded-md h-[40px] w-[40px] lg:w-[48px] p-2"
                >
                    {loading ? (
                        <LoadingAnimation color="#fff" />
                    ) : (
                        <PlusIcon stroke="#fff" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default SoftwareUsedSection;
