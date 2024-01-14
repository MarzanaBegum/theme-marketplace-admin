import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const PricingIcon = (props: IconType) => {
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
                        d="M16.525 7.25001L12.75 3.47501C11.9583 2.68334 10.8667 2.25834 9.75 2.31668L5.58333 2.51668C3.91667 2.59168 2.59167 3.91668 2.50833 5.57501L2.30833 9.74168C2.25833 10.8583 2.675 11.95 3.46667 12.7417L7.24167 16.5167C8.79167 18.0667 11.3083 18.0667 12.8667 16.5167L16.525 12.8583C18.0833 11.3167 18.0833 8.80001 16.525 7.25001ZM7.91667 10.3167C6.59167 10.3167 5.51667 9.24168 5.51667 7.91668C5.51667 6.59168 6.59167 5.51668 7.91667 5.51668C9.24167 5.51668 10.3167 6.59168 10.3167 7.91668C10.3167 9.24168 9.24167 10.3167 7.91667 10.3167Z"
                        fill={stroke}
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default PricingIcon;
