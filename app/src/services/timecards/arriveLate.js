// const arriveLateFunction = async () => {
//   try {
//     const updatedTimecard = {
//       id: upcomingShiftDetails.id,
//       isLate: true,
//       lateReason: `${lateReason} - (${lateBy})`,
//       _version: upcomingShiftDetails._version,
//     };
//     await updateTimecardQuery(updatedTimecard);
//     SuccessToast("Shift Arrived Late");
//   } catch (error) {
//     console.error(error);
//     ErrorToast("An error occurred while arrving late shift");
//   }
// };
