import { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsRow from './components/StatsRow';
import CategoriesGrid from './components/CategoriesGrid';
import MapSection from './components/MapSection';
import AssistantSection from './components/AssistantSection';
import RecentAppeals from './components/RecentAppeals';
import SubmitModal from './components/SubmitModal';
import styles from './App.module.css';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [showModal, setShowModal] = useState(false);

  const mapRef = useRef(null);
  const assistantRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSetPage = (page) => {
    if (page === 'map') {
      setActivePage('map');
      setTimeout(() => scrollTo(mapRef), 50);
    } else if (page === 'assistant') {
      setActivePage('assistant');
      setTimeout(() => scrollTo(assistantRef), 50);
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className={styles.app}>
      <Sidebar
        activePage={activePage}
        setActivePage={handleSetPage}
        onNewAppeal={() => setShowModal(true)}
      />

      <div className={styles.main}>
        <Header onNewAppeal={() => setShowModal(true)} />

        <div className={styles.content}>
          <Hero onNewAppeal={() => setShowModal(true)} />
          <StatsRow />
          <CategoriesGrid
            onMapClick={() => {
              setActivePage('map');
              setTimeout(() => scrollTo(mapRef), 50);
            }}
            onAssistantClick={() => {
              setActivePage('assistant');
              setTimeout(() => scrollTo(assistantRef), 50);
            }}
          />

          <div ref={mapRef}>
            <MapSection />
          </div>

          <div ref={assistantRef}>
            <AssistantSection onUseTemplate={() => setShowModal(true)} />
          </div>

          <RecentAppeals onNewAppeal={() => setShowModal(true)} />
        </div>
      </div>

      {showModal && <SubmitModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
