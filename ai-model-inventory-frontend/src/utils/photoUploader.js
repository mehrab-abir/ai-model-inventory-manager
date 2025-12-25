export async function uploadToCloudinary(file,preset) {
  if (!file) throw new Error("No file selected");
  if (!file.type.startsWith("image/")) throw new Error("Select an image file");

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Upload failed");

  return data.secure_url; // this is what to store in MongoDB
}
