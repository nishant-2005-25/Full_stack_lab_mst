import { useState } from 'react'
import './Counter.css'

const MIN = -99
const MAX = 99

function Counter() {
  const [count, setCount] = useState(0)
  const [direction, setDirection] = useState(null)
  const [animKey, setAnimKey] = useState(0)

  const trigger = (dir) => {
    setDirection(dir)
    setAnimKey(k => k + 1)
  }

  const increment = () => {
    if (count >= MAX) return
    setCount(c => c + 1)
    trigger('up')
  }

  const decrement = () => {
    if (count <= MIN) return
    setCount(c => c - 1)
    trigger('down')
  }

  const reset = () => {
    setCount(0)
    trigger('reset')
  }

  const progress = ((count - MIN) / (MAX - MIN)) * 100
  const isNegative = count < 0
  const isMax = count >= MAX
  const isMin = count <= MIN

  return (
    <div className="page">
      {/* Background decoration */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <div className="card">
        <div className="card-header">
          <span className="label-tag">useState Hook</span>
          <p className="subtitle">React Counter</p>
        </div>

        {/* Progress bar */}
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%`, background: isNegative ? 'var(--red)' : 'var(--accent)' }}
          />
        </div>
        <div className="progress-labels">
          <span>{MIN}</span>
          <span>{MAX}</span>
        </div>

        {/* Counter display */}
        <div className="counter-display">
          <span
            key={animKey}
            className={`count-number ${direction === 'up' ? 'anim-up' : direction === 'down' ? 'anim-down' : direction === 'reset' ? 'anim-reset' : ''} ${isNegative ? 'negative' : ''}`}
          >
            {count > 0 && <span className="sign">+</span>}
            {count}
          </span>
        </div>

        {/* Buttons */}
        <div className="btn-row">
          <button
            className="btn btn-decrement"
            onClick={decrement}
            disabled={isMin}
            title={isMin ? 'Minimum reached' : 'Decrement'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Decrement</span>
          </button>

          <button
            className="btn btn-increment"
            onClick={increment}
            disabled={isMax}
            title={isMax ? 'Maximum reached' : 'Increment'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Increment</span>
          </button>
        </div>

        <button className="btn btn-reset" onClick={reset} disabled={count === 0}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
          </svg>
          Reset to zero
        </button>

        {/* Status */}
        <div className="status-row">
          {isMin && <span className="status-badge badge-red">Min reached</span>}
          {isMax && <span className="status-badge badge-green">Max reached</span>}
          {!isMin && !isMax && (
            <span className="status-badge badge-neutral">
              {MAX - count} to max · {count - MIN} from min
            </span>
          )}
        </div>
      </div>

      <p className="footer">Built with React + Vite · <code>useState</code> hook</p>
    </div>
  )
}

export default Counter
