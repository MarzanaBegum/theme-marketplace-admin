import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const ArrowIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 9 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 5L4.5 1.5M4.5 1.5L8 5M4.5 1.5V10.5"
                        stroke={stroke}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default ArrowIcon;
