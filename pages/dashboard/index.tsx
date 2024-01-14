import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import DashboardHome from "../../components/DashboardHome/index";
import TopNav from "../../components/TopNav/index";
import { useQuery } from "react-query";
import useAnalyticsQuery, {
    AnalyticsDataType,
} from "../../api-call/useAnalyticsQuery";
import Meta from "../../components/Shared/Meta";

const Dashboard = () => {
    const [filterValue, setFilterValue] = useState("month");
    const { data } = useQuery<AnalyticsDataType>(
        ["GET ANALYTICS DATA"],
        useAnalyticsQuery(filterValue)
    );
    //   console.log("dddddddddd",data)
    return (
        <>
            <Meta title="Dashboard - Theme Gregg Admin" />
            <DefaultLayout>
                {/* <div className="mb-[27px] lg:hidden">
                    <MoboNav />
                </div> */}
                <div className="px-[16px] lg:px-[24px] 3xl:px-[32px] lg:py-[24px] 3xl:py-[35px]">
                    <TopNav
                        title="dashboard"
                        isSearchVisible={false}
                        isSortVisible={false}
                        setFilterValue={setFilterValue}
                    />
                    <DashboardHome data={data} filterValue={filterValue} />
                </div>
            </DefaultLayout>
        </>
    );
};

export default Dashboard;
