import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiURL = "https://whale-app-qsx89.ondigitalocean.app";

export const plannerAPI = createApi({

    reducerPath: "plannerAPI",

    baseQuery: fetchBaseQuery({
        baseUrl: apiURL
    }),
    endpoints: (builder) => ({
        getPlanner:  builder.mutation({
            query: () =>({
                url: '/planner/data',
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

        }),
        deletePlanification: builder.mutation({
            query: ({idPlanification, idClassroom}) => ({
                url:`/planing/delete-planification/${idPlanification}/classroom/${idClassroom}`,
                method:'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },

            })
        }),
        createPlanification: builder.mutation({
            query: (data) => ({
                url:'/planing/create',
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    },
            })
        }),
        planifitacionById : builder.mutation({
            query: (idPlanner) => ({
                url:`/planing/find/${idPlanner}`,
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

        }),
        updatePlanification: builder.mutation({
            query: ({idPlanner, ...planificationData}) => ({
                url: `/planing/update/${idPlanner}`,
                method: 'PATCH',
                body: planificationData,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),

    })
})

export default plannerAPI

export const {useGetPlannerMutation, useDeletePlanificationMutation, useCreatePlanificationMutation, usePlanifitacionByIdMutation, useUpdatePlanificationMutation} = plannerAPI