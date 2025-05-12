import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaTrash, FaLeaf, FaSignOutAlt } from "react-icons/fa";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
} from "./productsSlice"; // Ações e reducers do slice de produtos
import Modal from "../../components/modal";
import "../../../src/index.css";
import { FixedSizeList as List } from "react-window"; // Importando o react-window para renderizar grandes listas de forma otimizada

function ProductList({ onLogout }) {
  const dispatch = useDispatch(); // Hook para acessar o dispatch do Redux
  const { items: products, loading, error } = useSelector((state) => state.products); 
  // useSelector para acessar o estado dos produtos da store do Redux
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Carrega os produtos ao inicializar o componente
  useEffect(() => {
    dispatch(fetchProducts()) // Chama a ação do Redux para buscar os produtos
      .unwrap() // Permite que possamos tratar erros com try/catch
      .catch(() => {
        setErrorMessage('Erro ao buscar produtos. Tente novamente mais tarde.');
        setErrorModalVisible(true);
      });
  }, [dispatch]);

  // Reseta os campos do formulário quando o modal de adicionar produto for fechado
  useEffect(() => {
    if (modalVisible) setNewProduct({ name: "", price: "" });
  }, [modalVisible]);

  // Funções de abrir e fechar os modais
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

  const confirmDelete = () => {
    // Chama a ação Redux para excluir o produto
    dispatch(deleteProduct(confirmDeleteId))
      .unwrap()
      .then(closeDeleteModal)
      .catch(() => {
        setErrorMessage('Erro ao excluir o produto. Tente novamente.');
        setErrorModalVisible(true);
      });
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const price = parseFloat(newProduct.price.replace(",", "."));
      if (isNaN(price)) return; // Validação de preço para garantir que é um número

      // Chama a ação Redux para adicionar o produto
      dispatch(addProduct({ name: newProduct.name, price }))
        .unwrap()
        .then(() => {
          setNewProduct({ name: "", price: "" });
          setModalVisible(false);
          document.body.classList.remove("modal-open");
        })
        .catch(() => {
          setErrorMessage('Erro ao adicionar o produto. Verifique os dados.');
          setErrorModalVisible(true);
        });
    }
  };

  // Formata o preço para o padrão monetário BR
  const formatPrice = (price) =>
    price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

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
                      <tr>
                        <td colSpan={4} style={{ padding: 0, border: "none" }}>
                          {/* Usando o react-window para renderizar a lista de produtos */}
                          <List
                            height={400} // Define a altura visível da lista de produtos
                            itemCount={products.length} // Total de itens na lista
                            itemSize={50} // Altura de cada item na lista
                            width="100%" // Largura da lista
                          >
                            {({ index, style }) => {
                              const product = products[index];
                              return (
                                <div style={style} key={product.id}>
                                  <table style={{ width: "100%"}}>
                                    <tbody>
                                      <tr>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td className="price-cell">{formatPrice(product.price)}</td>
                                        <td className="actions-cell">
                                          <button
                                            className="delete-button"
                                            onClick={() => openDeleteModal(product.id)}
                                          >
                                            <FaTrash className="button-icon" /> <span>Excluir</span>
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              );
                            }}
                          </List>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modais */}
      {modalVisible && (
        <div className="modal-overlay">
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

      {deleteModalVisible && (
        <div className="modal-overlay">
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

      <Modal isOpen={errorModalVisible} onClose={closeErrorModal} message={errorMessage} />

      <footer className="logout-footer">
        <button className="logout-button" onClick={onLogout}>
          <FaSignOutAlt className="logout-icon" /> Logout
        </button>
      </footer>
    </div>
  );
}

export default ProductList;
