import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { taskApi } from "./tasks"
import notificationSlice from "./notification-slice"
import themeSlice from "./theme-slice"

export const store = configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer,
        theme: themeSlice.reducer,
        notification: notificationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;