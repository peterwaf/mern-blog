// eslint-disable-next-line no-unused-vars
import React from "react";
import Nav from "../componets/Nav";
import { useEffect } from "react";
// for sanitizing html against xss
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import  {fetchBlogs} from "../features/blogsSlice";

function Home() {
  const dispatch = useDispatch();
  const homeBlogs= useSelector((state) => state.blogs.latestBlogs);
  const error = useSelector((state) => state.blogs.error);
  const isLoading = useSelector((state) => state.blogs.loading);
  
  // dispatch(fetchBlogs());

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  

 useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  
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
              In a world brimming with stories, experiences, and ideas, Daily
              Chronicles is your digital haven—a space where every voice finds
              its place. Whether it&apos;s a snapshot of your day, a burst of
              creativity, or a spark of wisdom, this is where you can share,
              connect, and inspire.
            </p>
            <br />
            <p>
              At Daily Chronicles, we believe that every story, no matter how
              big or small, has the power to brighten someone&apos;s day, ignite
              meaningful conversations, or bridge gaps between cultures and
              experiences. This isn&apos;t just a blog; it&apos;s a thriving
              community of storytellers, thinkers, and dreamers—united by the
              shared belief that every narrative matters.
            </p>
            <br />
            <p>
              Join us as we weave together the moments that make life
              extraordinary, one story at a time. Share yours, explore others,
              and let&apos;s craft a vibrant tapestry of humanity that
              celebrates the beauty of diversity, the power of creativity, and
              the magic of connection. Together, let&apos;s turn the ordinary
              into the extraordinary.
            </p>

            <br />
            <p>
              Would you like to view more of our posts?{" "}
              <a href="/login" className="text-purple-500 font-bold bg-white p-1 underline rounded">Log In</a> or{" "}
              <a href="/sign-up" className="text-purple-500 font-bold bg-white p-1 underline rounded">Sign Up</a> if you don&apos;t have an account
            </p>
          </div>
          <div className="w-full sm:w-1/2 p-2 flex flex-col">
            <h2 className="text-3xl font-bold pb-2 text-center">
              Recent Posts
            </h2>

            <div className="blogItems w-full">
              <div className="w-full flex flex-col items-center justify-center align-center">
              {isLoading? <p>Loading...</p> : ""}
              </div>
              {homeBlogs.map((homeBlog) => (
                <div
                  key={homeBlog._id}
                  className="blogItem sm:flex bg-slate-300 rounded w-auto mb-2 pt-2"
                >
                  <div
                    className="m-2 w-[200px] h-[125px] bg-cover rounded"
                    style={{ backgroundImage: `url(${homeBlog.image})` }}
                  ></div>
                  <div className="p-2 w-full">
                    <h2 className="font-bold">Lorem Ipsum</h2>
                    <span className="text-xs font-bold">
                      Posted on: {new Date(homeBlog.createdAt).toDateString()}
                    </span>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          homeBlog.description.slice(0, 100)
                        ),
                      }}
                    ></div>
                    <span>
                      <a
                        className="text-purple-500"
                        href={`${homeBlog.title}/more/${homeBlog._id}`}
                      >
                        Read More...
                      </a>
                    </span>
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
