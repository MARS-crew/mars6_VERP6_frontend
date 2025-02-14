import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/auth/auth';

export function useAlert(docId){
    const auth = useRecoilValue(authState);

    const { data, isLoading, error} = useQuery({
        queryKey: ['dcheck',docId],
        queryFn: async () => {
          try {
            console.log("docId :",docId)
            if (!docId) {
              console.log("docId가 없음. API 요청 생략");
              return false;
            }
            const response = await axiosInstance.get(`/docs/${docId}/has-unread`, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });
            return response.data;
          } catch (error) {
            console.error('[문서 알림 조회 에러]', error);
            throw error;
          }
        },
      });

      const readDoc = useMutation({
        mutationFn : async (docId) =>{
          const response = await axiosInstance.post(`/docs/${docId}/read`,{
            headers: {
              Authorization: `Bearer ${auth.token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
          return response;
        },
        onSuccess : (response) =>{
          console.log("문서 읽기 성공 : ",response);
        },
        onError : (error)=>{
          console.log("문서 일기 실패 : ",error);
        }
      })

      

    return{
        data,
        isLoading,
        error,
        readDoc
    }
}