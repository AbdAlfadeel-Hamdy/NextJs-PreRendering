import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  if (!data)
    return {
      redirect: {
        destination: "", // Any directory you want to go
      },
    };
  if (data.products.length === 0) return { notFound: true }; // This will show 404 page
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
export default HomePage;
