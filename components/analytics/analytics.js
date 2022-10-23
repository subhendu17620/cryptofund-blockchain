import axios from 'axios';
import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved, runInAction } from 'mobx';

import dashboardAnalyticsApi from 'apis/Dashboard Analytics/dashboardAnalytics';

export interface IDashboardAnalytics {
    data: [];
    isLoading: boolean;
    error: string | null;
}

export type TAnalytics = {
    title: string;
    count: number;
};

export class DashboardAnalytics {
    data: TAnalytics[];
    isLoading: boolean;
    error: string | null;

    constructor() {
        makeAutoObservable(this);
       
    }

    getDashboardAnalytics = async () => {
        if (this.data.length > 0) return
        this.isLoading = true;
        this.error = null;
        try {
            const response = await dashboardAnalyticsApi.getDashboardAnalytics();
            const resp_data = response.data?.data;

            let temp: TAnalytics[] = [];
            for (let analytics of Object.keys(resp_data)) {
                let processedData = {
                    title: analytics,
                    count: resp_data[analytics][0].count,
                };
                temp.push(processedData);
            }
          
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                //TODO: handle error frappe error
                runInAction(() => {
                    this.error = error.response?.data;
                    this.isLoading = false;
                });
            }
        }
    };
}
const dashboardAnalytics = new DashboardAnalytics();
export default dashboardAnalytics;
