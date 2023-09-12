import React, { useState } from "react";
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
} from "@material-tailwind/react";

export default function AddPackages() {
  const [activeTab, setActiveTab] = React.useState("Parent");
  const [selectedParentImage, setSelectedParentImage] =
    useState("No file chosen");
  const [selectedChildImage, setSelectedChildImage] =
    useState("No file chosen");
  return (
    <div className="mx-5 py-10 md:container md:mx-auto">
      <div className="rounded-xl shadow-xl bg-white">
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
              <form action="" className="flex flex-col gap-4">
                <div className="flex flex-row items-center">
                  <input
                    type="file"
                    id="custom-input"
                    onChange={(e) =>
                      setSelectedParentImage(e.target.files[0].name)
                    }
                    hidden
                  />
                  <label
                    htmlFor="custom-input"
                    className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer"
                  >
                    Choose file
                  </label>
                  <label className="text-sm text-slate-500">
                    {selectedParentImage}
                  </label>
                </div>
                <Input label="Enter Title" />
                <Textarea label="Enter Description" />
                <Button
                  className="bg-blue w-fit"
                  type="submit"
                >
                  Add Parent
                </Button>
              </form>
            </TabPanel>
            <TabPanel value={"Child"}>
              <form action="" className="flex flex-col gap-4">
                <div className="flex flex-row items-center">
                  <input
                    type="file"
                    id="custom-input"
                    onChange={(e) =>
                      setSelectedChildImage(e.target.files[0].name)
                    }
                    hidden
                  />
                  <label
                    htmlFor="custom-input"
                    className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer"
                  >
                    Choose file
                  </label>
                  <label className="text-sm text-slate-500">
                    {selectedChildImage}
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="w-full">
                    <Select label="Select Parent Package">
                      <Option>Parent Package HTML</Option>
                      <Option>Parent Package React</Option>
                      <Option>Parent Package Vue</Option>
                      <Option>Parent Package Angular</Option>
                      <Option>Parent Package Svelte</Option>
                    </Select>
                  </div>
                  <Input label="Enter Title" />
                  <Input label="Enter ID" />
                  <Input label="Enter Price" />
                </div>
                <Textarea label="Enter Description" />
                <Button className="bg-blue w-fit" type="submit">Add Child</Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}
