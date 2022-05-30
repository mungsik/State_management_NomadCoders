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

  /*
   Q. const onSubmit = ({ toDo }) => {} 에서 {toDo} 가 뭐야??
   A. 원래는 const onSubmit = (data) => {}  로 적어서 아래 {...register("toDo", {required: "Plz write a ToDo",})}
      에 있는 data.toDo를 받아옴. 근데 이걸 객체분할로 toDo를 바로 받아온것.
  */

  const onSubmit = ({ toDo }) => {
    //! input의 이름이 그대로 data에 들어간다
    //! onSubmit 함수는 내가 직접 호출한다.
    /*
    1. setToDos 함수는 두 개의 동작을 할 수가 있다.
    첫 번째는, setToDos([]) 로 state를 직접적으로 설정해줄수도있고
    두 번째는, setToDos() 안에 함수를 적어, 함수의 리턴값이 새로운 state가 되도록한다.


    2. setToDos(oldToDos => [oldToDos])
    이렇게하면 oldToDos라는 배열을 받아옴. 즉 배열 안의 배열
    setToDos(oldToDos => [...oldToDos])
    이렇게하면 배열 안의 요소를 반환함.

    3. 아래 setToDos함수 설명
    (1) 이전의 state를 oldToDos로 받아서 배열을 반환해줌.
    (2) toDo의 데이터를 받아서  { text: toDo, id: Date.now(), category: "TO_DO" }, 로 추가해줌과 동시에
        ...oldToDos, 로 기존에 있던 toDos를 유지.
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
    /*
     지금까지 써온 onSubmit={handleSubmit}이 아닌 onSubmit={handleSubmit()} 으로 함수를 실행시켜서 넘기는 이유
       : react-hook-form에서 handleSubmit은 validate를 하는 함수여서 이걸 실행시키고 나온 결과값을 반환해주어야하기 때문
    */
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        /*
      1. console에 찍어보면 register 함수가 반환하는 객체에는 onChange, onBlur, ref.. 등이 있다.
      그래서 일일히 적지 않고 spread syntax 구문으로 받아와 input에 props로 주는것.
      "toDo" => register의 name 즉 key 값.

      2. {...register("toDo")  {required: "Plz write a ToDo"}} 처럼 html코드에 requried를 안쓰고
       {...register("toDo", {required: "Plz write a ToDo",)} placeholder="Write a to do" 처럼 javascript 코드에 쓰는 이유
       : 브라우저의 html 코드를 유저가 수정할 수 있기 때문에, javascipt에서 validation을 진행.
      */
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
