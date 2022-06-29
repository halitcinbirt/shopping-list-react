import logo from './logo.svg';
import './App.css';
import TodoForm from './components/TodoForm'

function App() {

  return (
    <div className="App">
        <div className={'container mx-auto mt-4'}>
            <TodoForm />
        </div>
    </div>
  );
}

export default App;
