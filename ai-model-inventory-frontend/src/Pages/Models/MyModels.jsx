import React from "react";
import ModelCard from "./ModelCard";
import { useEffect } from "react";
import { use } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useState } from "react";
import LoaderSpinner from "../../Components/LoaderSpinner";

const MyModels = () => {
    const {user, loading, setLoading} = use(AuthContext);
    const [myModels, setMyModels] = useState(null);

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
          <h1 className="text-secondary text-3xl font-semibold">
            My Models
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {myModels.map((model) => {
            return <ModelCard key={model._id} model={model}></ModelCard>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MyModels;
