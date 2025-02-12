import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

function useUploadFile() {
  const uploadFile = useMutation({
    mutationFn: async ({ url, formData }) => {
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
  });

  return {
    uploadFile,
  };
}

export default useUploadFile;
