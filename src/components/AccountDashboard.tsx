import { signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  ChevronLeft,
  ClipboardList,
  Edit,
  Gem,
  Gift,
  Heart,
  LucideIcon,
  MapPin,
  Navigation,
  Package2,
  Phone,
  PlusCircle,
  ScrollText,
  Search,
  Trash2,
  Undo2,
  Wallet2,
} from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useMemo, useState } from "react";
import { Autocomplete, GoogleMap, useLoadScript } from "@react-google-maps/api";
import Image from "next/image";
import { addressStore } from "./hooks/useStore";
import { useGeoLocation } from "./hooks/useData";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { FormInput } from "./ui/form-input";
import { Icons } from "./Icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ADDRESS_TYPES, COUNTRIES, SORT_BY_ITEMS } from "@/config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddressCredentialsValidator,
  TAddressCredentailsValidator,
} from "@/lib/validators/address";

export const AccountDashboard = NiceModal.create(() => {
  const libraries = useMemo(() => ["places"], []);

  const modal = useModal();
  const { data: session } = useSession();
  const { currentAddress, setCurrentAddress } = addressStore();

  const addresses = session?.user.addresses ?? [];

  interface TabProps {
    title:
      | "Addresses"
      | "Buy It Again"
      | "Returns"
      | "Wallet"
      | "Wishlist"
      | "Appointments"
      | "Account"
      | "Select Location"
      | "Contact Us"
      | "Address Form";
    icon?: LucideIcon;
    onClick?: () => void;
  }

  const [tab, setTab] = useState<TabProps["title"]>("Account");
  const [mapref, setMapRef] = useState<google.maps.Map | null>(null);
  const [selectedAddress, setSelectedAddress] = useState(currentAddress);
  const [placeData, setPlaceData] =
    useState<google.maps.places.Autocomplete | null>(null);

  const [loading, setLoading] = useState(false);
  const [currentUserLocation, setCurrentUserLocation] = useState(false);

  const { refetch } = useGeoLocation(
    Number(selectedAddress.latitude),
    Number(selectedAddress.longitude)
  );

  const addressForm = useForm<TAddressCredentailsValidator>({
    resolver: zodResolver(AddressCredentialsValidator),
    mode: "onChange",
  });

  function onSubmit(values: TAddressCredentailsValidator) {
    console.log(values);
  }

  const DASHBOARD_ITEMS: TabProps[] = [
    {
      title: "Addresses",
      icon: MapPin,
      onClick: () => {
        setTab("Addresses");
      },
    },
    {
      title: "Address Form",
      icon: MapPin,
      onClick: () => {
        setTab("Address Form");
      },
    },
    {
      title: "Buy It Again",
      icon: Package2,
      onClick: () => {
        setTab("Buy It Again");
      },
    },
    {
      title: "Returns",
      icon: Undo2,
      onClick: () => {
        setTab("Returns");
      },
    },
    {
      title: "Wallet",
      icon: Wallet2,
      onClick: () => {
        setTab("Wallet");
      },
    },
    {
      title: "Wishlist",
      icon: Heart,
      onClick: () => {
        setTab("Wishlist");
      },
    },
    {
      title: "Appointments",
      icon: ClipboardList,
      onClick: () => {
        setTab("Appointments");
      },
    },
    {
      title: "Contact Us",
      icon: Phone,
      onClick: () => {
        setTab("Contact Us");
        signOut();
      },
    },
  ];

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

  const refetchData = useDebouncedCallback(() => {
    refetch().then((res) => {
      setSelectedAddress((address) => ({
        ...address,
        google_address: res.data?.google_address as string,
      }));
      setLoading(false);
    });
  }, 1000);

  useEffect(() => {
    setLoading(true);
    refetchData();
  }, [selectedAddress.latitude, selectedAddress.longitude]);

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

  console.log(addressForm.formState.errors);
  

  const handleOnLoad = (map: google.maps.Map) => {
    setMapRef(map);
    detectUserLocation();
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  return (
    <Sheet open={modal.visible} onOpenChange={modal.hide}>
      <SheetContent className="flex w-full flex-col  sm:max-w-lg bg-slate-50">
        <SheetHeader className="space-y-2.5 pr-6 border-b pb-3">
          <SheetTitle className="flex items-center gap-2 relative capitalize">
            {tab}
          </SheetTitle>
        </SheetHeader>
        {tab === "Account" && (
          <>
            <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border     items-center w-full p-[16px] bg-cover">
              <div
                className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
                style={{
                  backgroundImage: 'url("/images/account/account-bg.png")',
                }}
              >
                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 ">
                  <img
                    className="h-full w-full rounded-full"
                    src="/images/account/account-bg.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-14 flex flex-col items-center">
                <h4 className="text-xl font-semibold text-slate-700 ">
                  {session?.user.name}
                </h4>
              </div>
              <div className="flex items-center gap-10 overflow-x-auto mt-3">
                <div className="flex flex-col items-center gap-1  ">
                  <Button
                    className="  rounded-full border  h-16 w-16"
                    variant={"outline"}
                    size={"icon"}
                  >
                    <ScrollText className="text-blue-600 w-8 h-8" />
                  </Button>

                  <p className="text-slate-700 font-semibold text-sm">Orders</p>
                </div>
                <div className="flex flex-col items-center gap-1  ">
                  <Button
                    className="  rounded-full border  h-16 w-16"
                    variant={"outline"}
                    size={"icon"}
                  >
                    <Gift className="text-blue-600 w-8 h-8" />
                  </Button>
                  <p className="text-slate-700 font-semibold text-sm">
                    Vouchers
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1  ">
                  <Button
                    className="  rounded-full border  h-16 w-16"
                    variant={"outline"}
                    size={"icon"}
                  >
                    <Gem className="text-blue-600 w-8 h-8" />
                  </Button>
                  <p className="text-slate-700 font-semibold text-sm">
                    Rewards
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-3 w-full">
              {DASHBOARD_ITEMS.map((item) => (
                <Button
                  variant={"outline"}
                  className="border-none gap-3 justify-start items-center rounded-xl h-full p-4 hover:text-blue-500 group"
                  onClick={item.onClick}
                >
                  {item.icon && (
                    <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-blue-500" />
                  )}
                  <span className="font-semibold">{item.title}</span>
                </Button>
              ))}
            </div>
          </>
        )}
        {tab === "Addresses" && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex flex-col ">
                <h5 className="text-lg font-semibold">Addresses</h5>
                <p className="text-sm text-muted-foreground">
                  All addresses added will be displayed here
                </p>
              </div>
              <Button
                size={"sm"}
                className="rounded-lg bg-blue-500 h-9"
                onClick={() => setTab("Select Location")}
              >
                <PlusCircle className="w-5 h-5 me-2" />
                <span> Add New</span>
              </Button>
            </div>
            <div className="flex flex-col   mt-1 overflow-x-hidden">
              {addresses.map((addr) => (
                <div className="flex flex-col p-2 rounded-lg bg-white  shadow mb-3">
                  <div className="flex items-center justify-between border-b pb-1.5">
                    <div className="flex gap-x-1.5 items-center">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <h6 className="font-semibold text-sm">{addr.type}</h6>
                    </div>
                    <div className="flex gap-x-1 items-center">
                      <Button
                        size={"icon"}
                        variant={"secondary"}
                        className="h-full w-full p-1.5"
                      >
                        <Edit className="text-muted-foreground w-4 h-4" />
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="h-full w-full p-1.5"
                      >
                        <Trash2 className="text-muted-foreground w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="w-full py-1.5">
                    <p className="text-sm text-muted-foreground">
                      {addr.google_address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Select Location" && (
          <div className="relative flex flex-col flex-1 rounded-lg">
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

            {isLoaded && (
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
                zoom={20}
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
                <p className="text-muted-foreground text-sm">
                  Delivery Location
                </p>
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
                onClick={() => setTab("Address Form")}
              >
                Deliver Here
              </Button>
            </div>
          </div>
        )}

        {tab === "Address Form" && (
          <>
            <div className="flex flex-col flex-1 overflow-x-hidden ">
              <Form {...addressForm}>
                <form onSubmit={addressForm.handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap items-start bg-white py-5  mb-8 rounded-lg border border-muted ">
                    <div className="w-full  px-4 mb-6 ">
                      <span className="block  text-lg font-semibold text-black">
                        Personal Details
                      </span>
                    </div>
                    <div className="w-full  px-4">
                      <div className="max-w-xl">
                        <div className=" -mx-4 ">
                          <FormField
                            control={addressForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormInput
                                  containerProps={{
                                    className: "w-full  px-4 mb-5",
                                  }}
                                  label="Full Name"
                                >
                                  <Input
                                    id={"ss"}
                                    {...field}
                                    className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                  />
                                </FormInput>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="phone"
                            render={({ field }) => (
                              <div className=" flex gap-1 w-full  px-4 ">
                                <Button
                                  variant={"outline"}
                                  className="gap-1.5 flex items-center h-12"
                                >
                                  <Icons.aeFlag className="w-6 h-6 rounded-lg" />
                                  <p className="text-sm font-semibold"> +971</p>
                                </Button>
                                <Input
                                  id="phone"
                                  placeholder="XXX-XXX-XXX"
                                  autoCorrect="off"
                                  {...field}
                                  className="focus-visible:ring-0 h-12 focus-visible:ring-offset-0"
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-start bg-white py-5   mb-8 rounded-lg border border-muted ">
                    <div className="w-full  px-4 mb-6 ">
                      <span className="block  text-lg font-semibold text-black">
                        Address Details
                      </span>
                    </div>
                    <div className="w-full  px-4">
                      <div className="max-w-xl">
                        <FormField
                          control={addressForm.control}
                          name="type"
                          render={({ field }) => (
                            <div className="flex flex-wrap -mx-4 px-4 ">
                              <FormInput
                                containerProps={{
                                  className: "w-full mb-6 ",
                                }}
                                label="Type"
                              >
                                <Select
                                  defaultValue={ADDRESS_TYPES[0].title}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    id="sort_by"
                                    className="h-full shadow-none border-0 focus:ring-0"
                                  >
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {ADDRESS_TYPES.map((type) => (
                                      <SelectItem value={type.title}>
                                        {type.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormInput>
                            </div>
                          )}
                        />
                      </div>
                    </div>

                    <div className="w-full  px-4">
                      <div className="max-w-xl">
                        <div className="flex flex-wrap -mx-4 ">
                          <FormField
                            control={addressForm.control}
                            name="state"
                            render={({ field }) => (
                              <FormInput
                                containerProps={{
                                  className: "w-1/2  px-4 mb-6",
                                }}
                                label="Emirates"
                              >
                                <Input
                                  {...field}
                                  className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                              </FormInput>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormInput
                                containerProps={{
                                  className: "w-1/2  px-4 mb-6",
                                }}
                                label="City"
                              >
                                <Input
                                  {...field}
                                  className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                              </FormInput>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full  px-4">
                      <div className="max-w-xl">
                        <div className="flex flex-wrap -mx-4 ">
                          <FormField
                            control={addressForm.control}
                            name="street_address"
                            render={({ field }) => (
                              <FormInput
                                containerProps={{
                                  className: "w-full px-4 mb-6",
                                }}
                                label="Street Address"
                              >
                                <Input
                                  {...field}
                                  className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                              </FormInput>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full  px-4">
                      <div className="max-w-xl">
                        <div className="flex flex-wrap -mx-4 ">
                          <FormField
                            control={addressForm.control}
                            name="flat_number"
                            render={({ field }) => (
                              <FormInput
                                containerProps={{
                                  className: "w-1/2  px-4 mb-6",
                                }}
                                label="Flat / Villa"
                              >
                                <Input
                                  {...field}
                                  className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                              </FormInput>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="building"
                            render={({ field }) => (
                              <FormInput
                                containerProps={{
                                  className: "w-1/2  px-4 mb-6",
                                }}
                                label="Building"
                              >
                                <Input
                                  {...field}
                                  className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                              </FormInput>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full  px-4">
                      <div className="max-w-xl">
                        <div className="flex flex-wrap -mx-4 px-4">
                          <FormField
                            control={addressForm.control}
                            name="building"
                            render={({ field }) => (
                              <FormInput
                                containerProps={{
                                  className: "w-full  mb-6",
                                }}
                                label="Country"
                              >
                                <Select
                                  defaultValue={COUNTRIES[0].title}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    className="h-full shadow-none border-0 focus:ring-0"
                                    defaultValue={COUNTRIES[0].title}
                                  >
                                    <SelectValue
                                      defaultValue={COUNTRIES[0].title}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {COUNTRIES.map((country) => (
                                      <SelectItem value={country.title}>
                                        {country.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormInput>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full  px-4">
                      <div className="max-w-xl">
                        <div className="flex flex-wrap -mx-4 ">
                          <FormInput
                            containerProps={{
                              className: "w-full px-4 ",
                            }}
                            label="Additional Information"
                          >
                            <Input
                              id={"ss"}
                              className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />{" "}
                          </FormInput>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-auto" type="submit">
                    SAVE ADDRESS
                  </Button>
                </form>
              </Form>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
});
