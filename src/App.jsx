import './App.css';
import CustomerWaitTime from "./components/CustomerWaitTime.jsx"
import bgAli from "./assets/aliBg.avif"
import { supabase } from "./supabaseClient"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeTimerSetter from './components/EmployeeTimerSetter.jsx';



function App() {

  const [waitTimes, setWaitTimes] = useState([])
  const [userLogged, setUserLogged] = useState(false)
  const [userInfo, setUserInfo] = useState()



  useEffect(() => {
    console.log(" je okinut 111")
    let userInfo = localStorage.getItem("userInfo");
    console.log("userInfo", userInfo)

    if (userInfo) {
      console.log(userInfo, " je okinut")
      setUserInfo(userInfo)
      setUserLogged(true)
    }

    fetchWaitTimes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(userInfo)


  }, [userInfo])


  async function logout() {
    await supabase.auth.signOut();
    localStorage.removeItem("userInfo");
    setUserInfo(undefined)
    setUserLogged(false)
  }

  async function fetchWaitTimes() {

    let { data: alisTimer } = await supabase
      .from('alisTimer')
      .select('*')
    setWaitTimes(alisTimer);

  }

  return (
    <div className="App relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{ backgroundImage: `url(${bgAli})` }}
      ></div>
      {waitTimes && waitTimes.length > 0 &&
        <div className={`123123 relative ${!userLogged ? "" : "hidden"}`}>
          <CustomerWaitTime
            waitTimes={waitTimes}
          />
        </div>
      }
      {waitTimes && waitTimes.length > 0 &&
        <div className={`h-screen flex justify-center items-center absolute ${userLogged ? "" : "hidden"}`}>
          <EmployeeTimerSetter
            waitTimes={waitTimes}
          />
        </div>
      }

      <div className='fixed bottom-4 right-4'>
        {!userLogged &&
          <Link
            to="/login"
            className="no-underline text-slate-100  hover:text-slate-400"
          >
            Login
          </Link>
        }
        {userLogged && userInfo &&

          <button onClick={logout}
            className=""
          >
            Logout
          </button>
        }
      </div>

    </div >
  );
}

export default App;
