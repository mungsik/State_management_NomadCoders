import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  // watch는 내가 form의 입력값들의 변화를 관찰 할 수 있게해줌.
  // handleSubmit => validation, preventDefault 등을 담당
  const {
    register,
    watch,
    handleSubmit,
    // 구조분해할당으로 나중에 이를 이용할 때, formState.errors가 아닌 errors로 사용할 수 있게함.
    formState: { errors },
    // 특정한 에러를 발생시켜줌
    setError,
  } = useForm({
    defaultValues: {
      email: "@naver.com",
    },
  });
  // 데이터가 유효하지 않을 수도 있기 때문에 react-hook-form이 모든 validation을
  // 다 마쳤을 떄만 호출되는 onValid 함수
  const onValid = (data) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        // 에러가 난 부분으로 자동으로 커서를 옮겨줌.
        { shouldFocus: true }
      );
    }
    // 이건 전체 form에 넘겨주는 에러.
    // 발생하는 문제에 따라 추가적으로 에러를 설정할 수 있게 도와줌.
    setError("extraError", { message: "Server offline." });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        {/* spread syntax사용 => register함수가 반환하는 객체를 가져다가 input에 props로 전달 */}
        {/* 객체 리터럴을 열고, ...register, 그리고 인자로 input의 이름을 넣는거야. */}
        {/* <input {...register("Email")} required placeholder="Email" /> */}
        {/* required를 씀으로써 HTML으로부터 보호를 받을 수 있다 */}
        {/* 그러나 이렇게하면, 해커들이 required를 지우고 사용할 수 있기때문에 */}
        {/* 다음과 같이 자바스크립트 안에서 validation을 한다 */}
        {/* 만약에 유저가 required인 곳에 안적고 제출을 하게되면 */}
        {/* 자동으로 입력되지 않은 칸으로 커서를 옮기는 기능을 갖고 있음 */}
        <input
          {...register("email", {
            required: "Email required",
            pattern: {
              // 정규식으로 메일 적합성 판단.
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowd",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          // validate는 함수를 값으로 가질건데, 이 함수는 인자로 항목에 현재 쓰여지고 있는 값을 받음.
          // 그리고 validate는 true 또는 false 를 반환함.
          // 즉, value를 인자로 받고 true or false를 리턴
          // "!value.includes("nico")" => 만약에 value가 nico를 포함하지 않는다면, true를 반환
          // ! react-hook-form 에서 문자열을 리턴하면, 그건 즉 너가 에러 메세지를 리턴한다는 뜻
          {...register("firstName", {
            required: "write here",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nico allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: true })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", { required: true, minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: true, minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            // 유저에게 에러 메세지 보내주기
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        {/* 물음표를 붙이면, 그 항목이 undefined면 그 뒤를 실행하지 않음 */}
        {/* 그러니까 errors가 undefined면, extraError를 찾지 않음. */}
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  // 입력 받은 값에 따라 바뀌는 값들.
  const onChange = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
    setToDoError("");
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // valitdation 작업
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write To Do.." />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

export default ToDoList;
