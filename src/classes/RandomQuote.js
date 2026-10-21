import quotes from '../data/quotes.js';
import MathUtils from '../utils/MathUtils.js';
import Quote from './Quote.js';

class RandomQuote {
  static getRandomQuote() {
    const randomIndex = MathUtils.generateRandomInt(quotes.length);
    const { id, text, author } = quotes[randomIndex];
    return new Quote(id, text, author);
  }

  static async getRandomQuoteViaAPI() {
    const url = 'https://quoteslate.vercel.app/api/quotes/random';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const { id, quote: text, author } = await response.json();

      return new Quote(id, text, author);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    }
  }
}

export default RandomQuote;
