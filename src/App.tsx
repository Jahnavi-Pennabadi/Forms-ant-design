
import { Provider } from 'react-redux';
import './App.css';
import StudentForm from './components/studentform/studentform.component';
import store from './components/state/store';

function App() {
  return (
    <Provider store = {store}>
    <div className="App">
      <StudentForm/>
    </div>
    </Provider>
  );
}

export default App;
