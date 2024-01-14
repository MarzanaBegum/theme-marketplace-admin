import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const PlusIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.5 2.5V9.5"
                        stroke={stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3 6H10"
                        stroke={stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default PlusIcon;
