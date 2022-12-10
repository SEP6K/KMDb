import { useEffect, useMemo, useState } from "react";
import { NavBar } from "../../components/nav";
import { Spinner } from "../../components/spinner";
import { useDbContext } from "../../context/db-context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { YearRating } from "../../models/rating";
import { YearlyRatings } from "./yearly-ratings";
import { TopActors } from "./top-actors";
import { NumberOfActors } from "./number-of-actors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Dataset = {
  labels: (string | number)[];
  datasets: {
    label: string;
    data: any;
  }[];
};

const tabs = [<YearlyRatings />, <TopActors />, <NumberOfActors />];

export const Ratings = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "32px",
          padding: "32px",
          width: "100%",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            width: "300px",
            gap: "32px",
            flexShrink: 0,
          }}
        >
          <button
            style={{ width: "100%" }}
            onClick={() => setActiveTab(tabs[0])}
          >
            Yearly ratings
          </button>
          <button
            style={{ width: "100%" }}
            onClick={() => setActiveTab(tabs[1])}
          >
            Top actors
          </button>
          <button
            style={{ width: "100%" }}
            onClick={() => setActiveTab(tabs[2])}
          >
            Number of actors
          </button>
        </div>
        <div
          style={{
            height: "100%",
            width: "1px",
            backgroundColor: "#1a1a1a",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {activeTab}
        </div>
      </div>
    </div>
  );
};
