import { gql, useQuery, useMutation } from "@apollo/client";

import { listReasons } from "../../graphql/queries";
import {
  createReason,
  deleteReason,
  updateReason,
} from "../../graphql/mutations";

// useDeleteNews mutation hook
export const useDeleteReasons = () => {
  const [deleteNewsMutationFunction, { data, loading, error }] = useMutation(
    gql(deleteReason)
  );

  const deleteReasonsQuery = async (input) => {
    try {
      const { data } = await deleteNewsMutationFunction({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { deleteReasonsQuery, data, loading, error };
};

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
export const useListReasons = (area, isAdmin) => {
  let filterObject = {};
  filterObject.filter = {};

  filterObject.filter._deleted = { ne: true };
  if (!isAdmin) {
    filterObject.filter.status = { ne: "UNACTIVE" };
    // filterObject.filter.clockOutTime = { eq: null };
  }
  if (area) {
    filterObject.filter.area = { eq: area };
  }

  const { data, loading, error, refetch } = useQuery(gql(listReasons), {
    variables: filterObject,
    // pollInterval: 5000,
  });

  if (loading) {
    console.log("Loading Reasons...");
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

  return { reasons, loading, error, refetch };
};
