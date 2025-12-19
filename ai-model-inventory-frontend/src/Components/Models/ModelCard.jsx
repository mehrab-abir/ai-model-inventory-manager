import React from 'react';
import { Link } from 'react-router';
// import sampleImg from './../../assets/sample-img.png'

const ModelCard = ({model}) => {
  const {_id,name, framework, image, description, useCase} = model;
    return (
      <div className="overflow-hidden relative shadow-sm shadow-[#4338CA20] hover:scale-102 hover:shadow-2xl transition-all duration-300 rounded-lg">
        <img
          src={image}
          alt=""
          className="w-full object-cover h-52 hover:scale-105 cursor-pointer transition-transform duration-300"
        />
        <div className="px-6 pb-3 bg-surface">
          <h2 className="flex items-center justify-between text-secondary text-lg font-bold min-h-20 leading-snug">
            {name}
            <span className="font-normal bg-accent py-1 px-4 rounded-full text-sm">
              {framework}
            </span>
          </h2>

          <p className="text-muted text-sm min-h-16 leading-snug">{`${description.slice(
            0,
            100
          )}...`}</p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">4.3</span>
            <span className="bg-secondary p-1 rounded-full text-sm!">
              {useCase}
            </span>
          </div>
          <Link
            to={`/allmodels/${_id}`}
            className="btn bg-primary w-full text-white rounded-xl mt-4"
          >
            View Details
          </Link>
        </div>
      </div>
    );
};

export default ModelCard;