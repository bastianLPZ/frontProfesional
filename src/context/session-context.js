import { create } from "zustand";

const sessionStore = create((set) => ({
    isAuth: false,
    setIsAuth: (value) => set((state) => ({
        isAuth: value
    }))
}));

export const useSession = sessionStore;