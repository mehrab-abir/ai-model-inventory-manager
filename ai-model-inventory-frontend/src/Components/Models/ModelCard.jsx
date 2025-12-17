import React from 'react';
import sampleImg from './../../assets/sample-img.png'

const ModelCard = () => {
    return (
      <div className="overflow-hidden relative shadow-sm shadow-[#4338CA20] hover:scale-102 hover:shadow-2xl transition-all duration-300 rounded-lg">
        <img
          src={sampleImg}
          alt=""
          className="w-full object-cover h-52 md:h-75 hover:scale-105 cursor-pointer transition-transform duration-300"
        />
        <div className="p-6 bg-surface">
          <div className="flex items-center justify-between">
            <span className="bg-secondary">ModelName</span>
            <span className="bg-secondary">Framework</span>
          </div>
          <p className="text-muted my-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident
            beatae dignissimos id voluptates molestias aliquam voluptas
            repellendus animi nulla eligendi.
          </p>
          <div className="flex items-center justify-between">
            <span className='bg-secondary'>rating</span>
            <span className='bg-secondary'>usecase</span>
          </div>
          <button className="btn bg-primary w-full text-white rounded-xl mt-4">
            View Details
          </button>
        </div>
      </div>
    );
};

export default ModelCard;