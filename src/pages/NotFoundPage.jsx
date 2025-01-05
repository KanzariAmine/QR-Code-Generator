import React from "react";
import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <section className="bg-white dark:bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl h-screen lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-primary-500 text-purple-600">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-black md:text-4xl ">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-violet-900 my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
