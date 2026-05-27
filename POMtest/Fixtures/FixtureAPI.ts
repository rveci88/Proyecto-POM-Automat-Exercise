import { test as base, expect} from '@playwright/test'
import { AuthService } from '../Apis/Services/AuthService'
import { BookinService } from '../Apis/Services/BookinService'

type ApiFixture={
    authService:AuthService
    bookingService:BookinService
}

export const test=base.extend<ApiFixture>({
    authService:async({request}, use)=>{
    const authService=new AuthService(request)
    await use(authService)
    },
    bookingService:async({request}, use)=>{
    const authService=new AuthService(request)
    const authResponse=await authService.createToken()
    const authBody=await authResponse.json()
    const token=authBody.token
    const bookingService=new BookinService(request, token)
    await use(bookingService)
    }
})

export { expect }
