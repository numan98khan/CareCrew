import React, { useState } from "react";
import { useListReviews } from "../../../apolloql/reviews";
import GoldenStar from "../../../assets/icons/GoldenStar";
import Button from "../../../components/Button";
import WriteReviewModal from "../../../components/Drawers/WriteReviewModal";
import StarRating from "../../../components/StarRating";
import { ADMIN } from "../../../constants/userTypes";

const NurseReviews = ({ people, type, canWriteReview }) => {
  const { reviews } = useListReviews(people.id);

  const [open, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{ maxHeight: "60vh" }}
      className="min-h p-3 mt-3  bg-white overflow-y-scroll"
    >
      <div className="flex flex-col text-left">
        {reviews?.map((row, index) => (
          <div className="flex flex-col p-4 mb-4" key={index}>
            <p
              // style={{ fontSize: "12px", opacity: 0.6 }}
              className="mb-2 text-xs text-greycus"
            >
              {row.review}
            </p>
            <p className="text-xs font-medium mb-2">
              {"~ "}
              {row.facilityName}
            </p>
            <div className="flex items-center">
              <div className="flex items-center">
                <StarRating minimal rating={row.rating} />
                <span className="ml-3 text-xs font-semibold">
                  {row.rating}/5
                </span>
              </div>
            </div>
          </div>
        ))}

        {canWriteReview ? (
          <>
            <div className="w-1/6">
              <Button children={"Write Review"} onClick={onOpen} />
            </div>
            <WriteReviewModal
              subtitle={people?.firstName + " " + people?.lastName}
              open={open}
              onClose={onClose}
              peopleID={people.id}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default NurseReviews;
