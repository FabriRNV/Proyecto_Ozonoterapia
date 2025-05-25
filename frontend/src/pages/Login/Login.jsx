import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../utils/axios';
import Logo from '../../assets/img/LogoPrueba.png';
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      handleGoogleCallback(code);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        const loginFormData = new URLSearchParams();
        loginFormData.append('username', formData.email);
        loginFormData.append('password', formData.password);

        const response = await api.post('/api/auth/token', loginFormData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (response.status === 200) {
          localStorage.setItem('token', response.data.access_token);
          navigate('/Menu', { replace: true });
        }
      } else {
        const response = await api.post('/api/auth/register', {
          email: formData.email,
          username: formData.username,
          phone_number: formData.phoneNumber,
          password: formData.password
        });

        if (response.status === 200) {
          localStorage.setItem('token', response.data.access_token);
          navigate('/Menu', { replace: true });
        }
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const errorMessage = Array.isArray(error.response.data.detail) 
          ? error.response.data.detail.map(err => err.msg).join(', ')
          : error.response.data.detail;
        setError(errorMessage);
      } else if (error.response?.status === 401) {
        setError('Correo o contraseña inválidos');
      } else {
        setError(error.response?.data?.detail || 'Error al conectar con el servidor');
      }
    }
  };

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const scope = 'email profile';
    const responseType = 'code';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    
    window.location.href = googleAuthUrl;
  };

  const handleGoogleCallback = async (code) => {
    try {
      const response = await api.post('/api/auth/google/callback', { code });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/Menu', { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.detail || 'Error al autenticar con Google');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primario to-terciario ">
      <div className="bg-secundario p-8 rounded-lg shadow-lg w-full max-w-md text-white border-1 border-primario">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-60 h-55 object-contain bg-gradient-to-br bg-primario to-secundario border-1 border-black" />
        </div>
        <div className="flex justify-between mb-6">
          <button
            type="button"
            className={`flex-1 py-2 ${isLogin ? 'bg-terciario text-white border-1 border-primario' : 'bg-cuarto text-primario border-1 border-primario'} rounded-lg`}
            onClick={() => setIsLogin(true)}
          >
            Inicio Sesión
          </button>
          <button
            type="button"
            className={`flex-1 py-2 ${!isLogin ? 'bg-terciario text-white border-1 border-primario' : 'bg-cuarto text-primario border-1 border-primario'} rounded-lg`}
            onClick={() => setIsLogin(false)}
          >
            Registro
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-terciario text-primario bg-quinto"
                required={!isLogin}
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Número de teléfono"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-terciario text-primario bg-quinto"
                required={!isLogin}
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-terciario text-primario bg-quinto"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-terciario text-primario bg-quinto"
            required
          />
          <button
            type="submit"
            className="w-full bg-terciario text-white py-2 rounded-lg hover:bg-cuarto transition-colors border-1 border-primario"
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors border-1 border-primario"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Continuar con Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;