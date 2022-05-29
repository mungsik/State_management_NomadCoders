import { atom } from "recoil";

export const toDoState = atom({
  key: "toDo", // 유니크 키
  default: [], // default 값을 빈 배열로 설정
});
