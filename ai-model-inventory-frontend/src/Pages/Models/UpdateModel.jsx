import React from "react";
import Swal from "sweetalert2";
import { MdOutlineEdit } from "react-icons/md";
import LoaderSpinner from "../../Components/LoaderSpinner";
import { useLoaderData, useNavigate } from "react-router";

const UpdateModel = () => {
  const navigate = useNavigate();

  const model = useLoaderData();

  const handleUpdateModel = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const framework = form.framework.value;
    const useCase = form.usecase.value;
    const dataset = form.dataset.value;
    const image = form.image.value;
    const description = form.description.value;

    // console.log({name,framework,dataset,usecase, description,image,createdBy,createdAt,purchased});
    const updatedModel = {
      name,
      framework,
      dataset,
      useCase,
      description,
      image
    };

    fetch(`http://localhost:3000/update-model/${model._id}`, {
        method : "PATCH",
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(updatedModel)
    })
      .then((res) => res.json())
      .then((afterUpdate) => {
        if (afterUpdate.modifiedCount) {
          Swal.fire({
            title: "Model Updated!",
            icon: "success",
            theme: "auto",
          });
          console.log(afterUpdate);
        navigate(`/allmodels/${model._id}`);
        }
      });
      form.reset();
  };

  return (
    <div className="bg-base pt-32 pb-10">
      <title>Edit Model</title>
      <div className="w-11/12 md:w-10/12 mx-auto bg-surface rounded-lg p-6 text-secondary">
        <h1 className="text-3xl text-secondary font-semibold mb-2 text-center flex items-center justify-center">
          Update Your AI Model <MdOutlineEdit className="ml-2" />
        </h1>

        <form
          onSubmit={(e) => handleUpdateModel(e)}
          className="mt-10 space-y-4"
        >
          <div className="flex flex-col">
            <label className="fotn-semibold">Model Name</label>
            <input
              type="text"
              name="name"
              className="input border-input focus:outline-primary w-full"
              defaultValue={model?.name}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col w-full">
              <label className="fotn-semibold">Framework</label>
              <select
                name="framework"
                defaultValue={model?.framework}
                className="select border-input focus:outline-primary!  cursor-pointer w-full"
                required
              >
                <option disabled={true} value="Select a Framework">
                  Select a Framework
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
                <option>LightBGM</option>
                <option>XGBoost</option>
                <option>spaCy</option>
                <option>MXNet</option>
                <option>Chainer</option>
                <option>MindSpore</option>
                <option>Others</option>
              </select>
            </div>

            <div className="flex flex-col w-full">
              <label className="fotn-semibold">Use Case</label>
              <select
                name="usecase"
                defaultValue={model?.useCase}
                className="select border-input focus:outline-primary!  cursor-pointer w-full"
                required
              >
                <option disabled={true} value="Select use case">
                  Select use case
                </option>
                <option>NLP</option>
                <option>Computer Vision</option>
                <option>Generative AI</option>
                <option>Speech Recognition</option>
                <option>Recommendation System</option>
                <option>Time Series</option>
                <option>Image Generation</option>
                <option>Probabilistic Programming</option>
                <option>Rule-based Learning</option>
                <option>Ensemble Learning</option>
                <option>Prediction</option>
                <option>Others</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="fotn-semibold">Dataset</label>
            <input
              type="text"
              name="dataset"
              className="input border-input focus:outline-primary w-full"
              defaultValue={model?.dataset}
              required
            />
          </div>

          <div className="flex flex-col whitespace-pre-wrap">
            <label className="fotn-semibold">Description</label>
            <textarea
              type="text"
              name="description"
              className="bg-surface w-full focus:outline-primary! p-2 border border-input rounded resize-y whitespace-pre-wrap wrap-break-word"
              defaultValue={model?.description}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="fotn-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              className="input border-input focus:outline-primary w-full"
              defaultValue={model?.image}
              required
            />
            <span className="text-sm text-muted mt-2">
              Provide a URL to an image representing your model (diagram,
              screenshot, etc.)
            </span>
          </div>

          <button
            type="submit"
            className="btn bg-primary text-white cursor-pointer w-full md:w-auto"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;
