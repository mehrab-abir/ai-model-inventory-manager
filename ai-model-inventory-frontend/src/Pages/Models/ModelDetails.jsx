import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { SiFramework } from "react-icons/si";
import { IoMdTrendingUp } from "react-icons/io";
import { BiSolidPurchaseTag } from "react-icons/bi";
import modelImg from "./../../assets/model.jpg";
import { GoDatabase } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { LuShoppingBag } from "react-icons/lu";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { IoStarHalfOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { use } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import Swal from "sweetalert2";
import { useState } from "react";
// import { useEffect } from "react";

const ModelDetails = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const model = useLoaderData();

  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);

  const {
    _id,
    name,
    framework,
    useCase,
    dataset,
    description,
    image,
    createdBy,
    createdAt,
    purchased,
    ratingAvg,
  } = model;

  // const currentUserRating =
  //   JSON.parse(localStorage.getItem("user rating")).modelId === _id
  //     ? JSON.parse(localStorage.getItem("user rating")).rating
  //     : "N/A";

  // const [userRating, setUserRating] = useState(currentUserRating);

  // console.log(currentUserRating);

  const [purchasedCount, setPurchasedCount] = useState(purchased);

  const deleteModel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const token = await user.getIdToken();

      const res = await fetch(
        `https://ai-model-inventory-backend.vercel.app/allmodels/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const afterDelete = await res.json();

      if (afterDelete.deletedCount) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Model has been deleted.",
          icon: "success",
        });
        navigate("/allmodels");
      }
    }
  };

  const handlePurchase = () => {
    const purchasedModel = { purchasedModelId: _id, purchasedBy: user.email };

    fetch("https://ai-model-inventory-backend.vercel.app/purchase-models", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(purchasedModel),
    })
      .then((res) => res.json())
      .then((afterPost) => {
        if (afterPost.insertedId) {
          fetch(
            `https://ai-model-inventory-backend.vercel.app/allmodels/${_id}`,
            {
              method: "PATCH",
            }
          )
            .then((res) => res.json())
            .then((afterUpdate) => {
              if (afterUpdate.modifiedCount) {
                Swal.fire({
                  title: "Model Purchased!",
                  icon: "success",
                  theme: "auto",
                });
                setPurchasedCount((prev) => prev + 1);
              }
            });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong!`,
        });
      });
  };

  const model_img = image || modelImg;

  /* useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem("user rating")));
    const userRatingObj = {
      modelId: _id,
      rating: userRating,
    };
    localStorage.setItem("user rating", JSON.stringify(userRatingObj));
  }, [userRating, _id]); */

  //submit user rating
  const submit = () => {
    // console.log("rate : ", value);

    const newRating = {
      userEmail: user.email,
      ratingValue: value,
    };

    // setUserRating(value);

    fetch(
      `https://ai-model-inventory-backend.vercel.app/modeldetails/ratings/${_id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newRating),
      }
    )
      .then((res) => res.json())
      .then((afterUpdate) => {
        if (afterUpdate.reCalculated.acknowledged) {
          Swal.fire({
            title: "Thank you for rating!",
            icon: "success",
            theme: "auto",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong!`,
        });
      });
  };

  return (
    <div className="bg-secondary pt-28 pb-10">
      <div className="w-10/12 mx-auto">
        <h1 className="text-2xl font-bold">{name}</h1>
        {/* <span className="text-sm text-muted">Created By : {createdBy}</span> */}

        {/* details section */}
        <div className="flex flex-col lg:flex-row gap-6 mt-2">
          <div className="lg:w-[70%] justify-self-stretch">
            <img
              src={model_img}
              alt=""
              className="rounded-lg object-cover shadow-lg mx-auto"
            />
            {user?.email === createdBy ? (
              <div className="flex gap-4 mt-2">
                <Link
                  to={`/update-this-model/${_id}`}
                  className="btn bg-surface border-info text-accent cursor-pointer text-sm"
                >
                  Edit <MdOutlineEdit className="text-xl" />
                </Link>
                <button
                  type="button"
                  onClick={() => deleteModel(_id)}
                  className="btn bg-surface border-danger text-accent cursor-pointer text-sm hover:bg-red-500! hover:text-white!"
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="bg-surface mt-5 rounded-lg shadow-md p-4 border border-gray-200">
              <h3 className="text-lg font-bold mb-6">Description</h3>
              <p className="text-muted">{description}</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-surface p-5 border border-gray-300 rounded-lg">
              <span className="text-lg font-semibold">Details</span>
              <div className="space-y-4 mt-5">
                <div className="flex gap-4 items-center">
                  <SiFramework className="" />
                  <div className="flex flex-col">
                    <span className="text-muted">Framework</span>
                    <span>{framework}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <IoMdTrendingUp className="" />
                  <div className="flex flex-col">
                    <span className="text-muted">Usecase</span>
                    <span>{useCase}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <GoDatabase className="" />
                  <div className="flex flex-col">
                    <span className="text-muted">Dataset</span>
                    <span>{dataset}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <BiSolidPurchaseTag className="" />
                  <div className="flex flex-col">
                    <span className="text-muted">Purchased</span>
                    <span>{purchasedCount} times</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <IoStarHalfOutline className="text-xl" />
                  <div className="flex flex-col">
                    <span className="text-muted">Average Rating</span>
                    <span>{ratingAvg}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <SlCalender className="" />
                  <div className="flex flex-col">
                    <span className="text-muted">Created at</span>
                    <span>{new Date(createdAt).toDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handlePurchase()}
              className="btn bg-primary border-none w-full text-white mt-2 cursor-pointer hover:shadow-lg hover:shadow-indigo-500"
            >
              <LuShoppingBag className="text-white text-lg" />
              Purchase
            </button>
          </div>
        </div>
        <div className="w-full lg:w-[70%] bg-surface mt-5 rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Rate this Model</h3>

          {[1, 2, 3, 4, 5].map((star) => {
            return (
              <button
                key={star}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setValue(star)}
                aria-label={`${star} star`}
                className="cursor-pointer mr-1 text-indigo-700"
              >
                {(hover || value) >= star ? (
                  <IoIosStar className="text-2xl" />
                ) : (
                  <IoIosStarOutline className="text-2xl" />
                )}
              </button>
            );
          })}

          {/* {JSON.parse(localStorage.getItem("user rating").modelId === _id) ? (
            <p className="mt-2">
              <span className="text-accent">
                {JSON.parse(localStorage.getItem("user rating").rating)}
              </span>
            </p>
          ) : (
            ""
          )} */}

          <button
            onClick={submit}
            className="bg-primary text-sm cursor-pointer text-white block mt-2 px-3 py-2 rounded-lg hover:shadow-lg hover:shadow-indigo-400!"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
