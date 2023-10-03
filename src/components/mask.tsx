export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }

  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span>
          {str}---{keyword}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257afd" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
