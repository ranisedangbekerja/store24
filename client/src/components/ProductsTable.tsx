// ProductsTable.tsx

"use client";
import * as React from "react";
import { ActionButton } from "./ActionButton";
import { TableHeader, TableRow, FiltersButton } from "./TableComponents";
import { ProductInputForm } from "./ProductInputForm";

// Define props type for ProductsTable to accept searchQuery
type ProductsTableProps = {
  searchQuery: string;
};

export const ProductsTable: React.FC<ProductsTableProps> = ({ searchQuery }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [products, setProducts] = React.useState<{ name: string; quantity: string; date: string }[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productsPerPage] = React.useState(10); // Max 10 products per page

  const totalQuantity = products.reduce(
  (sum, product) => sum + Number(product.quantity),
  0
);


  const handleAddClick = () => setShowForm(true);

  const handleAddProduct = (newProduct: { name: string; quantity: string; date: string }) => {
    setProducts((prev) => [newProduct, ...prev]); // Add the new product at the top
    setShowForm(false);
    setCurrentPage(1); // Reset to the first page after adding
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Filter products based on search query
  const currentProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (currentPage * productsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="p-5 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-zinc-700">Products</h2>
        <div className="flex gap-3">
          <ActionButton variant="primary" onClick={handleAddClick}>
            Add Product
          </ActionButton>
          <FiltersButton />
          <ActionButton>Download all</ActionButton>
        </div>
      </div>

      {/* Modal overlay */}
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
              <TableRow key={index} {...product} />
            ))
          ) : (
            <div className="text-center py-4">No products found</div>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-white rounded border border-gray-300 shadow-sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
          </div>
          <button
            className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-white rounded border border-gray-300 shadow-sm"
            onClick={handleNextPage}
            disabled={currentPage * productsPerPage >= products.length}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
