import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import ImageCarousel from "../components/Slider";
import DataCard from "../components/DataCard";
import Profiles from "../components/Profiles";
import PriceCard from "../components/PricingCard";
import axios from "axios";
import { useUser } from "../providers/UserProvider";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const ImageGrid = () => {
  const dummyImages = [
    "https://img.freepik.com/free-photo/morskie-oko-tatry_1204-510.jpg?semt=ais_hybrid&w=740",

    "https://alainverspecht.com/cdn/shop/articles/AI_kunst_Alain_Verspecht_art.png?v=1697279790&width=800",

    "https://creativerevolution.io/wp-content/uploads/2023/04/amfermy_A_striking_painting_that_visually_represents_the_theme__b7453db2-cb92-4a23-aefc-ed927fa43ab6-1024x574.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHSCBPOWivpUNoiVGit1QOMaroS8cPW_PaosgYpXGVOsTUukp3WfMFgHny1uiviBzmfeA&usqp=CAU",

    "https://images.theconversation.com/files/642582/original/file-20250115-15-vekshv.jpg?ixlib=rb-4.1.0&rect=0%2C0%2C2683%2C1786&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
  ];

  return (
    <div className="w-10/12 lg:max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {dummyImages.map((src, i) => (
        <img
          key={i}
          src={src}
          className="rounded-lg w-full h-40 object-cover shadow-lg transition-transform transform hover:scale-105"
        />
      ))}
    </div>
  );
};

