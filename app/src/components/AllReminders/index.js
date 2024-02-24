import React from "react";
import PageHeader from "../Headers/PageHeader";
import theme from "../../styles/theme.styles";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/Button/IconButton";
import SingleReminderTab from "./singleReminderTab";
import BackButton from "../../components/Button/BackButton";

import { useListReminders } from "../../apolloql/reminders";

function AllReminders({ onBackClick }) {
  const navigate = useNavigate();

  const { reminders } = useListReminders();

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex justify-start">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-2">
            <div onClick={onBackClick}>
              <BackButton />
            </div>
            <PageHeader text={"Reminders"} />
          </div>
          {/* <div className="flex items-center">
            <IconButton
              color={theme.SECONDARY_COLOR}
              text={"CREATE REMINDER"}
              // onClick={() => {
              //   navigate("/addshift");
              // }}
            />
          </div> */}
        </div>
      </div>

      <div className="h-fit w-full flex flex-col gap-2">
        {reminders?.map((reminder) => (
          <SingleReminderTab
            key={reminder.id}
            message={reminder.note}
            datetime={reminder.datetime}
            // onClick={() => {
            //   navigate("/addshift");
            // }}
          />
        ))}
        {/* // <SingleReminderTab /> */}
        {/* <SingleReminderTab />
        <SingleReminderTab /> */}
      </div>
    </div>
  );
}

export default AllReminders;
