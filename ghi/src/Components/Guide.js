import Fisherman from "./assets/Fisherguide_final.jpg";
import { useState } from "react";

function GuideItem({ title, img, description, link, tutorial }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-3/5 mx-auto">
      <div
        className={`guide-item rounded-3xl shadow-xl bg-white p-4 text-center transition-all duration-300 overflow-hidden hover:bg-hooked hover:bg-opacity-50 ${
          isExpanded ? "bg-black" : ""
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <h5 className="card-title text-2xl font-bold">{title}</h5>
        <div className="card-text text-base mt-3">
          {isExpanded ? (
            <div className="flex flex-col justify-center items-center">
              <div className="w-64 h-64 border-2 border-gray-200 mx-auto my-3 flex justify-center items-center">
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover mx-auto my-auto p-2"
                />
              </div>
              <div className="mx-auto font-semibold my-3">{description}</div>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-500 text-white font-bold py-2 px-3 rounded-full hover:bg-blue-600">
                  {tutorial}
                </button>
              </a>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <div className="w-64 h-64 border-2 border-gray-200 mx-auto my-3 flex justify-center items-center">
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover mx-auto my-auto p-2"
                />
              </div>
              <div className="font-semibold my-3">{description}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Guide() {
  return (
    <div
      className="guide-container bg-center bg-no-repeat bg-cover w-full mt-[-80px] pt-[80px]"
      style={{
        backgroundImage: `url(${Fisherman})`,
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="bg-black bg-opacity-40 guides-title text-white p-64 lg:text-8xl md:text-7xl sm:text-5xl text-4xl font-bold flex mx-auto">
        GUIDES
      </h1>
      <div className="bg-black bg-opacity-90 flex flex-col justify-center items-center py-20 text-gray-100 mx-auto">
        <h2 className="text-5xl font-bold mb-4 text-center text-hooked">
          New to fishing?
        </h2>
        <p className="text-2xl mb-4 font-bold text-center">
          Or seeking to learn more? Uncover great fishing techniques to
          transform your next adventure!
        </p>
        <p className="text-5xl text-yellow-400 text-center font-bold py-2 px-4">
          Explore Guides below!
        </p>
      </div>
      <div className="guides-bubbles-container bg-white flex justify-center items-center py-10 lg:pb-20 md:pb-30 sm:pb-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-auto w-full lg:w-4/5">
          <GuideItem
            title="Baiting"
            img="https://i.fbcd.co/products/resized/resized-750-500/952792e8ae8090fd95ace68fbede6ade4f4bb7c6187008b3ca6a3117949b7dc9.jpg"
            link="https://www.youtube.com/watch?v=S35-duYgD00&ab_channel=HowcastSportsFitness"
            description="Learn how use bait for your fishing trip."
            tutorial="Video tutorial"
          />
          <GuideItem
            title="Hooking"
            img="https://media.istockphoto.com/id/534720387/vector/fishing-hook.jpg?s=612x612&w=0&k=20&c=GfnacQPKmVWo0FbLqKACajlvEOeeMv2vV_fpcLvvLhY="
            description="Discover how to use a fishing hook."
            link="https://www.youtube.com/watch?v=-_ftAGkewfE&ab_channel=WhyKnot"
            tutorial="Video tutorial"
          />
          <GuideItem
            title="Casting"
            img="https://static.vecteezy.com/system/resources/previews/008/045/338/non_2x/man-fishing-silhouette-illustration-silhouetted-fisherman-fishing-with-a-fishing-rod-vector.jpg"
            description="Get tips on how to cast your line."
            link="https://www.youtube.com/watch?v=mZSIvpKVA4c&ab_channel=JoshuaTaylor"
            tutorial="Video tutorial"
          />
          <GuideItem
            title="Gutting"
            img="https://media.istockphoto.com/id/1301163003/vector/illustration-of-mr-itamae-who-judges-tuna.jpg?s=612x612&w=0&k=20&c=z_4gJzAnvA3LRZ0W-FOV2rXDH48gPrrUIVz3HNgibr4="
            description="Learn how to clean and gut your catch."
            link="https://www.youtube.com/watch?v=fIfYu3VA7Ro&ab_channel=CaptainQuinn"
            tutorial="Video tutorial"
          />
          <GuideItem
            title="Cooking"
            img="https://us.123rf.com/450wm/vandycandy/vandycandy1902/vandycandy190200071/117261205-pan-with-salmon-steak-avocado-tomatoes-and-lettuce-top-view-creative-design-for-breakfast-menu.jpg?ver=6"
            description="Discover delicious recipes for cooking your catch."
            link="https://www.youtube.com/watch?v=Tgv7tCx2NsA&ab_channel=Tasty"
            tutorial="Video tutorial"
          />
          <GuideItem
            title="Regulations"
            img="https://media.istockphoto.com/id/1300159054/vector/fishing-licence-rgb-color-icon.jpg?s=612x612&w=0&k=20&c=a_2g9aHd49sg909mc1gzX2mcR6UJQa4yf3UOUbi4Obc="
            description="Check the fishing regulations in your state."
            link="https://www.findlaw.com/state/state-fish-and-game-laws/fishing-laws-by-state-findlaw.html"
            tutorial="See state laws"
          />
        </div>
      </div>
      <div className="bg-gray-800 bg-opacity-90 flex flex-col justify-center items-center p-20 text-gray-100 mx-auto">
        <h2 className="text-5xl font-bold mb-5 text-hooked text-center">
          Already got the necessary skills?
        </h2>
        <p className="text-2xl font-bold text-center">
          Get started by checking out the local fishing spots near you!
        </p>
        <a
          href="/locations"
          className="bg-yellow-400 text-gray-800 font-bold py-2 px-4 my-4 rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out"
        >
          Explore Locations
        </a>
        <p className="text-2xl font-bold text-center">
          Already have some catches? Add to our community forum!
        </p>
        <a
          href="/forum"
          className="bg-yellow-400 text-gray-800 font-bold py-2 px-4 my-4 rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out"
        >
          Explore Community Forum
        </a>
      </div>
    </div>
  );
}
export default Guide;
