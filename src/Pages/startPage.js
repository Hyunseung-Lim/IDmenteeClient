import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { Topbar } from "../Components/Topbar/topbar";
import "./pages.css";

export const StartPage = (props) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
  const [selectCharacter, setSelectCharacter] = useState(0);
  const [goal1, setGoal1] = useState("");
  const [goal2, setGoal2] = useState("");
  const [goal3, setGoal3] = useState("");
  const [time, setTime] = useState(20);

  function getSetting() {
    axios({
      method: "GET",
      url: "/getSetting",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setMode(res.mode);
        setCurrentRound(res.round);
        setSelectCharacter(res.character);
        setGoal1(res.goal1);
        setGoal2(res.goal2);
        setGoal3(res.goal3);
        setTime(res.time);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          axios({
            method: "POST",
            url: "/logout",
          })
            .then((response) => {
              props.removeToken();
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });
        }
      });
  }

  const startButtonClick = async () => {
    try {
      await axios({
        method: "POST",
        url: "/saveSetting",
        headers: {
          Authorization: "Bearer " + props.token,
        },
        data: {
          character: selectCharacter,
          goal1: goal1,
          goal2: goal2,
          goal3: goal3,
          time: time,
        },
      })
        .then((response) => {})
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
      navigate("/feedback", { state: { feedback: true } });
    } catch (error) {
      //
    }
  };

  function SelectCharacter(i) {
    if (selectCharacter === i) {
      setSelectCharacter(0);
    } else {
      setSelectCharacter(i);
    }
  }

  function updateTime(i) {
    console.log(time + i);
    if (time + i > 0 && time + i < 60) {
      setTime((prevTime) => prevTime + i);
    }
  }

  const handleGoal1Change = (event) => {
    setGoal1(event.target.value);
  };
  const handleGoal2Change = (event) => {
    setGoal2(event.target.value);
  };
  const handleGoal3Change = (event) => {
    setGoal3(event.target.value);
  };

  useEffect(() => {
    getSetting();
  }, []);

  return (
    <>
      <Topbar removeToken={props.removeToken} />
      {currentRound <= 4 ? (
        <div className="startpage">
          <div className="startbox">
            <div className="roundBar">
              {currentRound < 1 ? (
                <svg className="circle" height="16" width="16">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#dddddd"
                    strokeWidth="2"
                    fill="white"
                  />
                </svg>
              ) : currentRound === 1 ? (
                <svg className="circle" height="16" width="16">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#2C54F2"
                    strokeWidth="2"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg className="circle" height="16" width="16">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#2C54F2"
                    strokeWidth="2"
                    fill="#2C54F2"
                  />
                </svg>
              )}
              {currentRound <= 1 ? (
                <svg height="2" width="250">
                  <rect width="250" height="2" fill="#dddddd" />
                </svg>
              ) : (
                <svg height="2" width="250">
                  <rect width="250" height="2" fill="#2C54F2" />
                </svg>
              )}
              {currentRound < 2 ? (
                <svg className="circle" height="16" width="16">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#dddddd"
                    strokeWidth="2"
                    fill="white"
                  />
                </svg>
              ) : currentRound === 2 ? (
                <svg className="circle" height="16" width="16">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#2C54F2"
                    strokeWidth="2"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg className="circle" height="16" width="16">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#2C54F2"
                    strokeWidth="2"
                    fill="#2C54F2"
                  />
                </svg>
              )}
              {currentRound <= 2 ? (
                <svg height="2" width="250">
                  <rect width="250" height="2" fill="#dddddd" />
                </svg>
              ) : (
                <svg height="2" width="250">
                  <rect width="250" height="2" fill="#2C54F2" />
                </svg>
              )}
              {currentRound < 3 ? (
                <svg className="circle" height="16" width="16">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#dddddd"
                    strokeWidth="2"
                    fill="white"
                  />
                </svg>
              ) : currentRound === 3 ? (
                <svg className="circle" height="16" width="16">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#2C54F2"
                    strokeWidth="2"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg className="circle" height="16" width="16">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#2C54F2"
                    strokeWidth="2"
                    fill="#2C54F2"
                  />
                </svg>
              )}
            </div>
            <div className="roundLabels">
              <div className={currentRound < 1 ? "label" : "selectLabel label"}>
                Practice (5 min.)
              </div>
              <div className={currentRound < 2 ? "label" : "selectLabel label"}>
                Session 1 (20 min.)
              </div>
              <div className={currentRound < 3 ? "label" : "selectLabel label"}>
                Session 2 (20 min.)
              </div>
            </div>
            <div className="setting">
              <div className="setCharacter">
                <div className="settingTitle">
                  You are an ideal mentor in your mind.
                  <br />
                  What is your character?
                </div>
                <div className="characterHolder">
                  <img
                    src="images/character/character1.png"
                    className="character"
                    style={
                      selectCharacter === 1
                        ? { border: "5px solid #2C54F2" }
                        : { border: "5px solid #ffffff" }
                    }
                    onClick={() => SelectCharacter(1)}
                    alt="character1"
                  />
                  <img
                    src="images/character/character2.png"
                    className="character"
                    style={
                      selectCharacter === 2
                        ? { border: "5px solid #2C54F2" }
                        : { border: "5px solid #ffffff" }
                    }
                    onClick={() => SelectCharacter(2)}
                    alt="character2"
                  />
                  <img
                    src="images/character/character3.png"
                    className="character"
                    style={
                      selectCharacter === 3
                        ? { border: "5px solid #2C54F2" }
                        : { border: "5px solid #ffffff" }
                    }
                    onClick={() => SelectCharacter(3)}
                    alt="character3"
                  />
                  <img
                    src="images/character/character4.png"
                    className="character"
                    style={
                      selectCharacter === 4
                        ? { border: "5px solid #2C54F2" }
                        : { border: "5px solid #ffffff" }
                    }
                    onClick={() => SelectCharacter(4)}
                    alt="character4"
                  />
                  <img
                    src="images/character/character5.png"
                    className="character"
                    style={
                      selectCharacter === 5
                        ? { border: "5px solid #2C54F2" }
                        : { border: "5px solid #ffffff" }
                    }
                    onClick={() => SelectCharacter(5)}
                    alt="character5"
                  />
                </div>
              </div>
              <div className="setGoal">
                <div className="settingSubtitle">
                  Please answer the following questions:
                </div>
                <div className="goal">
                  1. What type of mentor are you?
                  <input value={goal1} onChange={handleGoal1Change} />
                </div>
                <div className="goal">
                  2. What are the characteristics of the feedback you provide?
                  <input value={goal2} onChange={handleGoal2Change} />
                </div>
                <div className="goal">
                  3. What is your goal for this session?
                  <input value={goal3} onChange={handleGoal3Change} />
                </div>
              </div>
              {/* <div className="setTime">
                <div className="settingTitle">제한 시간</div>
                <div className="timeHolder">
                  <div className="time">{time} MIN</div>
                  <div className='timebuttonHolder'><button onClick={() => updateTime(1)}>&#9653;</button><button onClick={() => updateTime(-1)}>&#9663;</button></div>
                </div>
              </div>
              */}
            </div>
            <button className="startButton" onClick={startButtonClick}>
              start
            </button>
          </div>
        </div>
      ) : (
        <div className="startpage page_mode2">
          The experiment is now complete! <br />
          If you are willing to participate in a follow-up interview, please
          click the Yes button!
          <button>Yes</button>
        </div>
      )}
    </>
  );
};
