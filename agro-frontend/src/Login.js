import React, { useState } from 'react';
import api from './api';
import './login.css';
import { FaLeaf, FaUser, FaLock } from "react-icons/fa";
import "./components/modal.css";
import Modal from './components/modal';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('login/', credentials);
      const data = response.data;
      if (data.access) {
        onLogin(data.access);
      } else {
        // Erro de validação (ex.: credenciais incorretas, status 400)
        setModalMessage('Credenciais não válidas');
        setIsModalOpen(true);
      }
    } catch (error) {
      // Verifica se é um erro de conexão (rede) ou erro do servidor
      if (error.response) {
        // Erro do servidor (ex.: 400, 401, 403, etc.)
        setModalMessage('Credenciais não válidas');
      } else if (error.request) {
        // Erro de conexão (servidor offline ou sem resposta)
        setModalMessage('Erro ao conectar ao servidor');
      } else {
        // Erro inesperado
        setModalMessage('Erro desconhecido. Tente novamente.');
      }
      setIsModalOpen(true);
      console.error('Erro ao fazer login:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <div className="login-page">
      <header className="product-header">
        <div className="header-content">
          <div className="header-logo">
            <FaLeaf className="leaf-icon" />
            <h1>AgroGestão</h1>
          </div>
          <p className="header-subtitle">Sistema de Gestão de Produtos Agrícolas</p>
        </div>
      </header>

      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Usuário"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Senha"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <button onClick={handleLogin}>Entrar</button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </div>
  );
};

export default Login;