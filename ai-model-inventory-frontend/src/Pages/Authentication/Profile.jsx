import React, { use } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import defaultAvatar from "../../assets/userAvatar.png";
import { AuthContext } from "./AuthContext";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { uploadToCloudinary } from "../../utils/photoUploader";
import { useRef } from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";

const Profile = () => {
  const { user, updateUser, setUser } = use(AuthContext);
  // console.log(user);

  const [thisUser, setThisUser] = useState(null);

  const modalRef = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://ai-model-inventory-backend.vercel.app/getuser?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setThisUser(data));
  }, [user?.email]);

  const handleUpdateProfile = async (e) => {
    setIsSubmitting(true);

    e.preventDefault();

    const form = e.target;
    const displayName = form.name.value;
    const imageFile = form.avatar?.files?.[0] || null;

    let photoURL = "";

    try {
      if (imageFile) {
        photoURL = await uploadToCloudinary(
          imageFile,
          import.meta.env.VITE_CLOUDINARY_PROFILE_PRESET
        );
      }

      const firebasePayload = { displayName };
      if (photoURL) firebasePayload.photoURL = photoURL;

      await updateUser(firebasePayload);

      setUser((prevUser) => ({
        ...prevUser,
        displayName,
        photoURL: photoURL || prevUser.photoURL,
      }));

      const payload = { displayName };

      if (photoURL) {
        payload.photoURL = photoURL;
      }

      const res = await fetch(
        `https://ai-model-inventory-backend.vercel.app/updateprofile?email=${user?.email}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const afterUpdate = await res.json();

      if (afterUpdate.modifiedCount) {
        Swal.fire({
          title: "Profile Updated!",
          icon: "success",
          theme: "auto",
        });
        if (photoURL) {
          setThisUser((prev) => ({ ...prev, photoURL }));
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong!`,
      });
    } finally {
      setIsSubmitting(false);
      modalRef.current.close();
    }
  };

  const getAvatarUrl = (url) => {
    if (!url) return defaultAvatar;

    if (url.includes("res.cloudinary.com")) {
      return url.replace(
        "/upload/",
        "/upload/f_auto,q_auto,w_512,h_512,c_fill,g_face/"
      );
    }

    return url;
  };

  const userPicture = getAvatarUrl(thisUser?.photoURL);

  /* const userAvatar =
    user?.photoURL || user?.providerData?.[0]?.photoURL || defaultAvatar; */

  return (
    <div>
      <title>Profile</title>
      <Header></Header>
      <div className="w-full md:w-11/12 mx-auto pt-28 flex flex-col items-center justify-center bg-base">
        <h1 className="text-2xl font-semibold text-center mb-2">My Profile</h1>
        <div className="w-full md:w-1/2 px-2 py-6 shadow-2xl mb-10 bg-surface md:rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <img
              src={userPicture}
              alt=""
              className="w-28 h-auto object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-secondary mt-2">
              {user?.displayName}
            </h3>
          </div>

          <div className="mt-10 px-5">
            <div className="bg-base p-2 mb-5 rounded-xl">
              <span className="text-gray-500 flex items-center gap-2">
                <FaRegUser className="text-lg" />
                Name
              </span>
              <p>{user?.displayName}</p>
            </div>

            <div className="bg-base p-2 mb-5 rounded-xl">
              <span className="text-gray-500 flex items-center gap-2">
                <MdOutlineMailOutline className="text-lg" />
                Email Address
              </span>
              <p>{user?.email}</p>
            </div>
            <button
              onClick={() => modalRef.current.showModal()}
              className="btn bg-primary outline-none border-none text-white w-full"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* update profile modal  */}
      <dialog id="update_profile_modal" ref={modalRef} className="modal">
        <div className="modal-box bg-surface">
          <h3 className="font-bold text-lg mb-2">Update name and photo URL</h3>
          <form onSubmit={(e) => handleUpdateProfile(e)}>
            <div className="flex flex-col">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="input w-full outline-none"
                defaultValue={user?.displayName}
                required
              />
            </div>

            <div className="flex flex-col mt-2">
              <label>Photo URL</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="btn bg-primary outline-none border-none text-white mt-3"
            >
              {isSubmitting ? <i>Saving...</i> : "Save Changes"}
            </button>
            <button
              onClick={() => modalRef.current.close()}
              type="button"
              className="btn bg-gray-700 mt-3 ml-2 outline-none border-none text-white"
            >
              Cancel
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <Footer></Footer>
    </div>
  );
};

export default Profile;
