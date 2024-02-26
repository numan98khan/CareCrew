import { gql, useQuery } from "@apollo/client";

export const GET_PEOPLE_OLD = /* GraphQL */ `
  query GetPeople($id: ID!) {
    getPeople(id: $id) {
      id
      surrogateID
      firstName
      lastName
      phoneNumber
      documents {
        name
        expiration
        key
        __typename
      }
      country
      streetAddress
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
      personalNote
      payrollCycle
      email
      points
      rating
      position
      isTerminated
      lastActivity
      adminHold
      PeopleFacility {
        items {
          id
          facilityId
          peopleId
          createdAt
          updatedAt
          _deleted
          __typename
        }
        nextToken
        __typename
      }
      empCheckList {
        name
        isBool
        __typename
      }
      permissions
      type
      availability
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const GET_PEOPLE = /* GraphQL */ `
  query GetPeople($id: ID!) {
    getPeople(id: $id) {
      id
      email
      firstName
      lastName
      permissions
      type
    }
  }
`;

export const LIST_PEOPLE = gql`
  query ListPeople(
    $filter: ModelPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        PeopleFacility {
          nextToken
          startedAt
          __typename
        }
        chatrooms {
          nextToken
          startedAt
          __typename
        }
        Messages {
          nextToken
          startedAt
          __typename
        }
        empCheckList {
          name
          isBool
          __typename
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
  }
`;

export const LIST_FACILITIES = gql`
  query ListFacilities(
    $filter: ModelFacilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFacilities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        FacilityPeople {
          nextToken
          startedAt
          __typename
        }
        imgSrc
        facilityName
        aboutFacility
        streatAddress
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

export const LIST_SHIFTS = gql`
  query ListShifts(
    $filter: ModelShiftsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShifts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        numOfPositions
        shiftStart
        shiftEnd
        date
        roleRequired
        rate
        floorNumber
        supervisor
        incentives {
          incentiveBy
          incentiveType
          incentiveAmount
          notes
          __typename
        }
        cancellationGuarantee
        isAssigned
        isIncentive
        isGuarantee
        isLate
        isCallOff
        isSelected
        recurringSchedule
        facilityID
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

export const LIST_TIMECARDS = gql`
  query ListTimecards(
    $filter: ModelTimecardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTimecards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clockInTime
        clockOutTime
        isCallOff
        peopleID
        shiftsID
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

export const LIST_MANUAL_TIMECARDS = gql`
  query ListManualTimecards(
    $filter: ModelManualTimecardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listManualTimecards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clockInTime
        clockOutTime
        role
        notes
        timeType
        hours
        minutes
        status
        peopleID
        facilityID
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

export const LIST_TEMPLATES = gql`
  query ListTemplates(
    $filter: ModelTemplatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        subject
        status
        body
        peopleID
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

export const LIST_NEWS = gql`
  query ListNews(
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        peopleID
        datetime
        headline
        news
        alt
        receivers
        author
        status
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
