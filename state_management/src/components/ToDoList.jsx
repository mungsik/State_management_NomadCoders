import React from "react";
import CreateToDo from "./CreateToDo";
import { toDoState } from "./atoms";
import { useRecoilValue } from "recoil";
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

  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>toDoList</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
        {/* <==> ToDo text={toDo.text} category={toDo.category} id={toDo.id} */}
      </ul>
    </div>
  );
}

export default ToDoList;
