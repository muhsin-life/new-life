import { FormInput } from "./ui/form-input";
import { Icons } from "./Icons";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { ADDRESS_TYPES, COUNTRIES, DEFAULT_ADDRESS } from "@/config";
import { Alert } from "./ui/alert";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddressCredentialsValidator,
  TAddressCredentailsValidator,
} from "@/lib/validators/address";
import { Address } from "@/types/session";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMemo } from "react";
import { saveAddress } from "./hooks/useData";
import { toast } from "sonner";

interface AddressFormProps {
  selectedAddress: Address;
}

export const AddressForm = ({ selectedAddress }: AddressFormProps) => {
  const { mutate, isError, isSuccess } = saveAddress();

  const addressForm = useForm<TAddressCredentailsValidator>({
    values: {
      ...DEFAULT_ADDRESS,
      ...selectedAddress,
    },
    resolver: zodResolver(AddressCredentialsValidator),
    mode: "onChange",
  });

  const libraries = useMemo(() => ["places"], []);

  function onSubmit(formData: TAddressCredentailsValidator) {
    mutate(formData);

    if (isSuccess) {
      toast.success(`Address Added Successfully`, {
        description: "OTP Send to your Device",
      });
    } else if (isError) {
      toast.success(`Something went wrong`, {
        description: "Please try again!",
      });
    }
  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  return (
    <div className="flex flex-col flex-1 overflow-x-hidden ">
      {isLoaded && (
        <GoogleMap
          center={{
            lat: Number(selectedAddress.latitude),
            lng: Number(selectedAddress.longitude),
          }}
          zoom={20}
          options={{
            disableDefaultUI: true,
            clickableIcons: false,
            draggable: false,
          }}
          mapContainerClassName="flex flex-col flex-1  rounded-xl border mb-5"
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
      <Form {...addressForm}>
        <form onSubmit={addressForm.handleSubmit(onSubmit)}>
          <div className="flex flex-wrap items-start bg-white py-5  mb-6 rounded-lg border border-muted ">
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
                    render={({ field, fieldState }) => (
                      <FormItem className="mb-5 px-4">
                        <FormInput
                          containerProps={{
                            className: "w-full   ",
                          }}
                          label="Full Name"
                        >
                          <Input
                            id={"ss"}
                            {...field}
                            className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormInput>
                        {fieldState.error && (
                          <Alert
                            className="bg-red-50"
                            visible={fieldState.error! == undefined}
                            message={fieldState.error.message ?? ""}
                          />
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addressForm.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <div className="w-full  px-4">
                        <div className=" flex gap-1  ">
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
                        {fieldState.error && (
                          <Alert
                            className="bg-red-50 mt-2"
                            visible={fieldState.error !== undefined}
                            message={fieldState.error.message ?? ""}
                          />
                        )}
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
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex flex-wrap -mx-4 px-4 ">
                        <FormInput
                          containerProps={{
                            className: "w-full mb-6 ",
                          }}
                          label="Type"
                        >
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="h-full shadow-none border-0 focus:ring-0">
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
                      {fieldState.error && (
                        <Alert
                          className="bg-red-50"
                          visible={fieldState.error! == undefined}
                          message={fieldState.error.message ?? ""}
                        />
                      )}
                    </FormItem>
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
                    render={({ field, fieldState }) => (
                      <FormItem className="w-1/2  px-4 mb-6">
                        <FormInput label="Emirates">
                          <Input
                            {...field}
                            className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormInput>
                        {fieldState.error && (
                          <Alert
                            className="bg-red-50"
                            visible={fieldState.error! == undefined}
                            message={fieldState.error.message ?? ""}
                          />
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addressForm.control}
                    name="city"
                    render={({ field, fieldState }) => (
                      <FormItem className="w-1/2  px-4 mb-6">
                        <FormInput label="City">
                          <Input
                            {...field}
                            className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormInput>
                        {fieldState.error && (
                          <Alert
                            className="bg-red-50"
                            visible={fieldState.error! == undefined}
                            message={fieldState.error.message ?? ""}
                          />
                        )}
                      </FormItem>
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
                    name="google_address"
                    render={({ field, fieldState }) => (
                      <FormItem className="w-full px-4 mb-6">
                        <FormInput label="Street Address">
                          <Input
                            {...field}
                            className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormInput>
                        {fieldState.error && (
                          <Alert
                            className="bg-red-50"
                            visible={fieldState.error! == undefined}
                            message={fieldState.error.message ?? ""}
                          />
                        )}
                      </FormItem>
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
                    render={({ field, fieldState }) => (
                      <FormItem className="w-1/2  px-4 mb-6">
                        <FormInput label="Flat / Villa">
                          <Input
                            {...field}
                            className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormInput>
                        {fieldState.error && (
                          <Alert
                            className="bg-red-50"
                            visible={fieldState.error! == undefined}
                            message={fieldState.error.message ?? ""}
                          />
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addressForm.control}
                    name="building"
                    render={({ field, fieldState }) => (
                      <FormItem className="w-1/2  px-4 mb-6">
                        <FormInput label="Building">
                          <Input
                            {...field}
                            className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormInput>
                        {fieldState.error && (
                          <Alert
                            className="bg-red-50"
                            visible={fieldState.error! == undefined}
                            message={fieldState.error.message ?? ""}
                          />
                        )}
                      </FormItem>
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
                    name="country"
                    render={({ field, fieldState }) => (
                      <FormItem className="w-full  mb-6">
                        <FormInput label="Country">
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="h-full shadow-none border-0 focus:ring-0">
                              <SelectValue />
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
                        {fieldState.error && (
                          <Alert
                            className="bg-red-50"
                            visible={fieldState.error! == undefined}
                            message={fieldState.error.message ?? ""}
                          />
                        )}
                      </FormItem>
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
                    name="additional_info"
                    render={({ field }) => (
                      <FormInput
                        containerProps={{
                          className: "w-full px-4 ",
                        }}
                        label="Additional Information"
                      >
                        <Input
                          {...field}
                          value={field.value === null ? "" : field.value}
                          className="block w-full outline-none bg-transparent  placeholder-muted-foreground font-semibold h-full  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />{" "}
                      </FormInput>
                    )}
                  />
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
  );
};
