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
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

export default function AddDoctors() {
  //dialogue
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(!open2);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(!open3);
  const [open4, setOpen4] = React.useState(false);
  const handleOpen4 = () => setOpen4(!open4);
  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(!open5);

  const [open6, setOpen6] = React.useState(false);
  const handleOpen6 = () => setOpen6(!open6);

  //states of datas
  const [selectedDoctorImg, setSelectedDoctorImg] = useState("");

  const [certificate, setCertificate] = useState("");
  const [certificates, setCertificates] = useState([]);

  const [fellowship, setFellowship] = useState("");
  const [fellowships, setFellowships] = useState([]);

  const [Interest, setInterest] = useState("");
  const [interests, setInterests] = useState([]);

  const [experience, setExperience] = useState("");
  const [experiences, setExperiences] = useState([]);

  const [research, setResearch] = useState("");
  const [researchs, setResearchs] = useState([]);

  const [specialities, setSpecialities] = useState([]);
  const [subSpecialities, setSubSpecialities] = useState([]);

  const [parentSpecialityId, setparentSpecialityId] = useState("");

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //docotrs schedule
  const [selectedDay, setSelectedDay] = useState("");
  const [message, setMessage] = useState("");
  const [enterTime, setEnterTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [schedules, setSchedules] = useState([]);

  // Handle "Add" schedules
  const handleAddClick = () => {
    // Create a new object with the current input values
    const newData = { selectedDay, message, enterTime, exitTime };

    // Add the new data to the schedules
    setSchedules([...schedules, newData]);

    // Reset the input fields
    setSelectedDay("");
    setMessage("");
    setEnterTime("");
    setExitTime("");
  };
  // Handle "Remove" schedules
  const removeSchedule = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
  };

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

  // Interest add remove functions
  const addInterest = () => {
    const newinterests = [...interests, { Interest }];
    setInterests(newinterests);
    setInterest("");
  };
  const removeInterest = (index) => {
    const updatedinterests = [...interests];
    updatedinterests.splice(index, 1);
    setInterests(updatedinterests);
  };

  // Experience add remove functions
  const addExperience = () => {
    const newExperiences = [...experiences, { experience }];
    setExperiences(newExperiences);
    setExperience("");
  };
  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  // Research add remove functions
  const addResearch = () => {
    const newResearchs = [...researchs, { research }];
    setResearchs(newResearchs);
    setResearch("");
  };
  const removeResearch = (index) => {
    const updatedResearchs = [...researchs];
    updatedResearchs.splice(index, 1);
    setResearchs(updatedResearchs);
  };

  //get speacilities
  useEffect(() => {
    fetch("https://api.bumrungraddiscover.com/api/get/specialty")
      .then((res) => res.json())
      .then((data) => setSpecialities(data?.response?.data));
  }, []);

  //get sub speacilities
  useEffect(() => {
    if (parentSpecialityId) {
      fetch(
        `https://api.bumrungraddiscover.com/api/get/selected/sub/specialty/${parentSpecialityId}`
      )
        .then((res) => res.json())
        .then((data) => setSubSpecialities(data?.response?.data));
    }
  }, [parentSpecialityId]);

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const image = selectedDoctorImg;
    const name = e.target.name.value;
    const lang = e.target.lang.value;
    const school = e.target.school.value;
    const postData = {
      image,
      name,
      lang,
      school,
      certificates: certificates,
      fellowships: fellowships,
      interests: interests,
      experiences: experiences,
      researches: researchs,
      schedules: schedules,
    };
    console.log(postData);
    // fetch("https://api.bumrungraddiscover.com/api/add/doctor", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(postData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     toast.success("Doctor Added Successfully!");
    //   })
    //   .catch((e) => console.error(e));
  };
  return (
    <div className="mx-5 md:container md:mx-auto py-10">
      <form
        action=""
        onSubmit={handleAddDoctor}
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
            className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-purple-500 hover:bg-blue duration-300 ease-linear text-white cursor-pointer"
          >
            Choose file
          </label>
          <label className="text-sm text-slate-500">
            {selectedDoctorImg.name ? selectedDoctorImg.name : "No File Chosen"}
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="w-full">
            <Select
              label="Select Specialties"
              onChange={(value) => setparentSpecialityId(value)}
            >
              {specialities.map((s) => (
                <Option key={s.id} value={s.id.toString()}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="w-full">
            <Select
              label="Select Sub Specialties"
              disabled={subSpecialities.length === 0}
            >
              {subSpecialities.map((sb, i) => (
                <Option key={i} value={sb.id.toString()}>
                  {sb.sub_specialty}
                </Option>
              ))}
            </Select>
          </div>
          <Input label="Enter Name" name="name" />
          <Input label="Language spoken" name="lang" />
          <Input label="Medical School" name="school" />
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
              disabled={certificate === ""}
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
              <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
            )}
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Cerificates</DialogHeader>
              <DialogBody divider>
                {certificates.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {certificates.map((c, i) => (
                      <div key={i} className="flex justify-between">
                        <p className="text-xl">{c.certificate}</p>
                        <AiOutlineDelete
                          onClick={() => removeCertificate(i)}
                          className="text-red-500 text-3xl cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-5 font-semibold text-red-500">
                    Enter Something!
                  </p>
                )}
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
              disabled={fellowship === ""}
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
              <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
            )}
            <Dialog open={open2} handler={handleOpen2}>
              <DialogHeader>Fellowships</DialogHeader>
              <DialogBody divider>
                {fellowships.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {fellowships.map((c, i) => (
                      <div key={i} className="flex justify-between">
                        <p className="text-xl">{c.fellowship}</p>
                        <AiOutlineDelete
                          onClick={() => removeFellowship(i)}
                          className="text-red-500 text-3xl cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-5 font-semibold text-red-500">
                    Enter Something!
                  </p>
                )}
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
        {/* interests */}
        <div className="flex items-center gap-5">
          <div className="relative flex w-full">
            <Input
              value={Interest}
              type="text"
              label="Interest"
              onChange={(e) => setInterest(e.target.value)}
            />
            <Button
              size="sm"
              onClick={addInterest}
              className="!absolute right-1 top-1 rounded bg-blue"
              disabled={Interest === ""}
            >
              Add
            </Button>
          </div>
          <div className="relative">
            <Button
              onClick={handleOpen3}
              size="sm"
              className="bg-white text-blue border border-blue"
            >
              View
            </Button>
            {interests.length > 0 && (
              <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
            )}
            <Dialog open={open3} handler={handleOpen3}>
              <DialogHeader>interests</DialogHeader>
              <DialogBody divider>
                {interests.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {interests.map((c, i) => (
                      <div key={i} className="flex justify-between">
                        <p className="text-xl">{c.Interest}</p>
                        <AiOutlineDelete
                          onClick={() => removeInterest(i)}
                          className="text-red-500 text-3xl cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-5 text-red-500 font-semibold">
                    Enter something!
                  </p>
                )}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  size="sm"
                  onClick={handleOpen3}
                  className="mr-1"
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        {/* Experiences  */}
        <div className="flex items-center gap-5">
          <div className="relative flex w-full">
            <Input
              value={experience}
              type="text"
              label="Experience"
              onChange={(e) => setExperience(e.target.value)}
            />
            <Button
              size="sm"
              onClick={addExperience}
              className="!absolute right-1 top-1 rounded bg-blue"
              disabled={experience === ""}
            >
              Add
            </Button>
          </div>
          <div className="relative">
            <Button
              onClick={handleOpen4}
              size="sm"
              className="bg-white text-blue border border-blue"
            >
              View
            </Button>
            {experiences.length > 0 && (
              <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
            )}
            <Dialog open={open4} handler={handleOpen4}>
              <DialogHeader>Experiences</DialogHeader>
              <DialogBody divider>
                {experiences.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {experiences.map((c, i) => (
                      <div key={i} className="flex justify-between">
                        <p className="text-xl">{c.experience}</p>
                        <AiOutlineDelete
                          onClick={() => removeExperience(i)}
                          className="text-red-500 text-3xl cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-5 text-red-500 font-semibold">
                    Enter something!
                  </p>
                )}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  size="sm"
                  onClick={handleOpen4}
                  className="mr-1"
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        {/* Research  */}
        <div className="flex items-center gap-5">
          <div className="relative flex w-full">
            <Input
              value={research}
              type="text"
              label="Research"
              onChange={(e) => setResearch(e.target.value)}
            />
            <Button
              size="sm"
              onClick={addResearch}
              className="!absolute right-1 top-1 rounded bg-blue"
              disabled={research === ""}
            >
              Add
            </Button>
          </div>
          <div className="relative">
            <Button
              onClick={handleOpen5}
              size="sm"
              className="bg-white text-blue border border-blue"
            >
              View
            </Button>
            {researchs.length > 0 && (
              <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
            )}
            <Dialog open={open5} handler={handleOpen5}>
              <DialogHeader>Researchs</DialogHeader>
              <DialogBody divider>
                {researchs.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {researchs.map((c, i) => (
                      <div key={i} className="flex justify-between">
                        <p className="text-xl">{c.research}</p>
                        <AiOutlineDelete
                          onClick={() => removeResearch(i)}
                          className="text-red-500 text-3xl cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-5 text-red-500 font-semibold">
                    Enter something!
                  </p>
                )}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  size="sm"
                  onClick={handleOpen5}
                  className="mr-1"
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold">Enter Schedule Information</p>
          <div className="relative">
            <Button
              size="sm"
              variant="outlined"
              className="font-semibold text-blue"
              onClick={handleOpen6}
            >
              View
            </Button>
            {schedules.length > 0 && (
              <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
            )}
            <Dialog open={open6} handler={handleOpen6}>
              <DialogHeader>Doctor Schedules</DialogHeader>
              <DialogBody divider>
                {schedules.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {schedules.map((s, i) => (
                      <div
                        key={i}
                        className="flex justify-between shadow-xl rounded-xl p-5"
                      >
                        <div>
                          <p className="">
                            {" "}
                            <span className="font-semibold">Day:</span>{" "}
                            {s.selectedDay}
                          </p>
                          <div>
                            <p className="">
                              {" "}
                              <span className="font-semibold">Entry</span>{" "}
                              {s.enterTime}
                            </p>
                            <p className="">
                              {" "}
                              <span className="font-semibold">Exit</span>{" "}
                              {s.exitTime}
                            </p>
                          </div>
                        </div>
                        <AiOutlineDelete
                          onClick={() => removeSchedule(i)}
                          className="text-red-500 text-3xl cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-5 font-semibold text-red-500">
                    Enter Something!
                  </p>
                )}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  size="sm"
                  onClick={handleOpen6}
                  className="mr-1"
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Select
            label="Select Day"
            name="selectedDay"
            value={selectedDay}
            onChange={(value) => setSelectedDay(value)}
          >
            {weekdays.map((w, i) => (
              <Option key={i} value={w}>
                {w}
              </Option>
            ))}
          </Select>
          <Input
            label="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Input
            label="Enter Time"
            type="time"
            value={enterTime}
            onChange={(e) => setEnterTime(e.target.value)}
          />
          <Input
            label="Exit Time"
            type="time"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-blue">
            Click on add to save a schedule
          </p>
          <Button
            disabled={
              selectedDay === "" ||
              enterTime === "" ||
              exitTime === ""
            }
            size="sm"
            className=" bg-blue w-fit"
            onClick={handleAddClick}
          >
            Add
          </Button>
        </div>
        <ul>
          {schedules.map((data, index) => (
            <li key={index}>{/* Render data properties here */}</li>
          ))}
        </ul>

        <p className="font-semibold text-red-500 uppercase">
          *Double check your given information before submit!
        </p>
        <Button variant="gradient" color="purple" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
