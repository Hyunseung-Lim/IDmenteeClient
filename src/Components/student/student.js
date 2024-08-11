import React, { useState, useEffect, useRef } from "react";
import "./student.css";
import { BarChart } from "../bar/BarChart";
import { use } from "marked";

export const Student = (props) => {
  const svgRef = useRef(null);
  const [svgWidth, setSvgWidth] = useState(0);

  const [totalExp, setTotalExp] = useState(0);
  const [studentLevel, setStudentLevel] = useState(1);
  const [currentExp, setCurrentExp] = useState(0);
  const [animate, setAnimate] = useState(true);
  const maxExp = 100;
  const [userTab, setUserTab] = useState(false);
  const [cnd, setCnd] = useState(0);
  const [qns, setQns] = useState(0);
  const [evalPoint, setEvalPoint] = useState([0, 0, 0, 0, 0, 0]);
  const [studentFace, setStudentFace] = useState(props.face);
  const [thinkingContents, setThinkingContents] = useState(
    props.thinkingContents ? props.thinkingContents : "..."
  );

  function userTabChange(i) {
    setUserTab(i);
  }

  useEffect(() => {
    if (currentExp + props.knowledgeLevel - totalExp >= maxExp) {
      setTimeout(() => {
        setCurrentExp(maxExp);
      }, 500);
      setTimeout(() => {
        setCurrentExp(0);
      }, 500);
      setAnimate(false); // Disable animation for reset

      setTimeout(() => {
        const excessExp = currentExp + props.knowledgeLevel - totalExp - maxExp;
        let newLevel = studentLevel;
        let newExp = excessExp;

        // Check if the excess experience is enough to level up multiple times
        while (newExp >= maxExp) {
          newLevel += 1;
          newExp -= maxExp;
        }

        setStudentLevel(newLevel + 1);
        setCurrentExp(newExp);
        setAnimate(true); // Re-enable animation
      }, 500); // Delay for the animation, 1000 ms or 1 second
    } else {
      setCurrentExp(currentExp + props.knowledgeLevel - totalExp);
    }
    setTotalExp(props.knowledgeLevel);
  }, [props.knowledgeLevel]);

  useEffect(() => {
    const updateSvgWidth = () => {
      if (svgRef.current) {
        setSvgWidth(svgRef.current.clientWidth);
      }
    };

    setTimeout(updateSvgWidth, 100);

    window.addEventListener("resize", updateSvgWidth);

    return () => {
      window.removeEventListener("resize", updateSvgWidth);
    };
  }, []);

  useEffect(() => {
    setCnd(props.feedbackData.cnd);
    setQns(props.feedbackData.qns);
    setEvalPoint([
      props.feedbackData.timely,
      props.feedbackData.relevance,
      props.feedbackData.high_level,
      props.feedbackData.specificity,
      props.feedbackData.justification,
      props.feedbackData.active,
    ]);
  }, [props.feedbackData]);

  useEffect(() => {
    setStudentFace(props.face);
  }, [props.face]);

  useEffect(() => {
    console.log("thinkingContents: ", props.thinkingContents);
    setThinkingContents(props.thinkingContents ? props.thinkingContents : "...");
  }, [props.thinkingContents]);

  return (
    <>
      <div className="studentUI">
        {/* <div className='topbar'>
                    <img src='images/student_wrap_Btn.png' alt='student_wrap_btn'/>
                </div> */}
        <div className="studentProfile">
          <div className="title">학생(동건) 프로필</div>
          <div className="thinkingContentBox">{thinkingContents}</div>
          <img src={"images/student/student" + studentFace + ".png"} alt="logo" />
          <div className="barContainer">
            <div
              className={animate ? "gague" : "gague no-animation"}
              style={{ width: `${currentExp}%` }}
            />
          </div>
          <div className="levelContainer">
            <div className="level">Level {studentLevel}</div>
            <div className="exp">{currentExp} exp points</div>
          </div>
        </div>
        <div className="buttonContainer">
          <button
            className={userTab ? "userBtn clicked" : "userBtn"}
            onClick={() => userTabChange(true)}
          >
            유저 프로필
          </button>
          <button
            className={userTab ? "userBtn" : "userBtn clicked"}
            onClick={() => userTabChange(false)}
          >
            유저 피드백
          </button>
        </div>
        <div className="userStatus">
          {userTab ? (
            <div className="userProfileContainer">
              <img
                src={"/images/character/character" + props.profileData.character + ".png"}
                alt="profileImg"
              />
              <div className="userGoals">
                <b>나는</b>
                <div className="goal">{props.profileData.goal1}</div>
                <b>나의 피드백은</b>
                <div className="goal">{props.profileData.goal2}</div>
                <b>나의 목표는</b>
                <div className="goal">{props.profileData.goal3}</div>
              </div>
            </div>
          ) : (
            <div ref={svgRef} className="feedback">
              <div className="barHolder">
                <div className="bar">
                  <div>발산형</div>
                  <svg height="20" width="60%">
                    <defs>
                      <clipPath id="left-rounded-rect-1">
                        <path
                          d={`M10,0 H${
                            ((cnd/10) * (svgWidth * 0.6)) / 10 + 10
                          } V20 H10 Q0,20 0,10 V10 Q0,0 10,0 Z`}
                        />
                      </clipPath>
                      <clipPath id="right-rounded-rect-1">
                        <path
                          d={`M0,0 
                                                H${svgWidth * 0.6 - 10} 
                                                Q${svgWidth * 0.6},0 ${svgWidth * 0.6},10 
                                                V10
                                                Q${svgWidth * 0.6},20 ${svgWidth * 0.6 - 10},20 
                                                H0 
                                                Z`}
                        />
                      </clipPath>
                    </defs>
                    {/* Rectangle with rounded corners on the left side */}
                    <rect
                      className="barPointer"
                      x="10"
                      width={svgWidth * 0.6}
                      height="20"
                      fill="#92EADF"
                      clipPath="url(#right-rounded-rect-1)"
                    />
                    <rect
                      className="barPointer"
                      width={((cnd/10) * (svgWidth * 0.6 - 20)) / 10 + 10}
                      height="20"
                      fill="#32C5B3"
                      clipPath="url(#left-rounded-rect-1)"
                    />
                  </svg>
                  <div>수렴형</div>
                </div>
                <div className="bar">
                  <div>질문형</div>
                  <svg height="20" width="60%">
                    <defs>
                      <clipPath id="left-rounded-rect-2">
                        <path
                          d={`M10,0 H${
                            (qns / 10 * (svgWidth * 0.6)) / 10 + 10
                          } V20 H10 Q0,20 0,10 V10 Q0,0 10,0 Z`}
                        />
                      </clipPath>
                      <clipPath id="right-rounded-rect-2">
                        <path
                          d={`M0,0 
                                                H${svgWidth * 0.6 - 10} 
                                                Q${svgWidth * 0.6},0 ${svgWidth * 0.6},10 
                                                V10
                                                Q${svgWidth * 0.6},20 ${svgWidth * 0.6 - 10},20 
                                                H0 
                                                Z`}
                        />
                      </clipPath>
                    </defs>
                    {/* Rectangle with rounded corners on the left side */}
                    <rect
                      className="barPointer"
                      x="10"
                      width={svgWidth * 0.6}
                      height="20"
                      fill="#A4D8FF"
                      clipPath="url(#right-rounded-rect-2)"
                    />
                    <rect
                      className="barPointer"
                      width={(qns / 10 * (svgWidth * 0.6 - 20)) / 10 + 10}
                      height="20"
                      fill="#2D54F2"
                      clipPath="url(#left-rounded-rect-2)"
                    />
                  </svg>
                  <div>진술형</div>
                </div>
              </div>
              <BarChart evalPoint={evalPoint}/>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
