import Image from "next/image";
import React, { useState } from "react";
import DashboardIcon from "./../CustomSvg/DashboardIcon";
import { SideNav } from "./../../utils/constant";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import ReplaceModal from "../../components/Modal/ReplaceModal";

const SidebarElement = () => {
    const router = useRouter();
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
    return (
        <>
            <div className="">
                <img
                    onClick={() => router.push("/dashboard")}
                    src="/logo/logo-full.svg"
                    alt="logo"
                    className="h-[36px] mx-auto mb-[49.73px] cursor-pointer"
                />
                <button
                    onClick={() => setEditModal(true)}
                    className="3xl:w-[193px] 3xl:h-[48px] w-[160px] h-[38px] rounded-[8px] bg-[#7266FC] hover:bg-[#473EAE] transition-all duration-200  mx-auto flex justify-center items-center gap-[11.33px] text-[14px] text-white font-semibold"
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
                <div className="flex flex-col gap-[29px] mt-[40px]">
                    {SideNav.map((item: any) => (
                        <div key={item.id}>
                            <ul
                                className={classNames(
                                    isRouteActive(item.url, router.asPath)
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
                                        {item.title}
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <ReplaceModal
                isOpen={editModal}
                // type={"edit"}
                confirmClick={handleConfirmClick}
                onClose={() => setEditModal(false)}
            />
        </>
    );
};

export default SidebarElement;

export function isRouteActive(url: string, path: string) {
    return url !== "/pricing" || "/products"
        ? path.includes(url)
        : path === url;
}
