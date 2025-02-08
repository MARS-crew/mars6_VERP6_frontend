import { useMutation } from "@tanstack/react-query";
import axiosInstance from '../api/axios';



export function useRequestStatus({reqId}){

    
    const updateStatus = useMutation({
        mutationFn: async(statusUd)=>{

            const params = new URLSearchParams();
            params.append("reqId",Number(reqId));
            params.append("status",statusUd);

            const response = await axiosInstance.put(`/doc-request/${params.toString()}/status`,)
        
            return response;
        },
        onSuccess(response){
            console.log('[요청 상태 변경 서공] :', response);
        },
        onError(error){
            console.log("변경 실패 :",error );
            throw error;
        }
    })


    return{
        updateStatus,
    }
}