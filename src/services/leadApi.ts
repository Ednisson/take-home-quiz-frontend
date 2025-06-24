import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export interface Lead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  services: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RegisterLeadInput {
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  services: string[];
}

export const leadsApi = createApi({
  reducerPath: 'leadsApi',
  baseQuery: graphqlRequestBaseQuery({
    url: 'http://localhost:4000/graphql',
  }),
  tagTypes: ['Lead'],
  endpoints: (builder) => ({
    getLeads: builder.query<Lead[], void>({
      query: () => ({
        document: `
          query GetLeads {
            leads {
              id
              name
              email
              mobile
              postcode
              services
              createdAt
              updatedAt
            }
          }
        `,
      }),
      transformResponse: (response: { leads: Lead[] }) => response.leads,
      providesTags: ['Lead'],
    }),
    getLead: builder.query<Lead, number>({
      query: (id) => ({
        document: `
          query GetLead($id: Int!) {
            lead(id: $id) {
              id
              name
              email
              mobile
              postcode
              services
              createdAt
              updatedAt
            }
          }
        `,
        variables: { id },
      }),
      transformResponse: (response: { lead: Lead }) => response.lead,
      providesTags: (result, error, id) => [{ type: 'Lead', id }],
    }),
    registerLead: builder.mutation<Lead, RegisterLeadInput>({
      query: (input) => ({
        document: `
          mutation Register($input: RegisterLeadInput!) {
            register(input: $input) {
              id
              name
              email
              mobile
              postcode
              services
              createdAt
              updatedAt
            }
          }
        `,
        variables: { input },
      }),
      transformResponse: (response: { register: Lead }) => response.register,
      invalidatesTags: ['Lead'],
    }),
  }),
});

export const { useGetLeadsQuery, useGetLeadQuery, useRegisterLeadMutation } = leadsApi;