/* 화면 가운데 정렬, 앱 타이틀을 보여준다. children으로 내부 JSX를 props로 받아 와서 렌더링 해준다. */
import "./TodoTemplate.css";

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;
