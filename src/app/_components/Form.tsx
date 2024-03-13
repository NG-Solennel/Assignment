"use client";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaType, schema } from "../validations/schema";
import Input from "./Input";
import { Button } from "./Button";
import Spinner from "./Spinner";
const Form = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const weight = useWatch({ name: "weight", control });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = data as unknown as SchemaType;
    console.log(data);
    try {
      setIsLoading(true);
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await res.json();
      if (result.ok) {
        setIsLoading(false);
        alert("Success!!!");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(JSON.stringify(error));
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  const citizenship = useWatch({ name: "citizenship", control });
  const other = useWatch({ name: "purposeOfImportation", control });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] flex flex-col gap-5 justify-center items-start"
    >
      <section className="flex flex-col gap-3 justify-center items-start border border-blue-500 p-10 w-[500px]">
        <h1 className="text-xl text-blue-500 font-semibold">
          Business owner details
        </h1>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="citizenship">
            Applicant citizenship <span className="text-red-400">*</span>
          </label>
          <select
            {...register("citizenship")}
            id="citizenship"
            className="border-[#141414] border-opacity-50 border rounded-md p-3"
          >
            <option value="">Select citizenship</option>
            <option value="Rwandan">Rwandan</option>
            <option value="Foreigner">Foreigner</option>
          </select>
          {errors?.citizenship && (
            <span className="text-red-400 text-xs">
              {errors?.citizenship?.message as string}
            </span>
          )}
        </div>

        {citizenship === "Rwandan" && (
          <div className="flex flex-col gap-2 w-full">
            <label className="block">Identification number</label>
            <Input
              register={register("nid")}
              placeholder="Enter Identification document number"
            />
            {errors?.nid && (
              <span className="text-red-400 text-xs">
                {errors?.nid?.message as string}
              </span>
            )}
          </div>
        )}

        {citizenship === "Foreigner" && (
          <div className="flex flex-col gap-2 w-full">
            <label className="block">Passport number</label>
            <Input
              register={register("passportNumber")}
              placeholder="Enter passport number"
            />
            {errors?.passportNumber && (
              <span className="text-red-400 text-xs">
                {errors?.passportNumber?.message as string}
              </span>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 gap-8 justify-center items-center">
          <div>
            <label className="block">Other name</label>
            <Input
              register={register("otherNames")}
              placeholder="Other names"
            />
            {errors?.otherNames && (
              <span className="text-red-400 text-xs">
                {errors?.otherNames?.message as string}
              </span>
            )}
          </div>

          <div className="w-full">
            <label className="block">Surname</label>
            <Input register={register("surname")} placeholder="Surname" />
            {errors?.surname && (
              <span className="text-red-400 text-xs">
                {errors?.surname?.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="block">Nationality</label>
            <Input
              register={register("nationality")}
              placeholder="Nationality"
            />
            {errors?.nationality && (
              <span className="text-red-400 text-xs">
                {errors?.nationality?.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="block">Phone number</label>
            <Input
              register={register("phoneNumber")}
              placeholder="Enter phone number"
              type="number"
            />
            {errors?.phoneNumber && (
              <span className="text-red-400 text-xs">
                {errors?.phoneNumber?.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="block">Email</label>
            <Input
              register={register("email")}
              placeholder="Enter email address"
            />
            {errors?.email && (
              <span className="text-red-400 text-xs">
                {errors?.email?.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="ownerAddress">Business owner address</label>
          <Input
            register={register("ownerAddress")}
            placeholder="Enter district"
          />
          {errors?.ownerAddress && (
            <span className="text-red-400 text-xs">
              {errors?.ownerAddress?.message as string}
            </span>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-3 justify-center items-start border border-blue-500 p-10 w-[500px]">
        <h2 className="text-xl text-blue-500 font-semibold">
          Business details
        </h2>
        <div className="grid grid-col-2 gap-3 justify-start items-center w-full">
          <div className="w-full flex flex-col gap-1">
            <label className="block">Business type</label>
            <select
              {...register("businessType")}
              className="border-[#141414] border-opacity-50 border rounded-md p-3"
            >
              <option value="">Enter business type</option>
              <option value="Rwandan">Retailer</option>
              <option value="Foreigner">Wholesaler</option>
              <option value="Foreigner">Manufacturer</option>
            </select>
            {errors?.businessType && (
              <span className="text-red-400 text-xs">
                {errors?.businessType?.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="block">Company name</label>
            <Input
              register={register("companyName")}
              placeholder="Enter company name"
            />
            {errors?.companyName && (
              <span className="text-red-400 text-xs">
                {errors?.companyName?.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="block">Tin number</label>
            <Input
              register={register("tinNumber")}
              placeholder="Enter TIN number"
              type="number"
            />
            {errors?.tinNumber && (
              <span className="text-red-400 text-xs">
                {errors?.tinNumber?.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="block">Registration date</label>
            <Input
              register={register("registrationDate")}
              placeholder="Select date"
              type="date"
            />
            {errors?.registrationDate && (
              <span className="text-red-400 text-xs">
                {errors?.registrationDate?.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="block">Business address</label>
            <Input
              register={register("businessAddress")}
              placeholder="Enter district"
            />
            {errors?.businessAddress && (
              <span className="text-red-400 text-xs">
                {errors?.businessAddress?.message as string}
              </span>
            )}
          </div>
          {/* Additional fields */}
        </div>
      </section>
      <section className="flex flex-col gap-3 justify-center items-start border border-blue-500 p-10 w-[500px]">
        <h2 className="text-xl text-blue-500 font-semibold">
          Importation Details
        </h2>
        <div className="grid grid-col-2 gap-3 justify-start items-center w-full">
          <label className="block">Purpose of importation</label>
          <select
            {...register("purposeOfImportation")}
            className="border-[#141414] border-opacity-50 border rounded-md p-3"
          >
            <option value="">Select the purpose of importation</option>
            <option value="Direct sale">Direct sale</option>
            <option value="Personal use">Personal use</option>
            <option value="Trial use">Trial use</option>
            <option value="Other">Other</option>
          </select>
          {errors?.purposeOfImportation && (
            <span className="text-red-400 text-xs">
              {errors?.purposeOfImportation?.message as string}
            </span>
          )}
          {other === "Other" && (
            <div className="w-full">
              <label className="block">Other</label>
              <Input
                register={register("specifyPurpose")}
                placeholder="Specify Purpose of Importation"
              />
              {errors?.specifyPurpose && (
                <span className="text-red-400 text-xs">
                  {errors?.specifyPurpose?.message as string}
                </span>
              )}
            </div>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-3 justify-center items-start border border-blue-500 p-10 w-[500px]">
        <h2 className="text-xl text-blue-500 font-semibold">Product Details</h2>
        <div className="grid grid-col-2 gap-3 justify-start items-center w-full">
          <div className="">
            <label className="block">Product category</label>
            <select
              {...register("productCategory")}
              className="border-[#141414] border-opacity-50 border rounded-md p-3 w-full"
            >
              <option value="">Select product category</option>
              <option value="General purpose">General purpose</option>
              <option value="Construction materials">
                Construction materials
              </option>
              <option value="Chemicals">Chemicals</option>
            </select>
            {errors?.productCategory && (
              <span className="text-red-400 text-xs">
                {errors?.productCategory?.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="block">Product name</label>
            <Input
              register={register("productName")}
              placeholder="Enter product name"
              className="w-full"
            />
            {errors?.productName && (
              <span className="text-red-400 text-xs">
                {errors?.productName?.message as string}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="block">Weight</label>
            <Input
              register={register("weight")}
              placeholder="Weight (kg)"
              type="number"
            />
            {errors?.weight && (
              <span className="text-red-400 text-xs">
                {errors?.weight?.message as string}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="block">Description</label>
            <textarea
              {...register("description")}
              placeholder="Description of Products"
              className="border-[#141414] border-opacity-50 border p-3 focus:border-opcity-200 rounded-md"
            />
            {errors?.description && (
              <span className="text-red-400 text-xs">
                {errors?.description?.message as string}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex flex-col gap-1">
              <label className="block">Unit of measurement</label>
              <select
                {...register("unitOfMeasurement")}
                className="border-[#141414] border-opacity-50 border rounded-md p-3"
              >
                <option value="">Enter unit of measurement</option>
                <option value="Kgs">Kgs</option>
                <option value="Tonnes">Tonnes</option>
              </select>
              {errors?.unitOfMeasurement && (
                <span className="text-red-400 text-xs">
                  {errors?.unitOfMeasurement?.message as string}
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="block">Quantity</label>
            <Input
              register={register("quantity")}
              placeholder="Quantity of Product(s)"
              type="number"
            />
            {errors?.quantity && (
              <span className="text-red-400 text-xs">
                {errors?.quantity?.message as string}
              </span>
            )}
          </div>
        </div>
      </section>
      <Button type="submit" className="mt-3 rounded-3xl">
        {isLoading ? (
          <Spinner className={`inline h-5 w-5 animate-spin fill-white`} />
        ) : (
          <span>Submit</span>
        )}
      </Button>
    </form>
  );
};

export default Form;
