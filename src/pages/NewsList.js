import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
const NewsList = () => {
  const [loader, setLoader] = useState(true);
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/news")
      .then((res) => res.json())
      .then((data) => {
        setAllNews(data.data);
        setLoader(false);
      });
  }, [loader]);

  const handaleDeleteNews = (oneNews) => {
    const aggre = window.confirm(`You Want to Delete, ${oneNews?.newsTitle}.`);
    if (aggre) {
      fetch(`https://api.discoverinternationalmedicalservice.com/api/delete/news/${oneNews.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            const newNewsData = allNews.filter(
              (news) => news.id !== oneNews.id
            );
            alert("News Deleted Successfully");
            setAllNews(newNewsData);
          }
        });
    }
  };
  return (
    <div className="m-5 md:m-10">
      <p className="text-xl font-semibold">News List</p>
      <hr className="my-5" />
      {loader ? (
        <Loader />
      ) : (
        <div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 my-10">
            {allNews?.map((d, i) => (
              <div
                key={i}
                className="shadow rounded hover:shadow-xl duration-300 ease-linear flex flex-col justify-between"
              >
                <img src={d.newsImage} alt="" className="" />
                <div className="p-4">
                  {" "}
                  <h5 className="font-semibold text-blue text-lg">
                    {d.newsTitle}
                  </h5>
                  <p className="my-3 text-justify">
                    {d.newsDescription?.slice(0, 160)} ...
                  </p>
                </div>
                <div className="p-4 flex justify-between">
                  {" "}
                  <Link to={`/home/one-News/${d?.id}`}>
                    <button className="border border-blue bg-blue hover:bg-white px-2 py-1 rounded hover:text-blue text-white duration-300 ease-linear">
                      Read more
                    </button>
                  </Link>
                  <button
                    onClick={() => handaleDeleteNews(d)}
                    className="border border-red-400 bg-red-400 hover:bg-white px-2 py-1 rounded hover:text-blue text-white duration-300 ease-linear"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;
