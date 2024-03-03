import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const withAuth = (Component, adminRequired = false) => {
    const AuthenticatedComponent = () => {
        const navigate = useNavigate();

        useEffect(() => {
            let localUser = localStorage.getItem('userInfo');

            if (localUser) localUser = JSON.parse(localUser);

            const checkUser = async () => {
                const user = await supabase.auth.getUser();

                if (!user.data.user) {
                    navigate('/login');
                } else if (adminRequired) {
                    if (localUser && !localUser.admin) {
                        navigate('/');
                    } else if (localUser === null) {
                        navigate('/');
                    } else return <Component />
                } else return <Component />;
            };

            checkUser();
        }, [navigate]);


        return <Component />
    };

    return AuthenticatedComponent;
};

export default withAuth;
