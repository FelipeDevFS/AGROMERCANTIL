import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductList from "./ProductList";
import { act } from "react"; // Alterado para importar de 'react'

describe("ProductList Component", () => {
  // Mock da fetch API para simular a resposta da API
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, name: "Produto 1", price: 100.0 },
            { id: 2, name: "Produto 2", price: 200.0 },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("a tabela exibe corretamente os produtos", async () => {
    await act(async () => {
      render(<ProductList />);
    });
    await waitFor(() => {
      expect(screen.getByText("Produto 1")).toBeInTheDocument();
      expect(screen.getByText("Produto 2")).toBeInTheDocument();
      expect(screen.getAllByRole("row").length).toBe(3); // 2 produtos + header
    });
  });

  test("o botão de excluir remove o produto da lista", async () => {
    await act(async () => {
      render(<ProductList />);
    });
    await waitFor(() => {
      expect(screen.getByText("Produto 1")).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByText("Excluir")[0];
    fireEvent.click(deleteButton);
    fireEvent.click(screen.getByText("Confirmar"));

    await waitFor(() => {
      expect(screen.queryByText("Produto 1")).not.toBeInTheDocument();
    });
  });

  test("novo produto pode ser adicionado corretamente", async () => {
    await act(async () => {
      render(<ProductList />);
    });
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
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 3, name: "Produto 3", price: 150.00 }),
    });
    fireEvent.click(screen.getByText("Adicionar"));

    await waitFor(() => {
      expect(screen.getByText("Produto 3")).toBeInTheDocument();
    });
  });
});