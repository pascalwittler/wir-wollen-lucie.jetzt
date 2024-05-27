const phpApiUrl = 'book-recommendations.php';

const dateStringSettings = {
  day:   '2-digit',
  month: '2-digit',
  year:  '2-digit'
};

class BookRecommendationsParser {
  constructor() {
    fetch(phpApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const tiles = Array.from(document.querySelectorAll('.book-recommendation'));

        Array.from(data.linkList).map((link, index) => {
          fetch(`${phpApiUrl}?article=${link}`)
            .then((response) => response.json())
            .then((data) => {
              const publishingDate = data.bookRecommendation.publishingDate;
              const includesLucie = data.bookRecommendation.includesLucie;
              const dateString = (new Date(publishingDate)).toLocaleDateString('de-DE', dateStringSettings);

              tiles[index].classList.add(includesLucie ? 'positive' : 'negative');
              tiles[index].innerHTML = `<span>${dateString}</span>`;
            });
        });
      });
  }
}

new BookRecommendationsParser();
