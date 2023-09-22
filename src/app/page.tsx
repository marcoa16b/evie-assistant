"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");

  const [myUrl, setMyUrl] = useState("");

  async function handleQuestion() {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: prompt }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const reader = response.body?.getReader();
      let result = "";

      while (true) {
        const { done, value }: any = await reader?.read();
        if (done) break;
        result += new TextDecoder().decode(value);
        // Actualizar el estado con los datos recibidos
        setMessage(result);
      }
    } catch (error) {
      console.error("Error al recibir datos:", error);
    }
  }

  useEffect(() => {
    const url = window.location.href;
    setMyUrl(url);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center py-20 px-5 max-w-3xl mx-auto">
      <div className="fixed opacity-50 w-[400px] h-[400px] rounded-full blur-[180px] bg-gradient-radial from-[--primary] to-[--bg] -z-50" />
      <p className="text-xs sm:text-sm text-[--fg-sec] text-center">
        Conoce a Evie, tu asistente sarcástico
      </p>
      <h1 className="my-5 sm:my-10 text-3xl sm:text-4xl font-extrabold text-center">
        Pregunta lo que quieras, la{" "}
        <span className="text-[--primary]">gran IA</span> te lo respondera
      </h1>
      <div className="flex flex-col items-center w-full sm:flex-row max-w-[500px]">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15.02 19.52c-2.341 .736 -5 .606 -7.32 -.52l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c1.649 1.407 2.575 3.253 2.742 5.152"></path>
              <path d="M19 22v.01"></path>
              <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"></path>
            </svg>
          </div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border text-sm rounded-lg block w-full pl-12 p-2.5 focus:outline-none bg-black border-gray-600 placeholder-gray-500 text-white focus:border-[--primary]"
            placeholder="¿De que tamaño es la luna?"
          />
        </div>
        <button
          type="button"
          className="text-white focus:outline-none focus:ring-2 focus:ring-[--primary] font-medium rounded-lg text-sm px-5 py-2.5 mx-2 my-2 bg-black border border-gray-600 hover:bg-gray-800 focus:ring-gray-700"
          onClick={handleQuestion}
        >
          Preguntar
        </button>
      </div>
      <div className="mt-10 max-w-[600px]">
        <p className="text-center sm:text-lg">
          {message === "" ? "Aquí verás la respuesta del asistente" : message}
        </p>
        <div className="flex justify-center text-[--fg-sec] text-xs sm:text-sm mt-4">
          {/* <p
            onClick={() => props.setOpenModal("pop-up")}
            className="flex cursor-pointer items-center mx-4 hover:font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M8.7 10.7l6.6 -3.4"></path>
              <path d="M8.7 13.3l6.6 3.4"></path>
            </svg>
            <span>Compartir</span>
          </p> */}
          <p
            onClick={() => {
              setPrompt("");
              setMessage("");
            }}
            className="flex cursor-pointer items-center mx-4 hover:font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
              <path d="M20 4v5h-5"></path>
            </svg>
            <span>Nueva pregunta</span>
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-2 mt-5">
          <p>Compartir: </p>
          <WhatsappShareButton url={myUrl}>
            <WhatsappIcon round={true} size={32} />
          </WhatsappShareButton>
          <TwitterShareButton url={myUrl}>
            <TwitterIcon round={true} size={32} />
          </TwitterShareButton>
          <FacebookShareButton url={myUrl}>
            <FacebookIcon round={true} size={32} />
          </FacebookShareButton>
          <LinkedinShareButton url={myUrl}>
            <LinkedinIcon round={true} size={32} />
          </LinkedinShareButton>
          <TelegramShareButton url={myUrl}>
            <TelegramIcon round={true} size={32} />
          </TelegramShareButton>
        </div>
      </div>

      <div className="mt-10 sm:mt-20">
        <Link href="https://github.com/marcoa16b/evie-assistant" legacyBehavior>
          <a className="flex items-center">
            <svg
              className="bg-[--primary] rounded-full text-black p-0.5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z"
                strokeWidth="0"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-xs sm:text-sm ml-2">
              marcoa16b/evie-assistant
            </span>
          </a>
        </Link>
        <div></div>
      </div>
    </main>
  );
}
