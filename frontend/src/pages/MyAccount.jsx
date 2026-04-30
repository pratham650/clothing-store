import { useEffect, useState } from "react";
import axios from "axios";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (err) {
        alert("Failed to load account info");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">My Account</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p className="mt-2"><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default MyAccount;
