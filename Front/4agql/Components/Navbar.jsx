'use client';

import React from "react";
import Link from "next/link";

import ThemeController from "./ThemeController";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-neutral btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="/">Accueil</Link></li>
                        <li><Link href="/Notes">Notes <span className="badge">4</span></Link></li>
                        <li><Link href="/Classes">Classes</Link></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link className="btn btn-primary text-xl" href="/">SchooInc ltd</Link>
            </div>
            <div className="navbar-end">
                {/* <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div> */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-neutral btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a >Parametres</a></li>
                        <li><a>Se déconnecter</a></li>
                        <ThemeController/>

                    </ul>
                </div>
            </div>
        </div>
    );
}