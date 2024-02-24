import { gql, useQuery, useMutation } from "@apollo/client";
import { createBilling, updateBilling } from "../../graphql/mutations";
import { getBilling } from "../../graphql/queries";

import { ErrorToast, SuccessToast } from "../../services/micro";

export const useCreateBilling = () => {
  const [createBillingMutation, { data, loading, error }] = useMutation(
    gql(createBilling)
  );

  const createBillingQuery = async (billingDetails) => {
    try {
      const { data } = await createBillingMutation({
        variables: {
          input: billingDetails,
        },
      });
      return data.createBilling;
    } catch (err) {
      console.error("Error creating billing: ", err);
      throw err;
    }
  };

  return { createBillingQuery, data, loading, error };
};

export const useGetBillingByID = (billingID) => {
  const skipQuery = !billingID;

  const { data, loading, error } = useQuery(gql(getBilling), {
    variables: { id: billingID },
    skip: skipQuery,
  });

  if (loading) {
    console.log("Loading Billing...");
    return { loading, error, billing: null };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, billing: null };
  }

  const billing = data ? data.getBilling : null;

  return { billing, loading, error };
};

// export const useUpdateBilling = () => {
//   const [updateBillingMutation] = useMutation(gql(updateBilling));

//   return { updateBillingMutation };
// };

export const useUpdateBilling = () => {
  const [updateBillingMutation, { data, loading, error }] = useMutation(
    gql(updateBilling)
  );

  const updateBillingQuery = async (input) => {
    try {
      // Ensure that the _version attribute is included in the variables
      const { data } = await updateBillingMutation({
        variables: { input: input },
      });

      // Display success toast
      SuccessToast("Billing updated successfully");
      return data;
    } catch (error) {
      // Display error toast
      ErrorToast("An error occurred while updating billing.");
      throw error;
    }
  };

  return { updateBillingQuery, data, loading, error };
};
