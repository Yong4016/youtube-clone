import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { GrPrevious, GrNext } from 'react-icons/gr';

const Videos = () => {
  const { query } = useParams();
  const { youtube } = useYoutubeApi();
  const [pageToken, setPageToken] = useState('');
  const {
    isPending,
    error,
    data: videos,
  } = useQuery({
    queryKey: ['videos', query, pageToken],
    queryFn: () => youtube.search(query, pageToken),
    staleTime: 100 * 60 * 1,
  });

  const handlePrevPage = () => {
    if (videos?.prevPageToken) {
      setPageToken(videos.prevPageToken);
    }
  };

  const handleNextPage = () => {
    if (videos?.nextPageToken) {
      setPageToken(videos.nextPageToken);
    }
  };

  return (
    <>
      <div className='p-2'>{query ? `🔎 Results for: ${query}` : `🔥 Trending Now`}</div>
      {isPending && <p>Loading...</p>}
      {error && <p>An error occurred: {error.message}</p>}
      {videos && (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4 mb-8'>
          {videos.items.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
            />
          ))}
        </ul>
      )}
      <div className='flex text-bold gap-40 text-xl p-8 justify-center'>
        {videos?.prevPageToken && (
          <button
            className='transform transition duration-500 hover:scale-125'
            onClick={handlePrevPage}
          >
            <GrPrevious />
          </button>
        )}
        {videos?.nextPageToken && (
          <button
            className='transform transition duration-500 hover:scale-125'
            onClick={handleNextPage}
          >
            <GrNext />
          </button>
        )}
      </div>
    </>
  );
};

export default Videos;
