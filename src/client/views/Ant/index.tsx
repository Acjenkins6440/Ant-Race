import React, { useEffect } from 'react'
import { ReactComponent as BaseAntImage } from '../assets/antBase.svg';
import './index.css';
import { AntProps } from '../../data/types';
import { generateAntWinLikelihoodCalculator } from '../../data/algorithms';

const getHeight = (length: number): string => {
  if(length > 15) {
    return '150px'
  } else if (length > 10) {
    return '100px'
  } else {
    return '75px'
  }
}

const getWinChance = (raceStarted: boolean, winPercent?: number) => {
  if (winPercent && raceStarted) return `${winPercent}%`
  return raceStarted ? 'calculating' : 'race not started'
}

export const Ant = ({
  name, 
  length, 
  color, 
  weight, 
  setWinPercent,
  index,
  winPercent,
  beginRace }: AntProps) => {
  const callback = (likelihoodOfAntWinning: number) => {
    setWinPercent(index, likelihoodOfAntWinning) 
  }
  useEffect(() => {
    if(beginRace && winPercent === undefined) {
      setWinPercent(index, 0);
      const antWinChanceCalculator = generateAntWinLikelihoodCalculator();
      antWinChanceCalculator(callback)
    }
  }, [beginRace])

  return (
    <div className='ant'>
      <p className='ant-name'>{name}</p>
      <div className="ant-details">
        <BaseAntImage fill={color} height={getHeight(length)}/>
        <div className='ant-stats'>
          <p>{length}cm</p>
          <p>{weight}g</p>
        </div>
      </div>
      <p className='win-percent'>
        Chance of Winning: {getWinChance(beginRace, winPercent)}
      </p>
    </div>
  )
}

