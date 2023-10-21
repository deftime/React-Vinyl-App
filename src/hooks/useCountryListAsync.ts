import useSWR from "swr";

function useCountryListAsync() {
  return useSWR("/api/countries", () =>
    fetch("/api/countries")
      .then((response) => response.json())
      .then((data) => data.countries)
  );
}

export default useCountryListAsync;
