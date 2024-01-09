import * as React from "react";
import { useMediaQuery } from "./hooks/use-media-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useModal } from "@ebay/nice-modal-react";

export interface DialogProps {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

export const ResponsiveDialog = ({ children }: DialogProps) => {
  const modal = useModal();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={modal.visible} onOpenChange={modal.hide}>
        <DialogContent className="sm:max-w-md">
          <div className="w-full p-0 pb-0 ">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={modal.visible} onClose={modal.hide}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <div className="w-full p-4 ">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
