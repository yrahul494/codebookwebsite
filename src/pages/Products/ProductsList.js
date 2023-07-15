import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductCard } from "../../components";
import { FilterBar } from "./components/FilterBar";
import { useTitle } from "../../hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import {initialProductList} from "../../store/filterSlice";
import { getProductList } from "../../services/productService";
import { toast } from "react-toastify";

export const ProductsList = () => {
  const allProducts = useSelector((state) => state.filterState.products);
  const sortBy = useSelector((state) => state.filterState.sortBy);
  const showBestSellerOnly = useSelector(
    (state) => state.filterState.bestSellerOnly
  );
  const showInStockOnly = useSelector((state) => state.filterState.onlyInStock);
  const ratingFilter = useSelector((state) => state.filterState.ratings);

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  // Apply sorting
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortBy === "lowToHigh") {
      return Number(a.price) - Number(b.price);
    } else if (sortBy === "highToLow") {
      return Number(b.price) - Number(a.price);
    }
    return null;
  });

  const products = [...sortedProducts].filter((product) => {
    if (showBestSellerOnly && !product.best_seller) {
      return false;
    }
    if (showInStockOnly && !product.in_stock) {
      return false;
    }
    if (ratingFilter === "4STARSABOVE") {
      return product.rating >= 4;
    }
    if (ratingFilter === "3STARSABOVE") {
      return product.rating >= 3;
    }
    if (ratingFilter === "2STARSABOVE") {
      return product.rating >= 2;
    }
    if (ratingFilter === "1STARSABOVE") {
      return product.rating >= 1;
    }

    return true;
  });

  const search = useLocation().search;
  const searchTerm = new URLSearchParams(search).get("q");
  useTitle("Explore eBooks Collection");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data =await getProductList(searchTerm);
        dispatch(initialProductList(data));
      } catch (error) {
        toast.error(error.message, {closeButton: true, position: "bottom-center" });
      }
     
    }
    fetchProducts();
  }, [searchTerm, dispatch]);

  return (
    <main>
      <section className="my-5">
        <div className="my-5 flex justify-between">
          <span className="text-2xl font-semibold dark:text-slate-100 mb-5">
            All eBooks ({products.length})
          </span>
          <span>
            <button
              onClick={() => setShow(!show)}
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
            </button>
          </span>
        </div>

        <div className="flex flex-wrap justify-center lg:flex-row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      {show && <FilterBar setShow={setShow} />}
    </main>
  );
};
