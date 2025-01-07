import { useQuery } from "@tanstack/react-query";
import { profile } from "../../apis";
import { Data } from "./Data";

interface IProp {
  page: Record<number | string, string>;
  access: string;
  refresh: string;
}

const logo = chrome.runtime.getURL("favicon.png");

export const Profile = ({ page, access, refresh }: IProp) => {
  const { username } = JSON.parse(localStorage.getItem("CURRENT_USER") as string);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => await profile({ access, refresh }),
  });

  if (username === page[1].replace("@", "")) {
    return (
      <a
        className="w-fit h-[20px] [display:_flex_!important] gap-4 items-center cursor-pointer"
        href={import.meta.env.VITE_VELOG_DASHBOARD_URL}
      >
        <img src={logo} className="w-[20px] h-auto" title="Velog Dashboard 제공 데이터" />
        {isError || isLoading ? (
          <span className="text-[var(--text2)]">정보가 없습니다</span>
        ) : (
          <>
            <Data data={data?.totalPostCount as number}> 게시글</Data>
            <Data data={data?.stats.totalViews as number}> 조회수</Data>
            <Data data={data?.stats.totalLikes as number}> 좋아요</Data>
          </>
        )}
      </a>
    );
  }
};
