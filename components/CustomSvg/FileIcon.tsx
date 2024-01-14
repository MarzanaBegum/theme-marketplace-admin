import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

function FileIcon(props: IconType) {
    return (
        <CustomIcon
            {...props}
            svg={({
                className,
                color,
                groupClassName,
                height,
                stroke,
                width,
            }) => (
                <svg
                    width={width}
                    height={height}
                    className={className}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7Z"
                        stroke={stroke}
                        strokeWidth={1.5}
                        className={groupClassName}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M13 2v7h7"
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

export default FileIcon;
