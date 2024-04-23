'use client'

import ModalLogin from "./ModalLogin";
import { redirect } from 'next/navigation'
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { loginClient } from "@/lib/apolloClient";



const Hero = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const { data } = await login({
            //   variables: { email, password }
            // });

            const { data } = await loginClient().mutate({ mutation: gql`
            mutation {
                login(email: "${email}", password: "${password}") 
            }` });

            const token = data.login;
            // localStorage.setItem('token', token);

            console.log(data.login);

            // Redirigez l'utilisateur vers une page protégée ou l'accueil
            // router.push('/dashboard');
        } catch (error) {
            setError(error.message);
            console.log(error)
        }
    };

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://www.collinsdictionary.com/images/full/school_309241295.jpg)' }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Bienvenue</h1>
                    <p className="mb-5">Espace famille, élève, personnel, enseignant...</p>
                    <ModalLogin handleSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} />
                </div>
            </div>
        </div>
    );

}

export default Hero;