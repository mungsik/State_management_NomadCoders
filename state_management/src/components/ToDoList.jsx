import React from "react";
import CreateToDo from "./CreateToDo";
import { categoryState, toDoSelector, toDoState } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import ToDo from "./ToDo";

function ToDoList() {
  /*
  useReocilValue => atom의 value를 감지하기 위해 쓰는 hook. 즉, value를 가져옴. 값만 반환해주고, modifier 함수는 반환하지 않음.
  useSetReocilState => function을 가져오는데, 이 function이 value를 수정하는데 사용됨.
  즉 아래를 보면, value를 통해 빈 배열을 받고, modFn으로 그 배열을 수정함.
  const value = useRecoilValue(toDoState);
  const modFn = useSetReocilState(toDoState);
  */

  /*
  useRecoilState => value와 변경 함수를 둘 다 얻고 싶을 때
  이는 [username, setUsername] = useState()와 비슷함.
  value <==> username, modFn <==> setUsername
  즉, useRecoilValue와 useSetRecoilValue를 합친 것.
  */

  const toDos = useRecoilValue(toDoSelector);
  // selector가 세 개의 배열을 담은 하나의 배열을 return한다.
  // 배열 안의 배열을 선택하려면 이렇게 배열을 열고 순서대로 이름을 지정하면 된다.
  const [toDo, doing, done] = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <div>
      <h1>toDoList</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;

/*
1. select 태그에 value 를 넣는 이유
select에 value 넣는 이유는 시작하는 값이에요

option에 To do, Doing, Done 순으로 하셔서 필요성을 못느끼셨겠지만 Doing, Done, To do 순으로 하셔도
select vale = "TO_DO"로 되있기 때문에 처음 선택되어 있는 값은 To do 입니다
시작값, 말그대로 default value라고 생각하시면 됩니다 !

그래서 select에 value를 넣어주지 않고 option의 순서를 바꾸게 되면 처음 페이지에 들어왔을 때
category !== option의 value 일 수 있습니다

select의 value를 없애시고 option의 순서를 바꿔보시면서 category를 console로 찍어보시면 이유를 아실 수 있을 거에요 :)
*/

/*

*/
