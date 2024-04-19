'use client'

import ModalLogin from "./ModalLogin";
import { redirect } from 'next/navigation'

export default function Hero() {

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://www.collinsdictionary.com/images/full/school_309241295.jpg)' }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Bienvenue</h1>
                    <p className="mb-5">Espace famille, élève, personnel, enseignant...</p>
                    <ModalLogin />
                </div>
            </div>
        </div>
    );
}