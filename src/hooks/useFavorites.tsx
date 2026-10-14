import { useState, useEffect } from 'react';

export interface Favorite {
  id: string;
  type: 'release' | 'application' | 'service';
  name: string;
  view: string;
  addedAt: string;
}

const STORAGE_KEY = 'relivio-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (favorite: Omit<Favorite, 'addedAt'>) => {
    const exists = favorites.some(f => f.id === favorite.id && f.type === favorite.type);
    if (!exists) {
      setFavorites(prev => [...prev, { ...favorite, addedAt: new Date().toISOString() }]);
    }
  };

  const removeFavorite = (id: string, type: string) => {
    setFavorites(prev => prev.filter(f => !(f.id === id && f.type === type)));
  };

  const isFavorite = (id: string, type: string) => {
    return favorites.some(f => f.id === id && f.type === type);
  };

  const toggleFavorite = (favorite: Omit<Favorite, 'addedAt'>) => {
    if (isFavorite(favorite.id, favorite.type)) {
      removeFavorite(favorite.id, favorite.type);
    } else {
      addFavorite(favorite);
    }
  };

  const getFavoritesByType = (type: string) => {
    return favorites.filter(f => f.type === type);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    getFavoritesByType
  };
}

// Composant bouton favori
interface FavoriteButtonProps {
  id: string;
  type: 'release' | 'application' | 'service';
  name: string;
  view: string;
  size?: 'small' | 'medium' | 'large';
}

export function FavoriteButton({ id, type, name, view, size = 'medium' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(id, type);

  const sizeMap = {
    small: { padding: '6px', fontSize: '14px' },
    medium: { padding: '8px', fontSize: '16px' },
    large: { padding: '12px', fontSize: '20px' }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite({ id, type, name, view });
      }}
      title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: sizeMap[size].padding,
        borderRadius: '6px',
        transition: 'all 0.2s',
        color: isFav ? '#f59e0b' : '#9ca3af',
        fontSize: sizeMap[size].fontSize
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#f3f4f6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <i className="fas fa-star"></i>
    </button>
  );
}
