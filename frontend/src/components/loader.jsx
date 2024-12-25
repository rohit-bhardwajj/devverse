import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center  items-center pt-40"> {/* Add padding to push it down slightly */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      <p className="ml-4 text-blue-500">Loading...</p>
    </div>
  );
};

export default Loader;