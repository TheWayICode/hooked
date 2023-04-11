import Fisherman from "./assets/Fisherguide_final.jpg";
import { useState } from "react";

function GuideItem({ title, description, link, tutorial }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`guide-item rounded-full p-3 bg-black bg-opacity-50 text-white lg:w-56 lg:h-56 md:w-48 md:h-48 sm:w-40 sm:h-40 w-32 h-32 lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold flex justify-center items-center transition-transform duration-400 ${
        isExpanded ? "transform scale-130" : ""
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {isExpanded ? (
        <div className="flex flex-col justify-center items-center lg:p-4 md:p-3 p-1">
          <h3 className="lg:text-2xl md:text-xl sm:text-md text-xs font-bold lg:mb-5 md:mb-4 mb-1 text-white">
            {title}
          </h3>
          <p
            className="lg:text-lg md:text-md sm:text-xs text-xss text-white p-2 py-2 text-center"
            style={{ lineHeight: "1.2" }}
          >
            {description}
          </p>
          {link && (
            <a
              href={link}
              className="rounded-full bg-sky-400 lg:text-sm md:text-xss text-xss text-white lg:px-2 lg:py-2 md:px-2 md:py-2 px-1 py-1 font-bold transition-colors duration-300 hover:bg-hooked text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              {tutorial}
            </a>
          )}
        </div>
      ) : (
        title
      )}
    </div>
  );
}

function Guide() {
  return (
    <div
      className="guide-container bg-center bg-no-repeat bg-cover w-full"
      style={{
        backgroundImage: `url(${Fisherman})`,
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="guides-title text-white p-40 lg:text-8xl md:text-7xl sm:text-5xl text-4xl font-bold flex mx-auto mb-15">
        GUIDES
      </h1>
      <div className="guides-bubbles-container flex justify-center items-center lg:pt-40 md:pt-30 sm:pt-20 pt-10 pb-40">
        <div className="grid grid-cols-3 lg:gap-12 md:gap-10 sm:gap-8 gap-4 lg:mb-30 md:mb-20 mb-20">
          <GuideItem
            title="Baiting"
            description="Learn how use bait for your fishing trip."
            link="https://www.youtube.com/watch?v=S35-duYgD00&ab_channel=HowcastSportsFitness"
            tutorial="Video tutorial"
          />
          <GuideItem
            title="Hooking"
            description="Discover how to use a fishing hook."
            link="https://www.youtube.com/watch?v=-_ftAGkewfE&ab_channel=WhyKnot"
            tutorial="Video tutorial"
          />
          <GuideItem
            title="Casting"
            description="Get tips on how to cast your line."
            link="https://www.youtube.com/watch?v=mZSIvpKVA4c&ab_channel=JoshuaTaylor"
            tutorial="Video tutorial"
          />
          <GuideItem
            title="Gutting"
            description="Learn how to clean and gut your catch."
            link="https://www.youtube.com/watch?v=fIfYu3VA7Ro&ab_channel=CaptainQuinn"
            tutorial="Video tutorial"
          />
          <GuideItem
            title="Cooking"
            description="Discover delicious recipes for cooking your catch."
            link="https://www.youtube.com/watch?v=Tgv7tCx2NsA&ab_channel=Tasty"
            tutorial="Video tutorial"
          />
          <GuideItem
            title="Regulations"
            description="Check the fishing regulations in your state."
            link="https://www.findlaw.com/state/state-fish-and-game-laws/fishing-laws-by-state-findlaw.html"
            tutorial="See state laws"
          />
        </div>
      </div>
    </div>
  );
}
export default Guide;
