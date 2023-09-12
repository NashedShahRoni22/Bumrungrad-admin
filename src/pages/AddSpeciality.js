import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";

export default function AddSpeciality() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [speciality, setSpeciality] = useState("");
  const [specialties, setSpecialities] = useState([]);
  const [subSpecialties, setSubSpecialities] = useState([]);
  const [parentSpecialityId, setparentSpecialityId] = useState("");

  //add speacility
  const addSpeciality = () => {
    setLoading(true);
    const postData = { name: speciality };
    fetch("https://api.bumrungraddiscover.com/api/add/specialty", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        setSpeciality("");
        setLoading(false);
        toast.success("Speciality Added Successfully!");
      })
      .catch((e) => console.error(e));
  };
  //add sub speacility
  const addSubSpeciality = (e) => {
    setLoading2(true);
    e.preventDefault();
    const sub_speciality = e.target.sub_speciality.value;
    const postData = {
      specialty_id: parentSpecialityId,
      sub_specialty: sub_speciality,
    };
    fetch("https://api.bumrungraddiscover.com/api/add/sub/specialty", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading2(false);
        toast.success("Sub Speciality Added Successfully!");
        e.target.reset();
      })
      .catch((e) => console.error(e));
  };

  //get speacilities
  useEffect(() => {
    fetch("https://api.bumrungraddiscover.com/api/get/specialty")
      .then((res) => res.json())
      .then((data) => setSpecialities(data?.response?.data));
  }, [loading]);

  //get sub speacilities
  useEffect(() => {
    fetch("https://api.bumrungraddiscover.com/api/get/sub/specialty")
      .then((res) => res.json())
      .then((data) => setSubSpecialities(data?.response?.data));
  }, [loading2]);

  return (
    <div className="py-10 mx-5 md:container md:mx-auto">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-xl p-5">
          <p className="text-xl mb-5 text-center lg:text-left font-semibold">Add Speciality</p>
          <div className="relative">
            <Input
              value={speciality}
              type="text"
              label="Add Specility"
              onChange={(e) => setSpeciality(e.target.value)}
            />
            <Button
              size="sm"
              onClick={addSpeciality}
              className="!absolute right-1 top-1 rounded bg-blue"
            >
              {loading ? "Loading..." : "Add"}
            </Button>
          </div>
          <div className="mt-5 p-2">
            <p className="font-semibold">Specility List</p>
            <hr className="my-3" />
            <ul className="min-h-[400px]">
              {specialties?.map((speciality) => (
                <li
                  className="p-2.5 rounded-md shadow-md flex items-center justify-between"
                  key={speciality.id}
                >
                  <span>{speciality.name}</span>
                  <AiOutlineDelete className="text-2xl text-red-500" />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-5">
          <form
            action=""
            className="flex flex-col gap-2"
            onSubmit={addSubSpeciality}
          >
            <div>
            <p className="text-xl mb-5 text-center lg:text-left font-semibold">Add Sub Speciality</p>
              <Select
                label="Select Specialty"
                onChange={value => setparentSpecialityId(value)}
              >
                {specialties?.map((speciality) => (
                  <Option key={speciality.id} value={(speciality.id).toString()}>
                    {speciality.name}
                  </Option>
                ))}
              </Select>
            </div>
            <Input
              type="text"
              label="Add Sub Specility"
              name="sub_speciality"
            />
            <Button size="sm" type="submit" className="bg-blue">
              {loading2 ? "Loading..." : "Add"}
            </Button>
          </form>

          <div className="mt-5 p-2">
            <p className="font-semibold">Sub Specility List</p>
            <hr className="my-3" />
            <ul className="min-h-[400px]">
              {subSpecialties.map((speciality) => (
                <li
                  className="p-2.5 my-1 rounded-md shadow-md flex justify-between items-center"
                  key={speciality.id}
                >
                  <span className="uppercase">{speciality.sub_specialty}</span>
                  <AiOutlineDelete className="text-2xl text-red-500" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
