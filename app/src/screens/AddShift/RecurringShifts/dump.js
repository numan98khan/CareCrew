import React, { useEffect, useState } from "react";
import Check from "../../../components/Check";
import RadioButton from "../../../components/Button/RadioButton";
import IconButton from "../../../components/Button/IconButton";

function RecurringShifts() {
  const [days, setDays] = useState([
    { day: "Mon", checked: false },
    { day: "Tue", checked: false },
    { day: "Wed", checked: false },
    { day: "Thu", checked: false },
    { day: "Fri", checked: false },
    { day: "Sat", checked: false },
    { day: "Sun", checked: false },
  ]);

  const toggleDay = (index) => {
    const newDays = [...days];
    newDays[index].checked = !newDays[index].checked;
    setDays(newDays);
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* First Row */}
      <div className="grid grid-cols-4 gap-4 pb-10">
        {["Facility", "Role", "Number of Positions", ["Date", "Duration"]].map(
          (value, i) =>
            typeof value === "string" ? (
              <div key={i} className="flex flex-col">
                <label className="mb-2 ml-2.5 text-base text-start font-bold">
                  {value}
                </label>
                <select className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2">
                  <option>Select Option {i + 1}</option>
                </select>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 ">
                {value.map((value2, i2) => (
                  <div key={i2} className="flex flex-col">
                    <label className="mb-2 ml-2.5 text-base text-start font-bold">
                      {value2}
                    </label>
                    <select className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2">
                      <option>Select Option {i2 + 1}</option>
                    </select>
                  </div>
                ))}
              </div>
            )
        )}
      </div>

      {/* Second Row */}
      <div className="flex flex-col pb-10">
        <label className="mb-6 text-base text-start font-bold">
          Select Recurring Shifts
        </label>
        <div className="flex flex-row">
          {days.map((dayObj, i) => {
            return (
              <div onClick={() => toggleDay(i)} className="flex flex-col mr-8">
                <Check value={dayObj.checked} />
                <span className=" text-RADIO_LABEL_COLOR flex">
                  {dayObj.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-3 gap-20">
        {/* First Column */}
        <div className="flex flex-col space-y-4">
          <label className="mb-2 flex text-base  text-start font-bold">
            Shift Time
          </label>
          {[
            "Morning Shift:  7:00AM - 3:00PM",
            "Noon Shift:  3:00PM - 11:00PM",
            "Night Shift:  11:00PM - 7:00AM",
          ].map((value, i) => (
            <label key={i} className="flex items-center space-x-2 ">
              <Check value={true} /> <span>{value}</span>
            </label>
          ))}
          <div className="flex flex-col pt-5">
            <label className="mb-2 ml-2.5 text-base text-start font-bold">
              Rate (per hour){" "}
            </label>
            <input
              type="text"
              className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-8 ml-2.5  text-base text-start font-bold">
              Cancellation Guarantee
            </label>
            <div className="flex space-x-4 ml-2.5 items-center">
              <RadioButton children="Yes" />
              <RadioButton children="No" />
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col space-y-4 col-span-1">
          <label className="flex items-center space-x-2">
            <Check value={true} />
            <span>Checkbox</span>
          </label>
          <div className="flex flex-row space-x-4">
            <div className="flex-grow">
              <label className="mb-2 flex text-base ml-2.5 text-start font-bold">
                Start Time
              </label>
              <div className="flex justify-around">
                <input
                  type="text"
                  placeholder="Time"
                  className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2 w-2/5 font-bold"
                  value="8:00"
                />
                <select className="rounded-full font-bold bg-TEXT_FIELD_BACKGROUND p-2 w-2/5">
                  {" "}
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
            <div className="flex-grow">
              <label className="mb-2 flex text-base ml-2.5 text-start font-bold">
                End Time
              </label>
              <div className="flex justify-around">
                <input
                  type="text"
                  placeholder="Time"
                  className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2 w-2/5 font-bold"
                  value="4:00"
                />
                <select className="rounded-full font-bold bg-TEXT_FIELD_BACKGROUND p-2 w-2/5">
                  <option>AM</option>
                  <option selected>PM</option>
                </select>
              </div>
            </div>
          </div>

          {["Floor number", "Supervisor"].map((value, i) => (
            <div key={i} className="flex flex-col">
              <label className="mb-2 flex text-base ml-2.5 text-start font-bold">
                {value}
              </label>
              <input
                type="text"
                className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"
              />
            </div>
          ))}
        </div>

        {/* Third Column */}
        <div className="flex flex-col space-y-4 col-span-1">
          <div>
            <label className="mb-2 flex text-base ml-2.5 text-start font-bold">
              Incentives
            </label>
            <div className="flex space-x-4 items-center">
              <RadioButton children="Yes" />
              <RadioButton children="No" />
              <select className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2 flex-grow">
                <option>Instacare</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-2 flex text-base ml-2.5 text-start font-bold">
              Incentive Type
            </label>
            <div className="flex space-x-4 items-center">
              <RadioButton children="$/hr" />
              <RadioButton children="Fixed" />
              <input
                className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2 w-full"
                value={10}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 flex text-base ml-2.5 text-start font-bold">
              Notes
            </label>
            <textarea className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"></textarea>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Fourth Row */}
      <div className="flex justify-between w-80">
        <IconButton
          text={<strong>POST</strong>}
          height={50}
          width={150}
          fontSize={14}
        />
        <IconButton
          text={<strong>ASSIGN</strong>}
          height={50}
          width={150}
          fontSize={14}
        />
      </div>
    </div>
  );
}

export default RecurringShifts;
