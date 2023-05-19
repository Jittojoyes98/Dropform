import {create } from "zustand"

export const editorStore = create((set,get) => ({
    itemSelected: false,
    selectedItem: null,
    isDropped:false,
    closeSettings:()=>set((state)=>({itemSelected:false})),
    changeDrop:() => set((state) => ({isDropped : false,selectedItem: null,itemSelected:false})),
    openPropertiesDropping: (id) => set((state) => ({ selectedItem: id ,isDropped : true,itemSelected:true})),
    openPropertiesClicking: (id) => set((state) => ({ selectedItem: id ,isDropped:false,itemSelected:true})),
    closeProperties: () => set((state) => ({ selectedItem: null,itemSelected:false }))
}))