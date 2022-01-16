import {useState} from "react";

export default function UploadPhoto({setPhoto, thumbnail, text, optional}) {
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState("");

  const handleUpload = (e) => {
    setIsUploading("Uploading...");
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "stackshop");
      const options = {
        method: "POST",
        body: formData,
      };
      return fetch(
        "https://api.cloudinary.com/v1_1/dvv2loetw/image/upload",
        options
      )
        .then((res) => res.json())
        .then((data) => {
          setPhoto(data.secure_url);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            setImage(event.target.result);
          };
          setIsUploading("Upload Complete.");
        })
        .catch((err) => {
          setIsUploading(err.message);
        });
    }
  };

  return (
    <div className="relative overflow-hidden flex justify-start space-x-5 items-center my-5">
      {isUploading === "Uploading..." ? (
        <div
          className={`w-14 h-14 ${
            thumbnail ? "rounded" : "rounded-full"
          } bg-gray-500 animate-pulse`}
        />
      ) : (
        <img
          className={`w-14 h-14 bg-transparent ${
            thumbnail ? "rounded" : "rounded-full"
          } object-cover object-center`}
          src={image}
          alt=""
        />
      )}
      <p className="relative">
        <span>
          <span className="ring-1 px-3 py-1">Choose</span> {text}{" "}
          {optional && <small>(optional)</small>}
        </span>
        <small className="absolute left-0  top-full text-gray-300 items-start justify-center">
          <small className="-mb-3">
            {isUploading ? isUploading : "or drag & drop here"}
          </small>
        </small>
      </p>

      <input
        type="file"
        onChange={handleUpload}
        className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
        accept="image/*"
      />
    </div>
  );
}
