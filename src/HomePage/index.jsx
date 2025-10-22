import React from "react";
import { ImageAssets } from "../_helpers/images";

const HomePage = () => {
  return (
    <div>
      <div className="py-12 w-4/5 my-0 mx-auto flex flex-col items-stretch">
        <section data-testid="homepage-hero" className="flex">
          <img src={ImageAssets.droformImage} alt="hero image" />
          <div className="flex items-center">
            <div>
              <h1 className="">Welcome to dropform</h1>
              <h2>
                We create form through drag and drop with highly customisable UI
                for your forms
              </h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
