import { API, graphqlOperation } from "aws-amplify";
// import { getShifts, updateShifts } from "./graphql/queries"; // path to your queries file

// async function subtractPosition(shiftId) {
//   try {
//     // Get the shift
//     const getShiftsResponse = await API.graphql(
//       graphqlOperation(getShifts, { id: shiftId })
//     );
//     const shift = getShiftsResponse.data.getShifts;
//     const currentNumOfPositions = Number(shift.numOfPositions);

//     // Subtract 1 from numOfPositions
//     const newNumOfPositions = String(currentNumOfPositions - 1);

//     // Update the shift
//     const updateShiftsInput = {
//       id: shiftId,
//       numOfPositions: newNumOfPositions,
//     };
//     const updateShiftsResponse = await API.graphql(
//       graphqlOperation(updateShifts, { input: updateShiftsInput })
//     );
//     console.log("Updated Shift:", updateShiftsResponse.data.updateShifts);
//   } catch (error) {
//     console.error("Error updating shift:", error);
//   }
// }

// useEffect(() => {
//   if (!loading && !error) {
//     const timecardsData = data.listTimecards.items.filter(
//       (element) => element._deleted !== true
//     );

//     // Assume that we have shiftsData and peopleData arrays
//     const enrichedTimecardsData = timecardsData.map((timecard) => {
//       // Find the shift and people object for each timecard
//       const shift = shifts.find((shift) => shift.id === timecard.shiftsID);
//       const person = people.find((person) => person.id === timecard.peopleID);

//       // Add the shift and people object to each timecard
//       return {
//         ...timecard,
//         shift,
//         person,
//       };
//     });

//     setTimecards(enrichedTimecardsData);
//     console.log("Apollo fetching", enrichedTimecardsData);
//   }
// }, [loading, error, data, shifts, people]);

export const listFacilities = /* GraphQL */ `
  query ListFacilities(
    $filter: ModelFacilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFacilities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        FacilityPeople {
          items {
            id
            peopleId
            facilityId
            people {
              id
              firstName
              lastName
              phoneNumber
              documents
              country
              city
              state
              zip
              timezone
              language
              isEmailNotifications
              isTextNotification
              effectiveStartDate
              driverLicenseNumber
              driverLicenseState
              SSN
              uniformSize
              isCompleteDrugScreening
              emergencyContactName
              emergencyContactNumber
              emergencyContactRelationship
              milesToWork
              licenseCode
              profilePicture
              role
              status
              email
              points
              rating
              empCheckList {
                name
                isBool
              }
              permissions
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        imgSrc
        facilityName
        aboutFacility
        streetAddress
        country
        city
        state
        zip
        contacts {
          name
          phone
          email
          position
          __typename
        }
        email
        permissions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
  aws_project_region: "us-east-1",
  aws_appsync_graphqlEndpoint:
    "https://meyrpafnafextb6onlbw2lvxmu.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-rmxq6zqkxjgjdeemtwjmztm4vq",
  aws_cognito_identity_pool_id:
    "us-east-1:308e23e7-ffbe-4153-b057-969184c27068",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_fAUoEZrw3",
  aws_user_pools_web_client_id: "3gspg6gs6c3biog1jp17rk1qld",
  oauth: {},
  aws_cognito_username_attributes: ["EMAIL"],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: [],
  aws_cognito_mfa_configuration: "ON",
  aws_cognito_mfa_types: ["SMS", "TOTP"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [
      "REQUIRES_LOWERCASE",
      "REQUIRES_NUMBERS",
      "REQUIRES_SYMBOLS",
      "REQUIRES_UPPERCASE",
    ],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
  aws_user_files_s3_bucket: "instacare-storage211042-staging",
  aws_user_files_s3_bucket_region: "us-east-1",
  aws_cloud_logic_custom: [
    {
      name: "icUserCreator",
      endpoint: "",
      region: "us-east-1",
    },
  ],
  aws_cloud_logic_custom: [
    {
      name: "ic-services",
      endpoint:
        "https://5ngs62w6c5.execute-api.us-east-1.amazonaws.com/ic-api-staging",
      region: "us-east-1",
    },
  ],
};

export default awsmobile;

const t = {
  access: [
    { name: "Dashboard", isSelected: true },
    { name: "Schedule", isSelected: true },
    { name: "Who's ON", isSelected: true },
    { name: "People", isSelected: true },
    { name: "Facilities", isSelected: true },
    { name: "Messaging", isSelected: true },
    { name: "Timecards", isSelected: true },
    { name: "Support", isSelected: true },
    { name: "Settings", isSelected: true },
    { name: "Reports", isSelected: true },
  ],
  permissions: [
    { name: "Clock In Shifts", isSelected: false },
    { name: "Messaging", isSelected: false },
    { name: "Clock Out Shifts", isSelected: false },
    { name: "Download Timecard", isSelected: false },
    { name: "Cancel Shifts", isSelected: false },
    { name: "Report an Issue", isSelected: false },
    { name: "Signature", isSelected: false },
    { name: "Accepting Shifts", isSelected: false },
  ],
  type: "admin",
  notifications: [
    { name: "Text Message", isSelected: false },
    { name: "Email", isSelected: false },
    { name: "In App Notifications", isSelected: true },
  ],
};






{"other":[{"name":"Automatic Clock-Out","isSelected":false},{"name":"Restrict Clock-In Before Shift","isSelected":false,"value":null},{"name":"Restrict Clock-In During Shift","isSelected":false,"value":null},{"name":"Point Expiry Days","isSelected":true,"value":null},{"name":"incentives who haven't clock-in","isSelected":false,"value":null}],"access":[{"name":"Dashboard","isSelected":true},{"name":"Messaging","isSelected":true},{"name":"My Availability","isSelected":true},{"name":"Facilities","isSelected":true},{"name":"Schedule","isSelected":true},{"name":"Payroll","isSelected":true},{"name":"Timecards","isSelected":true},{"name":"Support","isSelected":true}],"permissions":[{"name":"Clock In Shifts","isSelected":false},{"name":"Messaging","isSelected":false},{"name":"Clock Out Shifts","isSelected":false},{"name":"Download Timecard","isSelected":false},{"name":"Cancel Shifts","isSelected":false},{"name":"Report an Issue","isSelected":false},{"name":"Signature","isSelected":false},{"name":"Accepting Shifts","isSelected":false}],"type":"employee","notifications":[{"name":"Text Message","isSelected":false},{"name":"Email","isSelected":false},{"name":"In App Notifications","isSelected":true}]}