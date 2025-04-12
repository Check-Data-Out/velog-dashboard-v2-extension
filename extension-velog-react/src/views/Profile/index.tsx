import { useQuery } from "@tanstack/react-query";
import { profile } from "../../apis";
import { Data } from "./Data";

interface IProp {
  page: Record<number | string, string>;
  access: string;
  refresh: string;
}

const logo = chrome.runtime.getURL("favicon.png");
const replace = (content?: number) => content?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const Profile = ({ page, access, refresh }: IProp) => {
  const { username } = JSON.parse(localStorage.getItem("CURRENT_USER") as string);
  const currentUser = page[1].replace("@", "");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => await profile({ access, refresh }),
    enabled: username === currentUser,
  });

  if (username === currentUser) {
    return (
      <a className="w-fit h-[20px] [display:_flex_!important] gap-4 items-center cursor-pointer" href={import.meta.env.VITE_VELOG_DASHBOARD_URL}>
        <img src={logo} className="w-[20px] h-auto" title="Velog Dashboard 제공 데이터" />
        {isError || isLoading ? (
          <span className="text-[var(--text2)]">정보가 없습니다</span>
        ) : (
          <>
            <Data data={replace(data?.totalPostCount)}> 게시글</Data>
            <Data data={replace(data?.stats.totalViews)}> 조회수</Data>
            <Data data={replace(data?.stats.totalLikes)}> 좋아요</Data>
          </>
        )}
      </a>
    );
  }
};
