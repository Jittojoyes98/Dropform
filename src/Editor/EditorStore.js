import {create } from "zustand"

export const editorStore = create((set,get) => ({
    // itemSelected: false,
    selectedItem: null,
    isDropped:false,
    changeDrop:() => set((state) => ({isDropped : false})),
    openPropertiesDropping: (id) => set((state) => ({ selectedItem: id ,isDropped : true})),
    openPropertiesClicking: (id) => set((state) => ({ selectedItem: id ,isDropped:false})),
    closeProperties: () => set((state) => ({ selectedItem: null }))
}))