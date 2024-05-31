import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { AuthAPIs } from "../network/authApiService"
import { UserAPIs } from "../network/userApiService"
import commonSlice from "./commonSlice"
import { AdminAPIs } from "../network/adminApiServices"

// ...

export const store = configureStore({
  reducer: {
    [AuthAPIs.reducerPath]: AuthAPIs.reducer,
    [UserAPIs.reducerPath]: UserAPIs.reducer,
    [AdminAPIs.reducerPath]: AdminAPIs.reducer,
    commonReducer: commonSlice
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      AuthAPIs.middleware,
      UserAPIs.middleware,
      AdminAPIs.middleware
    )
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
