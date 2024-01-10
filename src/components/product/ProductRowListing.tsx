import { useEffect, useState } from "react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { Product } from "@/types/products";
import { ProductSliderSkeleton } from "../ProductSkeleton";
import { getPriceDataByLocale } from "@/helpers/general";
import { useRouter } from "next/router";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import AddToCartButton from "../AddtoCartBtn";
import { Heart } from "lucide-react";
import { useCart } from "../hooks/useCart";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductRowListing = ({ product, index }: ProductListingProps) => {
  const { locale } = useRouter();
  const { store } = useCart();

  const wishListItems = store.wishlist.data;

  const isWishListedItem = wishListItems.some((pro) => pro.id === product?.id);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductSliderSkeleton />;

  const priceData = getPriceDataByLocale(locale as locale, product.prices);

  const availabilityData =
    product.availability_new && product.availability_new?.length > 0
      ? {
          label: product.availability_new[0].slot.shipment_label,
          timeLabel: product.availability_new[0].slot.time_label as string,
        }
      : { label: "standard", timeLabel: "IN 1 - 2 DAYS" };

  if (isVisible && product) {
    return (
      <Link
        className={cn(
          "invisible h-fit w-full cursor-pointer group/main bg-white",
          {
            "visible animate-in fade-in-5": isVisible,
          }
        )}
        href={`/product/${product.slug}`}
      >
        <div className="flex w-full border p-2 rounded-xl gap-4 ">
          <div className="flex flex-col h-full">
            <div className="relative aspect-square h-24 w-24  overflow-hidden rounded-lg border flex-shrink-0">
              <Image
                src={product?.images.featured_image}
                alt={product.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="absolute object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex items-center gap-1.5 p-1 pt-2  -mt-1 line-clamp-1 bg-cyan-100 rounded-t-none rounded-b-lg">
              <Image
                loading="eager"
                src={`https://www.lifepharmacy.com/images/${availabilityData.label}-nr.svg`}
                alt="delivery-img"
                width={18}
                height={18}
              />
              <p className="text-[10px] text-primary uppercase font-semibold">
                {availabilityData.timeLabel}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between  flex-1">
            <div className="">
              <div className="flex justify-between">
                <h3 className=" font-semibold text-sm text-gray-700 line-clamp-2">
                  {product.title}
                </h3>

                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="ms-1.5 rounded-xl h-9 w-9"
                >
                  <Heart
                    className={cn("w-4 h-4 text-slate-400", {
                      "fill-red-500 text-red-400 ": isWishListedItem,
                    })}
                  />
                </Button>
              </div>

              <div className="flex items-center gap-1.5 line-clamp-1">
                {product.categories?.map((cat) => (
                  <Link
                    href="/"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" }),
                      " text-xs py-0.5 h-7"
                    )}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2 line-clamp-1">
                <p className=" font-medium  text-red-600">
                  {formatPrice(priceData?.price.offer_price || "")}
                </p>
                <p className=" font-medium text-sm text-blue-600 line-through">
                  {formatPrice(priceData?.price.regular_price || "")}
                </p>
              </div>
              <AddToCartButton id={product.id} />
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default ProductRowListing;
