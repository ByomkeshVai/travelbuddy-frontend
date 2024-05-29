export const uploadToImgBB = async (file: string | Blob) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const url = `https://api.imgbb.com/1/upload?key=b007158d9f10e4ccf45e9f3162d113d6`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error.message || "Failed to upload image");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
