import React, { useEffect, useState } from 'react'

export default ({setIsModelOpen, handleNewList}) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState();

    const handleModalClick = (e) => {
        e.stopPropagation();
      };

      const handleFileUpload = (e) => {
        setFile(e.target.files[0])
      }

      const handleFileName = (e) => {
        setName(e.target.value)
      }

      const handleSave = (e) => {
        handleNewList(file, name)
      }

    return (
        <div className='modal-container' onClick={(e) => {
            setIsModelOpen(false)
        }}>
            <div className='modal-content' onClick={handleModalClick}>
                <input type='text' placeholder='Enter name' onChange={handleFileName} value={name}/>
                <input type='file' accept="image/*" onChange={handleFileUpload} />
                <button className='scentia-button' disabled={!(file && name)} onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}