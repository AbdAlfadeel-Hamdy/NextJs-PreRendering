import fs from "fs/promises";
import path from "path";

import { Fragment } from "react";

const ProductDetail = (props) => {
  const { product } = props;
  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.id;
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const product = data.products.find((product) => product.id === productId);
  return {
    props: {
      pdoduct: product,
    },
  };
}

export default ProductDetail;
