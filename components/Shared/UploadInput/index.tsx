import React, { InputHTMLAttributes } from "react";

function UploadInput({
    className,
    ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`p-[8px_16px] lg:p-[12px_16px] text-[#3B415A] bg-[#F1F0FF] border border-[#E3E0FE] rounded-md text-sm leading-[22px] placeholder:text-[#9AA5B5] w-full focus:outline-none ${className}`}
            {...rest}
        />
    );
}

// hs

export default UploadInput;
