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
        fetch(`http://localhost/purchase-models?email=${user?.email}`)
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
      <div className="bg-base pt-28">
        <title>My Purchased Models</title>
        <div className="w-10/12 mx-auto py-10">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-secondary text-3xl font-semibold">My Models</h1>
          </div>

          <div className='mt-4 space-y-2'>
            {
                myPurchasedModels.map((model)=>{
                    return (
                        <div key={model._id} className='flex gap-4 shadow-lg shadow-indigo-400 bg-surface rounded-lg p-2 text-secondary'>
                            <div>
                                <img src={model.image} className='w-24 rounded-lg' alt="" />
                            </div>

                            <div className=''>
                                <h4 className='font-bold text-lg'>{model.name}</h4>
                                <p>Framework : {model.framework}</p>
                                <p>Usecase: {model.useCase}</p>
                                <p>Created By: {model.createdBy}</p>
                                <p>Created By: {user?.email}</p>
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