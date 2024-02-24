import { gql, useQuery, useMutation } from "@apollo/client";
import { createTemplates, updateTemplates } from "../mutations";

import { LIST_TEMPLATES } from "../queries";
import { deleteTemplates } from "../../graphql/mutations";
import { listTemplates } from "../../graphql/queries";

// useDeleteNews mutation hook
export const useDeleteTemplates = () => {
  const [deleteNewsMutationFunction, { data, loading, error }] = useMutation(
    gql(deleteTemplates)
  );

  const deleteTemplateQuery = async (input) => {
    try {
      const { data } = await deleteNewsMutationFunction({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { deleteTemplateQuery, data, loading, error };
};

export const useListTemplates = (isAdmin) => {
  let filterObject = {};
  filterObject.filter = {};
  filterObject.filter._deleted = { ne: true };

  if (!isAdmin) {
    filterObject.filter.status = { ne: "UNACTIVE" };
  }
  const { data, loading, error, refetch } = useQuery(gql(listTemplates), {
    variables: filterObject,
    // pollInterval: 5000,
  });

  // console.log("LIST_TEMPLATES", data);
  if (loading) {
    console.log("Loading...");
    return { loading, error, templates: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, templates: [] };
  }

  // console.log("LIST_TEMPLATES Data received!", data);

  const templates = data
    ? data.listTemplates.items.filter((element) => element._deleted !== true)
    : [];

  return { templates, loading, error, refetch };
};

export const useCreateTemplate = () => {
  const [createTemplateMutation, { data, loading, error }] =
    useMutation(createTemplates);

  const createTemplate = async (templateInput) => {
    try {
      const { data } = await createTemplateMutation({
        variables: { input: templateInput },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { createTemplate, data, loading, error };
};

export const useUpdateTemplate = () => {
  const [updateTemplateMutation, { data, loading, error }] =
    useMutation(updateTemplates);

  const updateTemplate = async (templateInput) => {
    try {
      const { data } = await updateTemplateMutation({
        variables: { input: templateInput },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { updateTemplate, data, loading, error };
};
