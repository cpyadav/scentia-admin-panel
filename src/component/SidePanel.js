import React from 'react';
import Logo from '../images/MicrosoftTeams-image (3).png'

export default ({ activePanel, leftPanel, setActivePanel }) => {
  return (
    <div className="rectangle-parent20">
      <div className='header grid-item'>
        <img className='logo' src={Logo} />
        </div>
      {leftPanel.map(d => {
        return (
          <div className={activePanel === d.type ? 'tell-us-about active' : 'tell-us-about'}
            onClick={() => {
                setActivePanel(d.type);
            }} 
            key={d.key}><span>{d.label}</span></div>
        )
      })}
    </div>
  )
}
