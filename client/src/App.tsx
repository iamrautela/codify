import { Route, Routes } from "react-router"
import Home from './pages/Pricing'
import Pricing from './pages/Pricing'
import Projects from './pages/Projects'
import Preview from './pages/Preview'
import View from './pages/View'
import Community from './pages/Community'
import MyProjects from "./pages/MyProjects"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/projects' element={<MyProjects />} />
        <Route path='/projects/:projectId' element={<Projects />} />
        <Route path='/preview/:projectId' element={<Preview />} />
        <Route path='/preview/:projectId/:versionId' element={<Preview />} />
        <Route path='/community' element={<Community />} />
        <Route path='/view/:projectId' element={<View />} />
      </Routes>
    </div>
  )
}

export default App