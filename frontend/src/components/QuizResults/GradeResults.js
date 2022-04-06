import React, { useState, useEffect } from "react";
import { BarGraph } from "./BarGraph";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import {
  StyledOutput,
  StyledOutputLabel,
  StyledOutputContainer,
} from "./styles/StyledOutput";
import { StyledBarGraph, StyledBar } from "./styles/StyledBarGraph";

let input = new Array(7);

export const GradeVisualizer = (props) => {
  const [grades, setGrades] = useState(new Array(7));
  const gradeValues = [10, 9, 8, 7, 6, 5, 0];
  const gradeLetters = ["A+", "A", "B+", "B", "C+", "C", "D", "F"];
  const studentScores = [30, 25, 50, 60, 70, 98, 74, 86];

  let datasetSize = studentScores.length;
  let mean = 0;
  let sumOfScores = 0;
  let copyOfScores = studentScores;
  let displayScores = studentScores;

  //Calculate mean of scores
  for (let i = 0; i < studentScores.length; i++) {
    sumOfScores += studentScores[i];
  }
  mean = sumOfScores / datasetSize;

  //Calculate the standard deviation

  // Assigning (value - mean) ^ 2 to every array item
  copyOfScores = copyOfScores.map((k) => {
    return (k - mean) ** 2;
  });

  // Calculating the sum of updated array
  let sum = copyOfScores.reduce((acc, curr) => acc + curr, 0);

  // Standered deviation
  const [standardDeviation, setstandardDeviation] = useState(
    Math.sqrt(sum / copyOfScores.length)
  );

  const [marksA, setmarksA] = useState(mean + 1.5 * standardDeviation);
  const [marksBP, setmarksBP] = useState(mean + 1 * standardDeviation);
  const [marksB, setmarksB] = useState(mean + 0.5 * standardDeviation);
  const [marksCP, setmarksCP] = useState(mean);
  const [marksC, setmarksC] = useState(mean - 0.5 * standardDeviation);
  const [marksD, setmarksD] = useState(mean - 1 * standardDeviation);
  const [marksF, setmarksF] = useState(mean - 1.5 * standardDeviation);

  let noOfAPGrades = 0;
  let noOfAGrades = 0;
  let noOfBPGrades = 0;
  let noOfBGrades = 0;
  let noOfCPGrades = 0;
  let noOfCGrades = 0;
  let noOfDGrades = 0;
  let noOfFGrades = 0;
  for (let i = 0; i < studentScores.length; i++) {
    if (studentScores[i] >= marksA) {
      noOfAPGrades += 1;
    } else if (studentScores[i] >= marksBP && studentScores[i] < marksA) {
      noOfAGrades += 1;
    } else if (studentScores[i] >= marksB && studentScores[i] < marksBP) {
      noOfBPGrades += 1;
    } else if (studentScores[i] >= marksCP && studentScores[i] < marksB) {
      noOfBGrades += 1;
    } else if (studentScores[i] >= marksC && studentScores[i] < marksCP) {
      noOfCPGrades += 1;
    } else if (studentScores[i] >= marksD && studentScores[i] < marksC) {
      noOfCGrades += 1;
    } else if (studentScores[i] >= marksF && studentScores[i] < marksD) {
      noOfDGrades += 1;
    } else if (studentScores[i] < marksF) {
      noOfFGrades += 1;
    }
  }

  let gradeCurve = [
    noOfAPGrades,
    noOfAGrades,
    noOfBPGrades,
    noOfBGrades,
    noOfCPGrades,
    noOfCGrades,
    noOfDGrades,
    noOfFGrades,
  ];
  return (
    <div>
      <BarGraph arr={gradeCurve} />
      <br />

      <p>Lower Limit for A+: {marksA}</p>
      <button onClick={() => setmarksA(marksA + 1)}>Increase by 1</button>
      <button onClick={() => setmarksA(marksA - 1)}>Decrease by 1</button>

      {noOfAPGrades}

      <StyledOutputContainer>
        <StyledOutputLabel>Mean</StyledOutputLabel>
        <StyledOutput>{mean}</StyledOutput>
      </StyledOutputContainer>
      <StyledOutputContainer>
        <StyledOutputLabel>Standard Deviation</StyledOutputLabel>
        <StyledOutput>{standardDeviation}</StyledOutput>
      </StyledOutputContainer>
      <StyledOutputContainer>
        <StyledOutputLabel>Marks</StyledOutputLabel>
        <StyledOutput>{displayScores}</StyledOutput>
      </StyledOutputContainer>

      <br />

      <Button fn={setGrades} arr={input} />

      <div>
        <TextInput gradeLabel="Marks" arr={input} index={0} />
      </div>
      <div>
        <StyledOutputContainer>
          <StyledOutput>{noOfAPGrades}</StyledOutput>
          <StyledOutput>{noOfAGrades}</StyledOutput>
          <StyledOutput>{noOfBPGrades}</StyledOutput>
          <StyledOutput>{noOfBGrades}</StyledOutput>
          <StyledOutput>{noOfCPGrades}</StyledOutput>
          <StyledOutput>{noOfCGrades}</StyledOutput>
          <StyledOutput>{noOfDGrades}</StyledOutput>
          <StyledOutput>{noOfFGrades}</StyledOutput>
        </StyledOutputContainer>
      </div>
    </div>
  );
};
