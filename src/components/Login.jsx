import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/ali-kebaba-logo.svg";
import { supabase } from "../supabaseClient";
import { BsEye, BsEyeSlash } from "react-icons/bs";


export default function Login() {
    const navigate = useNavigate();

    const [session, setSession] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState(null); // Added state for login error


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        saveUser();

        return () => {
            subscription.unsubscribe();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (session === null) localStorage.removeItem("userInfo");
        else saveUser();

        // eslint-disable-next-line
    }, [session]);

    async function saveUser() {
        const user = await supabase.auth.getUser();
        if (user.data.user === null) return;

        let { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.data.user.id);
        if (data && data[0]) {
            localStorage.setItem("userInfo", JSON.stringify(data[0]));
            navigate("/")
        } else navigate("/");
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });

        if (error) {
            console.error("Login error:", error);
            setLoginError("Invalid email or password. Please try again."); // Set login error
            return;
        }

        setLoginError(null); // Reset login error
        await saveUser()
    };




    if (!session) {
        return (
            <div className="flex mx-auto justify-center  h-screen ">
                <div className=" h-[450px] sm:w-[400px] w-[80%] border-orange-700/50 border-2 px-8  my-auto rounded-3xl bg-white">
                    <img
                        className="mx-auto pb-2 mt-[-100px]"
                        src={Logo}
                        alt="logo"
                        width={200}
                    />
                    <form onSubmit={handleLogin} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-gray-500 text-sm  mb-2" htmlFor="email">
                                Email address:
                            </label>
                            <input
                                type="email"
                                id="email2"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus-visible:outline-1 focus-visible:outline-orange-700/60"
                                required
                            />
                        </div>
                        <div className="mb-4">

                            <label className="block text-gray-500 text-sm  mb-2" htmlFor="password">
                                Your Password:
                            </label>
                            <div className="relative w-full">
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    id="password2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus-visible:outline-1 focus-visible:outline-orange-700/60 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
                                >
                                    {isPasswordVisible ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                                </button>
                            </div>

                        </div>
                        <button
                            type="submit"
                            className="bg-green-400 w-full mt-8 text-white border-[1px] text-sm border-green-500 hover:bg-green-500 hover:border-green-600  py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        >
                            Sign in
                        </button>
                        {loginError && (
                            <div className="text-red-500 text-sm mt-2">{loginError}</div>
                        )}

                    </form>
                </div>
            </div>
        );
    }
}
