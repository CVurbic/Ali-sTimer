import React from 'react';
import { ImSpinner9 } from "react-icons/im";
import lepinja from "../assets/classic-kebab-lepinja.jpg";

function CustomerWaitTime({ waitTimes }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-brown-100 ">
            <div className="bg-amber-100 p-8 rounded-lg shadow-xl text-center space-y-6 relative">
                <h1 className="text-4xl font-bold text-brown-900">
                    Estimated Wait Time <br /> <span className="text-lg">Procijenjeno Vrijeme Čekanja</span>
                </h1>
                <div className="w-full h-36 relative flex justify-center items-center">
                    <ImSpinner9 className="absolute top-0 left-0 text-yellow-600 opacity-70 animate-spin-slow w-full h-full" />

                    <div className="mx-auto h-32 w-32 rounded-full z-10  flex justify-center items-center"
                        style={{ backgroundImage: `url(${lepinja})`, backgroundSize: 'cover' }}>
                    </div>

                </div>
                <div className="text-2xl font-semibold text-yellow-600">
                    <p>Approximately / Otprilike</p>
                    <p className="text-6xl">{waitTimes[5].wait_time} min</p>
                </div>
                <p className="text-brown-700">
                    <span className="block font-bold">Your patience is appreciated.</span>
                    <span className="block font-bold">We're working hard to serve you as quickly as possible.</span>
                    <span className="block text-brown-900">Vaše strpljenje je cijenjeno.</span>
                    <span className="block text-brown-900">Radimo naporno kako bismo Vas što brže poslužili.</span>
                </p>
            </div>
        </div>
    );
}

export default CustomerWaitTime;
