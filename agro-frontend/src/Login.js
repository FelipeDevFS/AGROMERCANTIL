import React, { useState } from 'react';
import api from './api'; // Importa o axios configurado

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    try {
      const response = await api.post('login/', credentials);
      const data = response.data;
      if (data.access) {
        onLogin(data.access);
      } else {
        alert('Login falhou: ' + (data.error || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Senha"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default Login;