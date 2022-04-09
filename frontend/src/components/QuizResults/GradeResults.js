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

import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";

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
    
let series = [
  {
    data: [
      noOfAPGrades,
      noOfAGrades,
      noOfBPGrades,
      noOfBGrades,
      noOfCPGrades,
      noOfCGrades,
      noOfDGrades,
      noOfFGrades,
    ],
  },
]; 
  return (
    <div>
      <Box m={4}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={false}
            sm={3}
            md={4}
            sx={{
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Grid
              sx={{
                pt: 8,
                pb: 6,
              }}
              m={4}
              direction="column"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item m={2}>
                <Typography
                  component="h3"
                  variant="h6"
                  align="center"
                  color="text.primary"
                >
                  Grade Visualizer
                </Typography>
                <Typography
                  variant="h7"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Adjust the mark points for an ideal normal distribution
                </Typography>
              </Grid>
              <Chart width={250} height={250} series={series}>
                <Bars innerPadding={5} groupPadding={10} />
                <Lines
                  colors={["#007696"]}
                  interpolation="cardinal"
                  lineAttributes={{
                    strokeLinecap: "round",
                    strokeWidth: 5,
                  }}
                  lineWidth={0}
                />
                <Ticks
                  axis="x"
                  ticks={[
                    {
                      label: "A+",
                      x: 0,
                    },
                    {
                      label: "A",
                      x: 1,
                    },
                    {
                      label: "B+",
                      x: 2,
                    },
                    {
                      label: "B",
                      x: 3,
                    },
                    {
                      label: "C+",
                      x: 4,
                    },
                    {
                      label: "C",
                      x: 5,
                    },
                    {
                      label: "D",
                      x: 6,
                    },
                    {
                      label: "F",
                      x: 7,
                    },
                  ]}
                />
              </Chart>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              ></Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            md={8}
            component={Paper}
            elevation={6}
            square
          ></Grid>
        </Grid>
      </Box>
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
      <Grid item m={2}>
        <Chart
          height={300}
          series={[
            {
              data: [
                noOfAPGrades,
                noOfAGrades,
                noOfBPGrades,
                noOfBGrades,
                noOfCPGrades,
                noOfCGrades,
                noOfDGrades,
                noOfFGrades,
              ],
            },
          ]}
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
                ticks={[
                  {
                    label: "A+",
                    x: 0,
                  },
                  {
                    label: "A",
                    x: 1,
                  },
                  {
                    label: "B+",
                    x: 2,
                  },
                  {
                    label: "B",
                    x: 3,
                  },
                  {
                    label: "C+",
                    x: 4,
                  },
                  {
                    label: "C",
                    x: 5,
                  },
                  {
                    label: "D",
                    x: 6,
                  },
                  {
                    label: "F",
                    x: 7,
                  },
                ]}
              />
            </Layer>
          </Handlers>
        </Chart>
      </Grid>
    </div>
  );
};

export default GradeResult;