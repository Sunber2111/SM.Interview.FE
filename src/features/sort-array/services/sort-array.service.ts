import { BaseResponse } from "app/shared/interfaces";
import BaseService from "app/shared/services/base.service";
import { SortArrayRequest } from "../interfaces";

class SortArrayService extends BaseService{

    async sortAnArray(data:SortArrayRequest){
        const url='ListManager'
        return await this.post<BaseResponse<number[]>>(url,data)
    }

}


export default new SortArrayService()