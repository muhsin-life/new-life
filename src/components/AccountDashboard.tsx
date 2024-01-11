import { signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  ArrowUpCircle,
  ChevronLeft,
  ClipboardList,
  Edit,
  Gem,
  Gift,
  Heart,
  LogOutIcon,
  LucideIcon,
  MapPin,
  Package2,
  Phone,
  PhoneIcon,
  PlusCircle,
  PlusIcon,
  PowerIcon,
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
import { cn, formatPrice } from "@/lib/utils";
import { useLocale } from "./hooks/useLocale";
import ProductRowListing from "./product/ProductRowListing";
import { useCart } from "./hooks/useCart";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { ChatBubbleIcon, ExitIcon } from "@radix-ui/react-icons";
import { OrdersListing } from "./OrderListing";
import { OrderDetails } from "./OrderDetails";

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
    | "Orders"
    | "Vouchers"
    | "Rewards"
    | "Address Form"
    | "Log Out"
    | "Order Details";
  icon: LucideIcon;
  onClick?: () => void;
}
export const AccountDashboard = NiceModal.create(() => {
  const modal = useModal();
  const { data: session } = useSession();
  const { store } = useCart();
  const { currentAddress, setCurrentAddress } = addressStore();
  const { SELECTED_COUNTRY_DETAILS } = useLocale();

  const addresses = session?.user.addresses ?? [];

  const [tab, setTab] = useState<TabProps["title"][]>(["Account"]);
  const [selectedAddress, setSelectedAddress] = useState(currentAddress);
  const [orderId, setOrderId] = useState<number | null>(null);

  const openOrderDetails = (orderId: number) => {
    setTab((tab) => [...tab, "Order Details"]);
    setOrderId(orderId);
  };

  const MAIN_DASHBOARD_ITEMS: TabProps[] = [
    {
      title: "Orders",
      icon: ScrollText,
      onClick: () => {
        setTab((tab) => [...tab, "Orders"]);
      },
    },
    {
      title: "Vouchers",
      icon: Gift,
      onClick: () => {
        setTab((tab) => [...tab, "Vouchers"]);
      },
    },
    {
      title: "Rewards",
      icon: Gem,
      onClick: () => {
        setTab((tab) => [...tab, "Rewards"]);
      },
    },
  ];

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
        // signOut();
      },
    },
    {
      title: "Log Out",
      icon: LogOutIcon,
      onClick: () => {
        signOut();
      },
    },
  ];

  const currentTab = tab[tab.length - 1];

  const wishListItems = store?.wishlist?.data ?? [];

  return (
    <Sheet open={modal.visible} onOpenChange={modal.hide}>
      <SheetContent className="flex w-full flex-col  sm:max-w-lg ">
        <SheetHeader className="space-y-2.5 pr-6 border-b pb-3 ">
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
            <div className="!z-5 relative flex flex-col rounded-[20px] bg-slate-50 bg-clip-border border    items-center w-full p-[16px] bg-cover">
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
                {MAIN_DASHBOARD_ITEMS.map((item) => (
                  <div className="flex flex-col items-center gap-1  ">
                    <Button
                      onClick={item.onClick}
                      className="  rounded-full   h-16 w-16"
                      variant={"outline"}
                      size={"icon"}
                    >
                      <item.icon className="text-blue-600 w-8 h-8" />
                    </Button>

                    <p className="text-slate-700 font-semibold text-sm">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col  mt-3 w-full border rounded-xl">
              {DASHBOARD_ITEMS.map((item) => (
                <Button
                  variant={"outline"}
                  className=" gap-3 justify-start items-center  border-b border-t-0 border-x-0 last:border-b-0 last:rounded-b-xl first:rounded-t-xl  rounded-none h-full p-3.5 hover:text-blue-500 group"
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

        {currentTab === "Wallet" && (
          <div>
            <div className="bg-sky-100 w-full rounded-lg p-4 flex shadow items-center justify-between">
              <div className="flex flex-col justify-between">
                <p className="text-xs text-muted-foreground font-medium">
                  You Have
                </p>
                <h5 className=" text-pink-700 text-lg font-semibold">
                  {formatPrice(session?.user.wallet_balance ?? 0, {
                    currency: SELECTED_COUNTRY_DETAILS.currency,
                  })}
                </h5>
                <p className="text-xs text-muted-foreground font-medium">
                  in Your Wallet
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="rounded-full  "
                >
                  <ArrowUpCircle className="text-white fill-green-500 w-10 h-10" />
                </Button>
                <p className="text-blue-500 font-semibold text-sm">Top Up</p>
              </div>
            </div>
          </div>
        )}

        {currentTab === "Wishlist" && (
          <div className="flex flex-col flex-1 overflow-x-hidden">
            <h5 className="text-muted-foreground text-lg font-semibold mb-3">
              Your Wishlisted Items
            </h5>
            <div className="grid gap-3">
              {wishListItems.map((product, i) => (
                <ProductRowListing product={product} index={i} />
              ))}
            </div>
          </div>
        )}

        {currentTab === "Appointments" && (
          <>
            <Tabs
              defaultValue="pending"
              className="flex flex-col  items-center flex-1 justify-center"
            >
              <TabsList
                className="grid w-full grid-cols-2"
                defaultValue={"pending"}
              >
                <TabsTrigger value={"pending"}>PENDING</TabsTrigger>
                <TabsTrigger value={"completed"}>COMPLETED</TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="h-full">
                <div className=" flex flex-col mt-16 items-center">
                  <Image
                    src={"/images/cart/empty3.png"}
                    height={200}
                    width={200}
                    alt="Add Products"
                  />
                  <div className="flex flex-col gap-2 py-7 items-center">
                    <h5 className="text-lg font-semibold ">
                      No Appoinments Found !
                    </h5>

                    <p className="text-sm">Start by creating a new one!</p>
                  </div>

                  <Link
                    href={"/doctors"}
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    Book Appointment
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="completed" className="h-full">
                <div className=" flex flex-col mt-16 items-center">
                  <Image
                    src={"/images/cart/empty3.png"}
                    height={200}
                    width={200}
                    alt="Add Products"
                  />
                  <div className="flex flex-col gap-2 py-7 items-center">
                    <h5 className="text-lg font-semibold ">
                      No Appoinments Found !
                    </h5>

                    <p className="text-sm">Start by creating a new one!</p>
                  </div>

                  <Link
                    href={"/doctors"}
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    Book Appointment
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}

        {currentTab === "Contact Us" && (
          <div className="flex-1 flex flex-col  justify-start gap-5 p-3">
            <div>
              <Image
                src={"/images/account/contact-us.png"}
                height={600}
                width={600}
                alt="Contact Us"
              />
            </div>
            <div className=" text-center">
              <h5 className="text-2xl font-bold mb-4">Contact Us</h5>
              <p className="text-sm text-center text-muted-foreground">
                24/7 support at your finger tips for all your queries
              </p>
              <div className="flex gap-3 items-center px-10 mt-5">
                <Button className="w-full rounded-full gap-2 drop-shadow  ">
                  <PhoneIcon className="fill-white w-4 h-4" />
                  <span>Call</span>
                </Button>
                <Button
                  variant={"outline"}
                  className="w-full rounded-full gap-2"
                >
                  <ChatBubbleIcon className=" w-4 h-4" />
                  <span>Chat</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentTab === "Orders" && (
          <OrdersListing openOrderDetails={openOrderDetails} />
        )}

        {currentTab === "Vouchers" && (
          <>
            <Tabs
              defaultValue="pharmacy_vouchers"
              className="flex flex-col  items-center flex-1 justify-center"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value={"pharmacy_vouchers"}>
                  PHARMACY VOUCHERS
                </TabsTrigger>
                <TabsTrigger value={"clinic_vouchers"}>
                  CLINIC VOUCHERS
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pharmacy_vouchers" className="h-full">
                <div className=" flex flex-col mt-16 items-center">
                  <Image
                    src={"/images/cart/empty3.png"}
                    height={200}
                    width={200}
                    alt="Add Products"
                  />
                  <div className="flex flex-col gap-2 py-7 items-center">
                    <h5 className="text-lg font-semibold ">
                      No Pharmacy Vouchers Found !
                    </h5>

                    <p className="text-sm">Start shopping to get Vouchers</p>
                  </div>

                  <Link
                    href={"/products"}
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    Start Shopping
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="clinic_vouchers" className="h-full">
                <div className=" flex flex-col mt-16 items-center">
                  <Image
                    src={"/images/cart/empty3.png"}
                    height={200}
                    width={200}
                    alt="Add Products"
                  />
                  <div className="flex flex-col gap-2 py-7 items-center">
                    <h5 className="text-lg font-semibold ">
                      No Clinic Vouchers Found !
                    </h5>

                    <p className="text-sm">Book appointments to get Vouchers</p>
                  </div>

                  <Link
                    href={"/doctors"}
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    Book Appointment
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}

        {currentTab === "Order Details" && (
          <>
            {!orderId ? (
              <span>Loading</span>
            ) : (
              <OrderDetails orderId={orderId} />
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
});
