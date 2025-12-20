import React from 'react';
import { use } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import LoaderSpinner from '../../Components/LoaderSpinner';

const PurchasedModels = () => {
    const {user,loading, setLoading} = use(AuthContext);
    const [myPurchasedModels, setMyPurchasedModels] = useState([]);

    useEffect(()=>{
        if(loading){
            return;
        }
        fetch(`http://localhost:3000/purchase-models?email=${user?.email}`)
        .then(res=>res.json())
        .then((data)=>setMyPurchasedModels(data))
        .catch(err=>console.log(err))
        .finally(()=>{
            setLoading(false);
        })
    },[user?.email,setLoading, loading])

     if (loading) {
       return <LoaderSpinner></LoaderSpinner>
     }

    return (
      <div className="bg-base pt-28 pb-10">
        <title>Purchased Models</title>
        <div className="w-10/12 mx-auto py-10">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-secondary text-3xl font-semibold">My Purchased Models</h1>
          </div>

          <div className='mt-4 space-y-2'>
            {
                myPurchasedModels.map((model)=>{
                    return (
                        <div key={model._id} className='flex flex-col md:flex-row items-center gap-4 shadow-md shadow-indigo-400 bg-surface rounded-lg p-2 text-secondary text-sm text-center md:text-left'>
                            <div>
                                <img src={model.image} className='w-28 rounded-lg' alt="" />
                            </div>

                            <div className='space-y-1.5'>
                                <h4 className='font-bold text-lg'>{model.name}</h4>
                                <p>Framework : {model.framework}</p>
                                <p>Usecase: {model.useCase}</p>
                                <p>Created By: {model.createdBy}</p>
                                <p>Purchased By: {user?.email}</p>
                            </div>
                        </div>
                    )
                })
            }
          </div>
        </div>
      </div>
    );
};

export default PurchasedModels;