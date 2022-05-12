import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import { StackA, StackB, StackC } from './services/StackClass';
import { getListOfMovements } from './services/ToweHanoiAlgorithm';

function App() {

  const [A, setA] = useState([3,2,1]);
  const [B, setB] = useState([]);
  const [C, setC] = useState([]);
  const listOfMovements = useRef([])
  const [rePaint, setRePaint] = useState(0);
  const numberOfMovement = useRef(0)
  const [n, setn] = useState(3)

  useEffect(() => {
    
    numberOfMovement.current = 0;
    listOfMovements.current = 0;
    executeMovements();
    const a = []
    for(let i = n; i > 0; i--)
    {
      a.push(i);
    }
    setA(a);
    setB([]);
    setC([]);

  }, [n])
  


  useEffect(() => {
    
  //const { left: leftA, bottom: bottomA } = document.getElementById('tower-A').getBoundingClientRect();
  //const { left: leftB, bottom: bottomB } = document.getElementById('tower-B').getBoundingClientRect();
  //const { left: leftC, bottom: bottomC } = document.getElementById('tower-C').getBoundingClientRect();
    /*
    document.getElementById('disk').animate([
      // fotogramas clave
      { transform: `translateX(${200}px)` },
      { transform: 'translateY(-300px)' }
    ], {
      // opciones de sincronización
      duration: 2000,
      iterations: Infinity
    });
    */
  
  }, [])


  const loopFunction = (i) => {
    setTimeout(() => {
      console.log('loop', listOfMovements.current.length, i);
      moveDisk(i)
      if(i < listOfMovements.current.length)
      {
        console.log('loop if');
        loopFunction(i + 1);
      }
    }, 3000);
  }

  const executeMovements = async () => {


    while(StackA.size !== 0)
    {
      StackA.pop();
    }
    
    while(StackB.size !== 0)
    {
      StackB.pop();
    }

    while(StackC.size !== 0)
    {
      StackC.pop();
    }

    for(let i = n; i > 0; i--)
    {
      StackA.insert(i);
    }

    const movements = getListOfMovements(n);
    listOfMovements.current = movements;

  
    
    //loopFunction(numberOfMovement);

/*
    const beginMovements = setInterval(() => {
      if(movements[numberOfMovement])
        moveDisk(numberOfMovement);
      numberOfMovement++;
    }, 3000);
    */
/*    
    setTimeout(() => {
      clearInterval(beginMovements)
    }, movements.length * 3000);
    */
  }

  const moveDisk = (i) => {
    console.log('i', i)
    const movements = listOfMovements.current;
    switch (movements[i].source) {
      case 'A':
        StackA.pop();
      break;
      case 'B':
        StackB.pop();
      break;
      case 'C':
        StackC.pop();
      break;
      default:
        console.log('default 1')
      break;
    }

    switch (movements[i].target) {
      case 'A':
        StackA.insert(movements[i].diskValue);
      break;
      case 'B':
        StackB.insert(movements[i].diskValue);
      break;
      case 'C':
        StackC.insert(movements[i].diskValue);
      break;
      default:
        console.log('default 1')
      break;
    }
    //console.log('stack A final', StackA.traverse());
    //console.log('stack B final', StackB.traverse());
    //console.log('stack C final', StackC.traverse());
    setA(StackA.traverse());
    setB(StackB.traverse());
    setC(StackC.traverse());
    setRePaint(rePaint + 1)
  }
  const heightDisk = 30;
  const widthDisk = 35;
  const stepSize = 15

  const colors =['#ff0000', '#00ff00', '#0000ff', '#ff0000', '#9400d3', '#ff7f00', '#ffff00', '#4b0082',
    '#393E41', '#CA3CFF', '#8797AF']


  const move = () => {
    if(numberOfMovement.current < listOfMovements.current.length)
    {
      moveDisk(numberOfMovement.current)
      numberOfMovement.current++;
    }
  }

  return (
    <div className='main-container'>
      <h1>Hanoi Towers</h1>
      <div className='container-move-btn'>
        <button
          className='move-btn'
          onClick={move}
        >
          move
        </button>
      </div>
      <p className='number-of-disks'>Number of Disks</p>
      <div className='container-n-btn'>
        <button
          className='n-btn'
          onClick={() => {
            if(n > 1)
              setn(n-1)
          }}
        >-</button>
        
        <p className='n'>{n}</p>
        
        <button
          className='n-btn'
          onClick={() => {
            if(n < 10)
              setn(n+1)
          }}
        >+</button>
      </div>
      <div className='container-towers'>

        <div className='tower-con'>
          <div className='floor'></div>
          <div id="tower-A" className='stick'>
          </div>
          {
            A.map((disk, index) => {
              const calculatedWidth = widthDisk + disk * stepSize;
              return (
                <div id='disk' key={index} style={{ 
                  width: calculatedWidth,
                  height: heightDisk,
                  backgroundColor: colors[disk],
                  position: "absolute",
                  bottom: `${index*heightDisk + 50}px`,
                  left: `${ 138 - (calculatedWidth/2) }px`,
                  borderRadius: '3px',
                  border: '1px solid white'
                }}></div>
              )
            })
          }
        </div>

        <div className='tower-con'>
          <div className='floor'></div>
          <div id="tower-B" className='stick'>
          </div>
          {
            B.map((disk, index) => {
              const calculatedWidth = widthDisk + disk * stepSize;
              return (
                <div id='disk' key={index}  style={{ 
                  width: calculatedWidth,
                  height: heightDisk,
                  backgroundColor: colors[disk],
                  position: "absolute",
                  bottom: `${index*heightDisk + 50}px`,
                  left: `${ 138 - (calculatedWidth/2) }px`,
                  borderRadius: '3px',
                  border: '1px solid white'
                }}></div>
              )
            })
          }
        </div>

        <div className='tower-con'>
          <div className='floor'></div>
          <div id="tower-C" className='stick'>
          </div>
          {
            C.map((disk, index) => {
              const calculatedWidth = widthDisk + disk * stepSize;
              return (
                <div id='disk' key={index}  style={{ 
                  width: calculatedWidth,
                  height: heightDisk,
                  backgroundColor: colors[disk],
                  position: "absolute",
                  bottom: `${index*heightDisk + 50}px`,
                  left: `${ 138 - (calculatedWidth/2) }px`,
                  borderRadius: '3px',
                  border: '1px solid white'
                }}></div>
              )
            })
          }
          </div>
      </div>
    </div>
  );
}

export default App;
