import React, { useState } from "react";
import {
  // main component
  Chart,
  // graphs
  Bars,
  Dots,
  Lines,
  Ticks,
  Layer,
  Handlers,
} from "rumble-charts";

const GradeResult = (props) => {
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
      <p>Lower Limit for A+: {marksA}</p>
      <button onClick={() => setmarksA(marksA + 1)}>Increase by 1</button>
      <button onClick={() => setmarksA(marksA - 1)}>Decrease by 1</button>
      {noOfAPGrades}
      Mean
      {mean}
      Standard Deviation
      {standardDeviation}
      Marks
      {displayScores}
      <br />
      <div>
        {noOfAPGrades}
        {noOfAGrades}
        {noOfBPGrades}
        {noOfBGrades}
        {noOfCPGrades}
        {noOfCGrades}
        {noOfDGrades}
        {noOfFGrades}
      </div>
      <Chart
        series={[
          {
            data: [0,1,2,3,3,2,1,0],
          },
        ]}
        viewBox="0 0 300 150"
      >
        <Handlers
          distance="x"
          onMouseLeave={function noRefCheck() {}}
          onMouseMove={function noRefCheck() {}}
        >
          <Layer height="68%" position="middle center" width="100%">
            <Bars
              barAttributes={{
                stroke: "#f5f5f6",
                strokeLinejoin: "round",
                strokeWidth: 21,
                transform: "translate(0 12)",
              }}
              barWidth="0%"
              colors={["#03a9f4"]}
              groupPadding="1%"
              innerPadding="0%"
            />
            <Lines
              colors={["#007696"]}
              interpolation="cardinal"
              lineAttributes={{
                strokeLinecap: "round",
                strokeWidth: 5,
              }}
              lineWidth={0}
            />
            <Dots
              className="dots"
              colors={["#007696"]}
              dotStyle={{
                fillOpacity: 0,
                transition: "all 250ms",
              }}
            />
            <Ticks
              axis="x"
              labelAttributes={{
                y: "2.5em",
              }}
              labelStyle={{
                dominantBaseline: "text-after-edge",
                fill: "#000",
                fontFamily: "sans-serif",
                fontSize: 10,
                fontWeight: "normal",
                textAnchor: "middle",
              }}
              ticks={[
                {
                  label: "JUL",
                  x: 0,
                },
                {
                  label: "AUG",
                  x: 1,
                },
                {
                  label: "SEP",
                  x: 2,
                },
                {
                  label: "OCT",
                  x: 3,
                },
                {
                  label: "NOV",
                  x: 4,
                },
                {
                  label: "DEC",
                  x: 5,
                },
                {
                  label: "JAN",
                  x: 6,
                },
                {
                  label: "FEB",
                  x: 7,
                },
                {
                  label: "MAR",
                  x: 8,
                },
                {
                  label: "APR",
                  x: 9,
                },
                {
                  label: "MAY",
                  x: 10,
                },
                {
                  label: "JUN",
                  x: 11,
                },
              ]}
            />
          </Layer>
        </Handlers>
      </Chart>
    </div>
  );
};

export default GradeResult;