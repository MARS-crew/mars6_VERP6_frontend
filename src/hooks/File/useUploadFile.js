import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function useUploadFile() {
  const uploadFile = useMutation({
    mutationFn: async ({ url, file }) => {
      try {
        console.log("Presigned URL:", url);
        console.log("업로드할 파일:", file, file.type);

        const fileBuffer = await file.arrayBuffer();

        const response = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type || "application/octet-stream",
            // "Content-Disposition": `attachment; filename="${file.name}"`,
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
