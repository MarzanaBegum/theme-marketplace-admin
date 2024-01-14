/* eslint-disable @next/next/no-img-element */

import ReplaceModal from "../Modal/ReplaceModal";
import classNames from "classnames";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-modern-drawer/dist/index.css";
import { SideNav } from "../../utils/constant";
import { isRouteActive } from "../SidebarElement";

const Drawer = dynamic(() => import("react-modern-drawer"), { ssr: false });

const MoboDraer = ({ toggleDrawer, isOpen, setIsOpen }: any) => {
    const [editModal, setEditModal] = useState(false);

    const handleConfirmClick = async (radioValue: any, setLoading: any) => {
        setLoading(true);
        await router.push({
            pathname: "/products/upload",
            query: { type: radioValue },
        });
        setLoading(false);
        setEditModal(false);
    };
    function handleOnClick(item: any): void {}
    const router = useRouter();

    return (
        <>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="left"
                className="!w-[100%] "
                // size="100%"

                style={{ backgroundColor: "#202020" }}
            >
                <div className="w-[100%] container2 h-screen drawer pb-[30px] drawer container1 mx-auto text-[#252C48] bg-white text-[16px] font-semibold pt-[12px] relative ">
                    <div className=" container2">
                        <div className="">
                            <div className="flex justify-between px-[20px]">
                                <img
                                    src="/logo/logo-full.svg"
                                    alt="logo"
                                    className="w-[132px] h-[38px]  mb-[49.73px]"
                                    onClick={() => router.push("/")}
                                />
                                <img
                                    src="/images/crossIcon.svg"
                                    alt=""
                                    className="w-[24px] h-[24px]"
                                    onClick={toggleDrawer}
                                />
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setEditModal(true);
                                }}
                                className="3xl:w-[193px] 3xl:h-[48px] w-[160px] h-[38px] rounded-[8px] bg-[#7266FC] hover:bg-[#473EAE] transition-all duration-200 mx-auto flex justify-center items-center gap-[11.33px] text-[14px] text-white font-semibold"
                            >
                                <span>
                                    <Image
                                        src="/images/whiteplus.svg"
                                        width={13}
                                        height={13}
                                        alt="plus"
                                    />
                                </span>
                                Add Product
                            </button>
                            {/* slide nav  */}
                            <div className="flex flex-col gap-[16px] mt-[40px]">
                                {SideNav.map((item: any) => (
                                    <div key={item.id}>
                                        <ul
                                            className={classNames(
                                                isRouteActive(
                                                    item.url,
                                                    router.asPath
                                                )
                                                    ? "bg-[#E3E0FE]"
                                                    : ""
                                            )}
                                        >
                                            <Link href={item.url}>
                                                <li
                                                    className={classNames(
                                                        "py-[13px] px-[40px] flex gap-[14px] text-[18px] font-semibold items-center capitalize",
                                                        isRouteActive(
                                                            item.url,
                                                            router.asPath
                                                        )
                                                            ? "text-[#7266FC]"
                                                            : "text-[#252C48]"
                                                    )}
                                                >
                                                    <span>
                                                        <item.Icon
                                                            width={20}
                                                            height={20}
                                                            stroke={
                                                                isRouteActive(
                                                                    item.url,
                                                                    router.asPath
                                                                )
                                                                    ? "#7266FC"
                                                                    : "#252C48"
                                                            }
                                                        />
                                                    </span>
                                                    {""}
                                                    {item.title}
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            <ReplaceModal
                isOpen={editModal}
                // type={"edit"}
                confirmClick={handleConfirmClick}
                onClose={() => setEditModal(false)}
            />
        </>
    );
};

export default MoboDraer;
