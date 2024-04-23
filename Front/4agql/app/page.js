'use client'

import Hero from "@/Components/Hero";

const LoginPage = () => {

  return (
      <main>
        <Hero />
      </main>

    // <div>
    //   <h1>Connexion</h1>
    //   {error && <p>{error}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       placeholder="Adresse e-mail"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Mot de passe"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit" disabled={loading}>Se connecter</button>
    //   </form>
    // </div>
  );
};

export default LoginPage;
