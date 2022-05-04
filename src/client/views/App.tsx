import React, { useState, useCallback } from 'react';
import './App.css';
import { AntData } from '../data/types';
import { fetchAntData } from '../data/fetch/fetchAntData';
import { Ant } from './Ant';

const sortAnts = (a: AntData, b: AntData) => {
  if (a.winPercent && b.winPercent) {
    return a.winPercent < b.winPercent ? 1 : -1
  }
  if (a.winPercent && !b.winPercent) { return -1 }
  if (!a.winPercent && b.winPercent) { return 1 }
  return 0
}


const App = () => {
  const [ants, setAnts] = useState<AntData[]>([])
  const [beginRace, setBeginRace] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)

  const getTitle = () => {
    if (beginRace && ants[ants.length - 1].winPercent) {
      return `Race Finished! ${ants[0].name} is the winner!`
    }
    return !beginRace ? 'The Participants:' : 'Race in Progress!'
  }

  const setWinPercent = (idx: number, winPercent: number) => {
    const newState = [...ants]
    newState[idx].winPercent = Math.round(winPercent * 100);
    setAnts(newState)
  } 

  const renderAnts = useCallback(() => {
    const sortedAnts = ants.sort(sortAnts)
    const antMap = sortedAnts.map((ant, idx) => (
      <Ant
        {...ant}
        index={idx}
        key={`${ant.name}${idx}`}
        setWinPercent={setWinPercent}
        beginRace={beginRace} />
    ))
    return (
      <div className='ants-container'>
        <h2>{getTitle()}</h2>
        <div className='ants'>
          {antMap}
        </div>
      </div>
    )
  }, [ants, beginRace])

  const notStarted = !isLoading && !ants.length && !error

  const readyToStartRace = !isLoading && Boolean(ants.length) && !beginRace

  const populateAnts = () => {
    setIsLoading(true);
    fetchAntData()
      .then(antData => {
        setAnts(antData.ants);
        setIsLoading(false)
      })
      .catch(err => {
        setError('Unexpected error occured, please try again.')
        setIsLoading(false);
      })
  }

  return (
    <div className="ant-race-root">
      <h1>The Great Ant Race</h1>
      {notStarted && (
        <div className='gather-ants'>
          <button
            onClick={() => populateAnts()}>
              Gather the racers
            </button>
        </div>
      )}
      {isLoading && (
        <div className='loading'>
          Loading...
        </div>
      )}
      {Boolean(ants.length) && renderAnts()}
      {readyToStartRace && (
        <div className='start-race'>
          <button onClick={() => setBeginRace(true)}>
            Begin the race
          </button>
        </div>
      )}
      {error && (
        <div className='error-display'>
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default App;
