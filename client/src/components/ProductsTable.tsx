"use client";
import * as React from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

import { ActionButton } from "./ActionButton";
import { TableHeader, TableRow, FiltersButton } from "./TableComponents";
import { ProductInputForm } from "./ProductInputForm";

type Product = {
  name: string;
  quantity: number;
  date: string;
};

type ProductsTableProps = {
  searchQuery: string;
};

export const ProductsTable: React.FC<ProductsTableProps> = ({ searchQuery }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const totalQuantity = React.useMemo(() => {
    if (!Array.isArray(products)) return 0;
    return products.reduce((sum, product) => sum + product.quantity, 0);
  }, [products]);

  const handleAddClick = () => setShowForm(true);

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const formattedProduct: Product = {
        ...newProduct,
        quantity: Number(newProduct.quantity),
      };

      await axios.post("http://localhost:8080/api/task/add", formattedProduct);
      setShowForm(false);
    } catch (err) {
      setError("Failed to add product");
      console.error("Error adding product:", err);
    }
  };

React.useEffect(() => {
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8080/api/task");

      console.log("Response data:", response.data);

      const responseData = response.data;

      if (
        responseData &&
        typeof responseData === "object" &&
        Array.isArray(responseData.data)
      ) {
        const formatted = responseData.data.map((item: any) => ({
          name: String(item.name),
          quantity: Number(item.quantity),
          date: String(item.date),
        }));
        setProducts(formatted);
      } else {
        console.error("Invalid data format:", response.data);
        setProducts([]);
        setError("Invalid data format received from server");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  fetchProducts();
}, []);

  React.useEffect(() => {
    const socket: Socket = io("http://localhost:8080");

    socket.on("new-product", (product: unknown) => {
      try {
        if (
          typeof product === "object" &&
          product !== null &&
          "name" in product &&
          "quantity" in product &&
          "date" in product
        ) {
          const validatedProduct: Product = {
            name: String((product as any).name),
            quantity: Number((product as any).quantity),
            date: String((product as any).date),
          };

          setProducts((prev) => [validatedProduct, ...(Array.isArray(prev) ? prev : [])]);
        } else {
          throw new Error("Invalid product structure");
        }
      } catch (err) {
        console.error("Invalid product received:", product, err);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err);
      setError("Realtime updates disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const { filteredProducts, currentProducts, totalPages } = React.useMemo(() => {
    const filtered = Array.isArray(products)
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const current = filtered.slice(indexOfFirstProduct, indexOfLastProduct);
    const total = Math.ceil(filtered.length / productsPerPage);

    return { filteredProducts: filtered, currentProducts: current, totalPages: total };
  }, [products, searchQuery, currentPage, productsPerPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return <div className="p-5 text-center">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="p-5 text-center text-red-500">
        {error}
        <button
          className="ml-2 text-blue-500 underline"
          onClick={async () => {
            setError(null);
            setIsLoading(true);
            setCurrentPage(1);
            try {
              const res = await axios.get("http://localhost:8080/api/task");
              const responseData = res?.data?.data;
              if (
                responseData &&
                typeof responseData === "object" &&
                "name" in responseData &&
                "quantity" in responseData &&
                "date" in responseData
              ) {
                setProducts([
                  {
                    name: String(responseData.name),
                    quantity: Number(responseData.quantity),
                    date: String(responseData.date),
                  },
                ]);
              } else {
                setProducts([]);
              }
            } catch {
              setProducts([]);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="p-5 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-zinc-700">
          Products {totalQuantity > 0 && `(Total: ${totalQuantity})`}
        </h2>
        <div className="flex gap-3">
          <ActionButton variant="primary" onClick={handleAddClick}>
            Add Product
          </ActionButton>
          <FiltersButton />
          <ActionButton>Download all</ActionButton>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <ProductInputForm
            onClose={() => setShowForm(false)}
            onSubmit={handleAddProduct}
          />
        </div>
      )}

      <div className="w-full">
        <TableHeader />
        <div className="flex flex-col">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <TableRow
                key={`${product.name}-${product.date}-${index}`}
                {...product}
              />
            ))
          ) : (
            <div className="text-center py-4">
              {products.length === 0
                ? "No products available"
                : "No products match your search"}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <button
              className={`px-4 py-2.5 text-sm font-medium rounded border shadow-sm ${
                currentPage === 1
                  ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                  : "text-gray-600 bg-white border-gray-300 hover:bg-gray-50"
              }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <button
              className={`px-4 py-2.5 text-sm font-medium rounded border shadow-sm ${
                currentPage >= totalPages
                  ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                  : "text-gray-600 bg-white border-gray-300 hover:bg-gray-50"
              }`}
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
