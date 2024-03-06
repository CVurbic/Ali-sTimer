import './App.css';
import CustomerWaitTime from "./components/CustomerWaitTime.jsx"
import bgAli from "./assets/aliBg.avif"
import { supabase } from "./supabaseClient"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeTimerSetter from './components/EmployeeTimerSetter.jsx';
import WithAuth from "./components/WithAuth"


function App() {

  const [waitTimes, setWaitTimes] = useState()
  const [userLogged, setUserLogged] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const [poslovnica, setPoslovnica] = useState()
  const [changeWaitTime, setChangeWaitTime] = useState(false)


  const navigate = useNavigate()
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo)
    if (userInfo) {
      setUserInfo(userInfo)
      setPoslovnica(userInfo.lokacija)
      setUserLogged(true)
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userInfo) {
      fetchWaitTimes();
      let timer = setInterval(async () => {
        await fetchWaitTimes();
      }, 30000);
      return () => {
        clearInterval(timer);
      };
    }
    // eslint-disable-next-line
  }, [userInfo]);


  async function logout() {
    await supabase.auth.signOut();
    localStorage.removeItem("userInfo");
    navigate("/login")
    setUserInfo(undefined)
    setUserLogged(false)
  }

  async function fetchWaitTimes() {
    let { data: alisTimer } = await supabase
      .from('alisTimer')
      .select('*')
      .eq("poslovnica", poslovnica)

    console.log(alisTimer)
    setWaitTimes(alisTimer[0]);
  }

  return (
    <div className="App relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{ backgroundImage: `url(${bgAli})` }}
      ></div>
      {waitTimes && !changeWaitTime &&
        <div className={`relative ${!changeWaitTime ? "" : "hidden"}`}>
          <CustomerWaitTime
            waitTimes={waitTimes}
          />
        </div>

      }
      {waitTimes && changeWaitTime &&
        <div className={`h-screen w-screen flex justify-center items-center absolute ${changeWaitTime ? "" : "hidden"}`}>
          <EmployeeTimerSetter
            currentTime={waitTimes}
          />
        </div>
      }


      <div className='fixed bottom-4 right-4 flex gap-3'>
        {!changeWaitTime &&
          <button onClick={() => setChangeWaitTime(true)}
          className='px-4 py-2 border font-semibold border-yellow-600 text-white bg-yellow-600 hover:bg-yellow-600 hover:border-yellow-800 hover:text-amber-200 rounded-md'>
          
            Promijeni vrijeme čekanja
          </button>
        }
        {changeWaitTime &&
          <button onClick={() => setChangeWaitTime(false)} 
          className='px-4 py-2 border font-semibold border-yellow-600 bg-yellow-600 text-white hover:bg-yellow-600 hover:border-yellow-800 hover:text-amber-200 rounded-md'>
            Pregled za goste
          </button>
        }
        {userLogged && userInfo &&

          <button onClick={logout}
          className='px-4 py-2  font-semibold  bg-orange-950 text-white  hover:text-amber-200 rounded-md'>
          
            Logout
          </button>
        }
      </div>

    </div >
  );
}

export default WithAuth(App, false);
