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

        })
    })
})

export default plannerAPI

export const {useGetPlannerMutation} = plannerAPI