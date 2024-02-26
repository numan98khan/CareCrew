/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRequests = /* GraphQL */ `
  mutation CreateRequests(
    $input: CreateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    createRequests(input: $input, condition: $condition) {
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
export const updateRequests = /* GraphQL */ `
  mutation UpdateRequests(
    $input: UpdateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    updateRequests(input: $input, condition: $condition) {
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
export const deleteRequests = /* GraphQL */ `
  mutation DeleteRequests(
    $input: DeleteRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    deleteRequests(input: $input, condition: $condition) {
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
export const createBilling = /* GraphQL */ `
  mutation CreateBilling(
    $input: CreateBillingInput!
    $condition: ModelBillingConditionInput
  ) {
    createBilling(input: $input, condition: $condition) {
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
export const updateBilling = /* GraphQL */ `
  mutation UpdateBilling(
    $input: UpdateBillingInput!
    $condition: ModelBillingConditionInput
  ) {
    updateBilling(input: $input, condition: $condition) {
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
export const deleteBilling = /* GraphQL */ `
  mutation DeleteBilling(
    $input: DeleteBillingInput!
    $condition: ModelBillingConditionInput
  ) {
    deleteBilling(input: $input, condition: $condition) {
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
export const createReviews = /* GraphQL */ `
  mutation CreateReviews(
    $input: CreateReviewsInput!
    $condition: ModelReviewsConditionInput
  ) {
    createReviews(input: $input, condition: $condition) {
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
export const updateReviews = /* GraphQL */ `
  mutation UpdateReviews(
    $input: UpdateReviewsInput!
    $condition: ModelReviewsConditionInput
  ) {
    updateReviews(input: $input, condition: $condition) {
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
export const deleteReviews = /* GraphQL */ `
  mutation DeleteReviews(
    $input: DeleteReviewsInput!
    $condition: ModelReviewsConditionInput
  ) {
    deleteReviews(input: $input, condition: $condition) {
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
export const createNotifications = /* GraphQL */ `
  mutation CreateNotifications(
    $input: CreateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    createNotifications(input: $input, condition: $condition) {
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
export const updateNotifications = /* GraphQL */ `
  mutation UpdateNotifications(
    $input: UpdateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    updateNotifications(input: $input, condition: $condition) {
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
export const deleteNotifications = /* GraphQL */ `
  mutation DeleteNotifications(
    $input: DeleteNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    deleteNotifications(input: $input, condition: $condition) {
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
export const createReminders = /* GraphQL */ `
  mutation CreateReminders(
    $input: CreateRemindersInput!
    $condition: ModelRemindersConditionInput
  ) {
    createReminders(input: $input, condition: $condition) {
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
export const updateReminders = /* GraphQL */ `
  mutation UpdateReminders(
    $input: UpdateRemindersInput!
    $condition: ModelRemindersConditionInput
  ) {
    updateReminders(input: $input, condition: $condition) {
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
export const deleteReminders = /* GraphQL */ `
  mutation DeleteReminders(
    $input: DeleteRemindersInput!
    $condition: ModelRemindersConditionInput
  ) {
    deleteReminders(input: $input, condition: $condition) {
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
export const createFCMLookup = /* GraphQL */ `
  mutation CreateFCMLookup(
    $input: CreateFCMLookupInput!
    $condition: ModelFCMLookupConditionInput
  ) {
    createFCMLookup(input: $input, condition: $condition) {
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
export const updateFCMLookup = /* GraphQL */ `
  mutation UpdateFCMLookup(
    $input: UpdateFCMLookupInput!
    $condition: ModelFCMLookupConditionInput
  ) {
    updateFCMLookup(input: $input, condition: $condition) {
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
export const deleteFCMLookup = /* GraphQL */ `
  mutation DeleteFCMLookup(
    $input: DeleteFCMLookupInput!
    $condition: ModelFCMLookupConditionInput
  ) {
    deleteFCMLookup(input: $input, condition: $condition) {
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
export const createAccountLimitsLookup = /* GraphQL */ `
  mutation CreateAccountLimitsLookup(
    $input: CreateAccountLimitsLookupInput!
    $condition: ModelAccountLimitsLookupConditionInput
  ) {
    createAccountLimitsLookup(input: $input, condition: $condition) {
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
export const updateAccountLimitsLookup = /* GraphQL */ `
  mutation UpdateAccountLimitsLookup(
    $input: UpdateAccountLimitsLookupInput!
    $condition: ModelAccountLimitsLookupConditionInput
  ) {
    updateAccountLimitsLookup(input: $input, condition: $condition) {
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
export const deleteAccountLimitsLookup = /* GraphQL */ `
  mutation DeleteAccountLimitsLookup(
    $input: DeleteAccountLimitsLookupInput!
    $condition: ModelAccountLimitsLookupConditionInput
  ) {
    deleteAccountLimitsLookup(input: $input, condition: $condition) {
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
export const createInvoice = /* GraphQL */ `
  mutation CreateInvoice(
    $input: CreateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    createInvoice(input: $input, condition: $condition) {
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
export const updateInvoice = /* GraphQL */ `
  mutation UpdateInvoice(
    $input: UpdateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    updateInvoice(input: $input, condition: $condition) {
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
export const deleteInvoice = /* GraphQL */ `
  mutation DeleteInvoice(
    $input: DeleteInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    deleteInvoice(input: $input, condition: $condition) {
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
export const createSupportTickets = /* GraphQL */ `
  mutation CreateSupportTickets(
    $input: CreateSupportTicketsInput!
    $condition: ModelSupportTicketsConditionInput
  ) {
    createSupportTickets(input: $input, condition: $condition) {
      id
      details
      reasonID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSupportTickets = /* GraphQL */ `
  mutation UpdateSupportTickets(
    $input: UpdateSupportTicketsInput!
    $condition: ModelSupportTicketsConditionInput
  ) {
    updateSupportTickets(input: $input, condition: $condition) {
      id
      details
      reasonID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSupportTickets = /* GraphQL */ `
  mutation DeleteSupportTickets(
    $input: DeleteSupportTicketsInput!
    $condition: ModelSupportTicketsConditionInput
  ) {
    deleteSupportTickets(input: $input, condition: $condition) {
      id
      details
      reasonID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createReason = /* GraphQL */ `
  mutation CreateReason(
    $input: CreateReasonInput!
    $condition: ModelReasonConditionInput
  ) {
    createReason(input: $input, condition: $condition) {
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
export const updateReason = /* GraphQL */ `
  mutation UpdateReason(
    $input: UpdateReasonInput!
    $condition: ModelReasonConditionInput
  ) {
    updateReason(input: $input, condition: $condition) {
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
export const deleteReason = /* GraphQL */ `
  mutation DeleteReason(
    $input: DeleteReasonInput!
    $condition: ModelReasonConditionInput
  ) {
    deleteReason(input: $input, condition: $condition) {
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
export const createPoints = /* GraphQL */ `
  mutation CreatePoints(
    $input: CreatePointsInput!
    $condition: ModelPointsConditionInput
  ) {
    createPoints(input: $input, condition: $condition) {
      id
      reason
      point
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePoints = /* GraphQL */ `
  mutation UpdatePoints(
    $input: UpdatePointsInput!
    $condition: ModelPointsConditionInput
  ) {
    updatePoints(input: $input, condition: $condition) {
      id
      reason
      point
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePoints = /* GraphQL */ `
  mutation DeletePoints(
    $input: DeletePointsInput!
    $condition: ModelPointsConditionInput
  ) {
    deletePoints(input: $input, condition: $condition) {
      id
      reason
      point
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTemplates = /* GraphQL */ `
  mutation CreateTemplates(
    $input: CreateTemplatesInput!
    $condition: ModelTemplatesConditionInput
  ) {
    createTemplates(input: $input, condition: $condition) {
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
export const updateTemplates = /* GraphQL */ `
  mutation UpdateTemplates(
    $input: UpdateTemplatesInput!
    $condition: ModelTemplatesConditionInput
  ) {
    updateTemplates(input: $input, condition: $condition) {
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
export const deleteTemplates = /* GraphQL */ `
  mutation DeleteTemplates(
    $input: DeleteTemplatesInput!
    $condition: ModelTemplatesConditionInput
  ) {
    deleteTemplates(input: $input, condition: $condition) {
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
export const createNews = /* GraphQL */ `
  mutation CreateNews(
    $input: CreateNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    createNews(input: $input, condition: $condition) {
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
export const updateNews = /* GraphQL */ `
  mutation UpdateNews(
    $input: UpdateNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    updateNews(input: $input, condition: $condition) {
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
export const deleteNews = /* GraphQL */ `
  mutation DeleteNews(
    $input: DeleteNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    deleteNews(input: $input, condition: $condition) {
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
export const createManualTimecard = /* GraphQL */ `
  mutation CreateManualTimecard(
    $input: CreateManualTimecardInput!
    $condition: ModelManualTimecardConditionInput
  ) {
    createManualTimecard(input: $input, condition: $condition) {
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
export const updateManualTimecard = /* GraphQL */ `
  mutation UpdateManualTimecard(
    $input: UpdateManualTimecardInput!
    $condition: ModelManualTimecardConditionInput
  ) {
    updateManualTimecard(input: $input, condition: $condition) {
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
export const deleteManualTimecard = /* GraphQL */ `
  mutation DeleteManualTimecard(
    $input: DeleteManualTimecardInput!
    $condition: ModelManualTimecardConditionInput
  ) {
    deleteManualTimecard(input: $input, condition: $condition) {
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
export const createTimecard = /* GraphQL */ `
  mutation CreateTimecard(
    $input: CreateTimecardInput!
    $condition: ModelTimecardConditionInput
  ) {
    createTimecard(input: $input, condition: $condition) {
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
export const updateTimecard = /* GraphQL */ `
  mutation UpdateTimecard(
    $input: UpdateTimecardInput!
    $condition: ModelTimecardConditionInput
  ) {
    updateTimecard(input: $input, condition: $condition) {
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
export const deleteTimecard = /* GraphQL */ `
  mutation DeleteTimecard(
    $input: DeleteTimecardInput!
    $condition: ModelTimecardConditionInput
  ) {
    deleteTimecard(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createShifts = /* GraphQL */ `
  mutation CreateShifts(
    $input: CreateShiftsInput!
    $condition: ModelShiftsConditionInput
  ) {
    createShifts(input: $input, condition: $condition) {
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
export const updateShifts = /* GraphQL */ `
  mutation UpdateShifts(
    $input: UpdateShiftsInput!
    $condition: ModelShiftsConditionInput
  ) {
    updateShifts(input: $input, condition: $condition) {
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
export const deleteShifts = /* GraphQL */ `
  mutation DeleteShifts(
    $input: DeleteShiftsInput!
    $condition: ModelShiftsConditionInput
  ) {
    deleteShifts(input: $input, condition: $condition) {
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
export const createFacility = /* GraphQL */ `
  mutation CreateFacility(
    $input: CreateFacilityInput!
    $condition: ModelFacilityConditionInput
  ) {
    createFacility(input: $input, condition: $condition) {
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
export const updateFacility = /* GraphQL */ `
  mutation UpdateFacility(
    $input: UpdateFacilityInput!
    $condition: ModelFacilityConditionInput
  ) {
    updateFacility(input: $input, condition: $condition) {
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
export const deleteFacility = /* GraphQL */ `
  mutation DeleteFacility(
    $input: DeleteFacilityInput!
    $condition: ModelFacilityConditionInput
  ) {
    deleteFacility(input: $input, condition: $condition) {
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
export const createIDCounter = /* GraphQL */ `
  mutation CreateIDCounter(
    $input: CreateIDCounterInput!
    $condition: ModelIDCounterConditionInput
  ) {
    createIDCounter(input: $input, condition: $condition) {
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
export const updateIDCounter = /* GraphQL */ `
  mutation UpdateIDCounter(
    $input: UpdateIDCounterInput!
    $condition: ModelIDCounterConditionInput
  ) {
    updateIDCounter(input: $input, condition: $condition) {
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
export const deleteIDCounter = /* GraphQL */ `
  mutation DeleteIDCounter(
    $input: DeleteIDCounterInput!
    $condition: ModelIDCounterConditionInput
  ) {
    deleteIDCounter(input: $input, condition: $condition) {
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
export const createDocuments = /* GraphQL */ `
  mutation CreateDocuments(
    $input: CreateDocumentsInput!
    $condition: ModelDocumentsConditionInput
  ) {
    createDocuments(input: $input, condition: $condition) {
      id
      docURL
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateDocuments = /* GraphQL */ `
  mutation UpdateDocuments(
    $input: UpdateDocumentsInput!
    $condition: ModelDocumentsConditionInput
  ) {
    updateDocuments(input: $input, condition: $condition) {
      id
      docURL
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDocuments = /* GraphQL */ `
  mutation DeleteDocuments(
    $input: DeleteDocumentsInput!
    $condition: ModelDocumentsConditionInput
  ) {
    deleteDocuments(input: $input, condition: $condition) {
      id
      docURL
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTimecardGEOEvents = /* GraphQL */ `
  mutation CreateTimecardGEOEvents(
    $input: CreateTimecardGEOEventsInput!
    $condition: ModelTimecardGEOEventsConditionInput
  ) {
    createTimecardGEOEvents(input: $input, condition: $condition) {
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
export const updateTimecardGEOEvents = /* GraphQL */ `
  mutation UpdateTimecardGEOEvents(
    $input: UpdateTimecardGEOEventsInput!
    $condition: ModelTimecardGEOEventsConditionInput
  ) {
    updateTimecardGEOEvents(input: $input, condition: $condition) {
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
export const deleteTimecardGEOEvents = /* GraphQL */ `
  mutation DeleteTimecardGEOEvents(
    $input: DeleteTimecardGEOEventsInput!
    $condition: ModelTimecardGEOEventsConditionInput
  ) {
    deleteTimecardGEOEvents(input: $input, condition: $condition) {
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
export const createPeople = /* GraphQL */ `
  mutation CreatePeople(
    $input: CreatePeopleInput!
    $condition: ModelPeopleConditionInput
  ) {
    createPeople(input: $input, condition: $condition) {
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
export const updatePeople = /* GraphQL */ `
  mutation UpdatePeople(
    $input: UpdatePeopleInput!
    $condition: ModelPeopleConditionInput
  ) {
    updatePeople(input: $input, condition: $condition) {
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
export const deletePeople = /* GraphQL */ `
  mutation DeletePeople(
    $input: DeletePeopleInput!
    $condition: ModelPeopleConditionInput
  ) {
    deletePeople(input: $input, condition: $condition) {
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
export const createNotificationsPeople = /* GraphQL */ `
  mutation CreateNotificationsPeople(
    $input: CreateNotificationsPeopleInput!
    $condition: ModelNotificationsPeopleConditionInput
  ) {
    createNotificationsPeople(input: $input, condition: $condition) {
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
export const updateNotificationsPeople = /* GraphQL */ `
  mutation UpdateNotificationsPeople(
    $input: UpdateNotificationsPeopleInput!
    $condition: ModelNotificationsPeopleConditionInput
  ) {
    updateNotificationsPeople(input: $input, condition: $condition) {
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
export const deleteNotificationsPeople = /* GraphQL */ `
  mutation DeleteNotificationsPeople(
    $input: DeleteNotificationsPeopleInput!
    $condition: ModelNotificationsPeopleConditionInput
  ) {
    deleteNotificationsPeople(input: $input, condition: $condition) {
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
export const createRemindersPeople = /* GraphQL */ `
  mutation CreateRemindersPeople(
    $input: CreateRemindersPeopleInput!
    $condition: ModelRemindersPeopleConditionInput
  ) {
    createRemindersPeople(input: $input, condition: $condition) {
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
export const updateRemindersPeople = /* GraphQL */ `
  mutation UpdateRemindersPeople(
    $input: UpdateRemindersPeopleInput!
    $condition: ModelRemindersPeopleConditionInput
  ) {
    updateRemindersPeople(input: $input, condition: $condition) {
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
export const deleteRemindersPeople = /* GraphQL */ `
  mutation DeleteRemindersPeople(
    $input: DeleteRemindersPeopleInput!
    $condition: ModelRemindersPeopleConditionInput
  ) {
    deleteRemindersPeople(input: $input, condition: $condition) {
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
export const createChatRoomPeople = /* GraphQL */ `
  mutation CreateChatRoomPeople(
    $input: CreateChatRoomPeopleInput!
    $condition: ModelChatRoomPeopleConditionInput
  ) {
    createChatRoomPeople(input: $input, condition: $condition) {
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
export const updateChatRoomPeople = /* GraphQL */ `
  mutation UpdateChatRoomPeople(
    $input: UpdateChatRoomPeopleInput!
    $condition: ModelChatRoomPeopleConditionInput
  ) {
    updateChatRoomPeople(input: $input, condition: $condition) {
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
export const deleteChatRoomPeople = /* GraphQL */ `
  mutation DeleteChatRoomPeople(
    $input: DeleteChatRoomPeopleInput!
    $condition: ModelChatRoomPeopleConditionInput
  ) {
    deleteChatRoomPeople(input: $input, condition: $condition) {
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
export const createPeopleFacility = /* GraphQL */ `
  mutation CreatePeopleFacility(
    $input: CreatePeopleFacilityInput!
    $condition: ModelPeopleFacilityConditionInput
  ) {
    createPeopleFacility(input: $input, condition: $condition) {
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
export const updatePeopleFacility = /* GraphQL */ `
  mutation UpdatePeopleFacility(
    $input: UpdatePeopleFacilityInput!
    $condition: ModelPeopleFacilityConditionInput
  ) {
    updatePeopleFacility(input: $input, condition: $condition) {
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
export const deletePeopleFacility = /* GraphQL */ `
  mutation DeletePeopleFacility(
    $input: DeletePeopleFacilityInput!
    $condition: ModelPeopleFacilityConditionInput
  ) {
    deletePeopleFacility(input: $input, condition: $condition) {
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
