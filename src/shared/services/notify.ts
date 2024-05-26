import { toast } from 'react-toastify'

export const notify = (state:boolean, value:string) => {
    if(state){
        toast.success(value, {
            position: "top-right"
        })
    }else {
        toast.error(value, {
            position: "top-right"
        })
    }
}