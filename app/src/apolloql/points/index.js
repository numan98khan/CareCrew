import { gql, useQuery, useMutation } from "@apollo/client";

import { listPoints } from "../../graphql/queries";

import { createPoints, updatePoints } from "../../graphql/mutations";

// createNews mutation hook
export const useCreatePoints = () => {
  const [createPointsMutation, { data, loading, error }] = useMutation(
    gql(createPoints)
  );

  const createPointsQuery = async (input) => {
    try {
      const { data } = await createPointsMutation({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { createPointsQuery, data, loading, error };
};

export const useUpdatePoints = () => {
  const [updatePointsMutation, { data, loading, error }] = useMutation(
    gql(updatePoints)
  );

  const updatePointsQuery = async (input) => {
    try {
      const { data } = await updatePointsMutation({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { updatePointsQuery, data, loading, error };
};

// LIST_NEWS query hook
export const useListPoints = () => {
  const { data, loading, error } = useQuery(gql(listPoints));

  if (loading) {
    console.log("Loading Points...");
    return { loading, error, points: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, points: [] };
  }

  // console.log("listPoints Data received!", data);

  const points = data
    ? data.listPoints.items.filter((element) => element._deleted !== true)
    : [];

  return { points, loading, error };
};
