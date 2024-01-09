import React, { ReactNode } from "react";
import { Input } from "./input";
import { Label } from "./label";

export interface FormProps extends React.InputHTMLAttributes<HTMLLabelElement> {
  containerProps?: React.InputHTMLAttributes<HTMLDivElement>;
  label: string;
  children: ReactNode;
}

const FormInput = React.forwardRef<HTMLLabelElement, FormProps>(
  ({ containerProps, label, id, children }, ref) => {
    return (
      <div {...containerProps}>
        <div className="relative w-full h-12 py-3  border border-slate-200 focus-within:border-blue-500 rounded-lg ">
          <Label
            htmlFor={id}
            className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-muted-foreground px-1 bg-white"
            ref={ref}
          >
            {label}
          </Label>
          {children}
        </div>
      </div>
    );
  }
);

export { FormInput };
