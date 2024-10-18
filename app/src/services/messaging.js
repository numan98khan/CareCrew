import { Auth, API } from "aws-amplify";

// export const sendBulkMessages_original = async (payload) => {
//   const user = await Auth.currentAuthenticatedUser();

//   if (!user) {
//     console.log("User is not authenticated!");
//     return;
//   }

//   const apiName = "icUserCreator";
//   const path =
//     "https://4860qfqfu3.execute-api.us-east-1.amazonaws.com/icAPI-staging/icSendMessages/";
//   const myInit = {
//     body: { payload },
//     headers: {
//       Authorization: `Bearer ${(await Auth.currentSession())
//         .getIdToken()
//         .getJwtToken()}`,
//     },
//   };

//   const result = await API.post(apiName, path, myInit);
//   const parsedBody = JSON.parse(result.body);

//   if (result?.statusCode === 400) {
//     console.error(
//       "icSendMessages (cc-send-bulk-messages):",
//       parsedBody?.error?.message
//     );
//   } else {
//     return { result, parsedBody };
//   }
// };

export const sendBulkMessages = async (payload) => {
  console.log("🚀 ~ sendBulkMessages ~ payload:", payload);
  // console.error("🚀 ~ NOTIFICATIONS ARE DISABLED:");

  // return 0;
  const user = await Auth.currentAuthenticatedUser();

  if (!user) {
    console.log("User is not authenticated!");
    return;
  }

  const apiName = "ic-services";
  const path = "/cc-send-messages/";
  const myInit = {
    body: payload,
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };

  const result = await API.post(apiName, path, myInit);
  const parsedBody = null;

  if (result?.statusCode === 400) {
    console.error("AdminCreateUser (cc-send-messages):", result?.body);
  } else {
    console.log("AdminCreateUser (cc-send-messages):", result);
    return { result, parsedBody };
  }
};
