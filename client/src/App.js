import { React, useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/home/home'
import { Table } from './components/table/table'

function App() {
  const [selectedRows, setSelectedRows] = useState([])

  return (<div style={{display: 'flex', height: '100%'}}>
    <Home selectedRows={selectedRows} />
    <Table setSelectedRows={setSelectedRows} />
  </div>
  );
}

export default App;
