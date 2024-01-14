import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

function CloseIcon(props: IconType) {
    return (
        <CustomIcon
            {...props}
            svg={({
                height,
                className,
                color,
                groupClassName,
                stroke,
                width,
            }) => (
                <svg
                    width={width}
                    height={height}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={className}
                >
                    <g
                        clipPath="url(#a)"
                        className={groupClassName}
                        fill={color}
                    >
                        <path d="M15.333 8.666a.833.833 0 0 0-1.178 0L12 10.82 9.845 8.666a.833.833 0 0 0-1.178 1.178L10.822 12l-2.155 2.155a.833.833 0 0 0 1.178 1.178L12 13.178l2.155 2.155a.833.833 0 0 0 1.178-1.178L13.178 12l2.155-2.155a.833.833 0 0 0 0-1.178Z" />
                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18.333A8.333 8.333 0 1 1 20.333 12 8.342 8.342 0 0 1 12 20.333Z" />
                    </g>
                    <defs>
                        <clipPath id="a">
                            <path
                                fill="#fff"
                                transform="translate(2 2)"
                                d="M0 0h20v20H0z"
                            />
                        </clipPath>
                    </defs>
                </svg>
            )}
        ></CustomIcon>
    );
}

export default CloseIcon;
