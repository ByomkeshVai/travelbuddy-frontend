"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { uploadToImgBB } from "@/app/utils/uploadPhoto";
import { toast } from "sonner";

const TravelPostForm = () => {
  const { control, handleSubmit, setValue, watch } = useForm();
  const [fileInputs, setFileInputs] = useState([{ id: Date.now() }]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const files = data.photos;
    const photoUrls = await Promise.all(
      files.map(async (fileList: any[]) => {
        const file = fileList[0];
        return uploadToImgBB(file);
      })
    );
    const formData = { ...data, photos: photoUrls };
    console.log(formData);
  };

  const addFileInput = (id: any) => {
    const index = fileInputs.findIndex((input) => input.id === id);
    const newFileInputs = [...fileInputs];
    newFileInputs.splice(index + 1, 0, { id: Date.now() });
    setFileInputs(newFileInputs);
  };

  const removeFileInput = (id: any) => {
    if (fileInputs.length > 1) {
      setFileInputs(fileInputs.filter((input) => input.id !== id));
    } else {
      toast("At least one photo is required."); // Display toast notification
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="flex flex-wrap text-slate-800">
        <div className="relative hidden h-screen select-none flex-col justify-center text-center md:flex md:w-1/3">
          <Image
            src="/travelPhoto.jpg"
            width={500}
            height={500}
            className="mx-auto max-w-lg rounded-lg object-cover relative opacity-60"
            loading="lazy"
            alt="Picture of the author"
          />
          <div className="mx-auto py-16 px-8 text-white absolute">
            <p className="my-6 text-4xl font-bold leading-10">
              Post Your{" "}
              <span className="truncate border-b-8 border-yellow-400 font-bold text-yellow-400">
                Travel Details
              </span>
            </p>
            <p className="mb-4 text-lg font-medium">
              For Find Travel partner easier
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col md:w-2/3">
          <div className="my-auto flex max-w-screen-md flex-col justify-center px-6 md:pl-12 pt-8 sm:pt-0 md:justify-start">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-stretch pt-3 pb-8 md:pt-8"
            >
              <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2 text-slate-900">
                <label className="block">
                  <p className="mb-1 mt-2 text-sm text-gray-300">Destination</p>
                  <Controller
                    name="destination"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                        type="text"
                        placeholder="Enter your destination"
                      />
                    )}
                  />
                </label>
                <label className="block">
                  <p className="mb-1 mt-2 text-sm text-gray-300">
                    Travel Start Date
                  </p>
                  <Controller
                    name="startDate"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                        type="date"
                        placeholder="Enter your Travel Start Date"
                      />
                    )}
                  />
                </label>
                <label className="block">
                  <p className="mb-1 mt-2 text-sm text-gray-300">
                    Travel End Date
                  </p>
                  <Controller
                    name="endDate"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                        type="date"
                        placeholder="Enter your Travel End Date"
                      />
                    )}
                  />
                </label>
                <label className="block">
                  <p className="mb-1 mt-2 text-sm text-gray-300">Travel Type</p>
                  <Controller
                    name="type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                        type="text"
                        placeholder="Enter your Trip Type"
                      />
                    )}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <p className="mb-1 mt-2 text-sm text-gray-300">
                    Detailed Description
                  </p>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="h-32 w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                        placeholder="Write your special requirements here"
                      ></textarea>
                    )}
                  />
                </label>

                {fileInputs.map((input, index) => (
                  <div key={input.id} className="block sm:col-span-2">
                    <label className="block">
                      <p className="mb-1 mt-2 text-sm text-gray-300">
                        Upload Photo {index + 1}
                      </p>
                      <Controller
                        name={`photos[${index}]`}
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="file"
                            className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                          />
                        )}
                      />
                    </label>
                    <div className="flex space-x-2 mt-1">
                      {fileInputs.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => removeFileInput(input.id)}
                        >
                          - Remove
                        </button>
                      )}
                      <button
                        type="button"
                        className="text-blue-500"
                        onClick={() => addFileInput(input.id)}
                      >
                        + Add Photo
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="mt-6 rounded-full bg-yellow-400 px-4 py-2 text-center text-base font-semibold shadow-md outline-none ring-yellow-500 ring-offset-2 transition hover:bg-yellow-400 focus:ring-2 md:w-40"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPostForm;
