import { LoggedNav } from "./NavLog/LoggedNav";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const { token } = useToken();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  return (
    <>
      <LoggedNav />
      <div className="w-full bg-cover bg-no-repeat py-10 px-4 min-h-screen" style={{
        backgroundImage: 'url(https://i.imgur.com/7YWTCEi.png)',
        backgroundPosition: "center -400px",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="max-w-[1240px] mx-auto">
            <h1 className="md:text-8xl text-center font-bold text-white mb-16">Meet the Team</h1>
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-4 gap-8 mb-24">
                <div className="bg-[#d6fbff] rounded-lg shadow-2xl p-6 flex flex-col items-center">
                    <img
                        className="w-full mx-auto my-4 mb-4 rounded-2xl"
                        src="https://i.imgur.com/rWX533f.png"
                        alt="SMP"
                        style={{ width: "100%", height: "225px"}}
                    />
                    <div className="text-2xl mb-2 font-bold">Sean Cho</div>
                    <a href="https://gitlab.com/skoreancho" className="text-[#0000FF] text-xl">Gitlab</a>
                </div>
                <div className="bg-[#d6fbff] rounded-lg shadow-2xl p-6 flex flex-col items-center">
                    <img
                        className="w-full mx-auto my-4 mb-4 rounded-2xl"
                        src="https://i.imgur.com/kcT3Ath.png"
                        alt="SMP"
                        style={{ width: "100%", height: "225px", backgroundPosition: "center -20px"}}
                    />
                    <div className="text-2xl mb-2 font-bold">Jeff Chang</div>
                    <a href="https://gitlab.com/jeffmchang" className="text-[#0000FF] text-xl">Gitlab</a>
                </div>
                <div className="bg-[#d6fbff] rounded-lg shadow-2xl p-6 flex flex-col items-center">
                    <img
                        className="w-full mx-auto my-4 mb-4 rounded-2xl"
                        src="https://i.imgur.com/TfDdR6M.png"
                        alt="SMP"
                        style={{ width: "100%", height: "225px"}}
                    />
                    <div className="text-2xl mb-2 font-bold">Robin Kim</div>
                    <a href="https://gitlab.com/robin_kim" className="text-[#0000FF] text-xl">Gitlab</a>
                </div>
                <div className="bg-[#d6fbff] rounded-lg shadow-2xl p-6 flex flex-col items-center">
                    <img
                        className="w-full mx-auto my-4 mb-4 rounded-2xl"
                        src="https://i.imgur.com/amf8DW1.png"
                        alt="SMP"
                        style={{ width: "100%", height: "225px" }}
                    />
                    <div className="text-2xl mb-2 font-bold">Mike Mielnicki</div>
                    <a href="https://gitlab.com/MikeMieln" className="text-[#0000FF] text-xl">Gitlab</a>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
