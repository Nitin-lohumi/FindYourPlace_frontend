import { useQuery } from "@tanstack/react-query";
export const useFetch = ({
  key,
  fn,
  enable,
}: {
  key: string[];
  fn: () => Promise<any>;
  enable: boolean;
}) =>
  useQuery({
    queryKey: [...key],
    queryFn: fn,
    enabled: enable,
    staleTime: 1000 * 60 * 60 * 10,
  });
