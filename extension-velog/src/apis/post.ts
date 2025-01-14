import { BaseType, instance } from "./instance";

type PostSummaryDto = {
  access: string;
  refresh: string;
  id: string;
};

export type PostDetailValue = {
  date: string;
  dailyViewCount: number;
  dailyLikeCount: number;
};

export type PostDetailVo = {
  post: PostDetailValue[];
};

export const postSummary = async ({ access, refresh, id }: PostSummaryDto) => {
  const { data } = await instance.get<BaseType<PostDetailVo>>(`/post/velog/${id}`, {
    headers: { access_token: access, refresh_token: refresh },
  });
  return data.data;
};
