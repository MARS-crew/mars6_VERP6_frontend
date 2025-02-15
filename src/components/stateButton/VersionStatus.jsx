import useDocumentUpdate from "../../hooks/useDocumentUpdate";
import useUpdateDocumentDetail from "../../hooks/useUpdateDocumentDetail";
import StateButton from "./StateButton";

const config = ["REJECTED", "APPROVED", "CHECKED", "PENDING"];

function VersionStatus({ docDetailId, setStatusModal, statusModal }) {
  const { updateDetailMutation } = useUpdateDocumentDetail();
  const updateDetailStatus = (status) => {
    updateDetailMutation.mutate({ docDetailId, status });
    setStatusModal(!statusModal);
  };
  return (
    <div className="z-50 w-[102px] h-[155px] shadow-lg bg-white rounded-lg p-[15px] flex flex-col gap-2 place-content-between absolute mt-1">
      {config.map((item) => (
        <StateButton
          key={item}
          state={item}
          onClick={() => updateDetailStatus(item)}
          showAll={true}
        />
      ))}
    </div>
  );
}

export default VersionStatus;
