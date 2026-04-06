import { create } from "zustand";
interface Mystore{
    nickname: string;
    setNickname: (nickname: string) => void;
}
 export const useMyStore = create<Mystore>((set) => ({
    nickname: "",
    setNickname: (nickname) => set(() => ({ nickname })),
}));
interface setting{
    public_pool_enabled:boolean;
    reaction_enabled: boolean;
    creation_reminder_enabled: boolean;
    setPublicPoolEnabled: (enabled: boolean) => void;
    setReactionEnabled: (enabled: boolean) => void; 
    setCreationReminderEnabled: (enabled: boolean) => void;
}
export const useSettingStore = create<setting>((set) => ({
    public_pool_enabled: false,
    reaction_enabled: true, 
    creation_reminder_enabled: false,
    setPublicPoolEnabled: (enabled) => set(() => ({ public_pool_enabled: enabled })),
    setReactionEnabled: (enabled) => set(() => ({ reaction_enabled: enabled })), 
    setCreationReminderEnabled: (enabled) => set(() => ({ creation_reminder_enabled: enabled })),
}));