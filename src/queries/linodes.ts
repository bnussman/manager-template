import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getLinodes, getProfile, Linode, Profile } from "@linode/api-v4";
import { AxiosError } from "axios";
import { ResourcePage } from "@linode/api-v4/lib/types";

export const queryKey = 'profile';

export const useLinodesQuery = (params?: any, filter?: any, options?: UseQueryOptions<ResourcePage<Linode>, AxiosError>) => {
  return useQuery<ResourcePage<Linode>, AxiosError>(
    [queryKey, params, filter],
    () => getLinodes(params, filter),
    options
  );
};