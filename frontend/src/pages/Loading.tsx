import React from "react";

const Loading: React.FC = () => {
	return (
		<>
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
				<div>
					<h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-10">
						FINDUO
					</h1>
				</div>
                <div className="flex flex-col animate-pulse">
                    <h1 className="text-3xl font-bold mb-5">
                        This page is loading!
                    </h1>
                    <p className="mx-auto text-xs">Please hold while we determine your login status...</p>
                </div>
			</div>
		</>
	);
};

export default Loading;
