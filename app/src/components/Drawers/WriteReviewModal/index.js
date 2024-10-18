import React, { useEffect, useState, useMemo } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import themeStyles from "../../../styles/theme.styles";
import Button from "../../Button";
import StarRating from "../../StarRating";
import InputField from "../../Input";

import { useCreateReview } from "../../../apolloql/reviews";
import { ErrorToast, SuccessToast } from "../../../services/micro";

function WriteReviewModal({ open, onClose, subtitle, peopleID }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const { createReview } = useCreateReview();

  const submitReview = async () => {
    try {
      await createReview({
        rating: rating,
        review: review,
        facilityName: "CareCrew Admin",
        peopleID: peopleID,
      });
      // Optionally, provide feedback that the review was created successfully
      // alert("Review submitted successfully!");
      SuccessToast("Review submitted successfully!");
      // Optionally, reset the form fields
      setRating(0);
      setReview("");
      // Optionally, close the modal after successful submission
      onClose();
    } catch (error) {
      console.error("Failed to submit the review:", error.message);

      // alert("Failed to submit the review. Please try again.");
      ErrorToast("Failed to submit the review. Please try again.");
    }
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        direction="right"
        className="bla bla bla"
        overlayOpacity={0}
        style={{ bottom: "0", top: "initial", height: "94vh", width: "300px" }}
      >
        <div className=" flex h-full w-full relative justify-center items-center">
          <div
            style={{ backgroundColor: themeStyles.PRIMARY_LIGHT_COLOR }}
            className="absolute w-full h-1 top-0"
          />

          <div
            className="h-full py-4 space-y-2"
            // style={{ height: "95%", width: "87%" }}
          >
            <div className="flex flex-col text-left w-full row-auto justify-between items-start">
              <p style={{ fontSize: "24px" }} className="text-xl font-bold">
                Write Review
              </p>
              <p>{subtitle}</p>
            </div>

            <StarRating rating={rating} setRating={setRating} />

            <InputField
              value={review}
              setValue={setReview}
              placeholder={"Write your review here"}
              multiline
            />

            <div className="flex flex-row mt-10 mb-10 w-full h-fit gap-3">
              <Button onClick={submitReview} children={"SUBMIT"} />
              <Button
                // onClick={handleResetFilter}
                color={"#C4C4C4"}
                children={"CANCEL"}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default WriteReviewModal;
