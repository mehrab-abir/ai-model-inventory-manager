import React from "react";
import ModelCard from "./ModelCard";
import { useLoaderData } from "react-router";
import { useRef } from "react";
import { useState } from "react";

const AllModels = () => {
  const allmodels = useLoaderData();
  const [currentModels, setCurrentModels] = useState(allmodels);

  const filterRef = useRef();

  //filter models by framework
  const filterModels = () => {
    const framework = filterRef.current.value;

    if (!framework) {
      setCurrentModels(allmodels);
      return;
    }

    fetch(
      `https://ai-model-inventory-backend.vercel.app/filter-models?framework=${encodeURIComponent(
        framework
      )}`
    )
      .then((res) => res.json())
      .then((data) => setCurrentModels(data))
      .catch((err) => console.log(err));
  };

  //search models by name
  const searchModels = (e)=>{
    e.preventDefault();

    const searchValue = e.target.name.value;

    // console.log(searchValue);

    fetch(`https://ai-model-inventory-backend.vercel.app/search-models?name=${encodeURIComponent(searchValue)}`)
    .then(res=>res.json())
    .then(data=>setCurrentModels(data))
    .catch(err=>console.log(err));
  }

  const noModelsFound = (
    <div className="h-[50vh] flex items-center justify-center">
      <h1 className="text-xl font-bold text-muted text-center">
        -No Model found. Try something else-
      </h1>
    </div>
  );

  return (
    <div className="bg-base pt-28">
      <title>All Models</title>
      <div className="w-10/12 mx-auto py-10">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-secondary text-3xl font-semibold">
            All AI Models
          </h1>
          <p className="text-muted">
            Browse our complete collection of AI models
          </p>
        </div>

        {/* search and filter */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-5">
          <select
            name="framework"
            defaultValue=""
            className="select border-input focus:outline-primary! cursor-pointer"
            ref={filterRef}
            onChange={() => filterModels()}
          >
            <option disabled={true} value="" className="">
              Filter Models
            </option>
            <option>TensorFlow</option>
            <option>PyTorch</option>
            <option>OpenAI Gym</option>
            <option>Keras</option>
            <option>Scikit-learn</option>
            <option>JAX</option>
            <option>ONNX</option>
            <option>Detectron2</option>
            <option>Stan</option>
            <option>Diffusers</option>
            <option>DGL</option>
            <option>Gensim</option>
            <option>CatBoost</option>
            <option>LightGBM</option>
            <option>XGBoost</option>
            <option>spaCy</option>
            <option>MXNet</option>
            <option>Chainer</option>
            <option>MindSpore</option>
            <option>Others</option>
          </select>

          <div className="mb-3">
            <form
              onSubmit={(e) => searchModels(e)}
              className="flex gap-1 items-center"
            >
              <input
                type="text"
                name="name"
                className="input border-input outline-none"
                placeholder="Search model"
              />
              <button type="submit" className="btn bg-accent text-base">
                Search
              </button>
            </form>
          </div>
        </div>

        {currentModels.length === 0 ? (
          noModelsFound
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentModels.map((model) => {
              return <ModelCard key={model._id} model={model}></ModelCard>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllModels;
