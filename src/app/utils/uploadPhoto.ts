export const uploadToImgBB = async (image: string | Blob) => {
  const formData = new FormData();
  formData.append("image", image);
  const url = `https://api.imgbb.com/1/upload?key=${`b007158d9f10e4ccf45e9f3162d113d6`}`;
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};
