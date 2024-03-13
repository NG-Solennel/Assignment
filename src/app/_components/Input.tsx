import { FC, InputHTMLAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";
import cn from "@/utils/className";
import { UseFormRegisterReturn } from "react-hook-form";

const inputVariants = cva(
  "w-full py-2 px-3 bg-dark border-[#141414] border-opacity-50 text-black border border-2 rounded-md focus:outline-none focus:border-primary",
  {
    variants: {
      variant: {
        lg: "rounded-lg",
        default: "rounded-md",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  register?: UseFormRegisterReturn<string>;
}
const Input: FC<InputProps> = ({ className, variant, register, ...props }) => {
  return (
    <input
      {...register}
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
};

export default Input;
