import { useEffect, useRef, useState } from "react";
import ProductItem from "../components/ProductItem";
import SearchBox from "../components/SearchBox";
import { ResultsContainer } from "../styles";
import productApi from "../api/productApi";

export type ProductItemObject = {
  title: string;
  price: number;
  rating: number;
  images: string;
};

const LIMIT = 20;

const ProductListPage = () => {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<ProductItemObject[]>([]);
  const [page, setPage] = useState<number>(0);
  const lastElementRef = useRef<HTMLParagraphElement>(null);
  const [hasMore, setHasMore] = useState<Boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchProducts = async function () {
    setError("");
    setHasMore(true);
    try {
      const { products: data } = await productApi.getProducts(
        LIMIT,
        page,
        query
      );
      if (data.length < LIMIT) setHasMore(false);
      if (data.length === 0) throw new Error("No products match this query!");
      const newArray = data.map((item) => ({
        title: item.title,
        price: item.price,
        rating: item.rating,
        images: item.images[0],
      }));
      return newArray;
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onIntersection = (entries: any[]) => {
    const { isIntersecting } = entries[0];

    if (isIntersecting && hasMore) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchWithScroll = async () => {
      const newArray = await fetchProducts();
      if (!newArray) return;
      setProducts([...products, ...newArray]);
    };
    fetchWithScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const fetchWithQuery = async () => {
      const newArray = await fetchProducts();
      if (!newArray) return;
      setPage(1);
      setProducts(newArray);
    };
    fetchWithQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <SearchBox
        query={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />

      <ResultsContainer>
        {error ? (
          <p>{error}</p>
        ) : (
          products?.map((product: ProductItemObject, index: number) => {
            return <ProductItem product={product} key={index} />;
          })
        )}
        {hasMore && <p ref={lastElementRef}>Loading...</p>}
      </ResultsContainer>
    </>
  );
};

export default ProductListPage;
