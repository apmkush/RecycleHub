import weight from './images/weight.png' ; 
import instantPayment from './images/moneyTransfer.png' ;
import convenience from './images/convenience.png' ;

const Whyus = () => {
    return (
        <>
        <div className="bg-red-50 p-8 pl-10 pr-10 rounded-lg shadow-lg justify-center">
            <h2 className="text-center text-3xl font-semibold mb-8 text-gray-800">Why Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Accurate Weight Column */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                    <img src={weight} alt="Accurate Weight" className="w-[60%] h-22 mx-auto mb-4" />
                    <h3 className="text-center text-xl font-bold text-gray-800">Accurate Weight</h3>
                    <p className="text-gray-600 text-center">
                        Digital weighing for trustworthy prices.
                    </p>
                </div>

                {/* Instant Payment Column */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                    <img src={instantPayment} alt="Instant Payment" className="w-[60%] h-27 mx-auto mb-4" />
                    <h3 className="text-center text-xl font-bold text-gray-800">Instant Payment</h3>
                    <p className="text-gray-600 text-center">
                        Get paid instantly for your scrap.
                    </p>
                </div>

                {/* Convenience Column */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                    <img src={convenience} alt="Convenience" className="w-[57%] h-18 mx-auto mb-4" />
                    <h3 className="text-center text-xl font-bold text-gray-800">Convenience</h3>
                    <p className="text-gray-600 text-center">
                        Easy pickups across Hyderabad.
                    </p>
                </div>

            </div>
        </div>

        </>
    ) ; 
}

export default Whyus ; 