import { Box, Container, Paper } from "@mui/material";
import { BarChart, Gauge, PieChart } from "@mui/x-charts";

const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Fev",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

const valueFormatter = (value: any) => `${value}mm`;

const Dashboard: React.FC = () => {
  return (
    <Container
      maxWidth="xl"
      style={{
        padding: 10,
        overflowY: "hidden",
        overflowX: "hidden",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        component={Paper}
        style={{
          padding: 10,
          marginRight: 22,
          marginBottom: 22,
          height: 400,
        }}
      >
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={715}
          height={320}
        />
      </Box>

      <Box
        component={Paper}
        style={{
          padding: 10,
          marginRight: 22,
          marginBottom: 22,
          height: 400,
        }}
      >
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={715}
          height={320}
        />
      </Box>
      <Box
        component={Paper}
        style={{
          padding: 10,
          marginRight: 22,
          marginBottom: 22,
          height: 400,
        }}
      >
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "seoul", label: "Seoul rainfall", valueFormatter },
          ]}
          layout="horizontal"
          {...chartSetting}
          width={715}
          height={320}
        />
      </Box>
      <Box
        component={Paper}
        style={{
          padding: 10,
          marginRight: 22,
          marginBottom: 22,
          height: 400,
        }}
      >
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "seoul", label: "Seoul rainfall", valueFormatter },
          ]}
          layout="horizontal"
          {...chartSetting}
          width={715}
          height={320}
        />
      </Box>
      <Box
        component={Paper}
        style={{
          padding: 10,
          marginRight: 22,
          marginBottom: 22,
          height: 400,
        }}
      >
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "seoul", label: "Seoul rainfall", valueFormatter },
          ]}
          layout="horizontal"
          {...chartSetting}
          width={715}
          height={320}
        />
      </Box>
      <Box
        component={Paper}
        style={{
          padding: 10,
          marginRight: 22,
          marginBottom: 22,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: 400,
        }}
      >
        <Gauge width={715} height={300} value={50} />
      </Box>
    </Container>
  );
};

export default Dashboard;
