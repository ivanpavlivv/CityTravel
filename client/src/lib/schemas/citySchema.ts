import { z } from "zod";
import { requiredString } from "../util/util";

export const citySchema = z.object({
  name: requiredString("Name"),
  description: requiredString("Description"),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  details: z
    .object({
      costOfFood: z.coerce.number().min(0),
      taxiCost: z.coerce.number().min(0),
      apartmentCost: z.coerce.number().min(0),
      rentCost: z.coerce.number().min(0),
    })
    .optional(),
});

export type CitySchema = z.infer<typeof citySchema>;
