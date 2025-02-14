import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/auth/auth";

function useGetDownloadFile() {
  const auth = useRecoilValue(authState);

  const getDownloadUrl = useMutation({
    mutationFn: async ({ docDetailId, fileName }) => {
      const response = await axios.post(
        `/api/minio/download/${docDetailId}`,
        { fileName },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response;
    },
    onSuccess: () => {
      console.log("파일 다운로드 URL 생성 완료");
    },
    onError: () => {
      console.log("파일 주소 생성에 실패");
    },
  });

  return {
    getDownloadUrl,
  };
}

export default useGetDownloadFile;
