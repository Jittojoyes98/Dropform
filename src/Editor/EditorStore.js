import {create } from "zustand"

export const editorStore = create((set) => ({
    itemSelected: false,
    selectedItem: null,
    openProperties: (id) => set((state) => ({ itemSelected: true, selectedItem: id })),
    closeProperties: () => set((state) => ({ itemSelected: false, selectedItem: null }))
}))