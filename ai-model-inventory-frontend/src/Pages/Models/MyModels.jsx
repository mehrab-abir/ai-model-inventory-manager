import React from "react";
import { useEffect } from "react";
import { use } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useState } from "react";
import LoaderSpinner from "../../Components/LoaderSpinner";
import { Link } from "react-router";

const MyModels = () => {
    const {user, loading, setLoading} = use(AuthContext);
    const [myModels, setMyModels] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:3000/mymodels?email=${user?.email}`)
        .then(res=>res.json())
        .then((models)=>setMyModels(models))
        .catch(error=>console.log(error))
        .finally(()=>{
            setLoading(false);
        })
    },[user?.email,setLoading])

    if(loading){
        return <LoaderSpinner></LoaderSpinner>
    }


  return (
    <div className="bg-base pt-28">
      <title>My Models</title>
      <div className="w-10/12 mx-auto py-10">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-secondary text-3xl font-semibold">My Models</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {myModels.map((model) => {
            return (
              <div className="relative shadow-sm shadow-[#4338CA20] hover:shadow-2xl rounded-lg overflow-hidden">
                <img
                  src={model.image}
                  alt=""
                  className="w-full object-cover h-52 hover:scale-105 cursor-pointer transition-transform duration-300"
                />
                <div className="px-6 pb-3 bg-surface space-y-2">
                  <h2 className="flex flex-col justify-between text-accent! text-lg font-bold min-h-20 leading-snug pt-2">
                    {model.name}
                    <span className="font-normal text-sm text-secondary">
                      Framework: <span className="">{model.framework}</span>
                    </span>
                  </h2>

                  <div className="flex flex-col space-y-2">
                    <span className="text-sm">
                      Created By: {model.createdBy}
                    </span>
                    <span className="text-sm!">
                      Use case: <span className="">{model.useCase}</span>
                    </span>
                  </div>
                  <Link
                    to={`/allmodels/${model._id}`}
                    className="btn bg-surface text-primary border-primary w-full rounded-xl mt-4"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyModels;
