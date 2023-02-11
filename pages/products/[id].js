import fs from "fs/promises";
import path from "path";

import { Fragment } from "react";

const ProductDetailPage = (props) => {
  const { product } = props;
  if (!product) return <p>Loading...</p>;
  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.id;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);
  if (!product) return { notFound: true };
  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { id } }));
  return {
    // paths: [
    //   { params: { id: "p1" } },
    //   { params: { id: "p2" } },
    //   // { params: { id: "p3" } },
    // ],
    // fallback: true,
    // fallback: "blocking", // This will make the page wait until it pre-rendered
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetailPage;
