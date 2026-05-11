// ===============================
// FAVORIETEN
// ===============================

const favoriteOptions = {
  myProfile: {
    icon: '👤',
    title: 'Mijn profiel',
    url: null
  },
  'club-live': {
    icon: '📺',
    title: 'Live Scores',
    url: 'https://cuescore.com/venue/table/jumbotron/?venueId=1280972&branchId=1'
  },
  'club-reservation': {
    icon: '🪑',
    title: 'Tafel reserveren',
    url: 'https://www.bal-enzo.be/reservaties/'
  },
  'club-page': {
    icon: '🎱',
    title: 'Clubpagina',
    url: 'https://cuescore.com/bal-enzobilliardsdarts'
  },
  'competition-first': {
    icon: '🏆',
    title: 'Eerste Klasse',
    url: 'https://cuescore.com/tournament/%2A%2A%2ACOMPETITIE+EERSTE+PROVINCIALE+BPBF+VLAANDEREN+SEIZOEN+2026%2A%2A%2A/74130085'
  },
  'competition-second': {
    icon: '🏆',
    title: 'Tweede Klasse',
    url: 'https://cuescore.com/tournament/%2A%2A%2ACOMPETITIE+TWEEDE+PROVINCIALE+BPBF+VLAANDEREN+SEIZOEN+2026%2A%2A%2A/74130109'
  },
  'competition-third': {
    icon: '🏆',
    title: 'Derde Klasse',
    url: 'https://cuescore.com/tournament/%2A%2A%2ACOMPETITIE+DERDE+PROVINCIALE+BPBF+VLAANDEREN+SEIZOEN+2026%2A%2A%2A/74130127'
  },
  'competition-cup': {
    icon: '🏆',
    title: 'Beker',
    url: 'https://cuescore.com/tournament/%2A%2A%2ABEKER%252FCOUPE+BPBF+VLAANDEREN+2026%2A%2A%2A/74130139'
  },
  'breakplay-1': {
    icon: '🎱',
    title: 'Break & Play Reeks 1',
    url: 'https://cuescore.com/tournament/POULE+1+BREAK+%2526+PLAY+-ZOMER+2026+%2AClubcompetitie%2A/79104529'
  },
  'breakplay-2': {
    icon: '🎱',
    title: 'Break & Play Reeks 2',
    url: 'https://cuescore.com/tournament/POULE+2+BREAK+%2526+PLAY+-ZOMER+2026+%2AClubcompetitie%2A/79105222'
  },
  'breakplay-3': {
    icon: '🎱',
    title: 'Break & Play Reeks 3',
    url: 'https://cuescore.com/tournament/POULE+3+BREAK+%2526+PLAY+-ZOMER+2026+%2AClubcompetitie%2A/79105237'
  },
  'breakplay-4': {
    icon: '🎱',
    title: 'Break & Play Reeks 4',
    url: 'https://cuescore.com/tournament/POULE+4+BREAK+%2526+PLAY+-ZOMER+2026+%2AClubcompetitie%2A/79105255'
  },
  'breakplay-5': {
    icon: '🎱',
    title: 'Break & Play Reeks 5',
    url: 'https://cuescore.com/tournament/POULE+5+BREAK+%2526+PLAY+-ZOMER+2026+%2AClubcompetitie%2A/79105273'
  },
  facebook: {
    icon: '📘',
    title: 'Facebook',
    url: 'https://www.facebook.com/billiardsendarts'
  },
  instagram: {
    icon: '📸',
    title: 'Instagram',
    url: 'https://www.instagram.com/balenzo_billiards_darts/'
  },
 start2pool: {
  icon: '🎱',
  title: 'Start2Pool',
  url: '#'
}

};

// Favorieten laden
let favorites = JSON.parse(localStorage.getItem('favorites'));
if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
  favorites = ['myProfile'];
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ===============================
// FAVORIETEN RENDEREN
// ===============================

