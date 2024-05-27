import { DatePicker, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
  color?: string;
};

const FBDatePicker = ({
  name,
  label,
  placeholder = "Select date",
  color,
}: TDatePickerProps) => {
  const { control } = useFormContext();
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={
              <label
                className={` ${
                  error ? "text-[#F00]" : "text-black-softlight"
                } text-[12px] font-semibold`}
              >
                {label}
              </label>
            }
          >
            <DatePicker
              placeholder={placeholder}
              {...field}
              className={`h-[45px] ${
                color ? color : "bg-white-light hover:bg-white-light"
              }   ${
                error
                  ? "border-[#F00] border hover:border-[#F00] focus:border-[#F00]"
                  : "border-none"
              }`}
              style={{ width: "100%" }}
              format="DD-MM-YYYY"
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

export default FBDatePicker;
