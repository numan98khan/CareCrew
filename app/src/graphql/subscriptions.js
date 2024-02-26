/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRequests = /* GraphQL */ `
  subscription OnCreateRequests($filter: ModelSubscriptionRequestsFilterInput) {
    onCreateRequests(filter: $filter) {
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
export const onUpdateRequests = /* GraphQL */ `
  subscription OnUpdateRequests($filter: ModelSubscriptionRequestsFilterInput) {
    onUpdateRequests(filter: $filter) {
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
export const onDeleteRequests = /* GraphQL */ `
  subscription OnDeleteRequests($filter: ModelSubscriptionRequestsFilterInput) {
    onDeleteRequests(filter: $filter) {
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
export const onCreateBilling = /* GraphQL */ `
  subscription OnCreateBilling($filter: ModelSubscriptionBillingFilterInput) {
    onCreateBilling(filter: $filter) {
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
export const onUpdateBilling = /* GraphQL */ `
  subscription OnUpdateBilling($filter: ModelSubscriptionBillingFilterInput) {
    onUpdateBilling(filter: $filter) {
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
export const onDeleteBilling = /* GraphQL */ `
  subscription OnDeleteBilling($filter: ModelSubscriptionBillingFilterInput) {
    onDeleteBilling(filter: $filter) {
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
export const onCreateReviews = /* GraphQL */ `
  subscription OnCreateReviews($filter: ModelSubscriptionReviewsFilterInput) {
    onCreateReviews(filter: $filter) {
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
export const onUpdateReviews = /* GraphQL */ `
  subscription OnUpdateReviews($filter: ModelSubscriptionReviewsFilterInput) {
    onUpdateReviews(filter: $filter) {
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
export const onDeleteReviews = /* GraphQL */ `
  subscription OnDeleteReviews($filter: ModelSubscriptionReviewsFilterInput) {
    onDeleteReviews(filter: $filter) {
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
export const onCreateNotifications = /* GraphQL */ `
  subscription OnCreateNotifications(
    $filter: ModelSubscriptionNotificationsFilterInput
  ) {
    onCreateNotifications(filter: $filter) {
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
export const onUpdateNotifications = /* GraphQL */ `
  subscription OnUpdateNotifications(
    $filter: ModelSubscriptionNotificationsFilterInput
  ) {
    onUpdateNotifications(filter: $filter) {
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
export const onDeleteNotifications = /* GraphQL */ `
  subscription OnDeleteNotifications(
    $filter: ModelSubscriptionNotificationsFilterInput
  ) {
    onDeleteNotifications(filter: $filter) {
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
export const onCreateReminders = /* GraphQL */ `
  subscription OnCreateReminders(
    $filter: ModelSubscriptionRemindersFilterInput
  ) {
    onCreateReminders(filter: $filter) {
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
export const onUpdateReminders = /* GraphQL */ `
  subscription OnUpdateReminders(
    $filter: ModelSubscriptionRemindersFilterInput
  ) {
    onUpdateReminders(filter: $filter) {
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
export const onDeleteReminders = /* GraphQL */ `
  subscription OnDeleteReminders(
    $filter: ModelSubscriptionRemindersFilterInput
  ) {
    onDeleteReminders(filter: $filter) {
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
export const onCreateFCMLookup = /* GraphQL */ `
  subscription OnCreateFCMLookup(
    $filter: ModelSubscriptionFCMLookupFilterInput
  ) {
    onCreateFCMLookup(filter: $filter) {
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
export const onUpdateFCMLookup = /* GraphQL */ `
  subscription OnUpdateFCMLookup(
    $filter: ModelSubscriptionFCMLookupFilterInput
  ) {
    onUpdateFCMLookup(filter: $filter) {
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
export const onDeleteFCMLookup = /* GraphQL */ `
  subscription OnDeleteFCMLookup(
    $filter: ModelSubscriptionFCMLookupFilterInput
  ) {
    onDeleteFCMLookup(filter: $filter) {
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
export const onCreateAccountLimitsLookup = /* GraphQL */ `
  subscription OnCreateAccountLimitsLookup(
    $filter: ModelSubscriptionAccountLimitsLookupFilterInput
  ) {
    onCreateAccountLimitsLookup(filter: $filter) {
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
export const onUpdateAccountLimitsLookup = /* GraphQL */ `
  subscription OnUpdateAccountLimitsLookup(
    $filter: ModelSubscriptionAccountLimitsLookupFilterInput
  ) {
    onUpdateAccountLimitsLookup(filter: $filter) {
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
export const onDeleteAccountLimitsLookup = /* GraphQL */ `
  subscription OnDeleteAccountLimitsLookup(
    $filter: ModelSubscriptionAccountLimitsLookupFilterInput
  ) {
    onDeleteAccountLimitsLookup(filter: $filter) {
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
export const onCreateInvoice = /* GraphQL */ `
  subscription OnCreateInvoice($filter: ModelSubscriptionInvoiceFilterInput) {
    onCreateInvoice(filter: $filter) {
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
export const onUpdateInvoice = /* GraphQL */ `
  subscription OnUpdateInvoice($filter: ModelSubscriptionInvoiceFilterInput) {
    onUpdateInvoice(filter: $filter) {
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
export const onDeleteInvoice = /* GraphQL */ `
  subscription OnDeleteInvoice($filter: ModelSubscriptionInvoiceFilterInput) {
    onDeleteInvoice(filter: $filter) {
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
export const onCreateSupportTickets = /* GraphQL */ `
  subscription OnCreateSupportTickets(
    $filter: ModelSubscriptionSupportTicketsFilterInput
  ) {
    onCreateSupportTickets(filter: $filter) {
      id
      details
      reasonID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSupportTickets = /* GraphQL */ `
  subscription OnUpdateSupportTickets(
    $filter: ModelSubscriptionSupportTicketsFilterInput
  ) {
    onUpdateSupportTickets(filter: $filter) {
      id
      details
      reasonID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSupportTickets = /* GraphQL */ `
  subscription OnDeleteSupportTickets(
    $filter: ModelSubscriptionSupportTicketsFilterInput
  ) {
    onDeleteSupportTickets(filter: $filter) {
      id
      details
      reasonID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateReason = /* GraphQL */ `
  subscription OnCreateReason($filter: ModelSubscriptionReasonFilterInput) {
    onCreateReason(filter: $filter) {
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
export const onUpdateReason = /* GraphQL */ `
  subscription OnUpdateReason($filter: ModelSubscriptionReasonFilterInput) {
    onUpdateReason(filter: $filter) {
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
export const onDeleteReason = /* GraphQL */ `
  subscription OnDeleteReason($filter: ModelSubscriptionReasonFilterInput) {
    onDeleteReason(filter: $filter) {
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
export const onCreatePoints = /* GraphQL */ `
  subscription OnCreatePoints($filter: ModelSubscriptionPointsFilterInput) {
    onCreatePoints(filter: $filter) {
      id
      reason
      point
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePoints = /* GraphQL */ `
  subscription OnUpdatePoints($filter: ModelSubscriptionPointsFilterInput) {
    onUpdatePoints(filter: $filter) {
      id
      reason
      point
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePoints = /* GraphQL */ `
  subscription OnDeletePoints($filter: ModelSubscriptionPointsFilterInput) {
    onDeletePoints(filter: $filter) {
      id
      reason
      point
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTemplates = /* GraphQL */ `
  subscription OnCreateTemplates(
    $filter: ModelSubscriptionTemplatesFilterInput
  ) {
    onCreateTemplates(filter: $filter) {
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
export const onUpdateTemplates = /* GraphQL */ `
  subscription OnUpdateTemplates(
    $filter: ModelSubscriptionTemplatesFilterInput
  ) {
    onUpdateTemplates(filter: $filter) {
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
export const onDeleteTemplates = /* GraphQL */ `
  subscription OnDeleteTemplates(
    $filter: ModelSubscriptionTemplatesFilterInput
  ) {
    onDeleteTemplates(filter: $filter) {
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
export const onCreateNews = /* GraphQL */ `
  subscription OnCreateNews($filter: ModelSubscriptionNewsFilterInput) {
    onCreateNews(filter: $filter) {
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
export const onUpdateNews = /* GraphQL */ `
  subscription OnUpdateNews($filter: ModelSubscriptionNewsFilterInput) {
    onUpdateNews(filter: $filter) {
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
export const onDeleteNews = /* GraphQL */ `
  subscription OnDeleteNews($filter: ModelSubscriptionNewsFilterInput) {
    onDeleteNews(filter: $filter) {
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
export const onCreateManualTimecard = /* GraphQL */ `
  subscription OnCreateManualTimecard(
    $filter: ModelSubscriptionManualTimecardFilterInput
  ) {
    onCreateManualTimecard(filter: $filter) {
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
export const onUpdateManualTimecard = /* GraphQL */ `
  subscription OnUpdateManualTimecard(
    $filter: ModelSubscriptionManualTimecardFilterInput
  ) {
    onUpdateManualTimecard(filter: $filter) {
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
export const onDeleteManualTimecard = /* GraphQL */ `
  subscription OnDeleteManualTimecard(
    $filter: ModelSubscriptionManualTimecardFilterInput
  ) {
    onDeleteManualTimecard(filter: $filter) {
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
export const onCreateTimecard = /* GraphQL */ `
  subscription OnCreateTimecard($filter: ModelSubscriptionTimecardFilterInput) {
    onCreateTimecard(filter: $filter) {
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
export const onUpdateTimecard = /* GraphQL */ `
  subscription OnUpdateTimecard($filter: ModelSubscriptionTimecardFilterInput) {
    onUpdateTimecard(filter: $filter) {
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
export const onDeleteTimecard = /* GraphQL */ `
  subscription OnDeleteTimecard($filter: ModelSubscriptionTimecardFilterInput) {
    onDeleteTimecard(filter: $filter) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
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
export const onCreateShifts = /* GraphQL */ `
  subscription OnCreateShifts($filter: ModelSubscriptionShiftsFilterInput) {
    onCreateShifts(filter: $filter) {
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
export const onUpdateShifts = /* GraphQL */ `
  subscription OnUpdateShifts($filter: ModelSubscriptionShiftsFilterInput) {
    onUpdateShifts(filter: $filter) {
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
export const onDeleteShifts = /* GraphQL */ `
  subscription OnDeleteShifts($filter: ModelSubscriptionShiftsFilterInput) {
    onDeleteShifts(filter: $filter) {
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
export const onCreateFacility = /* GraphQL */ `
  subscription OnCreateFacility($filter: ModelSubscriptionFacilityFilterInput) {
    onCreateFacility(filter: $filter) {
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
export const onUpdateFacility = /* GraphQL */ `
  subscription OnUpdateFacility($filter: ModelSubscriptionFacilityFilterInput) {
    onUpdateFacility(filter: $filter) {
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
export const onDeleteFacility = /* GraphQL */ `
  subscription OnDeleteFacility($filter: ModelSubscriptionFacilityFilterInput) {
    onDeleteFacility(filter: $filter) {
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
export const onCreateIDCounter = /* GraphQL */ `
  subscription OnCreateIDCounter(
    $filter: ModelSubscriptionIDCounterFilterInput
  ) {
    onCreateIDCounter(filter: $filter) {
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
export const onUpdateIDCounter = /* GraphQL */ `
  subscription OnUpdateIDCounter(
    $filter: ModelSubscriptionIDCounterFilterInput
  ) {
    onUpdateIDCounter(filter: $filter) {
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
export const onDeleteIDCounter = /* GraphQL */ `
  subscription OnDeleteIDCounter(
    $filter: ModelSubscriptionIDCounterFilterInput
  ) {
    onDeleteIDCounter(filter: $filter) {
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
export const onCreateDocuments = /* GraphQL */ `
  subscription OnCreateDocuments(
    $filter: ModelSubscriptionDocumentsFilterInput
  ) {
    onCreateDocuments(filter: $filter) {
      id
      docURL
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateDocuments = /* GraphQL */ `
  subscription OnUpdateDocuments(
    $filter: ModelSubscriptionDocumentsFilterInput
  ) {
    onUpdateDocuments(filter: $filter) {
      id
      docURL
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteDocuments = /* GraphQL */ `
  subscription OnDeleteDocuments(
    $filter: ModelSubscriptionDocumentsFilterInput
  ) {
    onDeleteDocuments(filter: $filter) {
      id
      docURL
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTimecardGEOEvents = /* GraphQL */ `
  subscription OnCreateTimecardGEOEvents(
    $filter: ModelSubscriptionTimecardGEOEventsFilterInput
  ) {
    onCreateTimecardGEOEvents(filter: $filter) {
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
export const onUpdateTimecardGEOEvents = /* GraphQL */ `
  subscription OnUpdateTimecardGEOEvents(
    $filter: ModelSubscriptionTimecardGEOEventsFilterInput
  ) {
    onUpdateTimecardGEOEvents(filter: $filter) {
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
export const onDeleteTimecardGEOEvents = /* GraphQL */ `
  subscription OnDeleteTimecardGEOEvents(
    $filter: ModelSubscriptionTimecardGEOEventsFilterInput
  ) {
    onDeleteTimecardGEOEvents(filter: $filter) {
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
export const onCreatePeople = /* GraphQL */ `
  subscription OnCreatePeople($filter: ModelSubscriptionPeopleFilterInput) {
    onCreatePeople(filter: $filter) {
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
export const onUpdatePeople = /* GraphQL */ `
  subscription OnUpdatePeople($filter: ModelSubscriptionPeopleFilterInput) {
    onUpdatePeople(filter: $filter) {
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
export const onDeletePeople = /* GraphQL */ `
  subscription OnDeletePeople($filter: ModelSubscriptionPeopleFilterInput) {
    onDeletePeople(filter: $filter) {
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
export const onCreateNotificationsPeople = /* GraphQL */ `
  subscription OnCreateNotificationsPeople(
    $filter: ModelSubscriptionNotificationsPeopleFilterInput
  ) {
    onCreateNotificationsPeople(filter: $filter) {
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
export const onUpdateNotificationsPeople = /* GraphQL */ `
  subscription OnUpdateNotificationsPeople(
    $filter: ModelSubscriptionNotificationsPeopleFilterInput
  ) {
    onUpdateNotificationsPeople(filter: $filter) {
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
export const onDeleteNotificationsPeople = /* GraphQL */ `
  subscription OnDeleteNotificationsPeople(
    $filter: ModelSubscriptionNotificationsPeopleFilterInput
  ) {
    onDeleteNotificationsPeople(filter: $filter) {
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
export const onCreateRemindersPeople = /* GraphQL */ `
  subscription OnCreateRemindersPeople(
    $filter: ModelSubscriptionRemindersPeopleFilterInput
  ) {
    onCreateRemindersPeople(filter: $filter) {
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
export const onUpdateRemindersPeople = /* GraphQL */ `
  subscription OnUpdateRemindersPeople(
    $filter: ModelSubscriptionRemindersPeopleFilterInput
  ) {
    onUpdateRemindersPeople(filter: $filter) {
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
export const onDeleteRemindersPeople = /* GraphQL */ `
  subscription OnDeleteRemindersPeople(
    $filter: ModelSubscriptionRemindersPeopleFilterInput
  ) {
    onDeleteRemindersPeople(filter: $filter) {
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
export const onCreateChatRoomPeople = /* GraphQL */ `
  subscription OnCreateChatRoomPeople(
    $filter: ModelSubscriptionChatRoomPeopleFilterInput
  ) {
    onCreateChatRoomPeople(filter: $filter) {
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
export const onUpdateChatRoomPeople = /* GraphQL */ `
  subscription OnUpdateChatRoomPeople(
    $filter: ModelSubscriptionChatRoomPeopleFilterInput
  ) {
    onUpdateChatRoomPeople(filter: $filter) {
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
export const onDeleteChatRoomPeople = /* GraphQL */ `
  subscription OnDeleteChatRoomPeople(
    $filter: ModelSubscriptionChatRoomPeopleFilterInput
  ) {
    onDeleteChatRoomPeople(filter: $filter) {
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
export const onCreatePeopleFacility = /* GraphQL */ `
  subscription OnCreatePeopleFacility(
    $filter: ModelSubscriptionPeopleFacilityFilterInput
  ) {
    onCreatePeopleFacility(filter: $filter) {
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
export const onUpdatePeopleFacility = /* GraphQL */ `
  subscription OnUpdatePeopleFacility(
    $filter: ModelSubscriptionPeopleFacilityFilterInput
  ) {
    onUpdatePeopleFacility(filter: $filter) {
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
export const onDeletePeopleFacility = /* GraphQL */ `
  subscription OnDeletePeopleFacility(
    $filter: ModelSubscriptionPeopleFacilityFilterInput
  ) {
    onDeletePeopleFacility(filter: $filter) {
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
