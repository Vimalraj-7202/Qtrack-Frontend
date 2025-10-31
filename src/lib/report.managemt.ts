import { apiGet } from "@/services/axios.instance";
import { OVERALLREPORT } from "@/services/api.constant";

class ReportService{

    async getOverallReport(userId:any,pageNo:number,pagSize:number):Promise<any>{
        return apiGet(`${OVERALLREPORT}?userId=${userId}&pageNo=${pageNo}&pageSize=${pagSize}`);
    }
}

export const reportService=new ReportService();



 
