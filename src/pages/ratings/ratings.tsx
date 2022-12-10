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

export const Ratings = () => {
  const [ratings, setRatings] = useState<YearRating[] | undefined>(undefined);
  const [filteredDataset, setFilteredDataset] = useState<Dataset | undefined>(
    undefined
  );
  const [filters, setFilters] = useState({
    from: 0,
    to: 0,
  });
  const { getYearlyRatings } = useDbContext();

  useEffect(() => {
    const a = async () =>
      await getYearlyRatings().then((ratings) => {
        setRatings(ratings);

        setFilters(() => ({
          from: ratings[0].year,
          to: ratings[ratings.length - 1].year,
        }));
      });

    a();
  }, []);

  useEffect(() => {
    setFilteredDataset((prev) => {
      if (!ratings) return prev;

      const start = ratings.find((i) => i.year === filters.from);
      const end = ratings.find((i) => i.year === filters.to);

      if (!start || !end) return prev;

      const startIndex = ratings.indexOf(start);
      const endIndex = ratings.indexOf(end);

      const range = ratings.slice(startIndex, endIndex);

      const labels = range.map((r) => r.year);
      const dataset = {
        label: "Average yearly rating",
        data: range.map((r) => r.avgrating),
      };

      return {
        labels: labels,
        datasets: [dataset],
      };
    });
  }, [filters, ratings]);

  const handleFilterChange = (value: string, cursor: "to" | "from") => {
    const parsed = parseInt(value);

    switch (cursor) {
      case "from": {
        setFilters((prev) => ({
          from: value === "" ? 0 : parsed,
          to: prev.to,
        }));

        break;
      }
      case "to": {
        setFilters((prev) => ({
          from: value === "" ? 0 : prev.from,
          to: parsed,
        }));

        break;
      }
    }
  };

  const view = useMemo(() => {
    if (!filteredDataset) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Spinner />
        </div>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 500,
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            From:
            <input
              type="text"
              placeholder="Year.."
              value={filters.from}
              onChange={(e) => handleFilterChange(e.target.value, "from")}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            To:
            <input
              type="text"
              placeholder="Year.."
              value={filters.to}
              onChange={(e) => handleFilterChange(e.target.value, "to")}
            />
          </div>
        </div>
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Yearly average rating for movies",
              },
            },
            borderColor: "#646cff",
            backgroundColor: "#646cff",
            normalized: true,
          }}
          datasetIdKey="yearly-ratings"
          data={filteredDataset}
        />
      </div>
    );
  }, [filteredDataset, filters]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <div
        style={{
          height: "100%",
          width: "100%",
          flex: 1,
          padding: "32px",
        }}
      >
        {view}
      </div>
    </div>
  );
};
