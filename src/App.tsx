import { useState } from 'react'
import './App.css'
import Post1 from './Post1'
import Post2 from './Post2'

function App() {
  const [postIndex, setPostIndex] = useState<0 | 1>(0)

  return (
    <>
      <div className="card flex gap-4">
        <button onClick={() => setPostIndex(0)}>
          post with local state
        </button>
        <button onClick={() => setPostIndex(1)}>
          post with central state
        </button>
      </div>
      {postIndex === 0 ? <Post1 /> : <Post2 />}
    </>
  )
}

export default App
