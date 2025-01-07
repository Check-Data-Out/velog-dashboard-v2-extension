interface IProp {
  children: string;
  data: string | number;
}

export const Data = ({ children, data }: IProp) => {
  return (
    <span
      className={`${data} text-[var(--text2)] font-[400] before:content-[attr(data-totalpost)_'_'] before:text-[var(--text1)] before:font-[700]`}
      data-totalpost={data + ""}
    >
      {children}
    </span>
  );
};
