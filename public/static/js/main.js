const phpApiUrl = 'book-recommendations.php';

class BookRecommendationsParser {
  constructor() {
    fetch(phpApiUrl)
      .then((response) => response.json());
  }
}

new BookRecommendationsParser();
