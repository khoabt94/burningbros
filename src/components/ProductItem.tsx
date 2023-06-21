import { ProductItemObject } from "../pages/ProductListPage";
import { Card } from "../styles";

type ProductItemProps = {
  product: ProductItemObject;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const { images, price, rating, title } = product;

  return (
    <Card>
      <img src={images} alt={title} />
      <h4>{title}</h4>
      <div className="">
        <span>{price}</span>
        <span>{rating}</span>
      </div>
    </Card>
  );
};

export default ProductItem;
