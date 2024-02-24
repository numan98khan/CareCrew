import React, { useState, useEffect, useMemo } from "react";

import PageHeader from "../../components/Headers/PageHeader";
// import NavTab from "../../components/NavTab";
import NavTab from "../../components/NavTab";

import MarketplaceItem from "../../components/MarketplaceItem";
import MarketplaceModal from "../../components/MarketplaceItem/modal";

import { useAdmin, useAuth } from "../../context";

import { useListMarketplace, useListShifts } from "../../apolloql/schedules";

import { API, graphqlOperation, Auth } from "aws-amplify";

import {
  onCreateShifts,
  onDeleteShifts,
  onUpdateShifts,
} from "../../graphql/subscriptions";

import {
  useCreateTimecard,
  useListUpcomingTimecards,
} from "../../apolloql/timecards";
import { useListFacilities } from "../../apolloql/facilities";
import { useUpdateShift } from "../../apolloql/schedules";
import {
  displayTime,
  SuccessToast,
  ErrorToast,
  hasPermission,
  displayDate,
} from "../../services/micro";

import IconButton from "../../components/Button/IconButton";

import FilterIcon from "../../assets/icons/filter";
import themeStyles from "../../styles/theme.styles";
import MarketplaceFilterModal from "../../components/Drawers/MarketplaceFilterModal";
import { sendBulkMessages } from "../../services/messaging";
import { assignTimecards } from "../../services/timecards/services";
import { useCreateNotification } from "../../apolloql/notifications";

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const getDistanceFromLatLonInMiles = (lat1, lon1, lat2, lon2) => {
  const distanceInKm = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  const distanceInMiles = distanceInKm * 0.621371; // 1 km = 0.621371 miles
  return parseFloat(distanceInMiles.toFixed(2));
};
const Marketplace = () => {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [distance, setDistance] = useState("100");

  const [filters, setFilters] = useState({
    facility: undefined,
    employee: undefined,
    role: undefined,
    status: undefined,
    date: undefined,
    shift: undefined,
    shiftTimings: undefined,
  });

  const updateFilter = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const resetFilter = () => {
    setFilters({
      facility: undefined,
      employee: undefined,
      role: undefined,
      status: undefined,
      date: undefined,
      shift: undefined,
      shiftTimings: undefined,
    });
    setDistance("100");
  };

  const { user, personalData, permissions } = useAuth();

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const { timecards: upcomingShifts, loading: upcomingShiftsLoading } =
    useListUpcomingTimecards(
      user?.attributes?.sub,
      false,
      undefined //currentViewDate.toISOString().split("T")[0]
    );

  const [marketplaceItem, setMarketplaceItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    // console.log(selectedPeople);
    setModalIsOpen(false);
  };

  const [currentTab, setCurrentTab] = useState("All Shifts");
  const handleTabChange = (newTab) => {
    // setFilteredTimecards(enrichedTimecardsData);
    setCurrentTab(newTab);
  };

  const { shifts, refetch: refetchMarketplace } = useListMarketplace(
    filters?.facility, //facilityID,
    personalData?.role, //role,
    filters?.date //date
  );

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    async function fetchCurrentLocation() {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }

    fetchCurrentLocation();
  }, []);
  const marketplaceItems = useMemo(() => {
    // Get the current date and time
    const currentDateTime = new Date();

    const shiftPool = upcomingShifts.map((shift) => shift?.shiftsID);
    console.log(
      "🚀 ~ file: index.js:173 ~ marketplaceItems ~ upcomingShifts:",
      upcomingShifts,
      upcomingShiftsLoading
    );

    return shifts?.length
      ? shifts
          .filter((shift) => {
            const shiftEndDateTime = new Date(shift?.shiftStartDT);
            // console.log(
            //   "🚀 ~ file: index.js:185 ~ .filter ~ shiftEndDateTime:",
            //   shiftEndDateTime.toISOString(),
            //   currentDateTime.toISOString()
            // );

            // LOGIC START: Accept a shift only if the shifts aren't overlapping any times
            const hasOverlappingTimecard = upcomingShifts.some((timecard) => {
              const existingStart = new Date(timecard.desiredClockInTime);
              const existingEnd = new Date(timecard.desiredClockOutTime);
              const newStart = new Date(shift.shiftStartDT);
              const newEnd = new Date(shift.shiftEndDT);

              // Check for overlapping time ranges
              return (
                (newStart < existingEnd && newStart >= existingStart) || // New shift starts within an existing shift
                (newEnd > existingStart && newEnd <= existingEnd) || // New shift ends within an existing shift
                (existingStart >= newStart && existingEnd <= newEnd) || // New shift completely covers an existing shift
                (existingStart < newStart && existingEnd > newEnd) // Existing shift completely covers the new shift
              );
            });

            if (hasOverlappingTimecard) {
              return false;
            }

            if (shiftEndDateTime < currentDateTime) {
              return false;
            }

            if (shiftPool.includes(shift?.id)) {
              return false;
            }

            // // if (new Date()?.toISOString() > shift?.shiftStartDT) return false;
            // if (
            //   new Date().toISOString() >
            //   new Date(shift?.shiftStartDT).toISOString()
            // ) {
            //   console.log(
            //     "🚀 ~ file: index.js:193 ~ .filter ~ new Date(shift?.shiftStartDT):",
            //     new Date().toISOString(),
            //     shift?.shiftStartDT
            //   );
            //   return false;
            // }

            if (filters?.shiftTimings) {
              const [startFilter, endFilter] = filters?.shiftTimings.split("-");

              // Convert shiftStart and shiftEnd to minutes from midnight
              const [shiftStartHour, shiftStartMinute] = shift?.shiftStart
                .split(":")
                .map(Number);
              const [shiftEndHour, shiftEndMinute] = shift?.shiftEnd
                .split(":")
                .map(Number);
              const shiftStartInMinutes =
                shiftStartHour * 60 + shiftStartMinute;
              const shiftEndInMinutes = shiftEndHour * 60 + shiftEndMinute;

              // Convert filter start and end to minutes from midnight
              const [filterStartHour, filterStartMinute] = startFilter
                .split(":")
                .map(Number);
              const [filterEndHour, filterEndMinute] = endFilter
                .split(":")
                .map(Number);
              const filterStartInMinutes =
                filterStartHour * 60 + filterStartMinute;
              const filterEndInMinutes = filterEndHour * 60 + filterEndMinute;

              // Compare times
              if (
                shiftStartInMinutes < filterStartInMinutes ||
                shiftEndInMinutes > filterEndInMinutes
              ) {
                return false;
              }
            }

            // Replace this condition with your actual filter condition
            if (
              currentTab === "Preferred Shifts" &&
              personalData?.availability
            ) {
              const availability = JSON.parse(personalData?.availability);
              const facilityMatches = availability.facility
                ? availability.facility === shift.facilityID
                : true;

              // Extracting the day of the week from the shift's date object
              const shiftDate = new Date(shift.date);

              const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];

              const shiftDay = days[shiftDate.getDay()];

              const dayAvailability = availability.availability[shiftDay];
              // console.log(
              //   "🚀 ~ file: index.js:118 ~ .filter ~ dayAvailability:",
              //   shiftDay,
              //   dayAvailability,
              //   availability
              // );

              if (dayAvailability?.available) {
                const shiftStartTime = new Date(
                  `1970-01-01T${shift.shiftStart}`
                );
                const shiftEndTime = new Date(`1970-01-01T${shift.shiftEnd}`);
                const availableStartTime = new Date(
                  `1970-01-01T${dayAvailability.startTime}:00.000`
                );
                const availableEndTime = new Date(
                  `1970-01-01T${dayAvailability.endTime}:00.000`
                );

                // console.log(
                //   "🚀 ~ file: index.js:165 ~ marketplaceItems ~ dayAvailability:",
                //   shiftEndTime,
                //   availableEndTime,
                //   shiftStartTime >= availableStartTime &&
                //     shiftEndTime <= availableEndTime,
                //   facilityMatches
                // );

                const timeMatches =
                  shiftStartTime >= availableStartTime &&
                  shiftEndTime <= availableEndTime;

                return facilityMatches && timeMatches;
              }
              return false;
              // return (
              //   JSON.parse(personalData?.availability).facility === shift.facilityID
              // );
            }
            return true;
          })
          .sort((a, b) => {
            return new Date(a.shiftStartDT) - new Date(b.shiftStartDT);
          })
          .map((shift) => {
            const calcDist = getDistanceFromLatLonInMiles(
              currentLocation?.lat,
              currentLocation?.lng,
              shift?.facility?.lat,
              shift?.facility?.lng
            );
            // console.log("🚀 ~ file: index.js:283 ~ .map ~ calcDist:", calcDist);

            return {
              ...shift,
              isBooked: shiftPool.includes(shift?.id),
              distance: calcDist || 0,
            };
          })
          .filter((shift) => {
            if (distance <= 1) {
              return shift?.distance <= 1.0;
            }
            if (distance === "100") {
              return true;
            }

            return shift?.distance <= distance;
          })
      : [];
  }, [
    shifts,
    personalData,
    currentTab,
    currentLocation,
    filters?.shiftTimings,
    distance,
    upcomingShifts,
  ]);

  useEffect(() => {
    // setMarketplaceItem(marketplaceItems[0]);
    // setModalIsOpen(true);
  }, [marketplaceItems]);

  // const { people } = useAdmin();

  const navTabs = [
    { title: "All Shifts", amount: 0, isActive: true },
    { title: "Preferred Shifts", amount: 0, isActive: false },
  ];

  const { updateShiftQuery } = useUpdateShift();
  const { createTimecardQuery } = useCreateTimecard();

  /* WATCHERS START */
  useEffect(() => {
    const subscriptions = [];

    // Existing subscriptions for Shifts, Timecards, etc.

    // Subscriptions for Marketplace
    const onCreateMarketplaceSubscription = API.graphql(
      graphqlOperation(onCreateShifts)
    ).subscribe({
      next: ({
        value: {
          data: { onCreateShifts },
        },
      }) => {
        // Do something when a new marketplace item is created, maybe refetch data
        // refetchMarketplace(); //if you have such a function.
        if (refetchMarketplace) {
          refetchMarketplace();
        }
      },
      error: (error) => {
        console.error("Error with onCreateMarketplace subscription: ", error);
      },
    });
    subscriptions.push(onCreateMarketplaceSubscription);

    const onUpdateMarketplaceSubscription = API.graphql(
      graphqlOperation(onUpdateShifts)
    ).subscribe({
      next: ({
        value: {
          data: { onUpdateShifts },
        },
      }) => {
        // Do something when a marketplace item is updated, maybe refetch data
        // refetchMarketplace();
        if (refetchMarketplace) {
          refetchMarketplace();
        }
      },
      error: (error) => {
        console.error("Error with onUpdateMarketplace subscription: ", error);
      },
    });
    subscriptions.push(onUpdateMarketplaceSubscription);

    const onDeleteMarketplaceSubscription = API.graphql(
      graphqlOperation(onDeleteShifts)
    ).subscribe({
      next: ({
        value: {
          data: { onDeleteShifts },
        },
      }) => {
        // Do something when a marketplace item is deleted, maybe refetch data
        // refetchMarketplace();
        if (refetchMarketplace) {
          refetchMarketplace();
        }
      },
      error: (error) => {
        console.error("Error with onDeleteMarketplace subscription: ", error);
      },
    });
    subscriptions.push(onDeleteMarketplaceSubscription);

    // Cleanup Subscriptions on Component Unmount
    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, []);
  /* WATCHERS END */

  const { createNotificationQuery } = useCreateNotification();
  const [assignInProgress, setAssignInProgress] = useState(false);

  const onAssignShift = async () => {
    setAssignInProgress(true);

    await assignTimecards(
      marketplaceItem,
      createTimecardQuery,
      updateShiftQuery,
      user?.attributes?.sub,
      sendBulkMessages,
      createNotificationQuery,
      user,
      true
    );
    setAssignInProgress(false);
    closeModal();
  };

  return (
    <div className="flex flex-col min-h-full px-3 pb-3">
      <div className="flex flex-col mx-2">
        <div className="flex py-1 justify-start">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center">
              <PageHeader text={"Marketplace"} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white flex items-center justify-between ">
        <div className="flex flex-row pt-3">
          {navTabs.map((tab, index) => (
            <NavTab
              key={index}
              title={tab.title}
              isActive={currentTab === tab.title}
              onClick={() => handleTabChange(tab.title)}
            />
          ))}
        </div>
        <div className="px-2">
          <IconButton
            color={themeStyles.PRIMARY_LIGHT_COLOR}
            text={"Filter"}
            icon={<FilterIcon size={8} />}
            onClick={onOpen}
          />
        </div>
      </div>

      {/* Info Board */}
      {/* <div> */}
      <div
        // className="h-full bg-white flex flex-grow flex-wrap mt-2 p-3 rounded-lg  "
        className="h-full bg-white flex flex-wrap mt-2 p-3 rounded-lg  "
        // className="flex flex-wrap mb-3 bg-white h-full"
      >
        {marketplaceItems?.map((item, index) => {
          // console.log("item", item);
          return (
            <div className="w-1/3 flex py-1 px-2">
              <MarketplaceItem
                key={index}
                onClick={() => {
                  setMarketplaceItem(item);
                  setModalIsOpen(true);
                }}
                shift={item}
                numOfPositions={item.numOfPositions}
                facility={item?.facility?.facilityName}
                date={item.date}
                // date={item?.shiftStartDT}
                shiftTiming={
                  displayTime(item.shiftStartDT) +
                  " - " +
                  displayTime(item.shiftEndDT)
                }
                rate={item.rate}
                type={item.roleRequired}
                isIncentive={item.isIncentive}
                isGuarantee={item.isGuarantee}
                // isSelected={false}
                disabled={item.isBooked}
              />
            </div>
          );
        })}
      </div>
      <MarketplaceFilterModal
        open={open}
        onClose={onClose}
        filters={filters}
        updateFilter={updateFilter}
        resetFilter={resetFilter}
        distance={distance}
        setDistance={setDistance}
      />
      <MarketplaceModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        assignShift={onAssignShift}
        marketplaceItem={marketplaceItem}
        assignInProgress={assignInProgress}
      />
      {/* </div> */}
    </div>
  );
};

export default Marketplace;
