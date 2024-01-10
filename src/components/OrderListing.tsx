import { cn } from "@/lib/utils";
import { Icons } from "./Icons";
import { getOrderDetails } from "./hooks/useData";
import Image from "next/image";
import { Button } from "./ui/button";

const OrdersListing = () => {
  const { data, isLoading } = getOrderDetails();

  return (
    <div className="flex flex-col flex-1   overflow-x-hidden">
      {!data && isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data?.data.map((item) => (
            <div className="border border-slate-200 rounded-lg">
              <div className="bg-white rounded-t-lg rounded-b-none p-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-500 rounded-full flex items-center justify-center">
                    <Icons.orderIcon className="text-white w-5 h-5" />
                  </div>
                  <div className="grid ">
                    <h5 className="font-semibold text-primary text-sm">
                      Order #{item.id}
                    </h5>
                    <p className="text-primary text-xs">
                      {item.created_at_formatted}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "rounded-lg text-xs font-medium flex gap-x-1 border py-0.5 px-2 ",
                    {
                      "bg-amber-100 ": item.status === 0,
                      "bg-green-100 ": item.status === 1,
                    }
                  )}
                >
                  {item.status_label_text}
                </div>
              </div>
              <div className="w-full flex gap-x-2 overflow-x-auto p-3 ">
                {item.items.map((item) => (
                  <div className="border border-slate-100 rounded-xl flex-shrink-0 relative h-[70px] w-[70px]">
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
              {item.sub_orders.map((subOrder) => (
                <div className="w-full border-t p-3 bg-white ">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={`https://www.lifepharmacy.com/images/${subOrder.fulfilment_type}-nr.svg`}
                        alt="delivery-img"
                        width={25}
                        height={25}
                      />
                      <p className="text-primary font-semibold text-sm">
                        #{subOrder.sub_order_id}
                      </p>
                    </div>
                    <div className="bg-cyan-100 p-1 px-2">
                      <p className="text-primary text-sm font-semibold uppercase">
                        {subOrder.status_label}
                      </p>
                    </div>
                  </div>
                </div>
              ))} 
              <Button className="w-full rounded-t-none rounded-b-lg border-b-0 border-x-0" variant={"outline"}>
                <p className="text-blue-500 font-semibold">VIEW DETAILS</p>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { OrdersListing };
