"use clinet";
/* eslint-disable react-hooks/rules-of-hooks */
import FBDesignInput from "@/app/(WithCommonLayout)/components/Form/FBDesignInput";
import FBForm from "@/app/(WithCommonLayout)/components/Form/FBForm";
import { getCurrentUser } from "@/app/redux/api/AuthRedux/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TProps = {
  params: { id: string };
};

const travelRequest = ({ params }: TProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getCurrentUser);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Travel Request</h1>
      <p>ID: {params.id}</p>
      <FBForm onSubmit={onSubmit}>
        <div>
          <h2>User Info</h2>
          <FBDesignInput
            type="text"
            label="User Name"
            name="username"
            defaultValue={user?.username}
            placeholder="Enter email"
          ></FBDesignInput>
          <FBDesignInput
            type="email"
            label="Email Address"
            name="email"
            defaultValue={user?.email}
            placeholder="Enter email"
          ></FBDesignInput>

          <h2>Additional Information</h2>
          <FBDesignInput
            type="text"
            label="Preferences"
            name="preferences"
            placeholder="Enter Preferences"
          ></FBDesignInput>
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
