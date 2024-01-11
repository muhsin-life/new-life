import { Skeleton } from "./ui/skeleton";

const ProductSliderSkeleton = () => {
  return (
    <div className="flex flex-col w-full ">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

const OrderSkeleton = () => {
  return (
    <div className="grid grid-cols-6 w-full gap-3">
      <div className=" col-span-2 relative bg-zinc-100  w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col gap-1 w-full  col-span-4">
        <Skeleton className="mt-4 w-full h-4 rounded-lg" />
        <Skeleton className="mt-2 w-3/4 h-4 rounded-lg" />
        <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
      </div>
    </div>
  );
};

export { ProductSliderSkeleton, OrderSkeleton };
