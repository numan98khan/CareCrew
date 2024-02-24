import { gql, useQuery, useMutation } from "@apollo/client";

import { listRequests } from "../../graphql/queries";
import { createReason, updateReason } from "../../graphql/mutations";

// createReason mutation hook
export const useCreateReason = () => {
  const [createReasonMutation, { data, loading, error }] = useMutation(
    gql(createReason)
  );

  const createReasonQuery = async (input) => {
    try {
      const { data } = await createReasonMutation({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { createReasonQuery, data, loading, error };
};

// updateReason mutation hook
export const useUpdateReason = () => {
  const [updateReasonMutation, { data, loading, error }] = useMutation(
    gql(updateReason)
  );

  const updateReasonQuery = async (input) => {
    try {
      const { data } = await updateReasonMutation({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { updateReasonQuery, data, loading, error };
};

// LIST_REASONS query hook
export const useListReasons = () => {
  const { data, loading, error } = useQuery(gql(listReasons));

  if (loading) {
    console.log("Loading...");
    return { loading, error, reasons: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, reasons: [] };
  }

  // console.log("listReasons Data received!", data);

  const reasons = data
    ? data.listReasons.items.filter((element) => element._deleted !== true)
    : [];

  return { reasons, loading, error };
};
