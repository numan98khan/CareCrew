import { gql, useQuery, useMutation } from "@apollo/client";

// Assuming you have these queries and mutations for reviews
import { listInvoices } from "../../graphql/queries";
import { createInvoice } from "../../graphql/mutations";

// createReason mutation hook
export const useCreateInvoice = () => {
  const [createInvoiceMutation, { data, loading, error }] = useMutation(
    gql(createInvoice)
  );

  const createInvoiceQuery = async (input) => {
    try {
      const { data } = await createInvoiceMutation({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { createInvoiceQuery, data, loading, error };
};

const convertToStartOfDayUTC = (dateString) => {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Set the time to the start of the day (midnight)
  date.setHours(0, 0, 0, 0);

  // Convert the local date-time to UTC and return
  return date.toISOString();
};

// listReviews query hook
export const useListInvoices = (
  receiverID,
  surrogateID,
  minAmount,
  maxAmount,
  minDate,
  maxDate
) => {
  let filterObject = {};
  filterObject.filter = {};

  filterObject.filter._deleted = { ne: true };

  if (receiverID) {
    filterObject.filter.receiverID = { eq: receiverID };
  }

  if (surrogateID) {
    filterObject.filter.surrogateID = { eq: parseInt(surrogateID) };
  }

  // Handle minAmount and maxAmount filters
  if (minAmount) {
    filterObject.filter.amount = filterObject.filter.amount || {}; // Initialize amount filter object if not already done
    filterObject.filter.amount.ge = minAmount; // Greater than or equal to minAmount
  }

  if (maxAmount) {
    filterObject.filter.amount = filterObject.filter.amount || {}; // Initialize amount filter object if not already done
    filterObject.filter.amount.le = maxAmount; // Less than or equal to maxAmount
  }

  // Handle minDate and maxDate filters
  if (minDate) {
    const minDateUTC = convertToStartOfDayUTC(minDate);
    filterObject.filter.dueDate = filterObject.filter.dueDate || {}; // Initialize dueDate filter object if not already done
    filterObject.filter.dueDate.ge = minDateUTC; // Greater than or equal to minDateUTC
  }
  if (maxDate) {
    const maxDateUTC = convertToStartOfDayUTC(maxDate);
    filterObject.filter.dueDate = filterObject.filter.dueDate || {}; // Initialize dueDate filter object if not already done
    filterObject.filter.dueDate.le = maxDateUTC; // Less than or equal to maxDate
  }

  // if (maxDate) {
  //   filterObject.filter.dueDate = filterObject.filter.dueDate || {}; // Initialize dueDate filter object if not already done
  //   filterObject.filter.dueDate.le = maxDate; // Less than or equal to maxDate
  // }

  const { data, loading, error } = useQuery(gql(listInvoices), {
    variables: {
      filter: filterObject.filter,
      sortDirection: "DESC",
      sort: "surrogateID",
    }, // Pass the peopleID as a variable to the query

    pollInterval: 5000,
  });

  if (loading) {
    console.log("Loading Invoices...");
    return { loading, error, reviews: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, reviews: [] };
  }

  const invoices = data ? data.listInvoices.items : [];

  return { invoices, loading, error };
};
