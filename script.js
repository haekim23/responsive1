const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  //==============================================================
  //❓Create a new speech recognition
  //==============================================================
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";          // Set language to English
    recognition.continuous = true;       // Keep listening until stopped
    recognition.interimResults = true;   // Show partial results while speaking

  //==============================================================
  //❓Start recognition when "#startBtn" button is clicked
  //==============================================================
    document.querySelector("#startBtn").addEventListener("click", () => {
      recognition.start(); // Start listening
      document.querySelector("#startBtn").style.display = "none"; // Hide button after click
    });

  //==============================================================
  //✅ Define keywords and what happens when they are spoken
  //==============================================================
    const keywords = {
      "February 27": () => {
        document.querySelector("#mainText2").className = "variable1";
        // document.querySelector("#image").src = "./img/cell1.png";
        document.querySelector("#vid").src = "./img/February27.mp4";
        document.querySelector("#image").style.bottom = "0px";
        document.querySelector("#image").style.left = "500px";
        document.querySelector("#image").style.rotate = "20deg";
      },
      "4:30": () => {
        document.querySelector("#mainText2").className = "variable2";
        document.querySelector("#vid").src = "./img/Time.mp4";
        document.querySelector("#image").style.top = "30px";
        document.querySelector("#image").style.left = "200px";
        document.querySelector("#image").style.rotate = "0deg";
      },

      "cells": () => {
        document.querySelector("#mainText2").className = "variable3";
        document.querySelector("#image").src = ""; 
        document.querySelector("#vid").src = "./img/cell.mp4";
      },

       "paramecium": () => {
        document.querySelector("#mainText2").className = "variable4";
        document.querySelector("#image").src = "";
        document.querySelector("#vid").src = "./img/paramecium.mp4";
      },


      "dinner": () => {
        document.querySelector("#mainText2").className = "variable5";
        document.querySelector("#image").src = "";
        document.querySelector("#vid").src = "./img/dinner.mp4";
      }
    };

  //==============================================================
  //❓Process recognized speech results
  //==============================================================
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      document.querySelector("#mainText2").textContent = transcript; // Show what user said
      const lowerTranscript = transcript.toLowerCase();
      for (const key in keywords) { 
        if (lowerTranscript.includes(key.toLowerCase())) { // Check if keyword is spoken
          document.querySelector("#mainText2").textContent = key; // Display the keyword
          keywords[key](); // Run the keyword action
          break; // Stop checking after first match
        }
      }
    };

  //==============================================================
  //❓Restart recognition automatically when it ends
  //==============================================================
    recognition.onend = () => {
      recognition.start();
    };

  //==============================================================
}
