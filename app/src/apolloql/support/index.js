import { gql, useQuery, useMutation } from "@apollo/client";
import { SUPPORT_TICKET } from "../../constants/notificationTypes";
import { ADMIN } from "../../constants/userTypes";
import { createSupportTickets } from "../../graphql/mutations";
import { useCreateNotification } from "../notifications";

export const useCreateSupport = () => {
  const [createSupportMutation, { data, loading, error }] = useMutation(
    gql(createSupportTickets)
  );

  const { createNotificationQuery } = useCreateNotification();

  const createTicket = async (templateInput, personName, organization) => {
    console.log(
      "🚀 ~ file: index.js:15 ~ createTicket ~ templateInput:",
      templateInput
    );
    try {
      const { data } = await createSupportMutation({
        variables: { input: templateInput },
      });

      const notificationInput = {
        peopleID: "-1",
        type: SUPPORT_TICKET,
        subject: `Support ticket raised`,
        body: `Please support ${personName} with issue: ${templateInput?.details} `,
        receivers: ADMIN,
        organization: organization,
      };
      const receiverPeople = [];
      await createNotificationQuery(notificationInput, receiverPeople);
      console.log(
        "🚀 ~ file: index.js:32 ~ createTicket ~ notificationInput:",
        notificationInput
      );

      return data;
    } catch (error) {
      throw error;
    }
  };

  return { createTicket, data, loading, error };
};
