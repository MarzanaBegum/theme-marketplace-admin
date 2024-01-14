import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";

import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import { api } from "../../api";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const month: any = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
};
const SalesRevenue = () => {
    const { data: chartData } = useQuery(
        ["Billing"],
        () => api.get("/billing"),
        {
            select(data) {
                const nowMilis = Date.now();
                const filterMilis = nowMilis - 3.154e10;
                const dataFilter = data?.data?.filter(
                    (v: any) => new Date(v.createdAt).getTime() > filterMilis
                );

                const obj: any = {};

                dataFilter?.forEach((v: any) => {
                    const newMonth = new Date(v.createdAt).getMonth() + 1;
                    const newMonthText = month[newMonth];
                    obj[newMonthText] = obj[newMonthText]
                        ? obj[newMonthText] + v.amount
                        : v.amount;
                });
                return obj;
            },
            onSuccess: (data) => {
                //   console.log("dddddddddd2",data);
            },
        }
    );
    const state: any = {
        series: [
            {
                name: "revenue",
                data: chartData ? [0, Object.values(chartData), 0] : [],
            },
        ],
        options: {
            chart: {
                height: 242,
                type: "line",
                zoom: {
                    enabled: false,
                },
            },
            colors: ["#818CF8", "#4F46E5"],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            title: {
                text: "Sales Revenue",
                align: "left",
            },
            grid: {
                padding: {
                    left: -16,
                },
                row: {
                    colors: ["white", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },

            xaxis: {
                categories: chartData
                    ? ["", ...Object.keys(chartData), ""]
                    : [],
            },
        },
    };
    return (
        <div className="bg-white px-0 lg:px-[24px] py-[16px] lg:py-[32px] rounded-[6px] border  border-[#E4E4E7]">
            <div id="chart">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="line"
                    height={242}
                />
            </div>
        </div>
    );
};

export default SalesRevenue;
