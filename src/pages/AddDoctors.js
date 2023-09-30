import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

export default function AddDoctors() {
  //loader
  const [loader, setLoader] = useState(false);
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
  const [open7, setOpen7] = React.useState(false);
  const handleOpen7 = () => setOpen7(!open7);
  const [open8, setOpen8] = React.useState(false);
  const handleOpen8 = () => setOpen8(!open8);

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

  const [article, setArticle] = useState("");
  const [articles, setArticles] = useState([]);

  const [specialities, setSpecialities] = useState([]);
  const [subSpecialities, setSubSpecialities] = useState([]);

  const [parentSpecialityId, setparentSpecialityId] = useState("");
  const [selectedSubSpecialities, setSelectedSubSpecialities] = useState([]);
  const handleSubSpecialityChange = (value) => {
    // Check if the value is not empty and not already selected
    if (value && !selectedSubSpecialities.includes(value)) {
      setSelectedSubSpecialities([...selectedSubSpecialities, value]);
      // setSubSpecialityId(""); // Clear the input after selection
    }
  };

  const removeSubSpeciality = (value) => {
    const updatedSubSpecialities = selectedSubSpecialities.filter(
      (subSpeciality) => subSpeciality !== value
    );
    setSelectedSubSpecialities(updatedSubSpecialities);
  };

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
  // const [time, setTime] = useState("");
  const [gender, setGender] = useState("");
  const [enterTime, setEnterTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [schedules, setSchedules] = useState([]);

  // Handle "Add" schedules
  const handleAddSchedule = () => {
    // Create a new object with the current input values
    const newData = [selectedDay, enterTime, exitTime, message];
    // Add the new data to the schedules
    setSchedules([...schedules, newData]);
    // Reset the input fields
    setSelectedDay("");
    setMessage("");
    // setTime("");
    setEnterTime("");
    setExitTime("");
  };
  // Handle remove schedules
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

  // Article add remove functions
  const addArticle = () => {
    const newArticles = [...articles, { article }];
    setArticles(newArticles);
    setArticle("");
  };
  const removeArticle = (index) => {
    const updatedArticles = [...articles];
    updatedArticles.splice(index, 1);
    setArticles(updatedArticles);
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
    setLoader(true);
    e.preventDefault();
    const name = e.target.name.value;
    const lang = e.target.lang.value;
    const school = e.target.school.value;
    const postData = {
      image: selectedDoctorImg,
      name,
      lang,
      school,
      parentSpeciality: parentSpecialityId,
      subSpecialities: selectedSubSpecialities,
      certificates: certificates,
      fellowships: fellowships,
      interests: interests,
      experiences: experiences,
      researches: researchs,
      articles: articles,
      schedules: schedules,
    };
    console.log(postData);

    const formData = new FormData();
    formData.append("image", selectedDoctorImg);
    formData.append("name", JSON.stringify(name));
    formData.append("specialty", JSON.stringify(parentSpecialityId));
    formData.append("sub_specialty", JSON.stringify(selectedSubSpecialities));
    formData.append("article", JSON.stringify(articles));
    formData.append("lang", JSON.stringify(lang));
    formData.append("gender", JSON.stringify(gender));
    formData.append("school", JSON.stringify(school));
    formData.append("certificates", JSON.stringify(certificates));
    formData.append("fellowships", JSON.stringify(fellowships));
    formData.append("interests", JSON.stringify(interests));
    formData.append("experiences", JSON.stringify(experiences));
    formData.append("researches", JSON.stringify(researchs));
    formData.append("schedule", JSON.stringify(schedules));

    // fetch("https://api.bumrungraddiscover.com/api/add/doctor", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setLoader(false);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //     setLoader(false);
    //   });
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
            className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer"
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
                <Option key={s.id} value={s.id}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="w-full relative flex gap-1">
            <Select
              label="Select Sub Specialties"
              disabled={subSpecialities.length === 0}
              onChange={(value) => handleSubSpecialityChange(value)}
            >
              {subSpecialities.map((sb, i) => (
                <Option key={i} value={sb.id}>
                  {sb.sub_specialty}
                </Option>
              ))}
            </Select>
            <button
              onClick={handleOpen7}
              className="bg-white text-blue text-sm font-semibold  border border-blue px-1 py-0.5 rounded"
            >
              View
            </button>
            {selectedSubSpecialities.length > 0 && (
              <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
            )}
            <Dialog open={open7} handler={handleOpen7}>
              <DialogHeader>Sub Specialities</DialogHeader>
              <DialogBody divider>
                {selectedSubSpecialities.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {selectedSubSpecialities.map((c, i) => (
                      <div key={i} className="flex justify-between">
                        <p className="text-xl">
                          {i + 1}. {c}
                        </p>
                        <AiOutlineDelete
                          onClick={() => removeSubSpeciality(c)}
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
                  onClick={handleOpen7}
                  className="mr-1"
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
          <Input label="Enter Name" name="name" />
          <Input label="Language spoken" name="lang" />
          <Input label="Medical School" name="school" />
          <Select label="Select Gender" onChange={(value) => setGender(value)}>
            <Option value={2}>Male</Option>
            <Option value={1}>Female</Option>
          </Select>
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
        {/* Articles */}
        <div className="flex items-center gap-5">
          <div className="relative flex w-full">
            <Input
              value={article}
              type="text"
              label="Enter Articles"
              onChange={(e) => setArticle(e.target.value)}
            />
            <Button
              size="sm"
              onClick={addArticle}
              className="!absolute right-1 top-1 rounded bg-blue"
              disabled={article === ""}
            >
              Add
            </Button>
          </div>
          <div className="relative">
            <Button
              onClick={handleOpen8}
              size="sm"
              className="bg-white text-blue border border-blue"
            >
              View
            </Button>
            {articles.length > 0 && (
              <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
            )}
            <Dialog open={open8} handler={handleOpen8}>
              <DialogHeader>Articles</DialogHeader>
              <DialogBody divider>
                {articles.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {articles.map((c, i) => (
                      <div key={i} className="flex justify-between">
                        <p className="text-xl">{c.article}</p>
                        <AiOutlineDelete
                          onClick={() => removeArticle(i)}
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
                  onClick={handleOpen8}
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
        {/* Schedule  */}
        <div className="flex justify-between items-center">
          <p className="font-semibold uppercase">Enter Schedule Information</p>
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
                  <Card className="h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              Day
                            </Typography>
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              Time
                            </Typography>
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              Location
                            </Typography>
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              Action
                            </Typography>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedules.map((s, i) => (
                          <tr key={i} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {s[0]}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {s[1]} to {s[2]}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {s[3]}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <AiOutlineDelete
                                onClick={() => removeSchedule(i)}
                                className="text-red-500 text-3xl cursor-pointer"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
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
            label="Enter Location"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* <Select
            label="Select Time"
            name="select time"
            value={time}
            onChange={(value) => setTime(value)}
          >
            <Option value={1}>Morning</Option>
            <Option value={2}>Evening</Option>
            <Option value={3}>Night</Option>
          </Select> */}
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
          <p className="font-semibold text-blue uppercase">
            Click on add to save a schedule
          </p>
          <Button
            disabled={selectedDay === "" || enterTime === "" || exitTime === ""}
            size="sm"
            className="bg-blue w-fit"
            onClick={handleAddSchedule}
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
        <Button className="bg-blue flex items-center w-fit gap-1" type="submit">
          Submit {loader && <Spinner className="h-4 w-4" color="white" />}
        </Button>
      </form>
    </div>
  );
}
