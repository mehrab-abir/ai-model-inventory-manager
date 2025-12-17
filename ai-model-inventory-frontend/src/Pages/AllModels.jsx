import React from 'react';
import ModelCard from '../Components/Models/ModelCard';

const AllModels = () => {
    return (
      <div className="bg-base pt-28">
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
            {[1, 1, 1, 1, 1, 1].map((model, index) => {
              return <ModelCard id={index} model={model}></ModelCard>;
            })}
          </div>
        </div>
      </div>
    );
};

export default AllModels;