"use client";
import React from "react";
import Image from "next/image";
import { uploadToImgBB } from "@/app/utils/uploadPhoto";
import { toast } from "sonner";
import { usePostTripMutation } from "@/app/redux/api/TripRedux/TripApi";

const TravelPostForm = () => {
  const [fileInputs, setFileInputs] = React.useState([{ id: Date.now() }]);
  const [destination, setDestination] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [type, setType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [photos, setPhotos] = React.useState<File[]>([]);

  const [postTip] = usePostTripMutation();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate all fields
    if (
      !destination ||
      !startDate ||
      !endDate ||
      !type ||
      !description ||
      photos.length === 0
    ) {
      toast("All fields are required and at least one photo must be uploaded.");
      return;
    }

    // Validate date range
    if (new Date(endDate) < new Date(startDate)) {
      toast("End date cannot be earlier than start date.");
      return;
    }

    try {
      const photoUrls = await Promise.all(
        photos.map(async (file) => {
          const response = await uploadToImgBB(file);
          return response.data.display_url;
        })
      );

      const formData = {
        destination,
        startDate,
        endDate,
        type,
        description,
        photos: photoUrls,
      };

      await postTip(formData);
      toast("Travel post created successfully!");

      // Reset form fields
      setDestination("");
      setStartDate("");
      setEndDate("");
      setType("");
      setDescription("");
      setPhotos([]);
      setFileInputs([{ id: Date.now() }]);
    } catch (error: any) {
      toast(
        error.message || "An error occurred while creating the travel post."
      );
    }
  };

  const addFileInput = () => {
    const newFileInputs = [...fileInputs, { id: Date.now() }];
    setFileInputs(newFileInputs);
  };

  const removeFileInput = (id: number) => {
    if (fileInputs.length > 1) {
      setFileInputs(fileInputs.filter((input) => input.id !== id));
    } else {
      toast("At least one photo is required.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const newPhotos = Array.from(fileList);
      setPhotos([...photos, ...newPhotos]);
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
              onSubmit={onSubmit}
              className="flex flex-col items-stretch pt-3 pb-8 md:pt-8"
            >
              <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2 text-slate-900">
                <label className="block">
                  <p className="mb-1 mt-2 text-sm text-gray-300">Destination</p>
                  <input
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                    type="text"
                    placeholder="Enter your destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </label>
                <label className="block">
                  <p className="mb-1 mt-2 text-sm text-gray-300">
                    Travel Start Date
                  </p>
                  <input
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                    type="date"
                    placeholder="Enter your Travel Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </label>
                <label className="block">
                  <p className="mb-1 mt-2 text-sm text-gray-300">
                    Travel End Date
                  </p>
                  <input
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                    type="date"
                    placeholder="Enter your Travel End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </label>
                <label className="block">
                  <p className="mb-1 mt-2 text-sm text-gray-300">Travel Type</p>
                  <input
                    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                    type="text"
                    placeholder="Enter your Trip Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </label>
                <label className="block sm:col-span-2">
                  <p className="mb-1 mt-2 text-sm text-gray-300">
                    Detailed Description
                  </p>
                  <textarea
                    className="h-32 w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                    placeholder="Write your special requirements here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </label>

                {fileInputs.map((input, index) => (
                  <div key={input.id} className="block sm:col-span-2">
                    <label className="block">
                      <p className="mb-1 mt-2 text-sm text-gray-300">
                        Upload Photo {index + 1}
                      </p>
                      <input
                        type="file"
                        className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-yellow-500 focus:ring-2"
                        onChange={handleFileChange}
                        required={photos.length === 0} // Ensure at least one photo is uploaded
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
                        onClick={addFileInput}
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
