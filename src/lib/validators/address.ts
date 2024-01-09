import { Type } from "@/types/session";
import z from "zod";

const isPhoneNumber = (ph: string) => ph.length > 8 && ph.length <= 10;

export const AddressCredentialsValidator = z.object({
  id: z.number().optional(),
  entity_id: z.number().optional(),
  name: z
    .string({
      required_error: "Name is Required",
    })
    .min(2, {
      message: "Invalid Name Provided",
    }),
  phone: z
    .string({
      required_error: "Phone number is Required",
    })
    .transform((value) => value.replaceAll(" ", ""))
    .refine(isPhoneNumber, (val) => ({
      message: `${val} is not a valid phone number`,
    }))
    .transform((value) => `+971${value}`),
  latitude: z.string(),
  longitude: z.string(),
  type: z.nativeEnum(Type),
  country: z.string(),
  state: z.string().min(2, {
    message: "State cannot be Empty",
  }),
  city: z.string().min(1, {
    message: "City cannot be Empty",
  }),
  area: z.string().nullable(),
  street_address: z.string().nullable(),
  building: z.string().min(1, {
    message: "Building cannot be Empty",
  }),
  flat_number: z.string().min(1, {
    message: "Flat Number cannot be Empty",
  }),
  suitable_timing: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  google_address: z.string().min(1, {
    message: "Address cannot be empty",
  }),
  additional_info: z.string().nullable().or(z.literal("")),
  belongs_to: z.string(),
  deleted_at: z.date().nullable(),
  is_validated: z.number(),
  area_name: z.string().nullable(),
});

export type TAddressCredentailsValidator = z.infer<
  typeof AddressCredentialsValidator
>;
