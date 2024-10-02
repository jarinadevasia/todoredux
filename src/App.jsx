import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleComplete, updateTodo, updateStatus } from './store/todoSlice';

const App = () => {
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');

  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdateTodo = () => {
    if (editText.trim()) {
      dispatch(updateTodo({ id: editId, text: editText }));
      setEditId(null);
      setEditText('');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateStatus({ id, status: newStatus }));
  };

  const filteredTodos = todos.filter((todo) => {
    if (!filterStatus) return true;
    return todo.status === filterStatus;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>ToDo App</h1>

      <div style={styles.flexContainer}>
        {/* Left Column: Todo List */}
        <div style={styles.column}>
          {/* Add Todo */}
          <div style={styles.addTodoContainer}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter todo"
              style={styles.input}
            />
            <button onClick={handleAddTodo} style={styles.addButton}>
              <i className="fa-solid fa-notes-medical me-3"></i> Add Todo
            </button>
          </div>

          {/* Error message */}
          {error && <p style={styles.errorText}>Please enter a value</p>}

          {/* Display Todos */}
          <ul style={styles.todoList}>
            {todos.map((todo) => (
              <li key={todo.id} style={styles.todoItem}>
                {editId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={styles.editInput}
                    />
                    <button onClick={handleUpdateTodo} style={styles.updateButton}>
                      <i className="fa-regular fa-circle-check" style={{ marginRight: '4px' }}></i>
                      Update
                    </button>
                  </>
                ) : (
                  <span
                    style={{
                      ...styles.todoText,
                      color: todo.completed ? '#6c757d' : '#343a40',
                    }}
                  >
                    {todo.text}
                  </span>
                )}

                <button
                  onClick={() => handleEditTodo(todo.id, todo.text)}
                  style={styles.editButton}
                >
                  <i className="fa-solid fa-pen-to-square" style={{ marginRight: '4px' }}></i>Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={styles.deleteButton}
                >
                  <i className="fa-regular fa-trash-can" style={{ marginRight: '4px' }}></i>Delete
                </button>

                {/* Status Dropdown */}
                <select
                  value={todo.status}
                  onChange={(e) => handleStatusChange(todo.id, e.target.value)}
                  style={styles.statusSelect}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Dropdown and Filtered Results */}
        <div style={styles.column}>
          {/* Dropdown for Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={styles.searchDropdown}
          >
            <option value="">All Todos</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Filtered Todo Results */}
          <ul style={styles.todoList}>
            {filteredTodos.map((todo) => (
              <li key={todo.id} style={styles.todoItem}>
                <span
                  style={{
                    ...styles.todoText,
                    color: todo.status === 'Completed' ? '#6c757d' : '#343a40',
                  }}
                >
                  {todo.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    marginTop: '150px',
  },
  heading: {
    textAlign: 'center',
    color: '#343a40',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  column: {
    flex: '1',
    margin: '0 20px',
  },
  addTodoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    marginRight: '10px',
    transition: 'border 0.3s',
  },
  addButton: {
    padding: '12px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  errorText: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
  todoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '12px',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  todoText: {
    flex: 1,
    fontSize: '16px',
    color: '#343a40',
  },
  editInput: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  editButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#ffc107',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    marginLeft: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  updateButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    marginLeft: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#dc3545',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    marginLeft: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  statusSelect: {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    cursor: 'pointer',
  },
  searchDropdown: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    width: '100%',
  },
};

export default App;
