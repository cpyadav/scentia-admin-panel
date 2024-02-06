import React, { useState } from 'react'

export default ({ setIsModelOpen, handleNewList, categoryList, type }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState();
  const [catId, setCatId] = useState();

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
    handleNewList(name, file, catId)
  }

  const showCatSelect = () => {
    return type === 'type' || type == 'packaging' || type == 'formate'
  }

  const isButtonDisabled = () => {
    if(type === 'type' || type == 'packaging' || type == 'formate') {
      return !(name && catId)
    }
    else if (type == 'category') {
      return !name
    }
    else {
      return !(file && name)
    }
  }

  return (
    <div className='modal-container' onClick={(e) => {
      setIsModelOpen(false)
    }}>
      <div className='modal-content' onClick={handleModalClick}>
        <input type='text' placeholder='Enter name' onChange={handleFileName} value={name} />
        <input type='file' accept="image/*" onChange={handleFileUpload} />
        {showCatSelect() &&!!categoryList.length && <select onChange={(e) => setCatId(e.target.value)}>
          <option disabled={true} selected={true}>Select...</option>
          {categoryList.map(d => {
            return <option key={d.id} value={d.id}>{d.name}</option>
          })}
        </select>}
        <button className='scentia-button' disabled={isButtonDisabled()} onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}