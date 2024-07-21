import React from 'react';

const GuideSteps = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How to Buy/Sell Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card for Buying Books */}
          <div className="card bg-gradient-to-r to-yellow-400 from-orange-200 via-white-500 shadow-xl rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-white">Steps to Buy a Book</h3>
              <ol className="list-decimal space-y-2">
                <li>Login or Sign Up</li>
                <li>Search for the Required Book</li>
                <li>Click on 'Buy Now' Button</li>
                <li>Wait for the Book Owner to Contact You</li>
              </ol>
            </div>
          </div>

          {/* Card for Selling Books */}
          <div className="card bg-gradient-to-r to-yellow-400 from-orange-200 via-white-500 shadow-xl rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-white">Steps to Sell a Book</h3>
              <ol className="list-decimal space-y-2">
                <li>Login or Sign Up</li>
                <li>Click on 'Sell Book' Button in Navbar</li>
                <li>Upload Book Details with Book Image</li>
                <li>Click on 'Upload'</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideSteps;
