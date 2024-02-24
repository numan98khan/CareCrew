/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRequests = /* GraphQL */ `
  query GetRequests($id: ID!) {
    getRequests(id: $id) {
      id
      peopleID
      facilityID
      onAvailability
      shiftID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        peopleID
        facilityID
        onAvailability
        shiftID
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
export const syncRequests = /* GraphQL */ `
  query SyncRequests(
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        peopleID
        facilityID
        onAvailability
        shiftID
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
export const requestsByPeopleID = /* GraphQL */ `
  query RequestsByPeopleID(
    $peopleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestsByPeopleID(
      peopleID: $peopleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        peopleID
        facilityID
        onAvailability
        shiftID
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
export const requestsByFacilityID = /* GraphQL */ `
  query RequestsByFacilityID(
    $facilityID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestsByFacilityID(
      facilityID: $facilityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        peopleID
        facilityID
        onAvailability
        shiftID
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
export const getBilling = /* GraphQL */ `
  query GetBilling($id: ID!) {
    getBilling(id: $id) {
      id
      allowOvertime
      maxBillingMonthly
      remainingBillingMonthly
      hourlyRate
      hourlyRateCNA
      hourlyRateLPN
      hourlyRateRN
      weekendHourlyRate
      holidayHourlyRate
      maxMonthlyIncentive
      remainingMonthlyIncentive
      maxHourlyIncentive
      maxFixedIncentive
      billingEmail
      billingMonth
      invoiceDelivery
      invoiceFrequency
      topUpPercentage
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listBillings = /* GraphQL */ `
  query ListBillings(
    $filter: ModelBillingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBillings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        allowOvertime
        maxBillingMonthly
        remainingBillingMonthly
        hourlyRate
        hourlyRateCNA
        hourlyRateLPN
        hourlyRateRN
        weekendHourlyRate
        holidayHourlyRate
        maxMonthlyIncentive
        remainingMonthlyIncentive
        maxHourlyIncentive
        maxFixedIncentive
        billingEmail
        billingMonth
        invoiceDelivery
        invoiceFrequency
        topUpPercentage
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
export const syncBillings = /* GraphQL */ `
  query SyncBillings(
    $filter: ModelBillingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBillings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        allowOvertime
        maxBillingMonthly
        remainingBillingMonthly
        hourlyRate
        hourlyRateCNA
        hourlyRateLPN
        hourlyRateRN
        weekendHourlyRate
        holidayHourlyRate
        maxMonthlyIncentive
        remainingMonthlyIncentive
        maxHourlyIncentive
        maxFixedIncentive
        billingEmail
        billingMonth
        invoiceDelivery
        invoiceFrequency
        topUpPercentage
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
export const getReviews = /* GraphQL */ `
  query GetReviews($id: ID!) {
    getReviews(id: $id) {
      id
      peopleID
      review
      rating
      facilityName
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        peopleID
        review
        rating
        facilityName
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
export const syncReviews = /* GraphQL */ `
  query SyncReviews(
    $filter: ModelReviewsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReviews(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        peopleID
        review
        rating
        facilityName
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
export const reviewsByPeopleID = /* GraphQL */ `
  query ReviewsByPeopleID(
    $peopleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReviewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reviewsByPeopleID(
      peopleID: $peopleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        peopleID
        review
        rating
        facilityName
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
export const getNotifications = /* GraphQL */ `
  query GetNotifications($id: ID!) {
    getNotifications(id: $id) {
      id
      Receivers {
        nextToken
        startedAt
        __typename
      }
      peopleID
      type
      subject
      body
      thumbnail
      organization
      receivers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        peopleID
        type
        subject
        body
        thumbnail
        organization
        receivers
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
export const syncNotifications = /* GraphQL */ `
  query SyncNotifications(
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        peopleID
        type
        subject
        body
        thumbnail
        organization
        receivers
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
export const notificationsByPeopleID = /* GraphQL */ `
  query NotificationsByPeopleID(
    $peopleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByPeopleID(
      peopleID: $peopleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        peopleID
        type
        subject
        body
        thumbnail
        organization
        receivers
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
export const getReminders = /* GraphQL */ `
  query GetReminders($id: ID!) {
    getReminders(id: $id) {
      id
      date
      time
      datetime
      receiverType
      note
      People {
        nextToken
        startedAt
        __typename
      }
      read
      message
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listReminders = /* GraphQL */ `
  query ListReminders(
    $filter: ModelRemindersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReminders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        time
        datetime
        receiverType
        note
        read
        message
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
export const syncReminders = /* GraphQL */ `
  query SyncReminders(
    $filter: ModelRemindersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReminders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        date
        time
        datetime
        receiverType
        note
        read
        message
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
export const getFCMLookup = /* GraphQL */ `
  query GetFCMLookup($id: ID!) {
    getFCMLookup(id: $id) {
      id
      other_token
      fcm_token
      apns_token
      topic
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listFCMLookups = /* GraphQL */ `
  query ListFCMLookups(
    $filter: ModelFCMLookupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFCMLookups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        other_token
        fcm_token
        apns_token
        topic
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
export const syncFCMLookups = /* GraphQL */ `
  query SyncFCMLookups(
    $filter: ModelFCMLookupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFCMLookups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        other_token
        fcm_token
        apns_token
        topic
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
export const getAccountLimitsLookup = /* GraphQL */ `
  query GetAccountLimitsLookup($id: ID!) {
    getAccountLimitsLookup(id: $id) {
      id
      facilityID
      attribute
      month
      amount
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listAccountLimitsLookups = /* GraphQL */ `
  query ListAccountLimitsLookups(
    $filter: ModelAccountLimitsLookupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccountLimitsLookups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        facilityID
        attribute
        month
        amount
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
export const syncAccountLimitsLookups = /* GraphQL */ `
  query SyncAccountLimitsLookups(
    $filter: ModelAccountLimitsLookupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAccountLimitsLookups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        facilityID
        attribute
        month
        amount
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
export const getInvoice = /* GraphQL */ `
  query GetInvoice($id: ID!) {
    getInvoice(id: $id) {
      id
      dueDate
      amount
      description {
        description
        quantity
        amount
        __typename
      }
      surrogateID
      receiver
      receiverID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listInvoices = /* GraphQL */ `
  query ListInvoices(
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dueDate
        amount
        surrogateID
        receiver
        receiverID
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
export const syncInvoices = /* GraphQL */ `
  query SyncInvoices(
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInvoices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        dueDate
        amount
        surrogateID
        receiver
        receiverID
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
export const getSupportTickets = /* GraphQL */ `
  query GetSupportTickets($id: ID!) {
    getSupportTickets(id: $id) {
      id
      details
      reasonID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listSupportTickets = /* GraphQL */ `
  query ListSupportTickets(
    $filter: ModelSupportTicketsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSupportTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        details
        reasonID
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
export const syncSupportTickets = /* GraphQL */ `
  query SyncSupportTickets(
    $filter: ModelSupportTicketsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSupportTickets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        details
        reasonID
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
export const supportTicketsByReasonID = /* GraphQL */ `
  query SupportTicketsByReasonID(
    $reasonID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSupportTicketsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    supportTicketsByReasonID(
      reasonID: $reasonID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        details
        reasonID
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
export const getReason = /* GraphQL */ `
  query GetReason($id: ID!) {
    getReason(id: $id) {
      id
      area
      status
      reason
      SupportTickets {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listReasons = /* GraphQL */ `
  query ListReasons(
    $filter: ModelReasonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReasons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        area
        status
        reason
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
export const syncReasons = /* GraphQL */ `
  query SyncReasons(
    $filter: ModelReasonFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReasons(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        area
        status
        reason
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
export const getPoints = /* GraphQL */ `
  query GetPoints($id: ID!) {
    getPoints(id: $id) {
      id
      reason
      point
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listPoints = /* GraphQL */ `
  query ListPoints(
    $filter: ModelPointsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        reason
        point
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
export const syncPoints = /* GraphQL */ `
  query SyncPoints(
    $filter: ModelPointsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPoints(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        reason
        point
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
export const getTemplates = /* GraphQL */ `
  query GetTemplates($id: ID!) {
    getTemplates(id: $id) {
      id
      subject
      status
      body
      alt
      type
      peopleID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listTemplates = /* GraphQL */ `
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
        alt
        type
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
export const syncTemplates = /* GraphQL */ `
  query SyncTemplates(
    $filter: ModelTemplatesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTemplates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        subject
        status
        body
        alt
        type
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
export const templatesByPeopleID = /* GraphQL */ `
  query TemplatesByPeopleID(
    $peopleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTemplatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    templatesByPeopleID(
      peopleID: $peopleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        subject
        status
        body
        alt
        type
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
export const getNews = /* GraphQL */ `
  query GetNews($id: ID!) {
    getNews(id: $id) {
      id
      peopleID
      datetime
      headline
      news
      receivers
      status
      alt
      author
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listNews = /* GraphQL */ `
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
        receivers
        status
        alt
        author
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
export const syncNews = /* GraphQL */ `
  query SyncNews(
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNews(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        peopleID
        datetime
        headline
        news
        receivers
        status
        alt
        author
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
export const newsByPeopleID = /* GraphQL */ `
  query NewsByPeopleID(
    $peopleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    newsByPeopleID(
      peopleID: $peopleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        peopleID
        datetime
        headline
        news
        receivers
        status
        alt
        author
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
export const getManualTimecard = /* GraphQL */ `
  query GetManualTimecard($id: ID!) {
    getManualTimecard(id: $id) {
      id
      clockInTime
      clockOutTime
      startDate
      endDate
      role
      notes
      timeType
      hours
      minutes
      status
      isBreak
      isOvertime
      payrollCycle
      incentiveAmount
      incentiveBy
      incentiveType
      rate
      peopleSurrogateID
      invoiceProcessedFacility
      invoiceProcessedEmployee
      peopleID
      facilityID
      timecardID
      Timecard {
        id
        clockInTime
        clockOutTime
        desiredClockInTime
        desiredClockOutTime
        isAutoClockOut
        isAutoClockIn
        allowedDelay
        allowedDelayClockIn
        allowedDelayClockOut
        isCallOff
        peopleID
        shiftsID
        isLate
        isOvertime
        lateReason
        date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      manualTimecardTimecardId
      __typename
    }
  }
`;
export const listManualTimecards = /* GraphQL */ `
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
        startDate
        endDate
        role
        notes
        timeType
        hours
        minutes
        status
        isBreak
        isOvertime
        payrollCycle
        incentiveAmount
        incentiveBy
        incentiveType
        rate
        peopleSurrogateID
        invoiceProcessedFacility
        invoiceProcessedEmployee
        peopleID
        facilityID
        timecardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        manualTimecardTimecardId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncManualTimecards = /* GraphQL */ `
  query SyncManualTimecards(
    $filter: ModelManualTimecardFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncManualTimecards(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        clockInTime
        clockOutTime
        startDate
        endDate
        role
        notes
        timeType
        hours
        minutes
        status
        isBreak
        isOvertime
        payrollCycle
        incentiveAmount
        incentiveBy
        incentiveType
        rate
        peopleSurrogateID
        invoiceProcessedFacility
        invoiceProcessedEmployee
        peopleID
        facilityID
        timecardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        manualTimecardTimecardId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const manualTimecardsByPeopleID = /* GraphQL */ `
  query ManualTimecardsByPeopleID(
    $peopleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelManualTimecardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    manualTimecardsByPeopleID(
      peopleID: $peopleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clockInTime
        clockOutTime
        startDate
        endDate
        role
        notes
        timeType
        hours
        minutes
        status
        isBreak
        isOvertime
        payrollCycle
        incentiveAmount
        incentiveBy
        incentiveType
        rate
        peopleSurrogateID
        invoiceProcessedFacility
        invoiceProcessedEmployee
        peopleID
        facilityID
        timecardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        manualTimecardTimecardId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const manualTimecardsByFacilityID = /* GraphQL */ `
  query ManualTimecardsByFacilityID(
    $facilityID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelManualTimecardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    manualTimecardsByFacilityID(
      facilityID: $facilityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clockInTime
        clockOutTime
        startDate
        endDate
        role
        notes
        timeType
        hours
        minutes
        status
        isBreak
        isOvertime
        payrollCycle
        incentiveAmount
        incentiveBy
        incentiveType
        rate
        peopleSurrogateID
        invoiceProcessedFacility
        invoiceProcessedEmployee
        peopleID
        facilityID
        timecardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        manualTimecardTimecardId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTimecard = /* GraphQL */ `
  query GetTimecard($id: ID!) {
    getTimecard(id: $id) {
      id
      clockInTime
      clockOutTime
      desiredClockInTime
      desiredClockOutTime
      isAutoClockOut
      isAutoClockIn
      allowedDelay
      allowedDelayClockIn
      allowedDelayClockOut
      isCallOff
      peopleID
      shiftsID
      TimecardGEOEvents {
        nextToken
        startedAt
        __typename
      }
      isLate
      isOvertime
      lateReason
      date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listTimecards = /* GraphQL */ `
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
        desiredClockInTime
        desiredClockOutTime
        isAutoClockOut
        isAutoClockIn
        allowedDelay
        allowedDelayClockIn
        allowedDelayClockOut
        isCallOff
        peopleID
        shiftsID
        isLate
        isOvertime
        lateReason
        date
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
export const syncTimecards = /* GraphQL */ `
  query SyncTimecards(
    $filter: ModelTimecardFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTimecards(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        clockInTime
        clockOutTime
        desiredClockInTime
        desiredClockOutTime
        isAutoClockOut
        isAutoClockIn
        allowedDelay
        allowedDelayClockIn
        allowedDelayClockOut
        isCallOff
        peopleID
        shiftsID
        isLate
        isOvertime
        lateReason
        date
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
export const timecardsByPeopleID = /* GraphQL */ `
  query TimecardsByPeopleID(
    $peopleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTimecardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    timecardsByPeopleID(
      peopleID: $peopleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clockInTime
        clockOutTime
        desiredClockInTime
        desiredClockOutTime
        isAutoClockOut
        isAutoClockIn
        allowedDelay
        allowedDelayClockIn
        allowedDelayClockOut
        isCallOff
        peopleID
        shiftsID
        isLate
        isOvertime
        lateReason
        date
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
export const timecardsByShiftsID = /* GraphQL */ `
  query TimecardsByShiftsID(
    $shiftsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTimecardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    timecardsByShiftsID(
      shiftsID: $shiftsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clockInTime
        clockOutTime
        desiredClockInTime
        desiredClockOutTime
        isAutoClockOut
        isAutoClockIn
        allowedDelay
        allowedDelayClockIn
        allowedDelayClockOut
        isCallOff
        peopleID
        shiftsID
        isLate
        isOvertime
        lateReason
        date
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
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      text
      document {
        name
        expiration
        key
        __typename
      }
      peopleID
      chatroomID
      platform
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        peopleID
        chatroomID
        platform
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
export const syncMessages = /* GraphQL */ `
  query SyncMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        text
        peopleID
        chatroomID
        platform
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
export const messagesByPeopleID = /* GraphQL */ `
  query MessagesByPeopleID(
    $peopleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByPeopleID(
      peopleID: $peopleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        peopleID
        chatroomID
        platform
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
export const messagesByChatroomID = /* GraphQL */ `
  query MessagesByChatroomID(
    $chatroomID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChatroomID(
      chatroomID: $chatroomID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        peopleID
        chatroomID
        platform
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
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      People {
        nextToken
        startedAt
        __typename
      }
      Messages {
        nextToken
        startedAt
        __typename
      }
      title
      latestMessage
      latestMessageTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        latestMessage
        latestMessageTime
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
export const syncChatRooms = /* GraphQL */ `
  query SyncChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncChatRooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        latestMessage
        latestMessageTime
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
export const getShifts = /* GraphQL */ `
  query GetShifts($id: ID!) {
    getShifts(id: $id) {
      id
      numOfPositions
      shiftStart
      shiftEnd
      shiftStartDT
      shiftEndDT
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
      isHoliday
      isArchive
      recurringSchedule
      facilityID
      Timecards {
        nextToken
        startedAt
        __typename
      }
      hide
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listShifts = /* GraphQL */ `
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
        shiftStartDT
        shiftEndDT
        date
        roleRequired
        rate
        floorNumber
        supervisor
        cancellationGuarantee
        isAssigned
        isIncentive
        isGuarantee
        isLate
        isCallOff
        isSelected
        isHoliday
        isArchive
        recurringSchedule
        facilityID
        hide
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
export const syncShifts = /* GraphQL */ `
  query SyncShifts(
    $filter: ModelShiftsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncShifts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        numOfPositions
        shiftStart
        shiftEnd
        shiftStartDT
        shiftEndDT
        date
        roleRequired
        rate
        floorNumber
        supervisor
        cancellationGuarantee
        isAssigned
        isIncentive
        isGuarantee
        isLate
        isCallOff
        isSelected
        isHoliday
        isArchive
        recurringSchedule
        facilityID
        hide
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
export const shiftsByFacilityID = /* GraphQL */ `
  query ShiftsByFacilityID(
    $facilityID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelShiftsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    shiftsByFacilityID(
      facilityID: $facilityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        numOfPositions
        shiftStart
        shiftEnd
        shiftStartDT
        shiftEndDT
        date
        roleRequired
        rate
        floorNumber
        supervisor
        cancellationGuarantee
        isAssigned
        isIncentive
        isGuarantee
        isLate
        isCallOff
        isSelected
        isHoliday
        isArchive
        recurringSchedule
        facilityID
        hide
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
export const getFacility = /* GraphQL */ `
  query GetFacility($id: ID!) {
    getFacility(id: $id) {
      id
      FacilityPeople {
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
        firstName
        lastName
        phone
        email
        position
        __typename
      }
      email
      isHidden
      permissions
      adminHold
      Shifts {
        nextToken
        startedAt
        __typename
      }
      ManualTimecards {
        nextToken
        startedAt
        __typename
      }
      lat
      lng
      floors {
        floorNumber
        __typename
      }
      documents {
        name
        expiration
        key
        __typename
      }
      Billing {
        id
        allowOvertime
        maxBillingMonthly
        remainingBillingMonthly
        hourlyRate
        hourlyRateCNA
        hourlyRateLPN
        hourlyRateRN
        weekendHourlyRate
        holidayHourlyRate
        maxMonthlyIncentive
        remainingMonthlyIncentive
        maxHourlyIncentive
        maxFixedIncentive
        billingEmail
        billingMonth
        invoiceDelivery
        invoiceFrequency
        topUpPercentage
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Requests {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      facilityBillingId
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
        imgSrc
        facilityName
        aboutFacility
        streetAddress
        country
        city
        state
        zip
        email
        isHidden
        permissions
        adminHold
        lat
        lng
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        facilityBillingId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncFacilities = /* GraphQL */ `
  query SyncFacilities(
    $filter: ModelFacilityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFacilities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        imgSrc
        facilityName
        aboutFacility
        streetAddress
        country
        city
        state
        zip
        email
        isHidden
        permissions
        adminHold
        lat
        lng
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        facilityBillingId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getIDCounter = /* GraphQL */ `
  query GetIDCounter($id: ID!) {
    getIDCounter(id: $id) {
      id
      people
      facility
      invoice
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listIDCounters = /* GraphQL */ `
  query ListIDCounters(
    $filter: ModelIDCounterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIDCounters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        people
        facility
        invoice
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
export const syncIDCounters = /* GraphQL */ `
  query SyncIDCounters(
    $filter: ModelIDCounterFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncIDCounters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        people
        facility
        invoice
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
export const getDocuments = /* GraphQL */ `
  query GetDocuments($id: ID!) {
    getDocuments(id: $id) {
      id
      docURL
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listDocuments = /* GraphQL */ `
  query ListDocuments(
    $filter: ModelDocumentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        docURL
        name
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
export const syncDocuments = /* GraphQL */ `
  query SyncDocuments(
    $filter: ModelDocumentsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDocuments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        docURL
        name
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
export const getTimecardGEOEvents = /* GraphQL */ `
  query GetTimecardGEOEvents($id: ID!) {
    getTimecardGEOEvents(id: $id) {
      id
      lat
      lng
      event
      timecardID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listTimecardGEOEvents = /* GraphQL */ `
  query ListTimecardGEOEvents(
    $filter: ModelTimecardGEOEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTimecardGEOEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        lat
        lng
        event
        timecardID
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
export const syncTimecardGEOEvents = /* GraphQL */ `
  query SyncTimecardGEOEvents(
    $filter: ModelTimecardGEOEventsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTimecardGEOEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        lat
        lng
        event
        timecardID
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
export const timecardGEOEventsByTimecardID = /* GraphQL */ `
  query TimecardGEOEventsByTimecardID(
    $timecardID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTimecardGEOEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    timecardGEOEventsByTimecardID(
      timecardID: $timecardID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        lat
        lng
        event
        timecardID
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
export const getPeople = /* GraphQL */ `
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
      lastActivityNotifications
      adminHold
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
      permissions
      Timecards {
        nextToken
        startedAt
        __typename
      }
      ManualTimecards {
        nextToken
        startedAt
        __typename
      }
      News {
        nextToken
        startedAt
        __typename
      }
      Templates {
        nextToken
        startedAt
        __typename
      }
      type
      availability
      reminderss {
        nextToken
        startedAt
        __typename
      }
      notificationss {
        nextToken
        startedAt
        __typename
      }
      Notifications {
        nextToken
        startedAt
        __typename
      }
      immunization
      Reviews {
        nextToken
        startedAt
        __typename
      }
      Requests {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listPeople = /* GraphQL */ `
  query ListPeople(
    $filter: ModelPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        surrogateID
        firstName
        lastName
        phoneNumber
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
        lastActivityNotifications
        adminHold
        permissions
        type
        availability
        immunization
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
export const syncPeople = /* GraphQL */ `
  query SyncPeople(
    $filter: ModelPeopleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPeople(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        surrogateID
        firstName
        lastName
        phoneNumber
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
        lastActivityNotifications
        adminHold
        permissions
        type
        availability
        immunization
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
export const getNotificationsPeople = /* GraphQL */ `
  query GetNotificationsPeople($id: ID!) {
    getNotificationsPeople(id: $id) {
      id
      notificationsId
      peopleId
      notifications {
        id
        peopleID
        type
        subject
        body
        thumbnail
        organization
        receivers
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      people {
        id
        surrogateID
        firstName
        lastName
        phoneNumber
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
        lastActivityNotifications
        adminHold
        permissions
        type
        availability
        immunization
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listNotificationsPeople = /* GraphQL */ `
  query ListNotificationsPeople(
    $filter: ModelNotificationsPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationsPeople(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        notificationsId
        peopleId
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
export const syncNotificationsPeople = /* GraphQL */ `
  query SyncNotificationsPeople(
    $filter: ModelNotificationsPeopleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotificationsPeople(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        notificationsId
        peopleId
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
export const notificationsPeopleByNotificationsId = /* GraphQL */ `
  query NotificationsPeopleByNotificationsId(
    $notificationsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationsPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsPeopleByNotificationsId(
      notificationsId: $notificationsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        notificationsId
        peopleId
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
export const notificationsPeopleByPeopleId = /* GraphQL */ `
  query NotificationsPeopleByPeopleId(
    $peopleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationsPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsPeopleByPeopleId(
      peopleId: $peopleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        notificationsId
        peopleId
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
export const getRemindersPeople = /* GraphQL */ `
  query GetRemindersPeople($id: ID!) {
    getRemindersPeople(id: $id) {
      id
      remindersId
      peopleId
      reminders {
        id
        date
        time
        datetime
        receiverType
        note
        read
        message
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      people {
        id
        surrogateID
        firstName
        lastName
        phoneNumber
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
        lastActivityNotifications
        adminHold
        permissions
        type
        availability
        immunization
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listRemindersPeople = /* GraphQL */ `
  query ListRemindersPeople(
    $filter: ModelRemindersPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRemindersPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        remindersId
        peopleId
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
export const syncRemindersPeople = /* GraphQL */ `
  query SyncRemindersPeople(
    $filter: ModelRemindersPeopleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRemindersPeople(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        remindersId
        peopleId
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
export const remindersPeopleByRemindersId = /* GraphQL */ `
  query RemindersPeopleByRemindersId(
    $remindersId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRemindersPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    remindersPeopleByRemindersId(
      remindersId: $remindersId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        remindersId
        peopleId
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
export const remindersPeopleByPeopleId = /* GraphQL */ `
  query RemindersPeopleByPeopleId(
    $peopleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRemindersPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    remindersPeopleByPeopleId(
      peopleId: $peopleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        remindersId
        peopleId
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
export const getChatRoomPeople = /* GraphQL */ `
  query GetChatRoomPeople($id: ID!) {
    getChatRoomPeople(id: $id) {
      id
      chatRoomId
      peopleId
      chatRoom {
        id
        title
        latestMessage
        latestMessageTime
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      people {
        id
        surrogateID
        firstName
        lastName
        phoneNumber
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
        lastActivityNotifications
        adminHold
        permissions
        type
        availability
        immunization
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listChatRoomPeople = /* GraphQL */ `
  query ListChatRoomPeople(
    $filter: ModelChatRoomPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRoomPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chatRoomId
        peopleId
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
export const syncChatRoomPeople = /* GraphQL */ `
  query SyncChatRoomPeople(
    $filter: ModelChatRoomPeopleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncChatRoomPeople(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        chatRoomId
        peopleId
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
export const chatRoomPeopleByChatRoomId = /* GraphQL */ `
  query ChatRoomPeopleByChatRoomId(
    $chatRoomId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatRoomPeopleByChatRoomId(
      chatRoomId: $chatRoomId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        chatRoomId
        peopleId
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
export const chatRoomPeopleByPeopleId = /* GraphQL */ `
  query ChatRoomPeopleByPeopleId(
    $peopleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatRoomPeopleByPeopleId(
      peopleId: $peopleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        chatRoomId
        peopleId
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
export const getPeopleFacility = /* GraphQL */ `
  query GetPeopleFacility($id: ID!) {
    getPeopleFacility(id: $id) {
      id
      facilityId
      peopleId
      facility {
        id
        imgSrc
        facilityName
        aboutFacility
        streetAddress
        country
        city
        state
        zip
        email
        isHidden
        permissions
        adminHold
        lat
        lng
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        facilityBillingId
        __typename
      }
      people {
        id
        surrogateID
        firstName
        lastName
        phoneNumber
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
        lastActivityNotifications
        adminHold
        permissions
        type
        availability
        immunization
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listPeopleFacilities = /* GraphQL */ `
  query ListPeopleFacilities(
    $filter: ModelPeopleFacilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeopleFacilities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        facilityId
        peopleId
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
export const syncPeopleFacilities = /* GraphQL */ `
  query SyncPeopleFacilities(
    $filter: ModelPeopleFacilityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPeopleFacilities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        facilityId
        peopleId
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
export const peopleFacilitiesByFacilityId = /* GraphQL */ `
  query PeopleFacilitiesByFacilityId(
    $facilityId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPeopleFacilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    peopleFacilitiesByFacilityId(
      facilityId: $facilityId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        facilityId
        peopleId
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
export const peopleFacilitiesByPeopleId = /* GraphQL */ `
  query PeopleFacilitiesByPeopleId(
    $peopleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPeopleFacilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    peopleFacilitiesByPeopleId(
      peopleId: $peopleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        facilityId
        peopleId
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
