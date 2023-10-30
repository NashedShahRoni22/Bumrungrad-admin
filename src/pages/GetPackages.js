import React, { useEffect, useState } from "react";

export default function GetPackages() {
  const [packages, setPackages] = useState([]);
  console.log(packages);
  useEffect(() => {
    fetch("https://api.bumrungraddiscover.com/api/get/package")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          console.log(data);
        } else {
          setPackages(data?.data);
        }
      });
  }, []);
  return (
    <div className="mx-5 my-5 md:container md:mx-auto p-10 bg-white rounded-xl shadow-xl">
      <p className="text-2xl font-semibold text-blue">
        Total Packages: {packages?.length}
      </p>
      <hr className="my-5" />
      <div></div>
    </div>
  );
}
