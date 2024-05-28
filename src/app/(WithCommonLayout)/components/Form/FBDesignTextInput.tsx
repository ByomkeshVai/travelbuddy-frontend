import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const { TextArea } = Input;

type TInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  defaulValue?: string;
  info?: string;
};
const FBDesignTextInput = ({
  name,
  label,
  disabled,
  defaulValue,
  placeholder,
  info,
}: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={
              label ? (
                <label
                  className={` ${
                    error ? "text-[#0054B4]" : "text-[#0054B4]"
                  } text-[14px] font-semibold flex gap-1 items-center`}
                >
                  {label}
                </label>
              ) : null
            }
          >
            <TextArea
              rows={4}
              {...field}
              placeholder={placeholder}
              defaultValue={defaulValue}
              id={name}
              disabled={disabled}
              className="bg-[#F6F6F6] text-black-primary hover:bg-[#F6F6F6] rounded-md border-none"
            ></TextArea>
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

export default FBDesignTextInput;