function renderFavorites() {
  const container = document.querySelector('.favorites-row');
  if (!container) return;

  // Lijst leegmaken
  container.innerHTML = '';

  // Alle geselecteerde favorieten tonen
  favorites.forEach(id => {
    const item = favoriteOptions[id];
    if (!item) return;

    let card;

    // 👤 Mijn profiel: maak een echte link met de opgeslagen profiel-URL
    if (id === 'myProfile') {
      const profileUrl = localStorage.getItem('myProfileUrl');

      if (profileUrl && profileUrl.trim() !== '') {
        card = document.createElement('a');
        card.className = 'favorite-card';
        card.href = profileUrl.trim();
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
      } else {
        // Nog geen profiel ingesteld
        card = document.createElement('button');
        card.type = 'button';
        card.className = 'favorite-card';
        card.style.border = 'none';
        card.style.cursor = 'pointer';
        card.style.background = 'linear-gradient(180deg, #1a1a1a, #111)';
        card.style.color = '#fff';

        card.addEventListener('click', function () {
          openProfile();
        });
      }
    }

    // 🔗 Gewone externe links
    else if (item.url && item.url !== '#') {
      card = document.createElement('a');
      card.className = 'favorite-card';
      card.href = item.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }

    // 📦 Niet-klikbare items
    else {
      card = document.createElement('div');
      card.className = 'favorite-card';
    }

    // Inhoud van de kaart
    card.innerHTML = `
      <div class="favorite-icon">${item.icon}</div>
      <div class="favorite-title">${item.title}</div>
    `;

    // Toevoegen aan de lijst
    container.appendChild(card);
  });
}
// ===============================
// FAVORIETEN MODAL
// ===============================

function openFavoritesEditor() {
  const modal = document.getElementById('favoritesModal');
  const container = document.getElementById('favoritesOptions');

  if (!modal || !container) return;

  container.innerHTML = '';

  Object.entries(favoriteOptions).forEach(([id, item]) => {
    const row = document.createElement('label');
    row.className = 'favorite-option';

    row.innerHTML = `
      <input type="checkbox"
             value="${id}"
             ${favorites.includes(id) ? 'checked' : ''}>
      <span>${item.icon} ${item.title}</span>
    `;

    container.appendChild(row);
  });

  modal.classList.add('show');
}

function closeFavoritesEditor() {
  const modal = document.getElementById('favoritesModal');

  if (modal) {
    modal.classList.remove('show');
  }
}

function saveFavoritesSelection() {
  const checked = document.querySelectorAll(
    '#favoritesOptions input[type="checkbox"]:checked'
  );

  favorites = Array.from(checked).map(input => input.value);

  if (favorites.length === 0) {
    favorites = ['myProfile'];
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  renderFavorites();
  closeFavoritesEditor();
}

// ===============================
// PROFIEL
// ===============================

function setProfile() {
  const url = prompt('Voer de link van je CueScore-profiel in:');
  if (!url) return;

  localStorage.setItem('myProfileUrl', url);
  alert('Profiel opgeslagen.');
}

function openProfile() {
  const url = localStorage.getItem('myProfileUrl');

  if (!url) {
    alert('Je hebt nog geen profiel ingesteld.');
    return;
  }

  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
  // Favorieten tonen
  renderFavorites();

  // Bottom navigation
  const screens = document.querySelectorAll('.screen');
  const navButtons = document.querySelectorAll('.nav-item');

  function showScreen(screenId) {
    screens.forEach(screen => {
      screen.classList.remove('active');
    });

    const selected = document.getElementById(screenId);

    if (selected) {
      selected.classList.add('active');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  navButtons.forEach(button => {
    button.addEventListener('click', function () {
      navButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const target = this.getAttribute('data-target');

      if (target) {
        showScreen(target);
      }
    });
  });

  // Competitie tabs
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {

      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });

      const target = document.getElementById(
        'tab-' + this.dataset.tab
      );

      if (target) {
        target.classList.add('active');
      }
    });
  });

  // Service Worker
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(registration => {
      console.log('Service Worker geregistreerd');

      // Controleer onmiddellijk op updates
      registration.update();

      // Als er al een nieuwe versie klaarstaat
      if (registration.waiting) {
        if (confirm('Er is een nieuwe versie van de app beschikbaar. Wil je nu vernieuwen?')) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      }

      // Luister naar nieuwe updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            if (confirm('Er is een nieuwe versie van de app beschikbaar. Wil je nu vernieuwen?')) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          }
        });
      });
    })
    .catch(err => console.log('Service Worker fout:', err));

  // Herladen zodra de nieuwe service worker actief wordt
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}

});
