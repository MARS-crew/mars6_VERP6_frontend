import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/auth/auth";

function useGetFileUrl() {
  const auth = useRecoilValue(authState);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getfileUrl"],
    queryFn: async () => {
      const response = await axios.get("/api/minio/upload", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return response;
    },
  });

  return {
    data,
    isLoading,
    error,
  };
}

export default useGetFileUrl;