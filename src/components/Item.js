import React from 'react'
import { ReactComponent as Check } from '../check.svg'
import styles from '../App.module.css'

export const Item = ({ item, onRemoveItem }) => {
  return (
    <div className={styles.item}>
      <span style={{ width: '40%' }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%' }}>{item.author}</span>
      <span style={{ width: '10%' }}>{item.num_comments}</span>
      <span style={{ width: '10%' }}>{item.points}</span>
      <span style={{ width: '10%' }}>
        <button
          type='button'
          onClick={() => onRemoveItem(item)}
          className={`${styles.button} ${styles.buttonSmall}`}
        >
          {/* Dismiss */}
          <Check height='18px' width='18px' />
        </button>
      </span>
    </div>
  )
}
