import {
  createApi,
  // fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, body }, api) => {
    try {
      console.log("api", api, data, body);
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data?.message || err.response?.data,
        },
      };
    }
  };

export const rtkQSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:5000/api",
    // credentials: "same-origin",
    // headers: {
    //   "Content-type": "application/json; charset=UTF-8",
    // },
  }),
  tagTypes: ["Users"],
  // keepUnusedDataFor: 60,
  // refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      // providesTags: (result) =>
      //   result
      //     ? [
      //         ...result.map(({ _id }) => ({ type: "Users", id: _id })),
      //         { type: "Users", id: "LIST" },
      //       ]
      //     : [{ type: "Users", id: "LIST" }],
      // transformResponse: (response) => response.data,
    }),
    getUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      // providesTags: (result) => result && [{ type: "Users", id: result?._id }],
      async onQueryStarted(req, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    addUser: builder.mutation({
      query: (req) => ({
        url: "/users",
        method: "POST",
        data: req,
      }),
      // invalidatesTags: [{ type: "Users", id: "LIST" }],
      async onQueryStarted(req, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          dispatch(
            rtkQSlice.util.updateQueryData("getUsers", undefined, (draft) => {
              draft.push(updatedPost);
            })
          );
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/users/${id}`,
        method: "PUT",
        data: { ...rest },
      }),
      async onQueryStarted(req, { dispatch }) {
        try {
          // const { data: updatedUser } = await queryFulfilled;
          dispatch(
            rtkQSlice.util.updateQueryData("getUsers", undefined, (draft) => {
              const user = draft.find(
                (userdetail) => userdetail._id === req.id
              );
              // user = updatedUser;
              user.name = req.name;
              user.age = req.age;
            })
          );
          dispatch(
            rtkQSlice.util.updateQueryData("getUser", req.id, (draft) => {
              // draft = updatedUser;
              draft.name = req.name;
              draft.age = req.age;
            })
          );
        } catch (error) {
          console.log("error", error);
        }
      },
      // invalidatesTags: (result, _, arg) =>
      //   result && [{ type: "Users", id: arg?.id }],
    }),
    removeUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            rtkQSlice.util.updateQueryData("getUsers", undefined, (draft) =>
              draft?.filter((user) => user._id !== userId)
            )
          );
        } catch (error) {
          console.log("error", error);
        }
      },
      // invalidatesTags: (result, _, arg) => [
      //   { type: "Users", id: "LIST" },
      //   { type: "Users", id: arg },
      // ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useRemoveUserMutation,
} = rtkQSlice;
