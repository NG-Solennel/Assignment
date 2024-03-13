import { z } from "zod";

export const schema = z
  .object({
    citizenship: z.string().min(1, { message: "This field is required" }),
    nid: z.string().optional(),
    passportNumber: z.string().optional(),
    otherNames: z.string().min(1, { message: "This field is required" }),
    surname: z.string().min(1, { message: "This field is required" }),
    nationality: z.string().min(1, { message: "This field is required" }),
    phoneNumber: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    ownerAddress: z.string().min(1, { message: "This field is required" }),
    businessType: z.string().min(1, { message: "This field is required" }),
    companyName: z.string().min(1, { message: "This field is required" }),
    tinNumber: z.string().regex(/^\d{9}$/, "Please provide a valid TIN number"),
    registrationDate: z.string().min(1, { message: "This field is required" }),
    businessAddress: z.string().min(1, { message: "This field is required" }),
    purposeOfImportation: z
      .string()
      .min(1, { message: "This field is required" }),
    specifyPurpose: z.string().optional(),
    productCategory: z.string().min(1, { message: "This field is required" }),
    productName: z.string().min(1, { message: "This field is required" }),
    weight: z.string(),
    description: z.string().min(1, { message: "This field is required" }),
    unitOfMeasurement: z.string().min(1, { message: "This field is required" }),
    quantity: z.string().min(1, { message: "This field is required" }),
  })
  .refine(
    (data) => {
      if (Number(data.quantity) < 0) return false;

      return true;
    },
    {
      message: "Please provide a number greater than zero",
      path: ["quantity"],
    }
  )
  .superRefine((schema, ctx) => {
    console.log(schema);
    if (schema.citizenship === "Rwandan" && schema.nid === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["nid"],
        message: "This field is required",
      });
    }
    if (schema.citizenship === "Foreigner" && schema.passportNumber === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passportNumber"],
        message: "This field is required",
      });
    }
    if (
      schema.purposeOfImportation === "Other" &&
      schema.specifyPurpose === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["specifyPurpose"],
        message: "This field is required",
      });
    }
  });
export type SchemaType = z.infer<typeof schema>;
