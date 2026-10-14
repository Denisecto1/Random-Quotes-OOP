import quotes from '../data/quotes.js';
import MathUtils from '../utils/MathUtils.js';
import Quote from './Quote.js';

class RandomQuote {
  static getRandomQuote() {
    const randomIndex = MathUtils.generateRandomInt(quotes.length);
    const { id, text, author } = quotes[randomIndex];
    return new Quote(id, text, author);
  }

  /**
   * 1. Each async function returns Promise
   * 2. If on the "await" line of code Promise is rejected, code in the same block below "await" is not executed
   * 3. Promise returned by the getRandomQuoteViaAPI function will be always "fulfilled"
   * because we catch all possible errors
   * 4. Result of the "fulfilled" promise will be either Quote or undefined
   * 5. Therefore there is no need for try/catch block where we call this function
   **/

  static async getRandomQuoteViaAPI() {
    const url = 'https://quoteslate.vercel.app/api/quotes/random';
    const options = { headers: { 'Content-Type': 'application/json' } };
    try {
      const response = await fetch(url, options);
      const { id, quote: text, author } = await response.json();
      // resolves promise to Quote (promise becomes "fullfilled")
      return new Quote(id, text, author);
    } catch (error) {
      console.error(error);
      /**
       * 1. Returns undefined implicitly (resolves promise to undefined)
       * 2. Promise becomes "fulfilled"
       */
    }
  }

  // static getRandomQuoteViaAPI() {
  //   const url = 'https://quoteslate.vercel.app/api/quotes/random';
  //   const options = { headers: { 'Content-Type': 'application/json' } };

  //   return fetch(url, options)
  //     .then((response) => response.json())
  //     .then(({ id, quote: text, author }) => new Quote(id, text, author))
  //     .catch((error) => console.log(error));
  // }
}

export default RandomQuote;
