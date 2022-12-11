import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
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
  BarElement,
} from "chart.js";

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

export const TopActors = () => {
  const [actors, setActors] = useState<Dataset | undefined>(undefined);

  const { getActorsWithMostMovies } = useDbContext();

  useEffect(() => {
    const a = async () =>
      await getActorsWithMostMovies(10).then((res) => {
        const labels = res.map((i) => i.name);

        const data = {
          label: "Number of movies",
          data: res.map((i) => i.moviesstarred),
        };

        setActors({
          labels,
          datasets: [data],
        });
      });

    a();
  }, []);

  const view = useMemo(() => {
    if (!actors) {
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
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Actors with most movies starred in",
              },
            },
            borderColor: "#646cff",
            backgroundColor: "#646cff",
            normalized: true,
            aspectRatio: 16 / 9,
            indexAxis: "y",
          }}
          datasetIdKey="top-actors-movies-starred"
          data={actors}
        />
      </div>
    );
  }, [actors]);

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
