import { apiPost,apiGet } from "@/services/axios.instance";
import { NEW_REQUEST,GETALL_REQUEST,GETREQUEST_BYID } from "@/services/api.constant";


class Request_Service{
    async newRequest(data:any):Promise<any>{
        return apiPost(NEW_REQUEST,data);
    }
    async getAllRequests():Promise<any>{
        return apiGet(GETALL_REQUEST);
    }
    async getRequestbyId(id:any):Promise<any>{
        return apiGet(`${GETREQUEST_BYID}/${id}`)
    }
}

export const requestService=new Request_Service();