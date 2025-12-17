import React from 'react';
import { LuBrain } from "react-icons/lu";

const AboutModels = () => {
    return (
      <div className="bg-base">
        <div className="w-10/12 mx-auto py-10">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-secondary text-3xl font-semibold">
              About AI Models
            </h1>
            <p className="text-muted">
              Understanding the power and potential of artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {
                [1,1,1,1].map((item,index)=>{
                    return (
                      <div
                        key={index}
                        className="bg-surface p-6 rounded-xl shadow-xl"
                      >
                        <LuBrain className="text-6xl text-primary bg-secondary rounded-xl p-2" />
                        <h3 className="text-xl mt-2">Neural Networks</h3>
                        <p className="text-sm text-muted mt-5">
                          AI models are built on neural networks that mimic the
                          human brain's structure, enabling machines to learn
                          from data and make intelligent decisions.
                        </p>
                      </div>
                    );
                })
            }
          </div>
        </div>
      </div>
    );
};

export default AboutModels;