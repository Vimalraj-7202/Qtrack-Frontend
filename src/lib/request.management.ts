import { apiPost,apiGet } from "@/services/axios.instance";
import { NEW_REQUEST,GETALL_REQUEST } from "@/services/api.constant";

class Request_Service{
    async newRequest(data:any):Promise<any>{
        return apiPost(NEW_REQUEST,data);
    }
    async getAllRequests():Promise<any>{
        return apiGet(GETALL_REQUEST);
    }
}

export const requestService=new Request_Service();