import { Form, Input } from "antd";
import { ChangeEvent } from "react";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: number | string; // Corrected typo in defaultValue
  max?: number;
  backgroundColor?: string; // New parameter for background color
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  info?: string;
};

const FBDesignInput = ({
  name,
  type,
  label,
  disabled,
  defaultValue,
  placeholder,
  max,
  backgroundColor,
  onChange,
  info,
}: TInputProps) => {
  return (
    <div className="w-full">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={
              label ? (
                <label
                  className={` ${
                    error ? "text-[#0054B4]" : "text-[#6F6464]"
                  } text-[14px] font-semibold flex gap-1 items-center`}
                >
                  {label}
                </label>
              ) : null
            }
          >
            <Input
              {...field}
              placeholder={placeholder}
              defaultValue={defaultValue}
              type={type}
              id={name}
              disabled={disabled}
              max={max}
              min={0}
              style={{ backgroundColor: backgroundColor }}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) {
                  onChange(e);
                }
              }}
            />
            {error && (
              <div className="flex-start gap-1 mt-[5px]">
                <small className="text-[#F00] text-[12px] text font-normal">
                  {error.message}
                </small>
              </div>
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FBDesignInput;
