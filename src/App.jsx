import './App.css';
import CustomerWaitTime from "./components/CustomerWaitTime.jsx"
import bgAli from "./assets/aliBg.avif"
import { supabase } from "./supabaseClient"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeTimerSetter from './components/EmployeeTimerSetter.jsx';



function App() {

  const [waitTimes, setWaitTimes] = useState()
  const [userLogged, setUserLogged] = useState(false)
  const [userInfo, setUserInfo] = useState()



  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      setUserInfo(userInfo)
      setUserLogged(true)
    }

    let timer = setInterval(async () => {
      await fetchWaitTimes();

    }, 30000)

    fetchWaitTimes();
    // eslint-disable-next-line
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {


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


    setWaitTimes(alisTimer[0]);
  }

  return (
    <div className="App relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{ backgroundImage: `url(${bgAli})` }}
      ></div>
      {waitTimes &&
        <div className={`123123 relative ${!userLogged ? "" : "hidden"}`}>
          <CustomerWaitTime
            waitTimes={waitTimes}
          />
        </div>
      }
      <div className={`h-screen w-screen flex justify-center items-center absolute ${userLogged ? "" : "hidden"}`}>
        <EmployeeTimerSetter
        />
      </div>

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
