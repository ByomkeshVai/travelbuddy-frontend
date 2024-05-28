"use client";

import { Button } from "antd";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Cog } from "lucide-react";
import FBForm from "../components/Form/FBForm";
import FBDesignInput from "../components/Form/FBDesignInput";
import FBInputPassword from "../components/Form/FBPasswordInput";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "@/app/redux/api/AuthRedux/AuthApi";
import { useAppDispatch } from "@/app/redux/hook";
import { setUser, TUser } from "@/app/redux/api/AuthRedux/AuthSlice";
import { toast } from "sonner";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/app/utils/verifyToken";

const RegistrationPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [registerdUser] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.password !== data?.confrimPassword) {
      setError("password do not matched");
    } else {
      try {
        setError("");
        const userInfo = {
          username: data.username,
          email: data?.email,
          password: data?.password,
          role: "user",
        };
        const res = await registerdUser(userInfo).unwrap();
        if (res) {
          const user = verifyToken(res.data.accessToken) as TUser;

          dispatch(setUser({ user: user, token: res.data.token }));

          if (user?.role == "admin") {
            router.push("/");
          }
          if (user?.role == "user") {
            router.push("/");
          }
          dispatch(setUser({ user: user, token: res.data.token }));
          router.push("/");
        }
      } catch (error: any) {
        toast.error(error?.data?.error, { duration: 2000 });
      }
    }
  };
  return (
    <div className=" mt-24 flex justify-center items-center">
      <Card className="max-w-screen-lg ">
        <CardHeader className="flex justify-center">
          <div className="flex">
            <Cog />
            <p className="font-bold text-inherit px-4">Register</p>
          </div>
        </CardHeader>
        <CardBody className="max-w-screen-lg">
          <FBForm onSubmit={onSubmit}>
            <FBDesignInput
              type="username"
              label="Username"
              name="username"
              placeholder="Enter Username"
            ></FBDesignInput>
            <FBDesignInput
              type="email"
              label="Business email"
              name="email"
              placeholder="Enter email"
            ></FBDesignInput>
            <FBInputPassword
              name="password"
              label="Password"
              type="password"
              placeholder="password"
            ></FBInputPassword>
            <FBInputPassword
              name="confrimPassword"
              label="Confrim Password"
              type="password"
              placeholder="re-enter-password"
            ></FBInputPassword>
            {error && <p className="text-red-500 relative -top-6">{error}</p>}

            <Button className="w-full submit-button" htmlType="submit">
              SignUp
            </Button>
          </FBForm>

          <p className="text-center mt-4 fontWeight-semiboald text-14">
            have an account?
            <Link href="/login">
              <span className="text-blue-primary"> Login</span>
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegistrationPage;
