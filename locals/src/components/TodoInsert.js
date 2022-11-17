/* 새로운 항목을 입력하고 추가할 수 있는 컴포넌트이다. todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여준다. */

/* 인풋에 입력되는 값을 관리*/
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.css";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    onInsert(value); // value값을 가지고 onInsert 실행 (value값을 배열에 추가)
    setValue(""); // value 값 초기화

    // submit 이벤트는 브라우저에서 새로고침을 발생하는걸 방지하기 위해 이 함수를 호출
    e.preventDefault();
  };

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
