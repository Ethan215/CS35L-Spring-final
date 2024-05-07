import React from 'react';

const Feed = () => {
  return (
    <div>
    {/* Central Column for Media Feed */}
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="bg-white p-4 m-2 border border-gray-200 rounded">
          <h2 className="text-xl font-bold">Post Title</h2>
          <p className="text-gray-700">Post Content</p>
        </div>
        <div className="bg-white p-4 m-2 border border-gray-200 rounded">
          <h2 className="text-xl font-bold">Post Title</h2>
          <p className="text-gray-700">Post Content</p>
        </div>
        <div className="bg-white p-4 m-2 border border-gray-200 rounded">
          <h2 className="text-xl font-bold">Post Title</h2>
          <p className="text-gray-700">Post Content</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Feed;