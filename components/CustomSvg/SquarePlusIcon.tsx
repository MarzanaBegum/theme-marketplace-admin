import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

function SquarePlusIcon(props: IconType) {
    return (
        <CustomIcon
            {...props}
            svg={({
                height,
                width,
                className,
                groupClassName,
                color,
                stroke,
            }) => (
                <svg
                    width={width}
                    height={height}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={className}
                >
                    <path
                        d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM12 8v8M8 12h8"
                        stroke={stroke}
                        strokeWidth={1.5}
                        className={groupClassName}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        />
    );
}

export default SquarePlusIcon;
