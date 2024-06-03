"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import FBDesignInput from "@/app/(WithCommonLayout)/components/Form/FBDesignInput";
import FBForm from "@/app/(WithCommonLayout)/components/Form/FBForm";
import { getCurrentUser } from "@/app/redux/api/AuthRedux/AuthSlice";
import { useCreateTravelMutation } from "@/app/redux/api/AuthRedux/TravelBuddyRedux/TravelApi";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@nextui-org/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  params: { id: string };
};

const TravelRequest = ({ params }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useAppSelector(getCurrentUser);
  const [createTravel] = useCreateTravelMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.agreement) {
      toast.error(
        "You must agree to the terms and conditions to submit the form."
      );
      return;
    }

    console.log(data);
    const toastID = toast.loading("Request Sending...");
    try {
      const travelInfo = {
        tripId: params?.id,
        userId: user?.id,
        notes: data.notes,
      };

      await createTravel(travelInfo);
      console.log(travelInfo);

      toast.success("Request Sent Successfully", {
        id: toastID,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(`${error?.data?.message}`, { id: toastID, duration: 2000 });
    }
  };

  return (
    <div>
      <h1>Travel Request</h1>
      <p>ID: {params.id}</p>
      <FBForm onSubmit={onSubmit}>
        <div>
          <h2 className="text-slate-50">User Info</h2>
          <FBDesignInput
            type="text"
            label="User Name"
            name="username"
            defaultValue={user?.username}
            placeholder="Enter Email"
            disabled
            backgroundColor="#ccc"
          />
          <FBDesignInput
            type="email"
            label="Email Address"
            name="email"
            defaultValue={user?.email}
            placeholder="Enter email"
            disabled
            backgroundColor="#ccc"
          />
          <h2 className="text-slate-50">Additional Information</h2>
          <FBDesignInput
            type="text"
            label="notes"
            name="notes"
            placeholder="Enter notes"
          />
          <div>
            <input
              type="checkbox"
              {...register("agreement", { required: true })}
            />
            <label className="text-slate-50">
              I agree to the terms and conditions
            </label>
            {errors.agreement && (
              <p className="text-red-500">You must agree before submitting.</p>
            )}
          </div>
        </div>

        <Button className="w-full submit-button" type="submit">
          Submit
        </Button>
      </FBForm>
    </div>
  );
};

export default TravelRequest;
