import { atom, selector } from "recoil";

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom({
  key: "toDo", // 유니크 키
  default: [], // default 값을 빈 배열로 설정
});

export const toDoSelector = selector({
  // selector은 toDos와 category 를 받고있지.
  // 그리고 category 에 따라서 selector 가 각각의 toDo 배열을 반환해
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

/*
<selector를 사용하는 이유>
atom은 배열 혹은 객체 등등을 리턴할 뿐이고 atom의 output을 변형시키는건 selector 이다.
selector는 state를 가져다가 원하는대로 모습을 변형시킬 수 있는 도구이다.
이건 중요한 기능인데, 예를들어 우린 모든 toDo를 하나의 배열에 담고 있다.
---> default: [],
그 toDo들을 각각의 배열에 분류하고 싶은 경우 toDoList 컴포넌트 자체에서 분류할 수 있다.
! 그러나
selector 기능이 있으면 데이터를 다른 관점에서 생각해볼 수 있다.
--> const [toDo, doing, done] = useRecoilValue(toDoSelector);
코드는 데이터를 변형하지 않는다. 그저 데이터를 render 하기만한다.
selecotr가 있으면 데이터에 좀 더 체계화된 방식으로 접근할 수 있게된다.
 */
