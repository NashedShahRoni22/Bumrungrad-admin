import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

export default function AddDoctors() {
  //dialogue
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(!open2);
  //states of datas
  const [selectedDoctorImg, setSelectedDoctorImg] = useState("");

  const [certificate, setCertificate] = useState("");
  const [certificates, setCertificates] = useState([]);

  const [fellowship, setFellowship] = useState("");
  const [fellowships, setFellowships] = useState([]);

  // certificates add remove functions
  const addCertificates = () => {
    const newCertificates = [...certificates, { certificate }];
    setCertificates(newCertificates);
    setCertificate("");
  };
  const removeCertificate = (index) => {
    const updatedCertificates = [...certificates];
    updatedCertificates.splice(index, 1);
    setCertificates(updatedCertificates);
  };

  // certificates add remove functions
  const addFellowship = () => {
    const newFellowships = [...fellowships, { fellowship }];
    setFellowships(newFellowships);
    setFellowship("");
  };
  const removeFellowship = (index) => {
    const updatedFellowships = [...fellowships];
    updatedFellowships.splice(index, 1);
    setFellowships(updatedFellowships);
  };
  return (
    <div className="mx-5 md:container md:mx-auto py-10">
      <form
        action=""
        className="flex flex-col gap-4 bg-white rounded-xl shadow-xl p-5"
      >
        <div className="flex flex-row items-center">
          <input
            type="file"
            id="custom-input"
            onChange={(e) => setSelectedDoctorImg(e.target.files[0])}
            hidden
          />
          <label
            htmlFor="custom-input"
            className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-black hover:bg-blue duration-300 ease-linear text-white cursor-pointer"
          >
            Choose file
          </label>
          <label className="text-sm text-slate-500">
            {selectedDoctorImg.name ? selectedDoctorImg.name : "No File Chosen"}
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="w-full">
            <Select label="Select Specialties">
              <Option>Cardiology</Option>
              <Option>Anesthesiology</Option>
            </Select>
          </div>
          <div className="w-full">
            <Select label="Select Sub Specialties">
              <Option>Cardiology</Option>
            </Select>
          </div>
          <Input label="Enter Name" />
          <Input label="Language spoken" />
          <Input label="Medical School" />
        </div>
        {/* Certifications */}
        <div className="flex items-center gap-5">
          <div className="relative flex w-full">
            <Input
              value={certificate}
              type="text"
              label="Board Certifications"
              onChange={(e) => setCertificate(e.target.value)}
            />
            <Button
              size="sm"
              onClick={addCertificates}
              className="!absolute right-1 top-1 rounded bg-blue"
            >
              Add
            </Button>
          </div>
          <div className="relative">
            <Button
              onClick={handleOpen}
              size="sm"
              className="bg-white text-blue border border-blue"
            >
              View
            </Button>
            {certificates.length > 0 && (
              <div className="h-3 w-3 rounded-full bg-blue absolute -top-2 -right-2 shadow-xl"></div>
            )}
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Cerificates</DialogHeader>
              <DialogBody divider>
                <div className="flex flex-col gap-4">
                  {certificates.map((c, i) => (
                    <div key={i} className="flex justify-between">
                      <p className="text-xl">{c.certificate}</p>
                      <AiOutlineDelete onClick={() => removeCertificate(i)} className="text-red-500 text-3xl" />
                    </div>
                  ))}
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  size="sm"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        {/* Fellowships */}
        <div className="flex items-center gap-5">
          <div className="relative flex w-full">
            <Input
              value={fellowship}
              type="text"
              label="Fellowships"
              onChange={(e) => setFellowship(e.target.value)}
            />
            <Button
              size="sm"
              onClick={addFellowship}
              className="!absolute right-1 top-1 rounded bg-blue"
            >
              Add
            </Button>
          </div>
          <div className="relative">
            <Button
              onClick={handleOpen2}
              size="sm"
              className="bg-white text-blue border border-blue"
            >
              View
            </Button>
            {fellowships.length > 0 && (
              <div className="h-3 w-3 rounded-full bg-blue absolute -top-2 -right-2 shadow-xl"></div>
            )}
            <Dialog open={open2} handler={handleOpen2}>
              <DialogHeader>Fellowships</DialogHeader>
              <DialogBody divider>
                <div className="flex flex-col gap-4">
                  {fellowships.map((c, i) => (
                    <div key={i} className="flex justify-between">
                      <p className="text-xl">{c.fellowship}</p>
                      <AiOutlineDelete onClick={() => removeFellowship(i)} className="text-red-500 text-3xl" />
                    </div>
                  ))}
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  size="sm"
                  onClick={handleOpen2}
                  className="mr-1"
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        <button
          className="py-2 px-4 w-fit bg-black text-white hover:bg-blue duration-300 ease-linear font-semibold rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
