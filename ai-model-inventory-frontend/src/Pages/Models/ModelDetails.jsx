import React from "react";
import { Link, useLoaderData } from "react-router";
import { SiFramework } from "react-icons/si";
import { IoMdTrendingUp } from "react-icons/io";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { GoDatabase } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { LuShoppingBag } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { use } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import Swal from "sweetalert2";

const ModelDetails = () => {
  const { user } = use(AuthContext);

  const model = useLoaderData();
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
  } = model;

  const deleteModel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/${id}`)
          .then((res) => res.json())
          .then((afterDelete) => {
            if (afterDelete.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Model has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <div className="bg-secondary pt-28 pb-10">
      <div className="w-10/12 mx-auto">
        <h1 className="text-2xl font-bold">{name}</h1>
        <span className="text-sm text-muted">Created By : {createdBy}</span>

        {/* details section */}
        <div className="flex flex-col lg:flex-row gap-6 mt-2">
          <div className="lg:w-[70%] justify-self-stretch">
            <img
              src={image}
              alt=""
              className="rounded-lg object-cover shadow-lg"
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
                  <SiFramework />
                  <div className="flex flex-col">
                    <span className="text-muted">Framework</span>
                    <span>{framework}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <IoMdTrendingUp />
                  <div className="flex flex-col">
                    <span className="text-muted">Usecase</span>
                    <span>{useCase}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <GoDatabase />
                  <div className="flex flex-col">
                    <span className="text-muted">Dataset</span>
                    <span>{dataset}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <BiSolidPurchaseTag />
                  <div className="flex flex-col">
                    <span className="text-muted">Purchased</span>
                    <span>{purchased} times</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <SlCalender />
                  <div className="flex flex-col">
                    <span className="text-muted">Created at</span>
                    <span>{new Date(createdAt).toDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn bg-primary border-none w-full text-white mt-2 cursor-pointer hover:shadow-lg hover:shadow-indigo-500">
              <LuShoppingBag className="text-white text-lg" />
              Purchase
            </button>
          </div>
        </div>
        <div className="w-full lg:w-[70%] bg-surface mt-5 rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-6">Rate this Model</h3>
          <CiStar className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
