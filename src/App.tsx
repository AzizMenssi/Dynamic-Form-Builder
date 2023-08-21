import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormBuilder from './pages/FormBuilder/FormBuilder';
import { useDispatch } from 'react-redux';
import { initFormSliceData } from './redux/slices/formSlice';
import { useSocket } from './socket/socketService'
import { initSubmissionSliceData } from './redux/slices/submissionSlice';
import SubmissionRenderer from './pages/SubmissionRenderer/SubmissionRenderer';
const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(initFormSliceData());
    //@ts-ignore
    dispatch(initSubmissionSliceData())
  }, []);
  const socket = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to server');
      });
      socket.on('form.changed', (data) => {
        console.log('Received message:', data);
        //@ts-ignore
        dispatch(initFormSliceData());
      })
    }
  }, [socket]);
  return (
    <Router>
      <Routes>
        <Route path="" Component={Home} />
        <Route path="/formBuilder/:_id" Component={FormBuilder} />
        <Route path="/formBuilder" Component={FormBuilder} />
        <Route path='/submissionRenderer/:_id' Component={SubmissionRenderer}/>
      </Routes>
    </Router>
  );
}
export default App;
