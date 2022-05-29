import { useForm } from "react-hook-form";
import { toDoState } from "./atoms";
import { useSetRecoilState } from "recoil";

/*
값을 수정하기만하면 되므로,
CreateToDo에서 atom의 value를 가져올 필요가 없다.
*/

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = ({ toDo }) => {
    //! input의 이름이 그대로 data에 들어간다
    //! onSubmit 함수는 내가 직접 호출한다.
    /*
    setToDos(oldToDos => [oldToDos])
    이렇게하면 oldToDos라는 배열을 받아옴. 즉 배열 안의 배열
    setToDos(oldToDos => [...oldToDos])
    이렇게하면 배열 안의 요소를 반환함.
    */
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    // setValue => 입력을 받으면 입력칸을 비워줌.
    // 'toDo 항목을 빈 문자열로 설정'
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", {
          required: "Plz write a ToDo",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;

/* handleSubmit 함수를 사용할 때는 첫번째 매개변수로 데이터가 유효할 때 호출되는 다른 함수를 받는다.*/
/* 두 번째 매개변수로는 데이터가 유효하지 않을 때 호출 될 다른 함수를 넣을 수 있다. */
