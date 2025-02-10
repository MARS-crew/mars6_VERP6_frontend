

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

      // MinIO Presigned URL 요청 (서버에서 업로드 URL 받기)
    const getPresignedUrl = async () => {
      const response = await axiosInstance.get(`/minio/upload`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
        },
      });
      return response.data; // { presignedUrl: "...", generatedFileName: "..." }
    };

      //Presigned URL을 이용해 MinIO에 파일 업로드
    const uploadFileToPresignedUrl = async (presignedUrl, file) => {
      await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
    };


      //요청 리스트 생성
    const createRequestMutation  = useMutation({
      mutationFn : async (mRequest) =>{
          try{
            let fileUrl = null;

            if (mRequest.file) {
              // MinIO에서 Presigned URL 요청
              const { presignedUrl, generatedFileName } = await getPresignedUrl();
              
              // Presigned URL을 통해 MinIO에 파일 업로드
              await uploadFileToPresignedUrl(presignedUrl, mRequest.file);

              fileUrl = generatedFileName; // MinIO에 업로드된 파일 URL 저장
            }

            const params = new URLSearchParams();
            params.append("docId", Number(docId)); // 숫자로 변환
            if (mRequest.filename) {
              params.append("originalFileName", mRequest.filename);
            }
            if (fileUrl) {
              params.append("externalUrl", fileUrl); // MinIO 파일 URL 추가
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
          window.location.reload();
          
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