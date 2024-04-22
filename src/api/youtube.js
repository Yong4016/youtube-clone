export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(query, pageToken = '') {
    return query ? this.#searchByQuery(query, pageToken) : this.#mostPopular(pageToken);
  }

  async channelImageURL(id) {
    return this.apiClient.channels({ params: { part: 'snippet', id } }).then((response) => response.data.items[0].snippet.thumbnails.default.url);
  }

  async OtherVideosFromChannel(id) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          channelId: id,
          maxResults: 20,
          type: 'video',
        },
      })
      .then((response) => response.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async commentThreads(id) {
    return this.apiClient.commentThreads({
      params: {
        part: 'snippet',
        videoId: id,
        maxResults: 20,
      },
    });
  }

  async #searchByQuery(query, pageToken) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          q: query,
          pageToken: pageToken,
        },
      })
      .then((response) => {
        const itemsProcessed = response.data.items.map((item) => ({ ...item, id: item.id.videoId }));
        return {
          items: itemsProcessed,
          nextPageToken: response.data.nextPageToken,
          prevPageToken: response.data.prevPageToken,
        };
      });
  }

  async #mostPopular(pageToken) {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
          pageToken: pageToken,
        },
      })
      .then((response) => {
        const itemsProcessed = response.data.items;
        return {
          items: itemsProcessed,
          nextPageToken: response.data.nextPageToken,
          prevPageToken: response.data.prevPageToken,
        };
      });
  }
}
