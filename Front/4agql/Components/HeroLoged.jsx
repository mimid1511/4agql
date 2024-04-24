'use client'

import { useSession } from "next-auth/react"


const HeroLoged = () => {

    const { data: session, status } = useSession()

    console.log(session.user);

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://static.vecteezy.com/ti/photos-gratuite/p1/33517272-plaine-noir-tableau-noir-retour-a-ecole-ai-genere-gratuit-photo.jpg)' }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <p>Signed in as {session.user.email}</p>
            </div>
        </div>
    );
}

export default HeroLoged;