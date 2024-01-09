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
  Package2,
  Phone,
  PlusCircle,
  PlusIcon,
  ScrollText,
  Search,
  Trash2,
  Undo2,
  Wallet2,
} from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import { addressStore } from "./hooks/useStore";
import { DEFAULT_ADDRESS } from "@/config";
import { LocationSelection } from "./LocationSelection";
import { AddressForm } from "./AddressForm";
import { Modals } from "./modals/modals";
import { TAddressDeleteConfirmationModal } from "./modals/AddressDialog";
import { Input } from "./ui/input";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface TabProps {
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
export const AccountDashboard = NiceModal.create(() => {
  const modal = useModal();
  const { data: session } = useSession();
  const { currentAddress, setCurrentAddress } = addressStore();

  const addresses = session?.user.addresses ?? [];

  const [tab, setTab] = useState<TabProps["title"][]>(["Account"]);
  const [selectedAddress, setSelectedAddress] = useState(currentAddress);

  const DASHBOARD_ITEMS: TabProps[] = [
    {
      title: "Addresses",
      icon: MapPin,
      onClick: () => {
        setTab((tab) => [...tab, "Addresses"]);
      },
    },

    {
      title: "Buy It Again",
      icon: Package2,
      onClick: () => {
        setTab((tab) => [...tab, "Buy It Again"]);
      },
    },
    {
      title: "Returns",
      icon: Undo2,
      onClick: () => {
        setTab((tab) => [...tab, "Returns"]);
      },
    },
    {
      title: "Wallet",
      icon: Wallet2,
      onClick: () => {
        setTab((tab) => [...tab, "Wallet"]);
      },
    },
    {
      title: "Wishlist",
      icon: Heart,
      onClick: () => {
        setTab((tab) => [...tab, "Wishlist"]);
      },
    },
    {
      title: "Appointments",
      icon: ClipboardList,
      onClick: () => {
        setTab((tab) => [...tab, "Appointments"]);
      },
    },
    {
      title: "Contact Us",
      icon: Phone,
      onClick: () => {
        setTab((tab) => [...tab, "Contact Us"]);
        signOut();
      },
    },
  ];

  const currentTab = tab[tab.length - 1];

  return (
    <Sheet open={modal.visible} onOpenChange={modal.hide}>
      <SheetContent className="flex w-full flex-col  sm:max-w-lg bg-slate-50">
        <SheetHeader className="space-y-2.5 pr-6 border-b pb-3">
          <SheetTitle className="flex items-center gap-5 relative capitalize">
            {tab.length > 1 && (
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  setTab((tab) => tab.filter((t) => t !== currentTab));
                }}
              >
                <ChevronLeft className="w-6 h-6 text-muted-foreground" />
              </Button>
            )}
            <h6>{currentTab}</h6>
          </SheetTitle>
        </SheetHeader>
        {currentTab === "Account" && (
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
        {currentTab === "Addresses" && (
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
                onClick={() => {
                  setSelectedAddress(DEFAULT_ADDRESS);
                  setTab((tab) => [...tab, "Select Location"]);
                }}
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
                        onClick={() => {
                          setSelectedAddress(addr);
                          setTab((tab) => [...tab, "Select Location"]);
                        }}
                      >
                        <Edit className="text-muted-foreground w-4 h-4" />
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="h-full w-full p-1.5"
                        onClick={() => {
                          Modals.show("address-delete-confirm-modal", {
                            addressID: addr.id as number,
                          } as TAddressDeleteConfirmationModal);
                        }}
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
        {currentTab === "Select Location" && (
          <LocationSelection
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            setTab={setTab}
          />
        )}

        {currentTab === "Address Form" && (
          <AddressForm selectedAddress={selectedAddress} />
        )}

        {currentTab === "Buy It Again" && (
          <div>
            <div className="flex flex-col gap-3">
              <h5 className="text-lg font-semibold">
                You Purchased these Items
              </h5>
              <div className="relative w-full flex items-center">
                <Search className="absolute w-5 h-5 ms-3 text-muted-foreground" />
                <Input className="w-full ps-10 rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {currentTab === "Returns" && (
          <div className="flex items-center justify-center w-full bg-white flex-1">
            <div className="flex flex-col items-center">
              <Image
                src={"/images/cart/empty3.png"}
                height={200}
                width={200}
                alt="Add Products"
              />
              <div className="flex flex-col gap-2 py-7">
                <h5 className="text-lg font-semibold ">
                  No Returns Requests Found
                </h5>

                <p>Start by creating a new Order!</p>
              </div>

              <Link href={"/products"} className={cn(buttonVariants({}))}>
                Start Shopping
              </Link>
            </div>
          </div>
        )}

        
      </SheetContent>
    </Sheet>
  );
});
