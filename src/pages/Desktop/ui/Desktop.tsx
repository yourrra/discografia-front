import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Outlet, useNavigate } from 'react-router'

const Desktop = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('/finder')) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [location.pathname])

  const handleOpenFinder = () => {
    if (!open) {
      navigate('/finder')
    } else {
      navigate('/')
    }
  }

  const handleCloseFinder = () => {
    navigate('/')
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1e1e1e', position: 'relative' }}>
      {/* Иконка для открытия файловой системы */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <button
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: open ? 'red' : 'white',
            cursor: 'pointer',
          }}
          onClick={handleOpenFinder}
        >
          Open
        </button>
      </div>

      {/* Файловая система*/}
      {open && <Outlet />}
    </div>
  )
}

export default Desktop
