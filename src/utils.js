module.exports = {
  baseUrl: 'https://api.spacexdata.com/v4',
  wikiUrl: (id) => `https://en.wikipedia.org/api/rest_v1/page/summary/${id}`,
  youtubeUrl: (id) => `https://www.youtube.com/watch?v=${id}`,
};
