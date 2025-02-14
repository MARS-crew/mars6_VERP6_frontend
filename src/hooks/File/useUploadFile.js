import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function useUploadFile() {
  const uploadFile = useMutation({
    mutationFn: async ({ url, file }) => {
      try {
        const response = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type || "application/octet-stream",
          },
        });

        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return { uploadFile };
}

export default useUploadFile;
