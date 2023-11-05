import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Feed from './Feed'
import VidoeDetail from './VidoeDetail'
import SearchResult from './SearchResult'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/search/:id' element={<SearchResult />} />
          <Route path='/video/:id' element={<VidoeDetail />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App