import { cn, formatDate, formatPrice } from "@/lib/utils";
import { getOrderDetails } from "./hooks/useData";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { getPriceDataByLocale } from "@/helpers/general";
import { useRouter } from "next/router";
import { PriceElement } from "@/types/products";
import { OrderSummary } from "./OrderSummary";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { OrderSkeleton } from "./ProductSkeleton";

export const OrderDetails = ({ orderId }: { orderId: number }) => {
  const { data, isLoading } = getOrderDetails(orderId);
  const { locale } = useRouter();

  const order = data?.data;

  const statusLabel = () =>
    order?.status === 0
      ? "Awaiting for Confirmation"
      : "Your Order is Confirmed and Ready to be Packed";

  const getPrice = (prices: PriceElement[]) => {
    return getPriceDataByLocale(locale as locale, prices);
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!data && isLoading ? (
        <div className="flex flex-col flex-1 overflow-x-hidden">
          <div className="flex flex-col gap-5">
            {Array(4).fill(<OrderSkeleton />)}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col flex-1 gap-4 overflow-x-hidden">
            <div className="rounded-lg bg-white py-2 border">
              <div className=" flex flex-col gap-1 items-center">
                <h6 className="text-primary font-bold uppercase text-sm">
                  ORDER #{order?.order_id}{" "}
                </h6>
                <p className="text-xs text-muted-foreground">
                  {formatDate(order?.created_at || new Date())}
                </p>
              </div>
              <div className="bg-cyan-100 text-primary font-semibold uppercase flex justify-center p-2 my-2 text-sm">
                {statusLabel()}
              </div>
              <p className="text-xs text-center"> {statusLabel()}</p>
            </div>
            {order?.sub_orders.map((subOrder) => (
              <div className="rounded-lg border shadow">
                <div className="p-2 px-3 rounded-lg border-b  bg-green-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={`https://www.lifepharmacy.com/images/${subOrder.fulfilment_type}-nr.svg`}
                      alt="delivery-img"
                      width={22}
                      height={22}
                    />
                    <h6 className="text-sm font-semibold text-primary">
                      {`Shipment #${subOrder.id}`}
                    </h6>
                  </div>
                  <div className="bg-cyan-100 text-primary font-semibold  text-xs p-1 px-3">
                    {subOrder.status_label}
                  </div>
                </div>
                <div className="bg-white py-1">
                  <div className="w-full flex gap-x-2 overflow-x-auto p-3 ">
                    {subOrder.items.map((item) => (
                      <div className="border border-slate-100 rounded-xl flex-shrink-0 relative h-[60px] w-[60px]">
                        <Image
                          src={item.product_details.images.featured_image}
                          alt={item.product_details.title}
                          height={65}
                          width={65}
                          className="rounded-xl w-full h-full"
                        />
                        <div className="bg-green-500 rounded-full w-[23px] h-[23px] flex items-center justify-center absolute -top-2 -end-1">
                          <p className="text-white text-xs">x{item.qty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 rounded-b-lg p-3.5"></div>
              </div>
            ))}
            <OrderSummary
              summaryProps={{
                props: [
                  {
                    label: "SubTotal",
                    price: formatPrice(order?.discount ?? 0),
                  },
                  {
                    label: "Discount",
                    classNames: "text-green-500",
                    price: `- ${formatPrice(order?.discount ?? 0)}`,
                  },
                  {
                    label: "Shipping Fee",
                    price: formatPrice(order?.delivery_fees ?? 0),
                  },
                  {
                    label: "VAT",
                    price: formatPrice(order?.tax ?? 0),
                  },
                ],
                total: order?.sub_total,
              }}
            />

            <div className="p-3 rounded-lg shadow bg-white ">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-primary w-5 h-5 " />
                <p className="text-primary text-sm font-semibold">Products</p>
              </div>
              <div className="flex flex-col  mt-3">
                {order?.items.map((item) => (
                  <div className="flex items-center justify-between border-b border-muted last:border-none py-2">
                    <div className="flex gap-2">
                      <div className="w-14 h-14 relative border flex-shrink-0 rounded-lg">
                        <Image
                          src={item.featured_image}
                          height={90}
                          width={90}
                          alt={item.title}
                          className=" object-cover aspect-square rounded-lg"
                        />
                        <div className="bg-green-500 rounded-full w-[23px] h-[23px] flex items-center justify-center absolute -top-2 -end-1">
                          <p className="text-white text-xs">x{item.qty}</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between pt-1">
                        <h6 className="text-primary font-semibold text-xs line-clamp-2">
                          {item.title}
                        </h6>

                        <h6 className="text-blue-500 font-medium text-xs">
                          {formatPrice(
                            getPrice(item.prices)?.price.offer_price ?? "0"
                          )}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {isVisible ? (
            <div
              className={cn("bg-amber-50 p-5 rounded-t-lg  ", {
                "animate-in fade-in-10 slide-in-from-bottom-5 ": isVisible,
              })}
            >
              <div className="grid gap-1">
                <h5 className="text-primary font-semibold">
                  Please complete the payment
                </h5>
                <p className="text-muted-foreground text-sm">
                  Please select the available payment method & complete the
                  payment
                </p>
              </div>
              <Button className="w-full mt-4">CHOOSE PAYMENT METHOD</Button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};
