import { APIRequestContext, expect } from "@playwright/test"
import { ApiData } from "../Utiles/Utils"


export class BookinService{
    readonly request:APIRequestContext
    readonly token:string
    constructor(request:APIRequestContext, token:string){
       this.request=request
       this.token=token
    }


    async CreateBookin():Promise<any>{
        const response= await this.request.post(ApiData.Base_ApiUrl+'booking',{data:{
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
                },
            "additionalneeds" : "Breakfast"
            }
        })
        return response
    }

    async getBooking():Promise<any>{
            const response=await this.request.get(ApiData.Base_ApiUrl+'booking')
            return response
    }

    async getBookingById(id:number):Promise<any>{
        const response= await this.request.get(ApiData.Base_ApiUrl+'booking/'+id)
        return response
    }

    async updateBookingById(id:number):Promise<any>{
        const response= await this.request.put(ApiData.Base_ApiUrl+'booking/'+id,{
            data:{
                "firstname" : "Rafael",
                "lastname" : "Veci",
                "totalprice" : 500,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2021-01-01"
                },
                "additionalneeds" : "Lunch"
                },
            headers: {
                "Cookie": `token=${this.token}`,
                "Accept": "application/json"
                     }
        })
        return response
    }

    async partialUpdateBooking(id:number, firstname:string, lastname:string):Promise<any>{
        const response=await this.request.patch(ApiData.Base_ApiUrl+'booking/'+id,{data:{
            "firstname": firstname,
            "lastname": lastname
        },
        headers:{
            "Cookie": `token=${this.token}`,
            "Accept": "application/json"
        }
    })
    return response
    }

    async deleteBooking(id:number):Promise<any>{
        const response=await this.request.delete(ApiData.Base_ApiUrl+'booking/'+id,{
            headers:{"Cookie":`token=${this.token}`}
                })
        return response
    }
}
