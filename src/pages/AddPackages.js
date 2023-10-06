import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Textarea,
  Select,
  Option,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function AddPackages() {
  const [loader, setLoader] = useState(false);
  const [childLoader, setChildLoader] = useState(false);

  const [parentPckages, setParentPackages] = useState([]);
  const [parentId, setParentId] = useState("");

  const [activeTab, setActiveTab] = React.useState("Parent");
  const [selectedParentImage, setSelectedParentImage] =
    useState("No file chosen");
  const [selectedChildImage, setSelectedChildImage] =
    useState("No file chosen");

  //get parent package
  useEffect(() => {
    fetch("https://api.bumrungraddiscover.com/api/get/package")
      .then((res) => res.json())
      .then((data) => setParentPackages(data.response.data));
  }, []);
  //  add parent package
  const handleAddParentPackage = (e) => {
    setLoader(true);
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    if (selectedParentImage === "No file chosen") {
      setLoader(false);
      toast.error("Select Package Image");
    } else {
      const formData = new FormData();
      formData.append("cover_photo", selectedParentImage);
      formData.append("title", title);
      formData.append("description", description);

      fetch("https://api.bumrungraddiscover.com/api/create/package", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(false);
          e.target.reset();
          // selectedParentImage("No file chosen");
          toast.success("Package Added Successfully!");
        })
        .catch((e) => console.error(e));
    }
  };
  // add child packages
  const handleAddChildPackages = (e) => {
    setChildLoader(true);
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.desc.value;
    const price = e.target.price.value;
    if (selectedChildImage === "No file chosen") {
      setChildLoader(false);
      toast.error("Select Child Package Image");
    } else {
      const formData = new FormData();
      formData.append("cover_photo", selectedChildImage);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("parent_id", parentId);

      fetch("https://api.bumrungraddiscover.com/api/create/sub/package", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setChildLoader(false);
          e.target.reset();
          // selectedChildImage("No file chosen");
          toast.success("Child Package Added Successfully!");
        })
        .catch((e) => console.error(e));
    }
  };
  return (
    <div className="mx-5 py-10 md:container md:mx-auto">
      <div className="rounded-xl p-5 shadow-xl bg-white">
        <p className="text-2xl font-semibold">Add Packages</p>
        <hr className="my-5" />
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            <Tab
              value="Parent"
              onClick={() => setActiveTab("Parent")}
              className={activeTab === "Parent" ? "text-gray-900" : ""}
            >
              Parent Package
            </Tab>
            <Tab
              value="Child"
              onClick={() => setActiveTab("Child")}
              className={activeTab === "Child" ? "text-gray-900" : ""}
            >
              Child Packages
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value={"Parent"}>
              <form
                onSubmit={handleAddParentPackage}
                action=""
                className="flex flex-col gap-4"
              >
                <div className="flex flex-row items-center">
                  <input
                    type="file"
                    id="parent-input"
                    onChange={(e) => setSelectedParentImage(e.target.files[0])}
                    hidden
                  />
                  <label
                    htmlFor="parent-input"
                    className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer"
                  >
                    Choose file
                  </label>
                  <label className="text-sm text-slate-500">
                    {selectedParentImage.name
                      ? selectedParentImage.name
                      : selectedParentImage}
                  </label>
                </div>
                <Input label="Enter Title" name="title" required />
                <Textarea
                  label="Enter Description"
                  name="description"
                  required
                />
                <Button
                  className="bg-blue min-w-[100px] max-w-fit flex items-center gap-1"
                  type="submit"
                >
                  Add Parent
                  {loader && <Spinner className="h-4 w-4" color="white" />}
                </Button>
              </form>
            </TabPanel>
            <TabPanel value={"Child"}>
              <form
                onSubmit={handleAddChildPackages}
                action=""
                className="flex flex-col gap-4"
              >
                <div className="flex flex-row items-center">
                  <input
                    type="file"
                    id="child-input"
                    onChange={(e) => setSelectedChildImage(e.target.files[0])}
                    hidden
                  />
                  <label
                    htmlFor="child-input"
                    className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer"
                  >
                    Choose file
                  </label>
                  <label className="text-sm text-slate-500">
                    {selectedChildImage.name
                      ? selectedChildImage.name
                      : selectedChildImage}
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="w-full">
                    <Select
                      label="Select Parent Package"
                      required
                      onChange={(value) => setParentId(value)}
                    >
                      {parentPckages?.map((pp) => (
                        <Option key={pp.id} value={pp.id.toString()}>
                          {pp.title}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <Input label="Enter Title" name="title" required />
                  <Input label="Enter Price" name="price" required />
                </div>
                <Textarea label="Enter Description" name="desc" required />
                <Button
                  className="bg-blue w-fit flex items-center gap-1"
                  type="submit"
                >
                  Add Child{" "}
                  {childLoader && <Spinner className="h-4 w-4" color="white" />}
                </Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}
