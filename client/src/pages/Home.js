import React from "react";
import image from "../assets/background.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import GuideSteps from "./GuideSteps";

function Home() {
  return (
    <div className="">
      <div
        className="min-h-screen border-2  m-0 h-[120vh] bg-cover bg-center flex  items-center justify-start"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="  flex flex-col items-start md:items-center lg:items-start">
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-8  md:ml-0 lg:ml-0 xl:ml-0">
            <div className="text-left">
              <h1 className="font-bold text-4xl md:text-5xl text-gray-800">
                Shop Books Online
              </h1>
              <p className="mt-2 text-base text-gray-600">
                Discover a wide range of books at your fingertips.
              </p>
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
                ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos.
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              <button className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                Learn More
              </button>
              <Link to="/dashboard">
                <button className="px-6 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <GuideSteps/>
      </div>
      {/*Footer*/}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
