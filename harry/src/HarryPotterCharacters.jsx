import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HarryPotterCharacters.css';  // CSS dosyasını dahil ediyoruz

const HarryPotterCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://hp-api.onrender.com/api/characters');
        setCharacters(response.data);
      } catch (err) {
        console.error('API Hatası:', err);
        setError('Karakterler alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Harry Potter Karakterleri</h1>
      <div className="grid-container">
        {characters.slice(0, 20).map((character) => (
          <div className="character-card" key={character.name}>
            <h2>{character.name}</h2>
            <p>Ev: {character.house || 'Bilinmiyor'}</p>
            <img src={character.image} alt={character.name} style={{ width: '100px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HarryPotterCharacters;
