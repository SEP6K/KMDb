import { useEffect, useMemo, useState } from "react";
import { Spinner } from "../../components/spinner";
import { useDbContext } from "../../context/db-context";
import { YearlyActors } from "../../models/actor";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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

export const NumberOfActors = () => {
  const [actors, setActors] = useState<YearlyActors[] | undefined>(undefined);
  const [filters, setFilters] = useState({ from: 0, to: 0 });
  const [filteredDataset, setFilteredDataset] = useState<Dataset>();
  const { getNumberOfActorsPerYear } = useDbContext();

  useEffect(() => {
    const a = async () =>
      await getNumberOfActorsPerYear().then((res) => {
        setActors(res);
        setFilters(() => ({
          from: res[0].birth,
          to: res[res.length - 1].birth,
        }));
      });

    a();
  }, []);

  useEffect(() => {
    setFilteredDataset((prev) => {
      if (!actors) return prev;

      const start = actors.find((i) => i.birth === filters.from);
      const end = actors.find((i) => i.birth === filters.to);

      if (!start || !end) return prev;

      const startIndex = actors.indexOf(start);
      const endIndex = actors.indexOf(end);

      console.log(startIndex, endIndex);

      const range = actors.slice(startIndex, endIndex);
      const labels = actors.map((a) => a.birth);

      const data = {
        label: "Number of actors born each year",
        data: range.map((i) => i.count),
      };

      console.log(data);
      return {
        labels: labels,
        datasets: [data],
      };
    });
  }, [filters, actors]);

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
            width: "100%",
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
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Number of actors born each year",
              },
            },
            borderColor: "#646cff",
            backgroundColor: "#646cff",
            normalized: true,
            aspectRatio: 16 / 9,
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
        height: "100%",
        width: "100%",
        padding: "32px",
      }}
    >
      {view}
    </div>
  );
};
