
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Impact } from './pages/Impact';
import { GetInvolved } from './pages/GetInvolved';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';
import { Publication } from './pages/Publication';
import { ProjectReport } from './pages/ProjectReport';
import { ProjectManagement } from './pages/ProjectManagement';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { MockDataProvider } from './context/MockDataContext';

const App: React.FC = () => {
  return (
    <MockDataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/publication" element={<Publication />} />
            <Route path="/project-report/:projectId" element={<ProjectReport />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/project/:projectId" element={<ProjectManagement />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </MockDataProvider>
  );
};

export default App;
