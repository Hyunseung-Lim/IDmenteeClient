import React, { useState, useEffect } from "react";
import "./student.css";
import { BarChart } from "../bar/BarChart";
import DivergentConvergent from "./divergent-convergent.svg";
import StatementQuestion from "./statement-question.svg";


export const Student = (props) => {
  const [totalExp, setTotalExp] = useState(0);
  const [studentLevel, setStudentLevel] = useState(1);
  const [currentExp, setCurrentExp] = useState(0);
  const [animate, setAnimate] = useState(true);
  const maxExp = 100;
  const [cnd, setCnd] = useState(0);
  const [qns, setQns] = useState(0);
  const [evalPoint, setEvalPoint] = useState([0, 0, 0, 0, 0, 0]);
  const [studentFace, setStudentFace] = useState(props.face);
  const [thinkingContents, setThinkingContents] = useState(
    props.thinkingContents ? props.thinkingContents : "..."
  );

  useEffect(() => {
    console.log("cnd: ", cnd);
    console.log("qns: ", qns);
  }, [cnd, qns]);

  useEffect(() => {
    if (currentExp + props.knowledgeLevel - totalExp >= maxExp) {
      setTimeout(() => {
        setCurrentExp(maxExp);
      }, 500);
      setTimeout(() => {
        setCurrentExp(0);
      }, 500);
      setAnimate(false);

      setTimeout(() => {
        const excessExp = currentExp + props.knowledgeLevel - totalExp - maxExp;
        let newLevel = studentLevel;
        let newExp = excessExp;

        while (newExp >= maxExp) {
          newLevel += 1;
          newExp -= maxExp;
        }

        setStudentLevel(newLevel + 1);
        setCurrentExp(newExp);
        setAnimate(true);
      }, 500);
    } else {
      setCurrentExp(currentExp + props.knowledgeLevel - totalExp);
    }
    setTotalExp(props.knowledgeLevel);
  }, [props.knowledgeLevel]);

  useEffect(() => {
    setCnd(props.feedbackData.cnd);
    setQns(props.feedbackData.qns);
    setEvalPoint([
      props.feedbackData.specificity,
      props.feedbackData.justification,
      props.feedbackData.active,
      props.feedbackData.timely,
      props.feedbackData.relevance,
      props.feedbackData.high_level,
    ]);
  }, [props.feedbackData]);

  useEffect(() => {
    setStudentFace(props.face);
  }, [props.face]);

  useEffect(() => {
    setThinkingContents(
      props.thinkingContents ? props.thinkingContents : "..."
    );
  }, [props.thinkingContents]);

  const getNeedleRotation = (value) => {
    return (value * 1.8) - 180;
  };

  return (
    <>
      <div className="studentUI">
        <div className="studentProfile">
          <div className="title">Mentee(Alex) Profile</div>
          <div className="thinkingContentBox">{thinkingContents}</div>
          <img
            src={`images/student/student${studentFace}.png`}
            alt="logo"
          />
          <div className="barContainer">
            <div
              className={animate ? "gauge" : "gauge no-animation"}
              style={{ width: `${currentExp}%` }}
            />
          </div>
          <div className="levelContainer">
            <div className="level">Level {studentLevel}</div>
            <div className="exp">{currentExp} exp points</div>
          </div>
        </div>
        <div className="userStatus">
          <div className="feedback">
            <h5 className="title">User Feedback</h5>
            <div className="pedometer-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
              <div className="pedometer" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="pedometer-svg" style={{ position: "relative", width: "95%", height: "100px" }}>
                  <img src={DivergentConvergent} alt="Divergent-Convergent" style={{ width: "100%", height: "auto" }} />
                  <svg className="needle" width="56" height="7" viewBox="0 0 56 7" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: "90%", left: "50%", transform: `rotate(${getNeedleRotation(cnd)}deg)`, transformOrigin: "left center"}}>
                    <path d="M75.0576 3.80078L3.05518 6.68088C1.41939 6.74631 0.0576172 5.43788 0.0576172 3.80078V3.80078C0.0576172 2.16369 1.41939 0.855254 3.05518 0.920685L75.0576 3.80078Z" fill="#434343" />
                  </svg>
                </div>
                <div className="pedometer-label" style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "2px" }}>
                  <span>Divergent</span>
                  <span>Convergent</span>
                </div>
              </div>
              <div className="pedometer" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="pedometer-svg" style={{ position: "relative", width: "95%", height: "100px" }}>
                  <img src={StatementQuestion} alt="Statement-Question" style={{ width: "100%", height: "auto" }} />
                  <svg className="needle" width="56" height="7" viewBox="0 0 56 7" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: "90%", left: "50%", transform: `rotate(${getNeedleRotation(qns)}deg)`, transformOrigin: "left center"}}>
                    <path d="M75.0576 3.80078L3.05518 6.68088C1.41939 6.74631 0.0576172 5.43788 0.0576172 3.80078V3.80078C0.0576172 2.16369 1.41939 0.855254 3.05518 0.920685L75.0576 3.80078Z" fill="#434343" />
                  </svg>
                </div>
                <div className="pedometer-label" style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "2px" }}>
                  <span>Statement</span>
                  <span>Question</span>
                </div>
              </div>
            </div>
            <BarChart evalPoint={evalPoint} />
          </div>
        </div>
      </div>
    </>
  );
};