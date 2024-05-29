"use client";

import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import FBForm from "../components/Form/FBForm";
import FBDesignInput from "../components/Form/FBDesignInput";
import FBInputPassword from "../components/Form/FBPasswordInput";
import { useLoginMutation } from "@/app/redux/api/AuthRedux/AuthApi";
import { useAppDispatch } from "@/app/redux/hook";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { setUser, TUser } from "@/app/redux/api/AuthRedux/AuthSlice";
import { verifyToken } from "@/app/utils/verifyToken";

export default function LoginForm() {
  const router = useRouter();
  const [loginUser] = useLoginMutation();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastID = toast.loading("Logging In...");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await loginUser(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged In", { id: toastID, duration: 2000 });
      if (user?.role == "admin") {
        router.push("/");
      }
      if (user?.role == "user") {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(`${error?.data?.message}`, { id: toastID, duration: 2000 });
    }
  };

  return (
    <div>
      <FBForm onSubmit={onSubmit}>
        <FBDesignInput
          type="email"
          label="Email"
          name="email"
          placeholder="Enter email"
        ></FBDesignInput>
        <FBInputPassword
          name="password"
          label="Password"
          type="password"
          placeholder="password"
        ></FBInputPassword>

        <Button className="w-full submit-button" htmlType="submit">
          Login
        </Button>
      </FBForm>
      <p className="text-center mt-5 fontWeight-semiboald text-14">
        Don’t have an account?
        <Link href="/register">
          <span className="text-blue-primary">Sign up</span>
        </Link>
      </p>
    </div>
  );
}
