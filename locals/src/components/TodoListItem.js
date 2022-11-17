/* 각 할 일 항목에 대한 정보를 보여주는 컴포넌트이다. todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여준다. */

import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
  MdClear,
} from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";
/* 조건부로 classNames를 결합할 수 있는 자바스크립트의 유틸리티 */
/* className에 true에 해당하는 값은 추가로 표시가 가능하고, false가 된다면, className에 적용되지 않는다. */
import "./TodoListItem.css";

const TodoListItem = ({ id, onRemove, onToggle, onUpdate }) => {
  const todo = JSON.parse(localStorage.getItem(id));

  const pressEnterKey = (e, id) => {
    if (e.charCode === 13) {
      let editText = e.target.value;
      var todo = JSON.parse(localStorage.getItem(id));
      todo = { ...todo, text: editText };
      localStorage.setItem(id, JSON.stringify(todo));
      onUpdate(id);
    }
  };

  return (
    <div className="TodoListItem">
      <div className={todo.checked ? "checked checkbox" : "checkbox"}>
        {todo.checked ? (
          <MdCheckBox onClick={() => onToggle(todo.id)} />
        ) : (
          <MdCheckBoxOutlineBlank onClick={() => onToggle(todo.id)} />
        )}

        {todo.isEdit ? (
          <input
            // 수정시 입력 부분 (item.isEdi이 True 일때)
            className="edit" // 완료 버튼 클릭시 클래스 바뀜
            type="text"
            defaultValue={todo.text} // todos의 data
            onKeyPress={(event) => pressEnterKey(event, todo.id)} // 키를 누를 경우 이벤트 발생
            autoFocus="autofocus" // 자동적으로 input에 포커스 됨
          />
        ) : (
          <div className="text">{todo.text}</div>
        )}
      </div>
      <div className="update" onClick={() => onUpdate(todo.id)}>
        {todo.isEdit ? <MdClear /> : <BsPencilFill />}
      </div>
      <div className="remove" onClick={() => onRemove(todo.id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
