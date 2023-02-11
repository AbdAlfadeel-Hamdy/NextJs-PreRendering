import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [sales, setSales] = useState(props.sales);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    `https://nextjs-prerendering-b21a1-default-rtdb.firebaseio.com/sales.json`,
    fetcher
  );

  useEffect(() => {
    const transformedSales = [];
    for (const key in data)
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    setSales(transformedSales);
  }, [data]);
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     `https://nextjs-prerendering-b21a1-default-rtdb.firebaseio.com/sales.json`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];
  //       for (const key in data)
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) return <p>Failed to fetch data!</p>;

  // if (isLoading) return <p>Loading...</p>;
  if (!data && !sales) return <p>Loading...</p>;
  // if (!sales) return <p>No data yet!</p>;

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};
export default LastSalesPage;

export async function getStaticProps() {
  const response = await fetch(
    `https://nextjs-prerendering-b21a1-default-rtdb.firebaseio.com/sales.json`
  );
  const data = await response.json();
  const transformedSales = [];
  for (const key in data)
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}
