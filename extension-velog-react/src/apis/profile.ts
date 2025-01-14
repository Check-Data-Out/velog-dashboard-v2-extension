import { BaseType, instance } from "./instance";

type ProfileDto = {
  access: string;
  refresh: string;
};

type PostStatVo = {
  totalPostCount: number;
  stats: {
    totalViews: number;
    totalLikes: number;
    yesterdayViews: number;
    yesterdayLikes: number;
    lastUpdatedDate: string;
  };
};

export const profile = async ({ access, refresh }: ProfileDto) => {
  const { data } = await instance.get<BaseType<PostStatVo>>("/posts-stats", {
    headers: { access_token: access, refresh_token: refresh },
  });
  return data.data;
};
