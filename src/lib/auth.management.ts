import { apiPost } from "@/services/axios.instance";
import { REGISTER, LOGIN } from "@/services/api.constant";

class AuthService {
  //register
  async registerUser(data: any): Promise<any> {
    return apiPost(REGISTER, data);
  }

  //login
  async loginUser(data: any): Promise<any> {
    return apiPost(LOGIN, data);
  }
}

export const authService = new AuthService();
