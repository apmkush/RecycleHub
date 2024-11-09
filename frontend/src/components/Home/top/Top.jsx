import ImageCarousel from "./ImageCarousal";

const Top = () => {
    return (
        <div className="w-full bg-gray-100 h-screen flex items-center justify-center">
            <div className="w-full max-w-5xl rounded-lg shadow-lg md:flex md:justify-between md:items-center bg-white p-6">
                {/* First Column */}
                <div className="md:w-1/2 p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        RecycleHub: The Global Platform for Buying and Selling Scrap Metals
                    </h2>
                    <p className="text-gray-700 text-lg">
                        RecycleHub simplifies the buying and selling of scrap and recyclable metals across more than 100 countries. Our platform
                        provides a secure environment where businesses can verify materials, secure advance payments, and manage logistics without
                        travel or language barriers. Find, negotiate, and connect with verified companies in the industry for the materials you need,
                        and let us take care of the rest.
                    </p>
                </div>

                {/* Second Column */}
                <div className="md:w-1/2">
                    <ImageCarousel />
                </div>
            </div>
        </div>
    );
}

export default Top;
