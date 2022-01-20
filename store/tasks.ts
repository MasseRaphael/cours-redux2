import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Task } from "./types"

export const taskApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://61e96b4e7bc0550017bc628e.mockapi.io/tasks/",
    }),
    tagTypes: ["Tasks"],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], string>({
            query: () => `tasks`,
            providesTags: (result) =>
            result
            ? [
                ... result.map(({ id }) => ({type: "Tasks" as const, id })),
            ]:
            [{ type: "Tasks", id: "LIST"}],
        }),
        addTask: builder.mutation<Task, Partial<Task>>({
            query: (body) => ({
                url: `tasks`,
                method: "POST",
                body: body,
            }),
            transformResponse: (response: {data: Task}, meta, arg) => response.data,
            invalidatesTags: [{type: "Tasks", id: "LIST"}],

            async onQueryStarted(
                arg,
                {
                    dispatch, getState,queryFulfilled, requestId, extra, getCacheEntry 
                }
            ) {},
            async onCacheEntryAdded(
                arg,
                { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }
            ) {},
        }),
        updateTaskStatus: builder.mutation<Task, Partial<Task>>({
            query: ({ id, status }) => ({
                url:`tasks/${id}`,
                method: "PUT",
                body: { status }
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST"}],
        }),
        deleteTask: builder.mutation<Task, string>({
            query: (id) => ({
                url:`tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST"}],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskStatusMutation,
    useDeleteTaskMutation,
} = taskApi