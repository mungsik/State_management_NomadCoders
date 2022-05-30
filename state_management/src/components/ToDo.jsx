import { useSetRecoilState } from "recoil";
import { toDoState } from "./atoms";

function ToDo({ text, category, id }) {
  const setToDos = useSetRecoilState(toDoState);
  // 이 함수를 호출할 때, 특정한 카테고리를 인자로 받고싶음
  const onClick = (event) => {
    // 수정하고자 하는 toDo의 경로를 찾기 위한 코드.

    const {
      currentTarget: { name },
    } = event;

    /*
    setToDos를 사용하면 값을 즉시 변경할 수 있거나 현재값(혹은 oldToDos)을 argument로 주는 function을 만들 수 있다.

    */
    setToDos((oldToDos) => {
      /*
      findIndex 안에서는 조건을 만족하는 toDo의 index를 찾아준다.그리고 그 조건은 function으로 표현해야한다.
      toDo의 id와 props에서 오는 id가 같은지 비교하면된다.
      ToDoList는 ToDo를 rendering 하고 있고, ToDo는 모든 props를 받고 있다.
      그리고 그 props는 text, id, category이다. 이 props를 ToDo component가 받은것.
      */
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {/* If the category is NOT Doing then we will show the button to move the toDo to the Doing category. */}
      {category !== "DOING" && (
        // <button onClick={onClick}> 하면 인자가 넘어가지 않음.
        // 새로운 익명 함수를 선언하는 방법임!
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;

/*  필기
1. mutate vs. immutate
Mutate는 let a = 1; 에서 a = 2 와 같이 a를 직접적으로 변경시키는걸 말합니다.
State를 변화시킬때 기존의 값을 변화하는게 아니라 새로운 변수로 State를 바꿔줘야합니다.

상태관리툴을 사용할때는 기본적으로 mutate를 사용하지 않고 상태를 변경해줘야 합니다.
그냥 const newTodos = prevTodos 이렇게 하시면 prevTodos를 가리키는 주소를 newTodos에 할당하기 때문에 newTodos를 변경하면 prevTodos도 같이 변경되어 mutate 되게됩니다.
그래서 완전히 새로운 object나 array를 만들어주고 거기에 요소들을 그대로 입력해주기위해 spread 방식을 사용한것입니다. 다른 방식으로는 assign 등을 사용해 할당 할 수도 있습니다.

2. setToDos() 함수 설명

const food = ["pizza","mango","kimchi","kimbab"]
const target = 1
food.slice(0,1) ==> pizza
food.slice(target+1) ==> kimchi, kimbab

여기서 mango를 빼고 다른걸 넣고싶을 때 food의 배열을 바꾸는게 아니라
spread syntax를 써서 새로운 배열을 복사한 후 그 위에 바꾼다
이게 바로 immutate.
[...food.slice(0, target), "chicken", ...food.slice(target+1)]
*/
