import React from "react";
import { GetStaticProps } from "next";
import { Grid, Stack, Text } from "@chakra-ui/react";

import { Product } from "../product/types";
import api from "../product/api";

interface IndexProps {
  products: Product[];
}

const IndexRoute: React.FC<IndexProps> = ({ products }) => {
  return (
    <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
      {products.map((p, i) => (
        <Stack key={`${p.id}-${i}`} backgroundColor="gray.200">
          <Text>{p.title}</Text>
        </Stack>
      ))}
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products,
    },
    revalidate: 1,
  };
};

export default IndexRoute;
