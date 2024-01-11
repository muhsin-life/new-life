import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { ResponsiveDialog } from "../ResponsiveDialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader2Icon, Navigation } from "lucide-react";
import { addressStore } from "../hooks/useStore";
import { useState } from "react";

export const DetectLocation = NiceModal.create(() => {
  const modal = useModal();
  const { currentAddress, setCurrentAddress } = addressStore();
  const [loading, setLoading] = useState(false);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const detectUserLocation = async () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentAddress({
          ...currentAddress,
          latitude: position.coords.latitude.toString() as string,
          longitude: position.coords.longitude.toString() as string,
        });
      });
    }
    await wait(1000);
    modal.hide();
    setLoading(false);
  };

  return (
    <ResponsiveDialog open={modal.visible} close={modal.hide}>
      <div className="p-1 bg-white">
        <div className="w-full aspect-video pb-2 bg-white relative">
          <Image
            className="w-full rounded-lg h-full object-cover "
            src={"/images/location-selection.png"}
            alt="Detect Location"
            width={1000}
            height={500}
          />

          <div className="absolute z-10  inset-0 w-12 h-12 flex items-center justify-center m-auto rounded-full bg-blue-500 p-1">
            <div className="relative">
              <Navigation className="text-white  fill-white" />
            </div>
          </div>
          <span className="absolute duration-1000 transition inline-flex w-20 h-20 m-auto inset-0 rounded-full bg-blue-400/40" />
          <span className="absolute duration-1000 transition inline-flex w-28 h-28 m-auto inset-0 rounded-full bg-blue-400/20" />
          <div className="absolute inset-x-0 w-full bg-gradient-to-t from-white from-[10%] via-white/80 via-[30%] to-white/10 to-[70%] h-14 bottom-1" />
        </div>
        <div className="  relative -mt-3">
          <div className="flex  flex-col items-center text-center gap-2">
            <h6 className="font-semibold text-xl ">Detect Location</h6>
            <p className="text-muted-foreground text-sm">
              By knowing your area, we will be able to provide instant delivery
              from the nearest Life store around you!
            </p>
          </div>

          <div className="pt-5 grid gap-1">
            <Button
              className="bg-blue-500 w-full gap-1"
              onClick={detectUserLocation}
            >
              {loading && (
                <Loader2Icon className="w-4 h-4 text-white animate-spin" />
              )}{" "}
              <span> Allow Location Access</span>
            </Button>
            <Button className="w-full" variant={"link"}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </ResponsiveDialog>
  );
});
