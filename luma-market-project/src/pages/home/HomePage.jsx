import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { products } from "../../data/products";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <>
      <title>Luma Market | Discover Your Favorites</title>
      <link rel="icon" type="image/png" href="/images/home-favicon.png" />

      <Header cart={cart} />

      <main className="home-page">
        <section className="home-hero">
          <div className="home-hero-content">
            <span className="home-hero-badge">Discover something new</span>

            <h1>
              Good finds.
              <span> Better days.</span>
            </h1>

            <p>
              Explore everyday essentials, trending favorites, and products
              you'll love, all in one place.
            </p>

            <a href="#products" className="home-hero-button">
              Explore Products
            </a>
          </div>

          <div className="home-hero-decoration" aria-hidden="true">
            <div className="hero-circle hero-circle-one"></div>
            <div className="hero-circle hero-circle-two"></div>
            <div className="hero-circle hero-circle-three"></div>
          </div>
        </section>

        <section className="home-products" id="products">
          <div className="home-products-heading">
            <span>CURATED FOR YOU</span>
            <h2>Explore Our Collection</h2>
            <p>Find your next favorite thing.</p>
          </div>

          <ProductsGrid products={filteredProducts} loadCart={loadCart} />
        </section>
      </main>
    </>
  );
}
