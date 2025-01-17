import React, { useEffect } from "react";

import PageHeader from "../../components/Headers/PageHeader";
import InfoTitle from "../../components/Headers/InfoTitle";
import DropDown from "../../components/DropDown";
import Check from "../../components/Check";
import Button from "../../components/Button";

import theme from "../../styles/theme.styles";
import { useState } from "react";
import { Checkbox } from "@material-tailwind/react";

import { useListFacilities } from "../../apolloql/facilities";
import { useGetPeople, useUpdatePeople } from "../../apolloql/people";

import { useAuth } from "../../context";

import ClipLoader from "react-spinners/ClipLoader";

import FadeLoader from "react-spinners/FadeLoader";

import moment from "moment";
import { ErrorToast, SuccessToast } from "../../services/micro";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MyAvailability = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const { facilities } = useListFacilities();
  const { person } = useGetPeople(user?.attributes?.sub);
  const { updatePeopleQuery } = useUpdatePeople();

  const [hourOptions, setHourOptions] = useState([]);
  const [hourOptionsLabels, setHourOptionsLabels] = useState([]);
  const [weekOptions, setWeekOptions] = useState([]);
  const [allowedEndTimes, setAllowedEndTimes] = useState({});

  const [week, setWeek] = useState(null);
  const [facility, setFacility] = useState(null);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    if (person && person.availability) {
      const availabilityData = JSON.parse(person.availability);
      setAvailability(availabilityData.availability);
      setWeek(availabilityData.week);
      setFacility(availabilityData.facility);
      setIsLoading(false); // Set loading to false
    }
  }, [person]);

  // Dynamic hourOptions from 07:00 to 16:00
  useEffect(() => {
    const hours = [];
    for (let i = 0; i <= 23; i++) {
      hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
    }
    setHourOptions(hours);
  }, []);

  useEffect(() => {
    const hours = [];
    for (let i = 0; i <= 23; i++) {
      let formattedHour = i % 12 || 12; // get the hour in 12-hour format
      const amPm = i < 12 ? "AM" : "PM";
      hours.push(`${formattedHour}:00 ${amPm}`);
    }
    setHourOptionsLabels(hours);
  }, []);

  const isDayInPast = (day) => {
    if (!week) {
      return;
    }
    const selectedWeekStart = moment(week?.split(" - ")[0], "D MMMM YYYY");
    const dayOffset = DAYS.indexOf(day);
    const dayDate = selectedWeekStart.add(dayOffset, "days");
    return dayDate.isBefore(moment(), "day");
  };
  // // Dynamic weekOptions for next 3 weeks from now
  // useEffect(() => {
  //   const weeks = ["All"];
  //   for (let i = 0; i < 8; i++) {
  //     const startOfWeek = moment()
  //       .locale("en-us") // Set locale to British English to start the week on Monday
  //       .add(i, "weeks")
  //       .startOf("week")
  //       .format("D MMMM YYYY");
  //     const endOfWeek = moment()
  //       .locale("en-us") // Set locale to British English to start the week on Monday
  //       .add(i, "weeks")
  //       .endOf("week")
  //       .format("D MMMM YYYY");
  //     weeks.push(`${startOfWeek} - ${endOfWeek}`);
  //   }

  //   setWeekOptions(weeks);
  // }, []);

  // Dynamic weekOptions for next 3 weeks from now
  useEffect(() => {
    const weeks = ["All"];
    for (let i = 0; i < 8; i++) {
      const startOfWeek = moment()
        .add(i, "weeks")
        .startOf("isoWeek") // isoWeek starts on Monday
        .format("D MMMM YYYY");
      const endOfWeek = moment()
        .add(i, "weeks")
        .endOf("isoWeek") // isoWeek ends on Sunday
        .format("D MMMM YYYY");
      weeks.push(`${startOfWeek} - ${endOfWeek}`);
    }

    setWeekOptions(weeks);
  }, []);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleAvailabilityChange = (day, time, value) => {
    setAvailability({
      ...availability,
      [day]: { ...availability?.[day], [time]: value },
    });
  };

  const handleCheckChange = (day) => {
    const updatedAvailability = {
      ...availability,
      [day]: {
        ...availability?.[day],
        available: !availability?.[day]?.available,
      },
    };

    setAvailability(updatedAvailability);
  };

  const handleUpdateAvailability = async () => {
    try {
      const data = {
        week,
        facility,
        availability,
      };

      // Create a copy of the person object
      const updatedPerson = {
        id: person.id,
        availability: JSON.stringify(data),
        _version: person._version,
      };

      await updatePeopleQuery(updatedPerson, person._version);

      // Optionally, you can add a success toast or message here
      SuccessToast("Availability updated successfully");
    } catch (error) {
      console.error("Error updating availability:", error);

      // Optionally, display an error toast or message to inform the user
      ErrorToast("An error occurred while updating availability.");
    }
  };

  const handleStartTimeChange = (day, value) => {
    handleAvailabilityChange(day, "startTime", value);

    // Find the index of the selected start time in the hourOptions array
    const selectedIndex = hourOptions.findIndex((hour) => hour === value);

    // Slice the hourOptions array to get end times that come after the selected start time
    const updatedEndTimes = hourOptions.slice(selectedIndex + 1);

    // Update the allowed end times
    setAllowedEndTimes((prev) => ({
      ...prev,
      [day]: updatedEndTimes,
    }));

    // Reset the selected end time for the day
    handleAvailabilityChange(day, "endTime", null);
  };

  const [offsetHours, setOffsetHours] = useState(null);

  return (
    <div className="flex flex-col min-h-max px-3 pb-3">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <FadeLoader size={100} color={theme.PRIMARY_COLOR} />
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex py-1 justify-between">
              <div className="flex items-center">
                <PageHeader text={"My Availability"} />
                <div className="mx-1" />
                {/* <div className="">
              <DateDropDown text={"18 March 2023"} />
            </div> */}
              </div>
            </div>
          </div>

          <div className="h-full bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between">
            <div className="flex flex-col w-1/4">
              <div className="flex flex-col text-left">
                <InfoTitle text={"Week"} />
                <div className="my-1" />

                <DropDown
                  placeholder={"Select week"}
                  value={week}
                  setValue={setWeek}
                  options={weekOptions}
                />
              </div>

              <div className="my-2" />

              {days.map((day, index) => (
                <div className="flex-1" key={day}>
                  <div
                    className=" flex flex-row"
                    style={{
                      opacity: isDayInPast(day) ? 0.4 : 1,
                      pointerEvents: isDayInPast(day) ? "none" : "",
                    }}
                  >
                    <div className="flex flex-col text-left w-[40%]">
                      {index === 0 ? (
                        <>
                          <InfoTitle text={"Select Days"} />{" "}
                          <div className="my-1" />{" "}
                        </>
                      ) : null}
                      <div
                        className="bg-PRIMARY_NEUTRAL_COLOR flex flex-row h-full p-2 items-center rounded-xl"
                        // onClick={() => handleCheckChange(day)}
                      >
                        <Check
                          value={availability?.[day]?.available}
                          onChange={() => handleCheckChange(day)}
                        />
                        <div className="mx-1" />
                        <label className="text-xs">{day}</label>
                      </div>
                    </div>
                    <div className="mx-1" />
                    <div className="flex flex-col text-left w-[60%] ">
                      {index === 0 ? (
                        <>
                          <InfoTitle text={"Select Time"} />
                          <div className="my-1" />{" "}
                        </>
                      ) : null}
                      <div className="flex flex-row w-full">
                        <DropDown
                          placeholder={"Start"}
                          options={hourOptions}
                          labels={hourOptionsLabels}
                          value={availability?.[day]?.startTime}
                          setValue={
                            (value) => {
                              handleAvailabilityChange(day, "startTime", value);
                              // Parse the hour from the selected value to get the nth hour of the day
                              const nthHour = parseInt(value.split(":")[0]);

                              // Update the state with the offset (nth hour)
                              setOffsetHours(nthHour);
                            }
                            // handleStartTimeChange(value)
                          }
                          disabled={!availability?.[day]?.available}
                        />
                        <div className="mx-1" />
                        <DropDown
                          placeholder={"End"}
                          options={hourOptions.slice(offsetHours + 1)}
                          labels={hourOptionsLabels.slice(offsetHours + 1)}
                          value={availability?.[day]?.endTime}
                          setValue={(value) =>
                            handleAvailabilityChange(day, "endTime", value)
                          }
                          disabled={!availability?.[day]?.available}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-1" />
                </div>
              ))}

              <div className="my-2" />

              <div className="flex flex-col text-left">
                <InfoTitle text={"My Preferred Facility"} />
                <div className="my-1" />

                <DropDown
                  placeholder={"Select Facility"}
                  value={facility}
                  setValue={setFacility}
                  options={facilities?.map((obj) => obj.id)}
                  labels={facilities?.map((obj) => obj.facilityName)}
                  // label={}
                />
              </div>

              <div className="my-4" />

              <div className="flex justify-center mt-4">
                <Button children={"Save"} onClick={handleUpdateAvailability} />
                {/* <div color="blue" ripple="light" onClick={handleShowData}>
              Show Data
            </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyAvailability;
