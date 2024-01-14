import React, { InputHTMLAttributes, useState } from "react";
import UploadInput from "../Shared/UploadInput";

type FixedTextInputType = {
    fixedText: string;
    onChange?: (v: string) => any;
    type?: "text" | "number";
} & InputHTMLAttributes<HTMLInputElement>;

function FixedTextInput({
    fixedText,
    onChange,
    className,
    value,
    type = "number",
    ...rest
}: FixedTextInputType) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const check = input.includes(fixedText)
            ? input.slice(fixedText.length)
            : input;
        const match =
            type === "number" ? check.match(/^-?\d*\.?\d*/g) : [check];
        if (match) {
            if (match[0] == "") {
                onChange && onChange("");
            } else {
                onChange && onChange(match[0]);
            }
        }
    };
    return (
        <UploadInput
            className={`text-center ${className}`}
            {...rest}
            onChange={handleChange}
            value={value ? `${fixedText}${value}` : ""}
        />
    );
}

export default FixedTextInput;
