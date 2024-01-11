import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { getAppointmentsData, useBrands, useCategories } from "./hooks/useData";
import { buttonVariants } from "./ui/button";
import Image from "next/image";


export function MainNav() {
  const { data, isLoading } = useCategories();
  const { data: brandsData, refetch } = useBrands();
  const { data: appointments, refetch: refetchAppoinments } =
    getAppointmentsData();

  const [catActiveData, setCatActiveData] = useState({
    categoryIndx: 0,
    subCatIndx: 0,
    chilCatIndx: 0,
  });

  const getBrandsData = () => {
    if (!brandsData) {
      refetch();
    }
  };

  const getAppointments = () => {
    if (!appointments) {
      refetchAppoinments();
    }
  };

  return (
    <div className=" gap-6 flex h-12 bg-white border-b items-center">
      <MaxWidthWrapper>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "h-auto capitalize w-60 gap-2 ",
                  buttonVariants({ variant: "secondary" }),
                  "flex justify-between"
                )}
              >
                Shop by Category
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid  bg-accent gap-1 p-1.5 grid-cols-12 w-full">
                  <li className="col-span-2 h-[322px]">
                    {data?.data.categories.map((item, indx) => (
                      <ListItem
                        onMouseOver={() =>
                          setCatActiveData({
                            categoryIndx: indx,
                            subCatIndx: 0,
                            chilCatIndx: 0,
                          })
                        }
                        className={cn({
                          "bg-white": catActiveData.categoryIndx === indx,
                        })}
                        key={item.id}
                        title={item.name}
                        href={item.slug}
                      >
                        {item.name}
                      </ListItem>
                    ))}
                  </li>

                  <li className="bg-white rounded-lg p-1 col-span-2 h-[322px] overflow-y-auto">
                    {
                      //@ts-ignore
                      data?.data.categories[
                        catActiveData.categoryIndx
                      ].children.map((item, indx) => (
                        <ListItem
                          onMouseOver={() =>
                            setCatActiveData((prevData) => ({
                              categoryIndx: prevData.categoryIndx,
                              subCatIndx: indx,
                              chilCatIndx: 0,
                            }))
                          }
                          className={cn("hover:bg-accent", {
                            "bg-accent": catActiveData.subCatIndx === indx,
                          })}
                          key={item.id}
                          title={item.name}
                          href={item.slug}
                        >
                          {item.name}
                        </ListItem>
                      ))
                    }
                  </li>
                  <li className="bg-accent rounded-lg p-1 col-span-8 h-[322px] overflow-y-auto">
                    <div className="grid grid-cols-4 gap-3 ">
                      {
                        //@ts-ignore
                        data?.data.categories[
                          catActiveData.categoryIndx
                        ].children[catActiveData.subCatIndx].children.map(
                          (item, indx) => (
                            <Link
                              onMouseOver={() =>
                                setCatActiveData((prevData) => ({
                                  categoryIndx: prevData.categoryIndx,
                                  subCatIndx: prevData.subCatIndx,
                                  chilCatIndx: indx,
                                }))
                              }
                              className="bg-white flex  items-center gap-2 border border-slate-100 p-3 rounded-lg "
                              key={item.id}
                              title={item.name}
                              href={item.slug}
                            >
                              <Image
                                src={
                                  item.images?.logo ||
                                  "/images/default-product-image.png"
                                }
                                height={50}
                                width={50}
                                alt={item.name}
                              />
                              <p className="text-sm font-medium">{item.name}</p>
                            </Link>
                          )
                        )
                      }
                    </div>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "h-auto capitalize  gap-2 ",
                  buttonVariants({ variant: "ghost" })
                )}
                onMouseOver={() => getBrandsData()}
              >
                BRANDS
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col gap-5 bg-white px-9 py-5 ">
                  <div className="flex justify-between">
                    <div className=" flex-1 ">
                      <h2 className="font-heading text-lg font-bold leading-[1.1] md:text-2xl">
                        Brands
                      </h2>
                      <p className=" text-sm text-muted-foreground ">
                        Explore all the brands
                      </p>
                    </div>

                    <Link
                      className={cn(buttonVariants({}), "text-sm h-8")}
                      href={"/brands"}
                    >
                      View All
                    </Link>
                  </div>

                  <ul className="grid   gap-10 grid-cols-6 w-full rounded-lg">
                    {brandsData?.data.brands.map((brand) => (
                      <li>
                        <Link href={`/brand/${brand.slug}`}>
                          <div className="flex flex-col gap-2  justify-center ">
                            <div className="bg-white flex items-center justify-center border border-muted rounded-xl shadow hover:shadow-md transition ">
                              <Image
                                src={brand.images.logo}
                                alt={brand.name}
                                width={100}
                                height={100}
                                className="rounded-xl"
                              />
                            </div>
                            <p className="text-sm font-medium text-center">
                              {brand.name}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "h-auto capitalize  gap-2 ",
                  buttonVariants({ variant: "ghost" })
                )}
                onMouseOver={() => getAppointments()}
              >
                HEALTH PACKAGES
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col gap-5 bg-white px-9 py-5 ">
                  <div className="flex justify-between">
                    <div className=" flex-1 ">
                      <h2 className="font-heading text-lg font-bold leading-[1.1] md:text-2xl">
                        Packages
                      </h2>
                      <p className=" text-sm text-muted-foreground ">
                        Explore all the Packages
                      </p>
                    </div>
                    <Link
                      className={cn(buttonVariants({}), "text-sm h-8")}
                      href={"/health_checkup"}
                    >
                      View All
                    </Link>
                  </div>

                  <ul className="grid gap-7 grid-cols-3 w-full rounded-lg ">
                    {appointments?.data.appointments.slice(0, 6).map(
                      (appointment) =>
                        appointment.images.banner && (
                          <li>
                            <Link href={`/brand/${appointment.slug}`}>
                              <div className="bg-white flex items-center justify-center  rounded-lg shadow hover:shadow-md transition w-full aspect-[25/9]">
                                <Image
                                  src={appointment.images.banner}
                                  alt={appointment.name}
                                  width={1440}
                                  height={1440}
                                  className="rounded-lg h-full w-full object-cover object-left "
                                />
                              </div>
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </MaxWidthWrapper>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-white hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
