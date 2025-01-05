import React from "react";

function Reports() {
  return (
    <div className="flex flex-col min-h-max px-3 pb-3">
      <iframe
        src="http://localhost:8501/" // Replace this URL with the URL of the web app you want to reference
        title="Reports"
        style={{
          width: "100%",
          height: "90vh",
          border: "none",
        }}
      ></iframe>
    </div>
  );
}

export default Reports;
