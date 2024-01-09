import { Autocomplete, GoogleMap, useLoadScript } from "@react-google-maps/api";
import { ChevronLeft, Navigation, Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { useGeoLocation } from "./hooks/useData";
import { Address } from "@/types/session";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { TabProps } from "./AccountDashboard";

interface LocationsSelectionProps {
  selectedAddress: Address;
  setSelectedAddress: Dispatch<SetStateAction<Address>>;
  setTab: Dispatch<SetStateAction<TabProps["title"][]>>;
}

export const LocationSelection = ({
  selectedAddress,
  setSelectedAddress,
  setTab,
}: LocationsSelectionProps) => {
  const [mapref, setMapRef] = useState<google.maps.Map | null>(null);
  const [placeData, setPlaceData] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [currentUserLocation, setCurrentUserLocation] = useState(false);

  const { refetch } = useGeoLocation(
    Number(selectedAddress.latitude),
    Number(selectedAddress.longitude)
  );

  const refetchData = useDebouncedCallback(() => {
    refetch().then((res) => {
      setSelectedAddress((address) => ({
        ...address,
        ...res.data,
      }));
      setLoading(false);
    });
  }, 1000);

  useEffect(() => {
    setLoading(true);
    refetchData();
  }, [selectedAddress.latitude, selectedAddress.longitude]);

  const [loading, setLoading] = useState(false);

  const detectUserLocation = () => {
    setCurrentUserLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setSelectedAddress((address) => ({
          ...address,
          latitude: position.coords.latitude.toString() as string,
          longitude: position.coords.longitude.toString() as string,
        }));
      });
    }
  };

  const handleCenterChanged = () => {
    setCurrentUserLocation(false);

    if (mapref) {
      setMapRef(mapref);
      const center = mapref.getCenter();
      setSelectedAddress((address) => ({
        ...address,
        latitude: center?.lat().toString() as string,
        longitude: center?.lng().toString() as string,
      }));
    }
  };

  const handleOnLoad = (map: google.maps.Map) => {
    setMapRef(map);
    detectUserLocation();
  };

  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  return (
    <div className="relative flex flex-col flex-1 rounded-lg">
      {isLoaded && (
        <>
          <div className="bg-white p-3  rounded-t-lg border-b border-muted mb-auto z-30">
            <Autocomplete
              restrictions={{
                country: ["ae", "sa"],
              }}
              className="w-full flex items-center gap-3  "
              onLoad={(place) => {
                setPlaceData(place);
              }}
              onPlaceChanged={() => {
                setCurrentUserLocation(false);

                if (mapref) {
                  setSelectedAddress((address) => ({
                    ...address,
                    latitude: placeData
                      ?.getPlace()
                      .geometry?.location?.lat()
                      .toString() as string,
                    longitude: placeData
                      ?.getPlace()
                      .geometry?.location?.lng()
                      .toString() as string,
                  }));
                }
              }}
            >
              <>
                <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                <div className="relative w-full flex items-center">
                  <Search className="absolute w-5 h-5 ms-3" />
                  <Input
                    placeholder="Search for your Location..."
                    className="w-full ps-10 rounded-lg"
                  />
                </div>
              </>
            </Autocomplete>
          </div>

          <GoogleMap
            options={{
              clickableIcons: false,
              disableDefaultUI: true,
            }}
            center={{
              lat: Number(selectedAddress.latitude),
              lng: Number(selectedAddress.longitude),
            }}
            mapContainerStyle={{
              position: "absolute",
              inset: 0,
              borderRadius: "0.5rem",
            }}
            onDragEnd={handleCenterChanged}
            onLoad={handleOnLoad}
            zoom={1000}
          >
            <div className="absolute m-auto inset-0 w-fit h-fit z-[1]">
              <Image
                src={"/images/pin-map.png"}
                height={"50"}
                width={"50"}
                alt="location-pin"
                className="z-[1] "
              />

              <div className=" m-auto z-[1] w-fit -mt-[14px]">
                <span className="relative flex h-5 w-5 ">
                  <span className="animate-ping absolute duration-1000 inline-flex h-full w-full rounded-full bg-black/30"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-black/50"></span>
                </span>
              </div>
            </div>
          </GoogleMap>
        </>
      )}
      <button
        className="z-10 absolute right-5 bottom-56  bg-white shadow p-4 rounded-full"
        onClick={() => detectUserLocation()}
      >
        <Navigation
          className={cn(`w-5 h-5 m-auto text-blue-500 `, {
            "fill-blue-500": currentUserLocation,
          })}
        />
      </button>
      <div className="bg-white p-3 w-full z-30 mt-auto rounded-b-lg   flex flex-col border-t border-muted">
        <div className=" bg-muted rounded-xl h-2 w-8 mx-auto" />
        <div className="gap-2.5 flex flex-col flex-1 py-4">
          <p className="text-muted-foreground text-sm">Delivery Location</p>
          <div className="flex gap-3 items-center">
            <div className="bg-muted p-2 rounded-full">
              <Navigation
                className={cn("fill-blue-500 text-blue-500 w-4 h-4")}
              />
            </div>
            {!loading ? (
              <h6 className="text-black font-medium line-clamp-3">
                {selectedAddress.google_address}
              </h6>
            ) : (
              <div className="flex flex-col w-full gap-2.5">
                <Skeleton className="w-full h-4 rounded-full" />
                <Skeleton className="w-3/4 h-4 rounded-full" />
              </div>
            )}
          </div>
        </div>
        <Button
          className="w-full bg-blue-500 rounded-lg"
          onClick={() => setTab((tab) => [...tab, "Address Form"])}
        >
          Deliver Here
        </Button>
      </div>
    </div>
  );
};
