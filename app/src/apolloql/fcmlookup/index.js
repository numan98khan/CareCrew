import { gql, useQuery } from "@apollo/client";
import { getFCMLookup } from "../../graphql/queries";

// GET_FCMLookup query hook
export const useGetFCMLookup = (id) => {
  const { data, loading, error } = useQuery(gql(getFCMLookup), {
    variables: { id },
  });

  if (loading) {
    // console.log("Loading...");
    return { loading, error, token: null };
  }

  if (error) {
    console.error("Error FCMLookup!", error);
    return { loading, error, token: null };
  }

  const fcmlookup = data ? data.getFCMLookup : null;

  return { fcmlookup, loading, error };
};
