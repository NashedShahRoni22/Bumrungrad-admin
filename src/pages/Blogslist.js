import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
const Blogslist = () => {
  const [loader, setLoader] = useState(true);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    fetch("https://api.bumrungraddiscover.com/api/get/blogs")
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(data.data);
        setLoader(false);
      });
  }, [loader]);
  const handaleDeleteBlogs = (oneBlogs) => {
    const aggre = window.confirm(`You Want to Delete, ${oneBlogs?.blogTitle}.`);
    if (aggre) {
      fetch(
        `https://api.bumrungraddiscover.com/api/delete/blogs/${oneBlogs.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            const newBlogData = allBlogs.filter(
              (blogs) => blogs.id !== oneBlogs.id
            );
            alert("Blog Deleted Successfully");
            setAllBlogs(newBlogData);
          }
        });
    }
  };

  return (
    <div className="mx-5 md:container md:mx-auto py-10 px-5">
      <div className="mt-10">
        <p className="text-2xl font-semibold">Blogs List</p>
        <hr className="my-5" />
        {loader ? (
          <Loader />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 my-10">
            {allBlogs?.map((d, i) => (
              <div
                key={i}
                className="shadow rounded hover:shadow-xl duration-300 ease-linear flex flex-col justify-between"
              >
                <img src={d.blogImage} alt="" className="" />
                <div className="p-4">
                  {" "}
                  <h5 className="font-semibold text-blue text-lg">
                    {d.blogTitle}
                  </h5>
                  {/* <p className='my-3 text-justify'>
                    {d.blogSlogan?.slice(0, 160)}...{' '}
                  </p> */}
                </div>
                <div className="flex justify-between">
                  {" "}
                  <Link
                    to={`/home/one-blogs/${d?.slug}`}
                    className="text-center bg-blue text-white p-1.5 w-full"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handaleDeleteBlogs(d)}
                    className="text-center bg-red-500 text-white p-1.5 w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogslist;
