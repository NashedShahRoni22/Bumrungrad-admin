import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  PowerIcon,
  ClipboardDocumentListIcon,
  GiftIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  PlusIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { BiSolidAmbulance } from "react-icons/bi";
import { AiOutlineOrderedList, AiOutlineFile } from "react-icons/ai";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { MdAirplaneTicket, MdWheelchairPickup } from "react-icons/md";
import { Link } from "react-router-dom";

export function LeftBar() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4">
      <List>
        <Link to="/home">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ClipboardDocumentListIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Doctors
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to="/home/add-speciality">
                <ListItem>
                  <ListItemPrefix>
                    <PlusIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Speciality
                </ListItem>
              </Link>
              <Link to="/home/add-doctors">
                <ListItem>
                  <ListItemPrefix>
                    <PlusIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Doctor
                </ListItem>
              </Link>
              <ListItem>
                <ListItemPrefix>
                  <ListBulletIcon strokeWidth={3} className="h-5 w-5" />
                </ListItemPrefix>
                Doctors List
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <GiftIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Packages
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to="/home/add-packages">
                <ListItem>
                  <ListItemPrefix>
                    <PlusIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Package
                </ListItem>
              </Link>
              <Link to="/home/get-packages">
                <ListItem>
                  <ListItemPrefix>
                    <ListBulletIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Packages List
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <BuildingOffice2Icon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Clinic & Centers
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to="/home/add-centers">
                <ListItem>
                  <ListItemPrefix>
                    <PlusIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Centers
                </ListItem>
              </Link>
              <ListItem>
                <ListItemPrefix>
                  <ListBulletIcon strokeWidth={3} className="h-5 w-5" />
                </ListItemPrefix>
                Centers List
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <CalendarDaysIcon className="h-5 w-5" />
          </ListItemPrefix>
          Appoinments
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BiSolidAmbulance className="h-5 w-5" />
          </ListItemPrefix>
          Air Ambulance
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <AiOutlineOrderedList className="h-5 w-5" />
          </ListItemPrefix>
          Medicine Orders
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BsFillTelephoneForwardFill className="h-5 w-5" />
          </ListItemPrefix>
          Tele Medicine
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <MdAirplaneTicket className="h-5 w-5" />
          </ListItemPrefix>
          Air Tickets
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <MdWheelchairPickup className="h-5 w-5" />
          </ListItemPrefix>
          Air Pickup
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <AiOutlineFile className="h-5 w-5" />
          </ListItemPrefix>
          Medical Record
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </div>
  );
}
