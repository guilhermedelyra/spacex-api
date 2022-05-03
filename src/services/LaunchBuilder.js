const axios = require('axios');
const ytdl = require('ytdl-core');
const { baseUrl, wikiUrl, youtubeUrl } = require('../utils');

async function _getImage(data) {
  const flickr = data.links.flickr.original;
  if (flickr.length > 0) {
    return { image: flickr[0] };
  }

  const youtubeId = data.links.youtube_id;
  if (youtubeId) {
    return { image: `https://img.youtube.com/vi/${youtubeId}/0.jpg` };
  }

  const rocketId = data.rocket;
  const rocket = await axios.get(`${baseUrl}/rockets/${rocketId}`);
  const image = rocket.data.flickr_images[0];
  return { image };
}

async function _getLaunchDate(data) {
  const { date_unix: dateUnix } = data;

  return {
    date: new Date(dateUnix * 1000).toLocaleString('en-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'short',
    }),
  };
}

async function _getTitle(data) {
  return { title: data.name };
}

async function _getNumber(data) {
  return { number: data.flight_number };
}

async function _getLocation(data) {
  const { launchpad: launchpadId } = data;
  const launchpad = await axios.get(`${baseUrl}/launchpads/${launchpadId}`);
  const location = `${launchpad.data.name}, ${launchpad.data.region}`;
  return { location };
}

async function _getUpcoming(data) {
  return { upcoming: data.upcoming };
}

async function _getDetails(data) {
  const { details } = data;
  if (details) {
    return { details };
  }

  const wikipediaId = data.links.wikipedia?.split('/').at(-1);
  if (wikipediaId) {
    const wiki = await axios.get(wikiUrl(wikipediaId));
    const { extract } = wiki.data;
    return { details: extract };
  }

  const youtubeId = data.links.youtube_id;
  if (youtubeId) {
    const result = await ytdl.getBasicInfo(youtubeUrl(youtubeId));
    return { details: result.videoDetails.description };
  }

  return { details: '' };
}

async function _getNext(isNext) {
  return { next: isNext };
}

async function _makeResponse(data, isNext) {
  return Promise.all([
    _getImage(data),
    _getLaunchDate(data),
    _getTitle(data),
    _getNumber(data),
    _getLocation(data),
    _getUpcoming(data),
    _getDetails(data),
    _getNext(isNext),
  ]).then(
    ([image, launchDate, title, number, location, upcoming, details, next]) => {
      return {
        ...image,
        ...launchDate,
        ...title,
        ...number,
        ...location,
        ...upcoming,
        ...details,
        ...next,
      };
    }
  );
}

function _hasNextAndIsFirst(hasNext, index) {
  return hasNext && index === 0;
}

async function LaunchBuilder(data, isNext) {
  const launch = await _makeResponse(data, isNext);
  return { launch };
}

async function LaunchBuilderFromArray(launches, hasNext = false) {
  const result = await Promise.all(
    launches.map(async (data, index) => {
      return LaunchBuilder(data, _hasNextAndIsFirst(hasNext, index));
    })
  );
  return result;
}

module.exports = { LaunchBuilder, LaunchBuilderFromArray };
