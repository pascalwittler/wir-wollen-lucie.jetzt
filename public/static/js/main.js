const phpApiUrl = 'book-recommendations.php';

class BookRecommendationsParser {
  constructor() {
    fetch(phpApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const tiles = Array.from(document.querySelectorAll('.book-recommendation'));

        Array.from(data.linkList).map((link, index) => {
          fetch(phpApiUrl + '?article=' + link)
            .then((response) => response.json())
            .then((data) => {
              tiles[index].classList.add(data.bookRecommendation.includesLucie ? 'positive' : 'negative');
            });
        });
      });
  }
}

new BookRecommendationsParser();
