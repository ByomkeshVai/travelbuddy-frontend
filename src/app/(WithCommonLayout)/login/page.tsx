import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Cog } from "lucide-react";
import LoginForm from "./LoginForm";
const LoginPage = () => {
  return (
    <div className=" py-24 flex justify-center items-center">
      <Card className="max-w-screen-xl">
        <CardHeader className="flex justify-center">
          <div className="flex">
            <p className="font-bold text-inherit px-4">Login</p>
          </div>
        </CardHeader>
        <CardBody className="p-5">
          <LoginForm></LoginForm>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
