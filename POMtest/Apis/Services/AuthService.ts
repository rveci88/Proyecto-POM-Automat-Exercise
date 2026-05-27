import { APIRequestContext, expect } from "@playwright/test"
import { ApiData } from "../Utiles/Utils"

export class AuthService{
    readonly request:APIRequestContext

    constructor(request:APIRequestContext){
        this.request=request
    }

    async createToken():Promise<any>{
        const response=await this.request.post(ApiData.Base_ApiUrl+'auth',{data:{
            "username": ApiData.username,
            "password": ApiData.password
        }})
        return response
    }
}