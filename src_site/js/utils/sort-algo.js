export const sortData = ({ sortBy, direction }) => {
  const x = document.data.sort((a, b) => {
    let bA, aA;

    if (['performance', 'accessibility', 'seo', 'bestPrectices', 'carbon'].includes(sortBy)) {
      bA = Math.floor(parseFloat(b.lighthouse[sortBy]) * 100);
      aA = Math.floor(parseFloat(a.lighthouse[sortBy]) * 100);
    } else if (['title', 'date', 'id'].includes(sortBy)) {
      bA = b[sortBy];
      aA = a[sortBy];
    } else if (sortBy === 'firstContentfulPaint') {
      bA = parseFloat(b.lighthouse.firstContentfulPaint);
      aA = parseFloat(a.lighthouse.firstContentfulPaint);
    } else {
      bA = parseFloat(b[sortBy]);
      aA = parseFloat(a[sortBy]);
    }

    if (direction === 'desc') {
      if (sortBy === 'title') {
        return bA.localeCompare(aA, 'en', { sensitivity: 'base' });
      } else if (sortBy === 'date') {
        return Math.round((new Date(bA)).getTime() / 1000) - Math.round((new Date(aA)).getTime() / 1000);
      } else {
        return bA - aA;
      }
    } else {
      if (sortBy === 'title') {
        return aA.localeCompare(bA, 'en', { sensitivity: 'base' });
      } else if (sortBy === 'date') {
        return Math.round((new Date(aA)).getTime() / 1000) - Math.round((new Date(bA)).getTime() / 1000);
      } else {
        return aA - bA;
      }
    }
  });

  document.store.data = x.slice(0, document.dataLength);
};
