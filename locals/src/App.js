import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoListItem from "./components/TodoListItem";

const App = () => {
  // useSate를 사용하여 todos라는 상태를 정의

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기

  const nextId = useRef(Number(localStorage.getItem("order")));

  const [rendering, setRendering] = useState(0);
  useEffect(() => {
    console.log(rendering);
    if (!localStorage.getItem("order")) {
      localStorage.setItem("order", 0);
    }
    return () => {
      localStorage.setItem("order", nextId.current);
    };
  });

  //todo를 배열에 추가
  const onInsert = (text) => {
    do {
      nextId.current += 1;
    } while (localStorage.getItem(nextId.current));
    const todo = {
      id: nextId.current,
      text,
      checked: false,
      isEdit: false,
    };
    if (!text) {
      return alert("내용을 입력해주세요"); // 내용이 비어있을 때 표시
    } else {
      localStorage.setItem(nextId.current, JSON.stringify(todo));
      //Id의 숫자가 1늘어남
      setRendering((r) => r + 1);
    }
  };

  //filter함수를 사용해 App컴포넌트에 id를 파라미터로 받아와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수
  const onRemove = (id) => {
    localStorage.removeItem(id);
    setRendering((r) => r + 1);
  };

  // 배열 내장 함수 map을 사용하여 특정 id를 가지고 있는 객체의 checked 값을 반전
  // 삼항 연산자를 이용해 변화가 필요한 원소만 업데이트되고 나머지는 그대로 남아있는다.
  const onToggle = (id) => {
    var todo = JSON.parse(localStorage.getItem(id));
    todo = { ...todo, checked: !todo.checked };
    localStorage.setItem(id, JSON.stringify(todo));
    setRendering((r) => r + 1);
  };

  const onUpdate = (id) => {
    var todo = JSON.parse(localStorage.getItem(id));
    todo = { ...todo, isEdit: !todo.isEdit };
    localStorage.setItem(id, JSON.stringify(todo));
    setRendering((r) => r + 1);
  };

  const addTodoList = () => {
    let arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key !== "order") {
        arr.push(key);
      }
    }
    arr.sort(function (a, b) {
      // 오름차순
      return a - b;
    });
    arr = arr.map((i) => (
      <TodoListItem
        key={i}
        id={i}
        onRemove={onRemove}
        onToggle={onToggle}
        onUpdate={onUpdate}
      />
    ));
    return arr;
  };

  // todos를 TodoList의 props로 전달
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      {addTodoList()}
    </TodoTemplate>
  );
};

export default App;
