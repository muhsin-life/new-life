import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { ResponsiveDialog } from "../ResponsiveDialog";
import { Button } from "../ui/button";
import { deleteAddress } from "../hooks/useData";
import { toast } from "sonner";

export interface TAddressDeleteConfirmationModal {
  addressID: number;
}
export const AddressDeleteConfirmationModal = NiceModal.create(
  ({ addressID }: TAddressDeleteConfirmationModal) => {
    const modal = useModal();
    const { refetch } = deleteAddress(addressID);

    const refetchData = () => {
      refetch().then(({ data }) => {
        if (data?.success) {
          toast.success("Success", {
            description: "Address Deleted Succesfully",
          });
          modal.hide();
        } else {
          toast.error("Error", {
            description: "Something went wrong please try Again!",
          });
        }
      });
    };

    return (
      <ResponsiveDialog open={modal.visible} close={modal.hide}>
        <div className="flex flex-col gap-2 ">
          <h5 className="text-lg font-semibold">Delete Address</h5>
          <p className="text-muted-foreground text-sm">
            Are you sure you want delete this Address ?
          </p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div />
          <div className="flex items-center gap-2 ">
            <Button variant={"outline"} onClick={modal.hide}>
              Cancel
            </Button>
            <Button variant={"destructive"} onClick={() => refetchData()}>
              Delete
            </Button>
          </div>
        </div>
      </ResponsiveDialog>
    );
  }
);
