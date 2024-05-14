import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Form } from './components/form'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="postTest" element={<Form />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
