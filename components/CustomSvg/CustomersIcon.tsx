import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const CustomersIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 9.99999C12.3012 9.99999 14.1667 8.13451 14.1667 5.83332C14.1667 3.53214 12.3012 1.66666 10 1.66666C7.69881 1.66666 5.83333 3.53214 5.83333 5.83332C5.83333 8.13451 7.69881 9.99999 10 9.99999Z"
                        fill={stroke}
                    />
                    <path
                        d="M10 12.0833C5.825 12.0833 2.425 14.8833 2.425 18.3333C2.425 18.5667 2.60833 18.75 2.84167 18.75H17.1583C17.3917 18.75 17.575 18.5667 17.575 18.3333C17.575 14.8833 14.175 12.0833 10 12.0833Z"
                        fill={stroke}
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default CustomersIcon;
