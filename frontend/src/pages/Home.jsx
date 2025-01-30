// eslint-disable-next-line no-unused-vars
import React from "react";
import Nav from "../componets/Nav";
import axios from "axios";
import { useState, useEffect } from "react";
import API from "../../api";




function Home() {
  const [homeBlogs, setHomeBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/v1/blogs/all`)
      .then((response) => {
        setHomeBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  return (
    //style home page with tailwindcss
    <div className="container min-h-[100vh]">
      <Nav />
      <div id="homePage">
        <div className="pl-12 pr-12 pt-12 w-screen sm:flex">
          <div className="w-full sm:w-1/2 p-2">
            <h1 className="text-3xl font-bold pb-2">
              Welcome to the daily Chronicles
            </h1>
            <p>
              In a world buzzing with stories, experiences, and ideas, Daily
              Chronicles is your digital journal—a space where everyone&#39;s
              voice matters. Whether it&#39;s a glimpse into your day, a
              creative piece, or a nugget of wisdom, this is the place to share,
              connect, and inspire.
            </p>
            <p>
              At Daily Chronicles, we believe that every story, big or small,
              holds the power to make someone&#39;s day brighter, spark a
              conversation, or build a bridge across cultures and experiences.
              It&#39;s more than a blog; it&#39;s a growing community of
              storytellers, thinkers, and dreamers.
            </p>
            <p>
              Join us as we chronicle life&#39;s moments together, one story at
              a time. Share yours, explore others, and let&#39;s create a
              tapestry of humanity that celebrates diversity, creativity, and
              connection.
            </p>
          </div>
          <div className="w-full sm:w-1/2 p-2 flex flex-col">
            <h2 className="text-3xl font-bold pb-2 text-center">
              Recent Posts
            </h2>

            <div className="blogItems w-full">
              {homeBlogs.map((homeBlog) => (
                <div
                  key={homeBlog._id}
                  className="blogItem sm:flex bg-slate-300 rounded w-auto mb-2 pt-2"
                >
                  
                    <div className="m-2 w-[200px] h-[100px] bg-cover rounded" style={{backgroundImage: `url(${homeBlog.image})`}}>

                    
                  </div>
                  <div className="p-2">
                    <h2 className="font-bold">Lorem Ipsum</h2>
                    <p>
                      {homeBlog.description.substring(0, 100)}
                      <br />
                      <a className="text-purple-500" href={`${homeBlog.title}/more/${homeBlog._id}`} >
                        Read More...
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
