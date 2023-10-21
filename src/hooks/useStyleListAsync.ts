import useSWR from "swr";

function useStyleListAsync() {
  return useSWR("/api/genres", () =>
    fetch("/api/genres")
      .then((response) => response.json())
      .then((data) => data.genres)
  );
}
export default useStyleListAsync;
