import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/home/home'
import { Table } from './components/table/table'

function App() {
  return (<>
    <Home />
    <Table />
  </>
  );
}

export default App;
