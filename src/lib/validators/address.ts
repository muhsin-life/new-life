import * as z from "zod";

const isPhoneNumber = (ph: string) => ph.length > 8 && ph.length <= 10;

export const AddressCredentialsValidator = z.object({
  id: z.number().optional(),
  entity_id: z.number().optional(),
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name cannot be a number",
  }),
  phone: z
    .string({
      required_error: "P",
    })
    .transform((value) => value.replaceAll(" ", ""))
    .refine(isPhoneNumber, (val) => ({
      message: `${val} is not a valid phone number`,
    })),
  latitude: z.string(),
  longitude: z.string(),
  type: z.string(),
  country: z.string(),
  state: z.string({
    required_error: "State is Required",
  }),
  city: z.string({
    required_error: "City is Required",
  }),
  area: z.string().nullable(),
  street_address: z.string().nullable(),
  building: z.string({
    required_error: "Building is Required",
  }),
  flat_number: z.string({
    required_error: "Flat Number is Required",
  }),
  suitable_timing: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  google_address: z.string({
    required_error: "Address is Required",
  }),
  additional_info: z.string().nullable(),
  belongs_to: z.string().optional(),
  deleted_at: z.date().nullable(),
  is_validated: z.number(),
  area_name: z.string().nullable(),
});

export type TAddressCredentailsValidator = z.infer<
  typeof AddressCredentialsValidator
>;
