import React, { useEffect } from 'react'
import { Link } from '@reach/router'

const Layout = ({ title, children }) => {
  useEffect(() => {
    if (title) document.title = `${title}`
  }, [title])
  return (
    <>
      <header style={{padding: '.3em'}}>
        <Link to="/">Hymnal Admin</Link>
      </header>
      <section style={{
        display: 'flex'
      }}>
        <aside>
          <nav style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Link to="/songs">All Songs</Link>
            <Link to="/song-books">Song Books</Link>
            <Link to="/players">All Players</Link>
            <Link to="/roster">Roster</Link>
            <Link to="/goalkeeper-nickname">Goalkeeper Nickname</Link>
            <Link to="/foes">foes</Link>
            <Link to="/users">Users</Link>
          </nav>
        </aside>
        <main id="main">
          {children}
        </main>
      </section>
    </>
  )
};

export default Layout