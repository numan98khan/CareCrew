import { gql, useQuery, useMutation } from "@apollo/client";

// Assuming you have these queries and mutations for reviews
import { createReviews } from "../../graphql/mutations";
import { listReviews } from "../../graphql/queries";

// createReview mutation hook
export const useCreateReview = () => {
  const [createReviewMutation, { data, loading, error }] = useMutation(
    gql(createReviews)
  ); // Assuming createReviews is the mutation for creating a review

  const createReview = async (reviewInput) => {
    try {
      const { data } = await createReviewMutation({
        variables: { input: reviewInput },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { createReview, data, loading, error };
};

// listReviews query hook
export const useListReviews = (peopleID) => {
  let filterObject = {};
  filterObject.filter = {};

  if (peopleID) {
    filterObject.filter.peopleID = { eq: peopleID };
  }

  const { data, loading, error } = useQuery(gql(listReviews), {
    variables: filterObject, // Pass the peopleID as a variable to the query
  });

  if (loading) {
    return { loading, error, reviews: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, reviews: [] };
  }

  const reviews = data
    ? data.listReviews.items.filter((element) => element._deleted !== true)
    : [];

  return { reviews, loading, error };
};

// // listReviews query hook
// export const useListReviews = () => {
//   const { data, loading, error } = useQuery(gql(listReviews)); // Assuming listReviews is the query for listing reviews

//   if (loading) {
//     return { loading, error, reviews: [] };
//   }

//   if (error) {
//     console.error("Error!", error);
//     return { loading, error, reviews: [] };
//   }

//   const reviews = data
//     ? data.listReviews.items.filter((element) => element._deleted !== true)
//     : [];

//   return { reviews, loading, error };
// };
