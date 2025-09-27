import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import apiClient from '../api';
import { useNavigate } from 'react-router-dom'; 

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const loginAction = useAuthStore((state) => state.login);
  const logoutAction = useAuthStore((state) => state.logout);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const response = await apiClient.get('/users/me');
          loginAction(response.data, token);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          logoutAction();
        }
      }
    };

    fetchUser();
  }, [token, user, loginAction, logoutAction]);

  const handleLogout = () => {
    logoutAction();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to your Dashboard
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          You are logged in as{' '}
          <span className="font-semibold text-indigo-600">{user.name || user.email}</span>.
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 mt-8 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;