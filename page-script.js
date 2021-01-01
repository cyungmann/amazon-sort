(function (_window, document) {
  const numRatingsEl = document.querySelector('#acrCustomerReviewText');
  if (numRatingsEl == null) {
    return null;
  }

  return parseInt(
    numRatingsEl
      .innerText
      .match(/^([\d,]+) ratings$/)[1]
      .replace(/,/g, ''));
})(window, window.document);