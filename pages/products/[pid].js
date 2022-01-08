import fs from "fs/promises";
import path from "path";
import { useState } from "react";

const Product = ({ bookSelected }) => {
  if (!bookSelected) {
    return <p>Loading....</p>;
  }
  return <h1>{bookSelected.title}</h1>;
};

async function getData() {
  const filePath = path.join(process.cwd(), "data", "books.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const bookSelected = data.books.find((book) => book.id === productId);
  if (!bookSelected) {
    return { notFound: true };
  }

  return {
    props: {
      bookSelected: bookSelected,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.books.map(({ id }) => id);
  const params = ids.map((id) => ({
    params: { pid: id },
  }));
  return {
    paths: params,
    fallback: true,
  };
}

export default Product;
