import React from 'react';
import ModelCard from '../../Components/Models/ModelCard';
import { useEffect } from 'react';
import { useState } from 'react';

const FeaturedModels = () => {

  const [latestModels, setLatestModels] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/latest")
    .then((res)=>res.json())
    .then((data)=>setLatestModels(data));
  },[])

    return (
      <div className="bg-surface pt-8">
        <div className="w-10/12 mx-auto py-10">
          <div className='text-center space-y-4 mb-8'>
            <h1 className="text-secondary text-3xl font-semibold">
              Featured Models
            </h1>
            <p className='text-muted'>
              Discover the latest and most popular AI models in our collection
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {
                latestModels.map((model)=>{
                    return <ModelCard key={model._id} model={model}></ModelCard>
                })
            }
          </div>
        </div>
      </div>
    );
};

export default FeaturedModels;