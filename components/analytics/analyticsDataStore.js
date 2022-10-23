import axios from 'axios';
import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved, runInAction } from 'mobx';
import reportedCasesApis from 'apis/Project Reported Cases/reportedCasesApis';

export interface IDashboardMapDataStore {
    ambulanceData: any[];
    reportedCasesData: any[];
    isLoading: boolean;
    error: string | null;
}

class DashboardMapDataStore {
    ambulanceData: any[];
    reportedCasesData: any[];
    isLoading: boolean;
    error: string | null;

    constructor() {
        makeAutoObservable(this);
        (this.ambulanceData = []),
            (this.reportedCasesData = []),
            (this.isLoading = false),
            (this.error = null),
            onBecomeObserved(this, 'reportedCasesData', this.getLiveReportedCases);
        onBecomeUnobserved(this, 'reportedCasesData', this.getLiveReportedCases);
        this.getLiveReportedCases();
    }

    getLiveAmbulances = async () => {
        this.isLoading = true;
        try {
            const response = await AmbulanceApis.getLiveAmbulances([
                'name',
                'profile_active',
                'on_duty',

                'location',
                'status',
            ]);
            const resp_data = response.data?.data;

            if (!Array.isArray(resp_data)) this.error = 'found';
            else {
                const tempData = resp_data.map((ambulance) => {
                    let locationInCoords = {
                        lat: ambulance?.location?.split(',')[0],
                        lng: ambulance?.location?.split(',')[1],
                    };

                    return {
                        ...ambulance,
                        location: locationInCoords,
                    };
                });

                runInAction(() => {
                    this.ambulanceData = tempData;
                    this.isLoading = false;
                });
            }
        } catch (error: any) {
            //TODO: handle error frappe error
            if (axios.isAxiosError(error)) {
                this.error = error.response?.data;
            }
        }
    };

    getLiveReportedCases = async () => {
        this.isLoading = true;
        try {
            const response = await reportedCasesApis.getAllOngoingCasesWithSelectiveFields([
                'name',
              
            ]);
            const resp_data = response.data?.data;

            if (!Array.isArray(resp_data)) this.error = 'No ambulances found';
            else {
                const tempData = resp_data.map((reportedCase) => {
                    let locationInCoords = {
                        lat: reportedCase?.location_of_accident?.split(',')[0],
                        lng: reportedCase?.location_of_accident?.split(',')[1],
                    };

                    return {
                        ...reportedCase,
                        location_of_accident: locationInCoords,
                    };
                });
                runInAction(() => {
                    this.reportedCasesData = tempData;
                });
            }
        } catch (error: any) {
            //TODO: handle error frappe error
            if (axios.isAxiosError(error)) {
                this.error = error.response?.data;
            }
        }
    };
}

export default new DashboardMapDataStore();
