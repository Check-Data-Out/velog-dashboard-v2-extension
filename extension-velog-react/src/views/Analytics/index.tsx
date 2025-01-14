import { Line } from "react-chartjs-2";

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
import { postSummary } from "../../apis/post";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const defaultData = {
  labels: [],
  datasets: [],
};

const logo = chrome.runtime.getURL("favicon.png");

interface IProp {
  page: Record<number | string, string>;
  access: string;
  refresh: string;
}

const datasets = {
  backgroundColor: "#ECECEC",
  borderColor: "#96F2D7",
};

export const Analytics = ({ page, access, refresh }: IProp) => {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => await postSummary({ access, refresh, id: page[2] }),
    select: ({ post }) => ({
      labels: post.map((i) => i.date.split("T")[0]),
      datasets: [
        {
          label: "Views",
          data: post.map((i) => i[`dailyViewCount`]),
          ...datasets,
        },
      ],
    }),
  });

  return (
    <div className="ml-auto mr-auto w-[1440px] -mt-8 h-fit max-[1440px]:w-full max-[1440px]:pl-[1rem] max-[1440px]:pr-[1rem]">
      <div className="flex flex-col gap-4 w-full h-fit p-[1.5rem] rounded-lg bg-[var(--bg-element2)]">
        <div className="flex justify-between items-center w-full h-fit">
          <a
            href={import.meta.env.VITE_VELOG_DASHBOARD_URL}
            className="flex gap-3 itmes-center no-underline shrink-0"
          >
            <img src={logo} className="w-[20px] h-auto" title="Velog Dashboard 제공 데이터" />
            <span className="text-[15px] text-[var(--text1)]">상세보기</span>
          </a>

          <span className="text-[var(--text1)] before:content-['*'] before:mr-1 before:text-[15px] before:font-bold before:text-red-500">
            해당 그래프는 최대 7일 전 까지의 데이터만 표기합니다.
          </span>
        </div>
        <Line
          data={data || defaultData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            interaction: { mode: "nearest", intersect: false },
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                axis: "x",
                grid: {
                  color: "#777777",
                },
              },
              y: {
                axis: "y",
                grid: {
                  color: "#777777",
                },
              },
            },
          }}
          className="w-[100%_!important] h-[auto_!important] max-h-[300px]"
        />
      </div>
    </div>
  );
};
