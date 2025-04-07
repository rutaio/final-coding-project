import { ProductList } from '../../components/ProductList/ProductList';

export const HomePage = () => {
  return (
    <section className="home">
      <div className="featured-products">
        <ProductList/>
      </div>
    </section>
  );
};
