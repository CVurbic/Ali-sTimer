import './App.css';
import CustomerWaitTime from "./components/CustomerWaitTime.jsx"
import { supabase } from "./supabaseClient"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WithAuth from "./components/WithAuth"


function App() {

  const [waitTimes, setWaitTimes] = useState()
  const [userLogged, setUserLogged] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const [poslovnica, setPoslovnica] = useState()
  const [showSettings, setShowSettings] = useState(false)


  const navigate = useNavigate()
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
      }, 5000);
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
      .from('waitTime')
      .select('*')
      .eq("poslovnica", poslovnica)

    console.log(alisTimer)
    setWaitTimes(alisTimer[0]);
  }

  return (
    <div className="App relative">
      <div className='flex gap-2 justify-center items-center fixed top-2 right-4  z-[999]' >
        {userLogged && userInfo &&

          <button onClick={logout}
            className={`${showSettings ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-500 px-4 py-2  font-semibold  bg-orange-950 text-white  hover:text-amber-200 rounded-md`}
          >

            Logout
          </button>
        }
        <p className='font-medium text-amber-300 cursor-pointer py-4 px-4 z-[559]' onClick={() => setShowSettings(!showSettings)}>{poslovnica}</p>

      </div>
      {waitTimes &&
        <CustomerWaitTime
          waitTimes={waitTimes}
        />

      }





    </div >
  );
}

export default WithAuth(App, false);
