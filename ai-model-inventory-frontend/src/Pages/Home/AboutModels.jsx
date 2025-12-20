import React from "react";
import { LuBrain } from "react-icons/lu";
import { MdOutlineElectricBolt } from "react-icons/md";
import { SiAdguard } from "react-icons/si";
import { FaPeopleGroup } from "react-icons/fa6";

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
          <div className="bg-surface p-6 rounded-xl shadow-xl">
            <LuBrain className="text-5xl text-primary bg-secondary rounded-xl p-2" />
            <h3 className="text-xl mt-3">Neural Networks</h3>
            <p className="text-sm text-muted mt-5">
              AI models are built on neural networks that mimic the human
              brain's structure, enabling machines to learn from data and make
              intelligent decisions.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-xl shadow-xl">
            <MdOutlineElectricBolt className="text-5xl text-primary bg-secondary rounded-xl p-2" />
            <h3 className="text-xl mt-3">Versatile Applications</h3>
            <p className="text-sm text-muted mt-5">
              From natural language processing to computer vision, AI models
              power chatbots, image recognition, autonomous vehicles, and much
              more.
            </p>
          </div>
          <div className="bg-surface p-6 rounded-xl shadow-xl">
            <SiAdguard className="text-5xl text-primary bg-secondary rounded-xl p-2" />
            <h3 className="text-xl mt-3">Reliable Performance</h3>
            <p className="text-sm text-muted mt-5">
              State-of-the-art models are trained on massive datasets, ensuring
              high accuracy and reliability across various real-world scenarios.
            </p>
          </div>
          <div className="bg-surface p-6 rounded-xl shadow-xl">
            <FaPeopleGroup className="text-5xl text-primary bg-secondary
            rounded-xl p-2" />
            <h3 className="text-xl mt-3">Community Driven</h3>
            <p className="text-sm text-muted mt-5">
              The AI community continuously develops and shares models,
              advancing the field and making cutting-edge technology accessible
              to everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModels;
