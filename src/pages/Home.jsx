import { useEffect, useState } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import QuoteList from "../components/QuoteList";
import Loading from "../components/Loading";
import Error from "../components/Error";

// const quote = [
//   {
//     id: 1,
//     description: "Do what you can, with what you have, where you are!",
//     author: "Theodore Roosevelt",
//   },
//   {
//     id: 2,
//     description:
//       "We need to accept that we won’t always make the right decisions, that we’ll screw up royally sometimes―understanding that failure is not the opposite of success, it’s part of success.",
//     author: "Thomas Shelby",
//   },
//   {
//     id: 3,
//     description:
//       "Write it. Shoot it. Publish it. Crochet it. Sauté it. Whatever. Make!",
//     author: "Theodore Roosevelt",
//   },
//   {
//     id: 4,
//     description:
//       "Write it. Shoot it. Publish it. Crochet it. Sauté it. Whatever.",
//     author: "Soe Daaa",
//   },
//   {
//     id: 5,
//     description:
//       "Happiness is not something ready made. It comes from your own actions.",
//     author: "Dalai Lama XIV",
//   },
//   {
//     id: 6,
//     description:
//       "Smart people learn from everything and everyone, average people from their experiences, stupid people already have all the answers.",
//     author: "Socrates",
//   },
// ];

const Home = () => {
  const [quote, setQuote] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchQuote() {
      try {
        setIsLoading(true);
        setIsError("");

        const url = import.meta.env.VITE_BASE_URL;

        const res = await fetch(`${url}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Something wrong!");

        const data = await res.json();
        setQuote(data.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setIsError(error.message);
          console.log(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuote();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      {isLoading ? <Loading /> : <QuoteList quote={quote} />}
      {isError.length > 0 ? <Error text={isError} /> : ""}
      {/* <div className="container mx-auto flex justify-center py-3 mb-10">
        <button className="h-10 w-[150px] bg-blue-500 text-white text-sm rounded-md hover:bg-blue-700">
          View more
        </button>
      </div> */}
    </>
  );
};

export default Home;
