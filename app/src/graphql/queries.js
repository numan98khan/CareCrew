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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      read
      message
      createdAt
      updatedAt
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      createdAt
      updatedAt
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      createdAt
      updatedAt
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
        manualTimecardTimecardId
        __typename
      }
      nextToken
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
        __typename
      }
      isLate
      isOvertime
      lateReason
      date
      createdAt
      updatedAt
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      Messages {
        nextToken
        __typename
      }
      title
      latestMessage
      latestMessageTime
      createdAt
      updatedAt
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
        __typename
      }
      nextToken
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
        __typename
      }
      hide
      createdAt
      updatedAt
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
        __typename
      }
      nextToken
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
        __typename
      }
      ManualTimecards {
        nextToken
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
        __typename
      }
      Requests {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
        facilityBillingId
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      chatrooms {
        nextToken
        __typename
      }
      Messages {
        nextToken
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
        __typename
      }
      ManualTimecards {
        nextToken
        __typename
      }
      News {
        nextToken
        __typename
      }
      Templates {
        nextToken
        __typename
      }
      type
      availability
      reminderss {
        nextToken
        __typename
      }
      notificationss {
        nextToken
        __typename
      }
      Notifications {
        nextToken
        __typename
      }
      immunization
      Reviews {
        nextToken
        __typename
      }
      Requests {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
        __typename
      }
      nextToken
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
        __typename
      }
      createdAt
      updatedAt
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
        __typename
      }
      nextToken
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
        __typename
      }
      createdAt
      updatedAt
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
        __typename
      }
      nextToken
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
        __typename
      }
      createdAt
      updatedAt
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
        __typename
      }
      nextToken
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
        __typename
      }
      createdAt
      updatedAt
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        manualTimecardTimecardId
        __typename
      }
      nextToken
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
        manualTimecardTimecardId
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
