import './App.css';
import React, { useState, useEffect } from "react";
import Form from './components/Form';
import Clusters from './components/Clusters';

function App() {
  const [centroidsLabelsPoints, setCentroidsLabelsPoints] = useState();
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    if(centroidsLabelsPoints){
      setDataIsLoaded(true);
    }
  }, [centroidsLabelsPoints])
  
  return (
    <div>
      {
        !dataIsLoaded ? <Form setResponse={setCentroidsLabelsPoints}/> :
        <Clusters centroidsLabelsPoints={centroidsLabelsPoints} /> 
      }
    </div>
  );
}

export default App;