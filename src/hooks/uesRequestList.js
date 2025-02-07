

import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { authState } from '../recoil/auth/auth';
import { requestListstate } from '../recoil/request';


export function useRequest(docId){
    const auth = useRecoilValue(authState);
    const setRequestList = useSetRecoilState(requestListstate(docId));

    //요청 리스트 조회
    const { data, isLoading, error } = useQuery({
        queryKey: ["requestStatus", docId],
        queryFn: async () => {
          const response = await axiosInstance.get(`/doc-request/${docId}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          return response.data.result;
        },
        throwOnError:(error)=>{
          console.log('조회 실패 : ',error);
          throw error;
        }
      });


      //요청 리스트 생성
    const createRequestMutation  = useMutation({
      mutationFn : async (mRequest) =>{
          try{
            const params = new URLSearchParams();
            params.append("docId", Number(docId)); // 숫자로 변환
            if (mRequest.filename) {
              params.append("originalFileName", mRequest.filename);
            }
            if (mRequest.url) {
              params.append("externalUrl", mRequest.url);
            }
            console.log("현재 토큰", auth.token);
            console.log("params: ",params.toString())
              const response = await axiosInstance.post(
                `/doc-request/create?${params.toString()}`,
                  {content: mRequest.content},
                  {
                    headers: {
                      //Authorization: `Bearer ${auth.token}`,
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    withCredentials: true,
              });
              if (!response.data.isSuccess) {
                  throw new Error(response.data.message || '요청 생성 실패');
              }
              return response.data.result

          }catch(error){
              console.log('요청 생성 중 오류 발생', error);
              throw error;
          }
      },
      onSuccess:(newRequest)=>{
          console.log('[요청 생성 성공]', newRequest);
          setRequestList(prev => ({
              request: [...prev.request, newRequest]
          }));
          if (typeof handleRequestSuccess === "function") {
            handleRequestSuccess(); // 요청 성공 후 모달 닫기
          }
      },
      error : (error)=>{
          console.log('요청 생성 실패 :',error)
          throw error;
      }
  })

    return{
        request : data,
        isLoading,
        error,
        createRequestMutation
    }
    
}