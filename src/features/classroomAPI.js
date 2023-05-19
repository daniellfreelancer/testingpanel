import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiURL = "https://whale-app-qsx89.ondigitalocean.app";

export const classroomAPI = createApi({

    reducerPath: "classroomAPI",

    baseQuery: fetchBaseQuery({
        baseUrl: apiURL
    }),
    endpoints: (builder) => ({
        createPlanification:  builder.mutation({
            query: (classroom) =>({
                url: '/classroom/create',
                method: 'POST',
                body: classroom,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

        }),

    })
})

export default classroomAPI

export const {useCreatePlanificationMutation} = classroomAPI