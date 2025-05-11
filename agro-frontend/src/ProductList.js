import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaLeaf, FaSignOutAlt } from "react-icons/fa"; // Adiciona FaSignOutAlt
import api from './api';
import "./components/modal.css";
import Modal from './components/modal'; // Corrige o caminho do import (assumindo que está em src/components/Modal.js)

function ProductList({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('products/');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setErrorMessage('Erro ao buscar produtos. Tente novamente mais tarde.');
        setErrorModalVisible(true);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (modalVisible) setNewProduct({ name: "", price: "" });
  }, [modalVisible]);

  const openModal = () => {
    setModalVisible(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setModalVisible(false);
    document.body.classList.remove("modal-open");
  };

  const openDeleteModal = (id) => {
    setConfirmDeleteId(id);
    setDeleteModalVisible(true);
    document.body.classList.add("modal-open");
  };

  const closeDeleteModal = () => {
    setConfirmDeleteId(null);
    setDeleteModalVisible(false);
    document.body.classList.remove("modal-open");
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`products/${confirmDeleteId}/`);
      setProducts(products.filter((product) => product.id !== confirmDeleteId));
      closeDeleteModal();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      setErrorMessage('Erro ao excluir o produto. Tente novamente.');
      setErrorModalVisible(true);
    }
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price) {
      const price = Number.parseFloat(newProduct.price.replace(",", "."));
      if (isNaN(price)) return;

      try {
        const response = await api.post('products/', {
          name: newProduct.name,
          price: price,
        });
        setProducts([...products, response.data]);
        setNewProduct({ name: "", price: "" });
        setModalVisible(false);
        document.body.classList.remove("modal-open");
      } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        setErrorMessage('Erro ao adicionar o produto. Verifique os dados e tente novamente.');
        setErrorModalVisible(true);
      }
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
    setErrorMessage('');
  };

  return (
    <div className="product-list-container">
      <header className="product-header">
        <div className="header-content">
          <div className="header-logo">
            <FaLeaf className="leaf-icon" />
            <h1>AgroGestão</h1>
          </div>
          <p className="header-subtitle">Sistema de Gestão de Produtos Agrícolas</p>
        </div>
      </header>

      <main className="product-main">
        <div className="product-card">
          <div className="card-header">
            <h2 className="card-title">
              <FaLeaf className="small-leaf-icon" /> Produtos Agrícolas
            </h2>
            <button className="add-button" onClick={openModal}>
              <FaPlus className="button-icon" /> Adicionar Produto
            </button>
          </div>
          <div className="card-content">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="table-container">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Preço</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="empty-message">
                          Nenhum produto encontrado
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td className="price-cell">{formatPrice(product.price)}</td>
                          <td className="actions-cell">
                            <button className="delete-button" onClick={() => openDeleteModal(product.id)}>
                              <FaTrash className="button-icon" />
                              <span>Excluir</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Adicionar Produto */}
      {modalVisible && (
        <div id="productModal" className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Adicionar Novo Produto</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Nome do Produto</label>
                <input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Ex: Fertilizante Orgânico"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Preço (R$)</label>
                <input
                  id="price"
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]*[.,]?[0-9]*$/.test(value) || value === "") {
                      setNewProduct({ ...newProduct, price: value });
                    }
                  }}
                  placeholder="Ex: 120.00"
                />
              </div>
              <button
                className="add-button full-width"
                onClick={handleAddProduct}
                disabled={!newProduct.name || !newProduct.price}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {deleteModalVisible && (
        <div id="deleteModal" className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Confirmar Exclusão</h3>
              <button className="modal-close" onClick={closeDeleteModal}>×</button>
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja excluir este produto?</p>
              <div className="modal-footer">
                <button className="cancel-button" onClick={closeDeleteModal}>Cancelar</button>
                <button className="delete-button" onClick={confirmDelete}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Erro */}
      <Modal
        isOpen={errorModalVisible}
        onClose={closeErrorModal}
        message={errorMessage}
      />

      {/* Botão de Logout no final da página */}
      <footer className="logout-footer">
        <button className="logout-button" onClick={onLogout}>
          <FaSignOutAlt className="logout-icon" /> Logout
        </button>
      </footer>
    </div>
  );
}

export default ProductList;