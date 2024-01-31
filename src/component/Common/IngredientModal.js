import React, { useState } from 'react'

export default ({ setIsModelOpen, handleNewList }) => {
  const [name, setName] = useState('');

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleSave = (e) => {
    handleNewList(name)
  }

  return (
    <div className='modal-container' onClick={(e) => {
      setIsModelOpen(false)
    }}>
      <div className='modal-content' onClick={handleModalClick}>
        <input type='text' placeholder='Enter name' onChange={handleName} value={name} />
        <button className='scentia-button' disabled={!(name)} onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}