"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import FBDesignInput from "@/app/(WithCommonLayout)/components/Form/FBDesignInput";
import FBForm from "@/app/(WithCommonLayout)/components/Form/FBForm";
import { getCurrentUser } from "@/app/redux/api/AuthRedux/AuthSlice";
import { useCreateTravelMutation } from "@/app/redux/api/AuthRedux/TravelBuddyRedux/TravelApi";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  params: { id: string };
};

const travelRequest = ({ params }: TProps) => {
  const user = useAppSelector(getCurrentUser);
  const [createTravel] = useCreateTravelMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastID = toast.loading("Logging In...");
    try {
      const travelInfo = {
        travelId: params?.id,
        userId: user?.id,
        notes: data.notes,
      };

      createTravel(travelInfo);

      toast.success("Logged In", { id: toastID, duration: 2000 });
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
          ></FBDesignInput>
          <FBDesignInput
            type="email"
            label="Email Address"
            name="email"
            defaultValue={user?.email}
            placeholder="Enter email"
            disabled
            backgroundColor="#ccc"
          ></FBDesignInput>

          <h2 className="text-slate-50">Additional Information</h2>
          <FBDesignInput
            type="text"
            label="notes"
            name="notes"
            placeholder="Enter notes"
          ></FBDesignInput>
        </div>

        <Button className="w-full submit-button" type="submit">
          Submit
        </Button>
      </FBForm>
    </div>
  );
};

export default travelRequest;
