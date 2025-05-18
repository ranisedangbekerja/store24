"use client";
import React from "react";
import axios from "axios";

type Product = {
  name: string;
  quantity: number;
  date: string;
};

export const InventoryStats: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/api/item");

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
          setError(null);
        } else {
          setProducts([]);
          setError("Invalid data format received from server");
        }
      } catch (err) {
        setProducts([]);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalProducts = React.useMemo(() => {
    return products.length;
  }, [products]);

  const totalQuantity = React.useMemo(() => {
    return products.reduce((sum, p) => sum + p.quantity, 0);
  }, [products]);

  if (isLoading) {
    return <div className="p-5 text-center">Loading inventory...</div>;
  }

  if (error) {
    return (
      <div className="p-5 text-center text-red-500">
        {error}
        <button
          onClick={() => {
            setError(null);
            setIsLoading(true);
            setProducts([]);
            // retry fetch
            (async () => {
              try {
                const res = await axios.get("http://localhost:8080/api/item");
                const data = res.data;
                if (data && Array.isArray(data.data)) {
                  const formatted = data.data.map((item: any) => ({
                    name: String(item.name),
                    quantity: Number(item.quantity),
                    date: String(item.date),
                  }));
                  setProducts(formatted);
                } else {
                  setProducts([]);
                  setError("Invalid data format received from server");
                }
              } catch {
                setError("Failed to load products");
                setProducts([]);
              } finally {
                setIsLoading(false);
              }
            })();
          }}
          className="ml-4 underline text-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="p-5 bg-white rounded-lg shadow">
      <h2 className="mb-5 text-xl font-semibold text-zinc-700">Overall Inventory</h2>
      <div className="flex gap-6 items-center">
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold text-gray-800">{totalProducts}</p>
          <p className="text-sm text-gray-500">Total Products</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold text-gray-800">{totalQuantity}</p>
          <p className="text-sm text-gray-500">Total Quantity</p>
        </div>
      </div>
    </section>
  );
};
