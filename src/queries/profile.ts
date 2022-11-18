import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getProfile, Profile } from "@linode/api-v4";
import { AxiosError } from "axios";
import { APIError } from "@linode/api-v4/lib/types";

export const queryKey = 'profile';

export const useProfile = (options?: UseQueryOptions<Profile, AxiosError<{ errors: APIError[] }>>) => {
  const { data, ...rest } = useQuery<Profile, AxiosError<{ errors: APIError[] }>>([queryKey], getProfile, options);
  return { profile: data, ...rest };
};