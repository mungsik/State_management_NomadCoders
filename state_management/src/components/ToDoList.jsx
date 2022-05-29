import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilValue } from "recoil";

const toDoState = atom({
  key: "toDo", // 유니크 키
  default: [], // default 값을 빈 배열로 설정
});

function ToDoList() {
  // useReocilValue => atom의 value를 감지하기 위해 쓰는 hook. 즉, value를 가져옴
  // useSetReocilValue => function을 가져오는데, 이 function이 value를 수정하는데 사용됨.
  // 이 function은 React의 setState와 같은 방식으로 작동함.
  const value = useRecoilValue(toDoState);
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => {
    //! input의 이름이 그대로 data에 들어간다
    //! onSubmit 함수는 내가 직접 호출한다.
    console.log("add to do", data.toDo);
    // setValue => 입력을 받으면 입력칸을 비워줌.
    // 'toDo 항목을 빈 문자열로 설정'
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>toDoList</h1>
      <hr />
      {/* handleSubmit 함수를 사용할 때는 첫번째 매개변수로 데이터가 유효할 때 호출되는 다른 함수를 받는다.*/}
      {/* 두 번째 매개변수로는 데이터가 유효하지 않을 때 호출 될 다른 함수를 넣을 수 있다. */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", {
            required: "Plz write a ToDo",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul></ul>
    </div>
  );
}

export default ToDoList;
