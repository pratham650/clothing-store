import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Only admins can access this page
    if (!user?.isAdmin) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (userId) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/users/verify/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User verified successfully!");
      fetchUsers();
    } catch (err) {
      alert("Failed to verify user.");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(
        `${API_URL}/api/admin/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const handleToggleAdmin = async (userId) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/users/toggle-admin/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User admin status updated!");
      fetchUsers();
    } catch (err) {
      alert("Failed to update admin status.");
    }
  };

  if (loading) return <p className="text-center p-10">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 font-[Inter] bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">👥 User Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Verified</th>
              <th className="p-4">Admin</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 text-center">
                  {u.isVerified ? (
                    <span className="text-green-600 font-semibold">✓ Verified</span>
                  ) : (
                    <span className="text-yellow-600">⚠ Not Verified</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  {u.isAdmin ? (
                    <span className="text-blue-600 font-semibold">✓ Admin</span>
                  ) : (
                    <span className="text-gray-600">User</span>
                  )}
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 space-x-2">
                  {!u.isVerified && (
                    <button
                      onClick={() => handleVerify(u._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                    >
                      Verify
                    </button>
                  )}
                  <button
                    onClick={() => handleToggleAdmin(u._id)}
                    className={`px-3 py-1 rounded text-white text-sm ${
                      u.isAdmin ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {u.isAdmin ? "Remove Admin" : "Make Admin"}
                  </button>
                  {!u.isAdmin && (
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
