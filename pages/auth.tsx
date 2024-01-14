import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { encryptData } from "../utils/hashdata";
import { useRouter } from "next/router";
import LoadingAnimation from "../components/CustomSvg/LoadingAnimation1";
import Meta from "../components/Shared/Meta";

const adminUser = `${process.env.NEXT_PUBLIC_ADMIN_USERNAME}`;
const adminPassword = `${process.env.NEXT_PUBLIC_ADMIN_PASSWORD}`;

type SigninInput = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Auth() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInput>({
    resolver: yupResolver(schema as any),
  });

  const onSubmit = async (signinData: SigninInput) => {
    setError("");
    setButtonLoading(true);
    console.log("user",adminPassword,adminUser,signinData)
    try {
      if (
        signinData.email !== adminUser ||
        signinData.password !== adminPassword
      ) {
        throw new Error();
      }

      // save token to cookie
      const token = encryptData("admin signin");
      const expires = remember ? new Date(Date.now() + 87400e6) : undefined;

      setCookie("admin-auth", token, { expires });

      await router.push("/dashboard");
    } catch (err: any) {
      setButtonLoading(false);
      setError("Invalid credential");
    }
  };
  return (
    <div className="w-[100%] bg-[#EFF3FB] px-[10px] flex justify-center items-center bg-surface-muted h-screen">
      <Meta title="Login - Theme Gregg Admin" />

      <div className="fixed top-5 left-5 sm:left-10 sm:top-10 sm:w-full lg:left-20">
        <img src="/logo/logo-full.svg" className="h-[38px]" alt="" />
      </div>

      <div
        className="w-[96%] md:w-[501px] bg-[#ffffff] p-[20px] rounded-[6px]"
        style={{
          boxShadow: "2px 6px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-[24px] mb-[20px] sm:mb-[24px] lg:mb-[20px] 2xl:mb-[16px] text-[#252C48] font-semibold text-center">
          Admin Login
        </h2>

        {error && (
          <div className="w-[100%] mb-2 mt-[10px] flex items-center py-[8px] md:py-[15px] pl-[15px] pr-[14px] rounded-[4px] min-h-[48px] bg-[#FFE5E7]">
            <img
              src="/icon/alert-icon.svg"
              alt="alert icon"
              className="w-[18.33px] h-[18.33px] mr-[9px]"
            />
            <h3 className="text-[13px] font-normal leading-[18px] text-[#252C48]">
              {error}
            </h3>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[16px] 2xl:gap-[24px]"
        >
          <div className="w-full">
            <label
              className="block text-neutral text-sm xl:text-base leading-[1.5] font-medium"
              htmlFor=""
            >
              Admin username
            </label>
            <div className="pt-2"></div>
            <input
              {...register("email")}
              placeholder="digitalgregg@gmail.com"
              className={`${
                errors.email
                  ? "!border-[#FF000D] !text-[#FF000D]"
                  : "focus:border-[#7266FC]"
              } border text-neutral leading-[1.5] xl:text-sm text-xs border-[#C8CBD0] focus:outline-none p-[15px_16px] rounded-md w-full`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-[#FF000D] first-letter:capitalize">
                {errors.email?.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-neutral xl:text-base text-sm leading-[1.5] font-semibold"
              htmlFor=""
            >
              Admin password
            </label>
            <div className="pt-2"></div>
            <div className="relative">
              <input
                {...register("password")}
                placeholder="*********"
                className={`${
                  errors.password
                    ? "!border-[#FF000D] !text-[#FF000D]"
                    : "focus:border-[#7266FC]"
                } border text-neutral xl:text-sm text-xs border-[#C8CBD0] focus:outline-none p-[15px_16px] rounded-md w-full`}
                type={open ? "text" : "password"}
              />
              <img
                onClick={() => setOpen(!open)}
                className="w-5 cursor-pointer h-5 absolute top-[14px] xl:top-[16px] right-4 "
                src={open ? "/images/visible.svg" : "/images/invisible.svg"}
                alt="image"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm first-letter:capitalize text-[#FF000D]">
                {errors.password?.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <RememberCheckbox remember={remember} setRemember={setRemember} />
          </div>

          <button
            type="submit"
            className="w-[100%] mt-2 h-[48px] xl:h-[56px] text-[16px] font-bold cursor-pointer rounded-[6px] bg-[#7266FC] hover:bg-[#473EAE] transition-all duration-200 text-[#FFFFFF]"
          >
            {buttonLoading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingAnimation color="#fff" />
                <div>Loading...</div>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <div></div>
        </form>
      </div>
    </div>
  );
}

type RCTYPE = {
  remember: boolean;
  setRemember: React.Dispatch<React.SetStateAction<boolean>>;
};
const RememberCheckbox = ({ remember, setRemember }: RCTYPE) => {
  return (
    <div
      onClick={() => setRemember(!remember)}
      className="flex items-center gap-[10px] cursor-pointer"
    >
      <div
        className={`w-[14px] h-[14px] border rounded-sm border-[#333] flex justify-center items-center ${
          remember && "!border-[#7266FC] bg-[#7266FC]"
        }`}
      >
        {remember && <div className="text-[10px] text-white">✓</div>}
      </div>
      <div className="text-[#333] text-sm">Remember me</div>
    </div>
  );
};

export default Auth;
