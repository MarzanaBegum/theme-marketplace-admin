import Image from "next/image";
import React, { useState } from "react";
import MoboDraer from "./../MoboDraer/index";
import Link from "next/link";

const MoboNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    return (
        <div className="px-[16px]  bg-white">
            <div className="flex items-center justify-between w-[100%] h-[58px]">
                <Link href={"/"}>
                    <Image
                        src="/logo/logo-full.svg"
                        alt="logo"
                        width={132}
                        height={38}
                    />
                </Link>
                <Image
                    src="/images/menuIcon.svg"
                    alt="menu"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={toggleDrawer}
                />
            </div>
            <MoboDraer
                isOpen={isOpen}
                toggleDrawer={toggleDrawer}
                setIsOpen={setIsOpen}
            />
        </div>
    );
};

export default MoboNav;
