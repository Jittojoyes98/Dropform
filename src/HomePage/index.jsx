import React from "react";
import { ImageAssets } from "../_helpers/images";

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <div className="home-main">
        <section data-testid="homepage-hero" className="home-hero-section">
          <img src={ImageAssets.droformImage} alt="hero image" />
          <div className="centre-div-vertical">
            <div>
              <h1 className="big-header">Welcome to dropform</h1>
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
