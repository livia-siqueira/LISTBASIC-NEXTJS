import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = ({sales}) => {
  const [salesData, setData] = useState([sales]);
  //const [Loading, setLoading] = useState(false);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    "https://course-next-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setData(transformedSales);
    }
  }, [data]);

  /*useEffect(() => {
    setLoading(true);
    fetch("https://course-next-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume});
        }
        setData(transformedSales);
        setLoading(false);
      });
  }, []);
*/
  if (!data && !salesData) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>Failed to load</p>;
  }

  return (
    <ul>
      {salesData.map((item) => {
        return <li key={item.id}>{item.username}</li>;
      })}
    </ul>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://course-next-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: {
      sales: transformedSales,
      //revalide: 10, not working in production
    },
  };
}

export default LastSales;
