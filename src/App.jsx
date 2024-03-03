import './App.css';
import CustomerWaitTime from "./components/CustomerWaitTime.jsx"
import bgAli from "./assets/aliBg.avif"
import { supabase } from "./supabaseClient"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function App() {

  const [waitTimes, setWetTimes] = useState([])
  const [userLogged, setUserLogged] = useState(false)




  useEffect(() => {
    fetchWaitTimes();
  }, [])

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");

    if (userInfo) setUserLogged(true)
    // eslint-disable-next-line
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    localStorage.setItem("userInfo", null);
    setUserLogged(false)
  }

  async function fetchWaitTimes() {

    let { data: alisTimer } = await supabase
      .from('alisTimer')
      .select('*')
    setWetTimes(alisTimer);

  }

  return (
    <div className="App relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{ backgroundImage: `url(${bgAli})` }}
      ></div>
      <div className="relative z-10">
        {waitTimes && waitTimes.length > 0 &&
          <CustomerWaitTime
            waitTimes={waitTimes}
          />}
      </div>

      <div className='fixed bottom-4 right-4 z-50'>
        {!userLogged &&
          <Link
            to="/login"
            className="no-underline text-slate-100  hover:text-slate-400"
          >
            Login
          </Link>
        }
        {userLogged &&

          <button onClick={logout}
            className=""
          >
            Logout
          </button>
        }
      </div>

    </div>
  );
}

export default App;
