import { gql, useQuery, useMutation } from "@apollo/client";

import { LIST_NEWS } from "../queries";

import moment from "moment";

import {
  createNews as createNewsQuery,
  updateNews as updateNewsQuery,
  deleteNews as deleteNewsQuery,
} from "../../graphql/mutations";
import { convertDateToAWSDate, displayDate } from "../../services/micro";
import { useCreateNotification } from "../notifications";
import { NEWS_ALERT } from "../../constants/notificationTypes";
import { listNews } from "../../graphql/queries";
import { userTimezone } from "../timezone";

// export const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// useDeleteNews mutation hook
export const useDeleteNews = () => {
  const [deleteNewsMutationFunction, { data, loading, error }] = useMutation(
    gql(deleteNewsQuery)
  );

  const deleteNews = async (input) => {
    try {
      const { data } = await deleteNewsMutationFunction({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { deleteNews, data, loading, error };
};

// createNews mutation hook
export const useCreateNews = () => {
  const [createNewsMutation, { data, loading, error }] = useMutation(
    gql(createNewsQuery)
  );

  const { createNotificationQuery } = useCreateNotification();

  const createNews = async (newsInput) => {
    try {
      const { data } = await createNewsMutation({
        variables: { input: newsInput },
      });

      const notificationInput = {
        peopleID: "-1",
        type: NEWS_ALERT,
        subject: `${newsInput?.headline}`,
        body: `${newsInput?.alt}`,
        receivers: newsInput?.receivers === "ALL" ? null : newsInput?.receivers,
      };
      const receiverPeople = [];
      await createNotificationQuery(notificationInput, receiverPeople);

      return data;
    } catch (error) {
      throw error;
    }
  };

  return { createNews, data, loading, error };
};

// updateNews mutation hook
export const useUpdateNews = () => {
  const [updateNewsMutation, { data, loading, error }] = useMutation(
    gql(updateNewsQuery)
  );

  const updateNews = async (newsInput) => {
    try {
      const { data } = await updateNewsMutation({
        variables: { input: newsInput },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { updateNews, data, loading, error };
};

const convertToAWSDate = (dateStr) => {
  const awsDateFormat = "YYYY-MM-DD";
  return moment(dateStr, "dddd, M/D/YYYY").format(awsDateFormat);
};

// LIST_NEWS query hook
export const useListNews = ({ date, receiver, isAdmin } = {}) => {
  // const userTimezone = userTimezone;
  const serverDate = date
    ? convertDateToAWSDate(date, userTimezone)
    : undefined;

  let filter = {
    _deleted: { ne: true },
    ...(!isAdmin && { status: { ne: "UNACTIVE" } }),
  };

  // if (isAdmin) {
  //   filter.status = { ne: "UNACTIVE" };
  // }
  const { data, loading, error, refetch } = useQuery(gql(listNews), {
    variables: {
      filter: filter,
    },
    pollInterval: 15000,
  });
  // const { data, loading, error } = useQuery(LIST_NEWS);

  if (loading) {
    return { loading, error, news: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, news: [] };
  }

  const news = data
    ? receiver
      ? data.listNews.items
          .filter(
            (element) =>
              (displayDate(element.createdAt) === displayDate(date) || !date) &&
              (element.receivers === receiver || "ALL" === element.receivers)
          )
          ?.map((news) => {
            // Create a shallow copy of the 'reminder' object
            const parsedNews = { ...news };

            const localizedStartDT = moment
              .tz(parsedNews?.createdAt, "UTC")
              .tz(userTimezone)
              .format("YYYY-MM-DDTHH:mm:ss.SSS");

            parsedNews.createdAt = localizedStartDT;

            return parsedNews;
          })
      : data.listNews.items?.map((news) => {
          // Create a shallow copy of the 'reminder' object
          const parsedNews = { ...news };

          const localizedStartDT = moment
            .tz(parsedNews?.createdAt, "UTC")
            .tz(userTimezone)
            .format("YYYY-MM-DDTHH:mm:ss.SSS");

          parsedNews.createdAt = localizedStartDT;

          return parsedNews;
        })
    : [];

  return { news, loading, error, refetch };
};
