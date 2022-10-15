import axios from 'axios';
import { observer } from 'mobx-react';
// import {
//   DashboardAnalyticsProvider,
//   useDashboardAnalytics,
// } from 'globalContexts/dashboard/dashboardAnalyticsContext';
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import dashboardAnalytics from 'stores/Dashboard Analytics/dashboardAnalytics';
import FooterAdmin from '../../components/reusable/Footers/footerAdmin';
import HeaderStats from '../../components/reusable/Headers/HeaderStats';
import AdminNavbar from '../../components/reusable/Navbars/adminNavbar';
import Sidebar from '../../components/reusable/Sidebar/sidebar';

const DashboardLayout = (props: any) => {
    // const [data] = React.useState(dashboardAnalytics);

    // React.useEffect(() => {}, []);
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar title={props.title} />
                {props.showStats && <HeaderStats />}
                <div className="relative w-full mx-auto">
                    {props.children}
                    <Outlet />
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
};

const withDashboardLayout = (Component: any, title: string, showStats: boolean) => {
    return (props: any) => (
        <DashboardLayout title={title} showStats={showStats}>
            <Component {...props} />
        </DashboardLayout>
    );
};

export default withDashboardLayout;
