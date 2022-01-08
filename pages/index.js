import styles from "../styles/Home.module.css";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export default function Home({ books }) {
  return (
    <div className={styles.container}>
      <ul>
        {books.map((prod) => {
          return <li key={prod.id}><Link href={`products/${prod.id}`}>{prod.title}</Link></li>;
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const pathFile = path.join(process.cwd(), "data", "books.json");
  const jsonData = await fs.readFile(pathFile);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.books.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      books: data.books,
    },
    revalidate: 10, //in production their number no matter
    //notFound: false
    //redirect: page different of the home
  };
}
