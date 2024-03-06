import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function EmployeeTimerSetter({currentTime}) {
    console.log(currentTime)
    // const [customTime, setCustomTime] = useState('');
    const [showToast, setShowToast] = useState({ stanje: false, vrijeme: undefined });
    const waitTimes = [5, 10, 15, 20];
    const [currentActiveTime, setCurrentActiveTime] = useState()

    useEffect(()=>{
        if(currentTime) setCurrentActiveTime(currentTime.wait_time)
        // eslint-disable-next-line
    },[])

    async function sendTimeSupa(time) {
        const { error } = await supabase
            .from('alisTimer')
            .update({ wait_time: time })
            .eq('id', 1);
        if (error) {
            console.log(error);
        } else {
            setShowToast({ stanje: true, vrijeme: time });
            setCurrentActiveTime(time)
            setTimeout(() => {
                setShowToast(false);
            }, 5000); // Sakrij toast nakon 3 sekunde
        }
    }

   

 /*    function handleCustomTimeChange(event) {
        setCustomTime(event.target.value);
    }

    function handleCustomTimeSubmit() {
        const time = parseInt(customTime);
        if (!isNaN(time)) {
            sendTimeSupa(time);
            setCustomTime(''); // Reset custom time input field
        } else {
            alert("Invalid input. Please enter a valid number.");
        }
    } */

    return (
        <div className="bg-amber-100 rounded-xl flex flex-col gap-4 md:gap-8 w-4/5 md:w-2/3 lg:w-1/2 min-h-fit justify-items-center p-8 md:grid-cols-3">
          {currentActiveTime &&

<h1 className="text-2xl font-semibold text-yellow-600">Trenutno aktivno vrijeme čekanja je: <br /><span className="text-5xl"> {currentActiveTime} min</span> </h1>
          }
           
            <div className='w-full flex flex-wrap justify-center items-center gap-4'>

                {waitTimes.map((time, index) => (
                    <button
                        key={index}
                        className={`text-white  bg-opacity-95 font-bold w-[40%] h-16 md:w-40 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${index % 2 === 0 ? 'bg-yellow-600' : 'bg-orange-950'}`}
                        onClick={() => sendTimeSupa(time)}
                    >
                        {time} min
                    </button>
                ))}
            </div>

            {/* <div className="col-span-2 md:col-span-3 flex justify-center items-end ">
                <label className="text-gray-800 flex flex-col ">
                    Custom Wait Time:
                    <input
                        type="number"
                        value={customTime}
                        onChange={handleCustomTimeChange}
                        className="ml-2 w-11/12 border border-gray-300 rounded px-2 py-1 focus:outline-none"
                    />
                </label>
                <button
                    onClick={handleCustomTimeSubmit}
                    className="ml-2 bg-yellow-600 text-white px-3 py-1 rounded focus:outline-none hover:bg-yellow-400"
                >
                    Postavi
                </button>
            </div> */}

            {showToast.stanje && (
                <div className="fixed top-4 right-4 p-4 rounded-lg bg-green-600 shadow-xl text-white border">
                    Uspješno postavljanje vremena čekanja na {showToast.vrijeme} min!
                </div>
            )}
        </div>
    );
}

export default EmployeeTimerSetter;
