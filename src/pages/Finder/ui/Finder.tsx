import { Outlet, useLocation } from 'react-router'
import { useNavigate } from 'react-router'

const Finder = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const mainMenuItems = [
    { id: 'main', label: 'Главная', hasSubmenu: true },
    { id: 'about', label: 'О нас', hasSubmenu: false },
    { id: 'info', label: 'Инфо', hasSubmenu: false },
    { id: 'content', label: 'Случайный контент', hasSubmenu: false },
    { id: 'scene', label: 'Сцена', hasSubmenu: false },
  ]

  const handleMenuClick = itemId => {
    navigate(`/finder/${itemId}`)
  }

  const handleCloseFinder = () => {
    navigate('/')
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '85vw',
        height: '85vh',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Панель управления */}
        <div>
          <button onClick={handleCloseFinder}>X</button>
        </div>

        {/* Контент */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {mainMenuItems.map(menuItem => (
              <button type="button" key={menuItem.id} onClick={() => handleMenuClick(menuItem.id)}>
                {menuItem.label}
              </button>
            ))}
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Finder
