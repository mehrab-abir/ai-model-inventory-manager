import React from 'react';
import ModelCard from './ModelCard';
import { useLoaderData } from 'react-router';

const AllModels = () => {
  const allmodels = useLoaderData();
  // console.log(allmodels);
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allmodels.map((model) => {
              return <ModelCard key={model._id} model={model}></ModelCard>;
            })}
          </div>
        </div>
      </div>
    );
};

export default AllModels;