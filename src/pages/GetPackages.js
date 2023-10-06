import React, { useEffect, useState } from "react";

export default function GetPackages() {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    fetch("https://api.bumrungraddiscover.com/api/get/package")
      .then((res) => res.json())
      .then((data) => setPackages(data.response.data));
  });
  return (
    <div className="mx-5 my-5 md:container md:mx-auto p-10 bg-white rounded-xl shadow-xl">
      <p className="text-2xl font-semibold">
        Total Packages {packages?.length}
      </p>
      <hr className="my-5" />
    </div>
  );
}