const PromtSection = () => {
  const [generatedImage, setGeneratedImage] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedEngine, setSelectedEngine] = useState(2);
  const [selectedModel, setModel] = useState("Standard");
  const [selectedPreference, setPreference] = useState("Speed");
  const [prompt, setPrompt] = useState("");
  const { token } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const styleImages = [
    "assets/logo.png",
    "assets/anime.jpg",
    "assets/cute.jpeg",
    "assets/cyborg.jpg",
    "assets/fantasy.jpeg",
  ];

  const handleEngine = (index) => {
    setSelectedEngine(index);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    if (selectedEngine == 0) {
      if (prompt !== "") {
        try {
          let style = "";
          if (selectedStyle === 1) {
            style = "Anime";
          } else if (selectedStyle === 2) {
            style = "cute";
          } else if (selectedStyle === 3) {
            style = "robotic";
          } else if (selectedStyle === 4) {
            style = "fantacy";
          }
          const res = await axios.post(
            `${serverUrl}/api/images/generate-image`,
            {
              prompt: `${prompt} Model is${selectedModel} and style is ${style}`,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setGeneratedImage(res.data.imageUrl);
        } catch (error) {
          setGeneratedImage(error.response?.data?.imageUrl);
          console.log(generatedImage);
          alert(error.response?.data?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        alert("Please enter your prompt");
      }
    } else if (selectedEngine == 1) {
      if (prompt !== "") {
        try {
          let style = "";
          if (selectedStyle === 1) {
            style = "Anime";
          } else if (selectedStyle === 2) {
            style = "cute";
          } else if (selectedStyle === 3) {
            style = "robotic";
          } else if (selectedStyle === 4) {
            style = "fantacy";
          }
          const res = await axios.post(
            `${serverUrl}/api/images/generate-genai`,
            {
              prompt: `${prompt} Model is${selectedModel} and style is ${style}`,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setGeneratedImage(res.data.imageUrl);
        } catch (error) {
          setGeneratedImage(error.response?.data?.imageUrl);
          console.log(generatedImage);
          alert(error.response?.data?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        alert("Please enter your prompt");
      }
    } else {
      if (prompt !== "") {
        try {
          let style = "";
          if (selectedStyle === 1) {
            style = "Anime";
          } else if (selectedStyle === 2) {
            style = "cute";
          } else if (selectedStyle === 3) {
            style = "robotic";
          } else if (selectedStyle === 4) {
            style = "fantacy";
          }
          const res = await axios.post(
            `${serverUrl}/api/images/huggingFace`,
            {
              prompt: `${prompt} Model is${selectedModel} and style is ${style}`,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setGeneratedImage(res.data.imageUrl);
        } catch (error) {
          setGeneratedImage(error.response?.data?.imageUrl);
          console.log(generatedImage);
          alert(error.response?.data?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        alert("Please enter your prompt");
      }
    }
  };

  const handleSelectedStyle = (index) => {
    setSelectedStyle(index);
  };

  const handleModel = (model) => {
    setModel(model);
  };
  const handlePreference = (pref) => {
    setPreference(pref);
  };

  const logo = "assets/logo.png";

  const handleDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = "generated-image.png";
      link.click();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className=" w-10/12 lg:max-w-4xl px-4 py-10 mx-auto border border-gray-700 bg-[#0d0613] text-white rounded-3xl shadow-lg mt-6 flex flex-col md:flex-row gap-6 ">
      <div className="flex-1  z-30">
        <div className="flex flex-col">
          <p className="font-semibold mb-2">Generate image using text </p>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Describe what you want to generate..."
            className="w-full max-w-xl p-2 rounded-md bg-gray-700 border border-gray-600 mb-4"
          />
          <button
            onClick={handleGenerate}
            className="px-4 max-w-xl py-2 bg-[#00df9a] hover:bg-teal-600 rounded mb-4"
          >
            Generate
          </button>
        </div>

        <div className="mb-4">
          <p className="font-medium mb-1">Choose a model</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleModel("Standard")}
              className={`px-3 py-1  rounded hover:bg-gray-600 ${
                selectedModel === "Standard"
                  ? "bg-[#00df9a] text-black"
                  : "bg-gray-700"
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => handleModel("High")}
              className={`px-3 py-1  rounded hover:bg-gray-600 ${
                selectedModel === "High"
                  ? "bg-[#00df9a] text-black"
                  : "bg-gray-700"
              }`}
            >
              High
            </button>
            <button
              onClick={() => handleModel("Genius")}
              className={`px-3 py-1  rounded hover:bg-gray-600 ${
                selectedModel === "Genius"
                  ? "bg-[#00df9a] text-black"
                  : "bg-gray-700"
              }`}
            >
              Genius
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-medium mb-1">Preference</p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePreference("Speed")}
              className={`px-3 py-1  rounded hover:bg-gray-600 ${
                selectedPreference === "Speed"
                  ? "bg-[#00df9a] text-black"
                  : "bg-gray-700"
              }`}
            >
              Speed
            </button>
            <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 cursor-not-allowed">
              Quality
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-medium mb-1">Choose style</p>
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {styleImages.map((src, index) => (
              <img
                src={src}
                key={index}
                onClick={() => handleSelectedStyle(index)}
                className={`w-16 h-16 rounded-md cursor-pointer border-2 ${
                  selectedStyle === index
                    ? "border-teal-500"
                    : "border-transparent"
                } hover:opacity-80`}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-1">Choose Engine</p>
          <div className="flex gap-2">
            <img
              src="assets/OpenAI_logo.webp"
              onClick={() => handleEngine(0)}
              className={`w-20 h-12 rounded-md cursor-pointer border-[3px] ${
                selectedEngine === 0 ? "border-red-500" : "border-transparent"
              } hover:opacity-80`}
            />
            <img
              src="assets/gemini_logo.webp"
              onClick={() => handleEngine(1)}
              className={`w-20 h-12 rounded-md cursor-pointer border-[3px] ${
                selectedEngine === 1 ? "border-red-500" : "border-transparent"
              } hover:opacity-80`}
            />
            <img
              src="assets/images.png"
              onClick={() => handleEngine(2)}
              className={`w-20 h-12 rounded-md cursor-pointer border-[3px] ${
                selectedEngine === 2 ? "border-red-500" : "border-transparent"
              } hover:opacity-80`}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center z-50">
        {isLoading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
            <p className="text-lg">Loading...</p>
          </div>
        ) : (
          <div>
            <img
              src={generatedImage || logo}
              className="max-w-full max-h-80 rounded-md border border-gray-700 shadow"
            />
            <button
              onClick={handleDownload}
              className="z-50 mt-4 p-2 bg-blue-500 text-white rounded-md"
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const items = [
    {
      title: "Character Designs",
      src: "assets/slider/charactor.jpg",
    },
    {
      title: "Game Enviroments",
      src: "assets/slider/game.jpg",
    },
    {
      title: "Product Designs",
      src: "assets/slider/product.jpg",
    },
    {
      title: "Graphic Desings",
      src: "assets/slider/graphics.jpg",
    },
    {
      title: "And Many More",
      src: "assets/slider/all.jpg",
    },
  ];
  return (
    <div className="bg-[#070b1d] text-white min-h-screen">
      <div className="flex justify-center items-center">
        <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
          Use AI to generate
        </p>
        <ReactTyped
          className="md:text-5xl sm-text-4xl text-xl font-bold md:pl-4 pl-1"
          strings={["Images", "Music", "Video"]}
          loop
          typeSpeed={120}
          backSpeed={140}
        />
      </div>
      <div className="flex justify-center items-center">
        <p className="md:text-1xl px-5 text-center">
          Leverage generative AI with a unique suite of tools to convey your
          ideas to the world.
        </p>
      </div>
      <ImageGrid />
      <PromtSection />
      <div className="mx-auto flex mt-10 items-center justify-center w-7/12">
        <button
          className=" z-50 rounded-3xl py-2 px-12 bg-gray-800 hover:bg-slate-900
        "
        >
          See what else deep gen can do
        </button>
      </div>
      <div className="md:flex gap-5 w-7/12 mx-auto mt-10  z-50">
        <DataCard
          title={"For Creators"}
          text={
            "Create production-quality visual assets for your projects with unprecedented quality, speed, and style-consistency."
          }
        />
        <DataCard
          title={"For Teams"}
          text={
            "Bring your team's best ideas to life at scale, with our intuitive AI-first creative suite designed for collaboration and built for business."
          }
        />
        <DataCard
          title={"For Developers"}
          text={
            "Experience content creation excellence with Leonardo.AI's API. With unmatched scalability, effortlessly tailor outputs to your brand guideline"
          }
        />
      </div>
      <div className="w-7/12 flex mx-auto mt-5 justify-center">
        <ImageCarousel items={items} />
      </div>
      <div className="w-7/12 flex mx-auto mt-5 justify-center">
        <Profiles />
      </div>
      <div className="w-7/12 mx-auto mt-20 grid gap-8 md:grid-cols-3 mb-4">
        <PriceCard
          image="assets/single.png"
          title="Creator"
          price="$19/month"
          features={[
            "100 AI Images / mo",
            "20 AI Music Tracks",
            "10 Short AI Videos",
            "Basic Prompt Support",
          ]}
        />
        <PriceCard
          image="assets/double.png"
          title="Pro Studio"
          price="$49/month"
          features={[
            "500 AI Images / mo",
            "100 AI Music Tracks",
            "50 HD AI Videos",
            "Advanced Prompt Engine",
            "Priority Rendering",
          ]}
          highlight={true}
          buttonColor="black"
          buttonTextColor="#00df9a"
        />

        <PriceCard
          image="assets/triple.png"
          title="Enterprise Suite"
          price="$99/month"
          features={[
            "Unlimited Image & Video Gen",
            "Unlimited Music Composition",
            "Multi-user Access",
            "Custom AI Models",
            "API Access + Analytics",
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
