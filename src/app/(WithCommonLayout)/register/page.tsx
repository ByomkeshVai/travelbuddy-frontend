import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Cog } from "lucide-react";

const RegistrationPage = () => {
  return (
    <div className=" mt-24 flex justify-center items-center">
      <Card className="max-w-screen-lg ">
        <CardHeader className="flex justify-center">
          <div className="flex">
            <Cog />
            <p className="font-bold text-inherit px-4">Register</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="">
            <form className="relative space-y-3 mx-auto rounded-md p-6 shadow-xl lg:p-10">
              <div className="grid gap-3 md:grid-cols-2"></div>
              <div>
                <label className=""> Username </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                />
              </div>
              <div>
                <label className=""> Email Address </label>
                <input
                  type="email"
                  placeholder="Info@example.com"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                />
              </div>
              <div>
                <label className=""> Password </label>
                <input
                  type="password"
                  placeholder="******"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                />
              </div>
              <div>
                <label className=""> Confirm Password </label>
                <input
                  type="password"
                  placeholder="******"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                />
              </div>

              <div>
                <button
                  type="button"
                  className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
                >
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegistrationPage;
