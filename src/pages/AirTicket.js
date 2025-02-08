import React, { useState, useEffect } from "react";

import { Card, Typography } from "@material-tailwind/react";
import Loader from "../components/Loader";
import { AiFillEye } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
const AirTicket = () => {
  const [loader, setLoader] = useState(true);
  const [airTicket, setAirTicket] = useState([]);
  const TABLE_HEAD = [
    "Request ID",
    "From Country",
    "Destination Country",
    "Booking Date",
    "Return Date",
    "Passport Copy",
    "Action",
  ];
  const handaleDeleteAirTicekt = (oneTicket) => {
    const aggre = window.confirm(`You Want to Delete, ${oneTicket?.country}.`);
    if (aggre) {
      fetch(
        `https://api.discoverinternationalmedicalservice.com/api/delete/air_tickets/${oneTicket.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newAirticketData = airTicket.filter(
              (airpickup) => airpickup.id !== oneTicket.id
            );
            alert("AirTicket Deleted Successfully");
            setAirTicket(newAirticketData);
          }
        });
    }
  };
  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/air/ticket")
      .then((res) => res.json())
      .then((data) => {
        setAirTicket(data.data);
        setLoader(false);
      });
  }, []);
  return (
    <div className="m-5 md:m-10">
      {" "}
      <div>
        {loader ? (
          <Loader />
        ) : (
          <>
            <p className="text-xl font-semibold text-blue">
              Air Ticket Request: {airTicket?.length}
            </p>
            <Card className="mt-5 md:mt-10 h-full overflow-scroll">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, i) => (
                      <th
                        key={i}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70 "
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {airTicket?.map((oneTicket, index) => (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {oneTicket?.country}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {oneTicket?.destination}
                        </Typography>
                      </td>

                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {oneTicket?.booking_date}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {oneTicket?.return_date}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <a
                          href={oneTicket?.doc}
                          target="blank"
                          rel="noopener noreferrer"
                        >
                          <button className="flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white ">
                            <AiFillEye className="text-xl" />
                            Passport
                          </button>
                        </a>
                      </td>
                      <td className="p-4">
                        <Button
                          onClick={() => {
                            handaleDeleteAirTicekt(oneTicket);
                          }}
                          variant="gradient"
                          color="red"
                        >
                          <span>Delete</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default AirTicket;
