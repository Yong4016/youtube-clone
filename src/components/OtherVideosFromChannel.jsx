import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

const OtherVideosFromChannel = ({ id }) => {
  const { youtube } = useYoutubeApi();
  const {
    isPending,
    error,
    data: videos,
  } = useQuery({
    queryKey: ['otherVideos', id],
    queryFn: () => youtube.OtherVideosFromChannel(id),
    staleTime: 100 * 60 * 5,
  });

  return (
    <>
      <div className='ml-2 text-lg font-bold'>More From This Channel:</div>
      {isPending && <p>Loading...</p>}
      {error && <p>An error occurred: {error.message}</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              type='list'
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default OtherVideosFromChannel;
