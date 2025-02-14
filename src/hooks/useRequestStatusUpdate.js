import { useMutation } from "@tanstack/react-query";
import axiosInstance from '../api/axios';
import { authState } from '../recoil/auth/auth';
import { useRecoilValue } from "recoil";


export function useRequestStatus({reqId}){
    const auth = useRecoilValue(authState);
    
    const updateStatus = useMutation({
        mutationFn: async(statusUd)=>{
            const response = await axiosInstance.put(
                `/doc-request/${reqId}`
                ,{status: statusUd,},
            {
                headers: {
                  //Authorization: `Bearer ${auth.token}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                withCredentials: true,
          }
        )
        
            return response;
        },
        onSuccess(response){
            console.log('[요청 상태 변경 성공] :', response);
            setRequestList(prev => ({
                ...prev,
                request: prev.request.map(req =>
                    req.reqId === reqId ? { ...req, status: response.data.result.status } : req
                )
            }));
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