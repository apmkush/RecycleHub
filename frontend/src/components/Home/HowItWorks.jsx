import paymentImage from "./images/payment.png"
import pickupImage from "./images/pickup.jpg"
import scheduleImage from "./images/schedule.jpg"

const HowItWorks = () => {
    return (
        <>
        <div className="bg-gray-100 p-8 pl-10 pr-10 rounded-lg shadow-lg justify-center">
            <h2 className="text-center text-3xl font-semibold mb-8 text-gray-800">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Schedule Pickup Column */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <img src={scheduleImage} alt="Schedule Pickup" className="w-[75%] h-30 mx-auto mb-4" />
                <h3 className="text-center text-xl font-bold text-gray-800">Schedule a Pickup</h3>
                <p className="text-gray-600 text-center">
                    Select a convenient time for pickup.
                </p>
                </div>

                {/* Doorstep Pickup Column */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <img src={pickupImage} alt="Doorstep Pickup" className="w-25 h-25 mx-auto mb-4" />
                <h3 className="text-center text-xl font-bold text-gray-800">Pickup at Your Doorstep</h3>
                <p className="text-gray-600 text-center">
                    Our team arrives at your doorstep.
                </p>
                </div>

                {/* Get Paid Column */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <img src= {paymentImage} alt="Get Paid" className="w-[57%] h-18 mx-auto mb-4" />
                <h3 className="text-center text-xl font-bold text-gray-800">Instant Payment</h3>
                <p className="text-gray-600 text-center">
                    Receive payment on the spot.
                </p>
                </div>

            </div>
        </div>
        </>
    ) ; 
}

export default HowItWorks ; 