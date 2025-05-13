import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductList from "./features/products/ProductList";
import productsReducer from "./features/products/productsSlice"; // Importa o reducer correto

// Criar uma store mockada para os testes
const createMockStore = (initialState = {}) =>
  configureStore({
    reducer: {
      products: productsReducer,
    },
    preloadedState: {
      products: {
        items: [],
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });

describe("ProductList Component", () => {
  test("deve exibir produtos carregados da store", async () => {
    const store = createMockStore();
    store.dispatch({
      type: "products/fetchProducts/fulfilled",
      payload: [
        { id: 1, name: "Produto 1", price: 100.0 },
        { id: 2, name: "Produto 2", price: 200.0 },
      ],
    });

    render(
      <Provider store={store}>
        <ProductList onLogout={() => {}} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Produto 1")).toBeInTheDocument();
      expect(screen.getByText("Produto 2")).toBeInTheDocument();
    });
  });

  test("deve remover o produto ao clicar no botão de excluir", async () => {
    const store = createMockStore();
    store.dispatch({
      type: "products/fetchProducts/fulfilled",
      payload: [
        { id: 1, name: "Produto 1", price: 100.0 },
        { id: 2, name: "Produto 2", price: 200.0 },
      ],
    });

    render(
      <Provider store={store}>
        <ProductList onLogout={() => {}} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Produto 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Excluir")[0]);
    fireEvent.click(screen.getByText("Confirmar"));

    store.dispatch({
      type: "products/deleteProduct/fulfilled",
      payload: 1,
    });

    await waitFor(() => {
      expect(screen.queryByText("Produto 1")).not.toBeInTheDocument();
    });
  });

  test("deve adicionar um novo produto corretamente", async () => {
    const store = createMockStore();
    store.dispatch({
      type: "products/fetchProducts/fulfilled",
      payload: [
        { id: 1, name: "Produto 1", price: 100.0 },
        { id: 2, name: "Produto 2", price: 200.0 },
      ],
    });

    render(
      <Provider store={store}>
        <ProductList onLogout={() => {}} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Produto 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Adicionar Produto"));
    fireEvent.change(screen.getByPlaceholderText("Ex: Fertilizante Orgânico"), {
      target: { value: "Produto 3" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ex: 120.00"), {
      target: { value: "150.00" },
    });

    store.dispatch({
      type: "products/addProduct/fulfilled",
      payload: { id: 3, name: "Produto 3", price: 150.0 },
    });

    fireEvent.click(screen.getByText("Adicionar"));

    await waitFor(() => {
      expect(screen.getByText("Produto 3")).toBeInTheDocument();
    });
  });
});
