import React from 'react'

function EmployeeTimerSetter({ waitTimes }) {



    return (
        <div className="grid grid-cols-2 gap-8 w-screen h-1/3 justify-items-center p-8 md:grid-cols-3">
            {waitTimes.map((time, index) => (
                <button
                    key={index}
                    className={`text-white  bg-opacity-95 w-40 font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${index % 2 === 0 ? 'bg-yellow-600' : 'bg-[#3D2C29]'}`}
                >
                    {time.wait_time}
                </button>
            ))}
        </div>

    );
}

export default EmployeeTimerSetter