import { Card } from "@material-tailwind/react";
import React from "react";

export default function Home() {
  const dashboards = [
    {
      name: "Doctors",
      quantity: 900,
    },
    {
      name: "Packages",
      quantity: 444,
    },
    {
      name: "Centers",
      quantity: 64,
    },
    {
      name: "Requests",
      quantity: 100,
    },
  ];
  return (
    <div className="bg-silver min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 py-10 md:container mx-5 md:mx-auto gap-6">
        {dashboards.map((d, i) => (
          <Card key={i} className="p-8 text-black">
            <p className="text-3xl lg:text-5xl font-bold">{d.quantity}</p>
            <p className="text-xl lg:text-3xl text-end">{d.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
