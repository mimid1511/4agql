"use client"

import { loginClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Profil() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    if (status === "authenticated" && session) {
      // Fetch user data when session is available
      fetchUser();
    }
  }, [session, status]);

  useEffect(() => {
    if (userData) {
      setFormData({
        pseudo: userData.pseudo || '',
        email: userData.email || '',
        password: userData.password || '',
        role: userData.role || ''
      });
    }
  }, [userData]);

  const fetchUser = async () => {
    try {
      const { data } = await loginClient().query({
        query: gql`
          query {
            userByEmail(email: "${session.user.email}") {
              _id
              email
              pseudo
              password
              role
            }
          }
        `,
      });
      setUserData(data.userByEmail);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdateProfile = async () => {
    console.log(formData);
    console.log(userData._id);

    await loginClient().mutate({
      mutation: gql`
    mutation {
      updateUser(
         updateUserInput: {
        _id: "${userData._id}",
        pseudo: "${formData.pseudo}",
        email: "${formData.email}",
        password: "${formData.password}"
      }) {
        _id
        email
        pseudo
        password
        role
      }
    }`
    });

  };


  return (
    <main>
      <section style={{ padding: 25 }}>
        <br />
        <h1 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">Modifier le profil</h1>
        <br />
        <div style={{ width: '500px' }}>
          <label className="input input-bordered flex items-center gap-2">
            Nom
            <input type="text" className="grow" name="pseudo" value={formData.pseudo} onChange={handleInputChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input type="email" className="grow" name="email" value={formData.email} onChange={handleInputChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Mot de passe
            <input type="password" className="grow" name="password" value={formData.password} onChange={handleInputChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Role
            <input disabled type="text" className="grow" name="role" value={formData.role} onChange={handleInputChange} />
          </label>
        </div>
        <br />
        <button className="btn" onClick={handleUpdateProfile}>Mettre à jour le profil</button>
        <br />
      </section>
    </main>
  );
}
