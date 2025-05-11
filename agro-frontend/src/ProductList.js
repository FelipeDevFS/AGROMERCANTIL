import { useState, useEffect } from "react"
import { FaPlus, FaTrash, FaLeaf } from "react-icons/fa"
import "./components/modal.css"

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: "", price: "" })
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/")
        const data = await response.json()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (modalVisible) setNewProduct({ name: "", price: "" })
  }, [modalVisible])

  const openModal = () => {
    setModalVisible(true)
    document.body.classList.add("modal-open")
  }

  const closeModal = () => {
    setModalVisible(false)
    document.body.classList.remove("modal-open")
  }

  const openDeleteModal = (id) => {
    setConfirmDeleteId(id)
    setDeleteModalVisible(true)
    document.body.classList.add("modal-open")
  }

  const closeDeleteModal = () => {
    setConfirmDeleteId(null)
    setDeleteModalVisible(false)
    document.body.classList.remove("modal-open")
  }

  const confirmDelete = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/products/${confirmDeleteId}/`, {
        method: "DELETE",
      })
      setProducts(products.filter((product) => product.id !== confirmDeleteId))
      closeDeleteModal()
    } catch (error) {
      console.error("Erro ao excluir produto:", error)
    }
  }

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price) {
      const price = Number.parseFloat(newProduct.price.replace(",", "."))
      if (isNaN(price)) return

      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newProduct.name,
            price: price,
          }),
        })
        const newProductData = await response.json()
        setProducts([...products, newProductData])
        setNewProduct({ name: "", price: "" })
        setModalVisible(false)
        document.body.classList.remove("modal-open")
      } catch (error) {
        console.error("Erro ao adicionar produto:", error)
      }
    }
  }

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

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
                    const value = e.target.value
                    if (/^[0-9]*[.,]?[0-9]*$/.test(value) || value === "") {
                      setNewProduct({ ...newProduct, price: value })
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
    </div>
  )
}

export default ProductList