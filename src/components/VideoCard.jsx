import React from 'react';
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video, type }) => {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();
  const isList = type === 'list';

  return (
    <li
      className={`${isList ? 'flex gap-1 m-3' : ''} cursor-pointer p-2 transform hover:-translate-y-0.5 ease-in duration-300`}
      onClick={() => {
        navigate(`/videos/watch/${video.id}`, { state: { video } });
      }}
    >
      <img
        className={`${isList ? 'w-60 mr-2' : 'w-full'} rounded-lg hover:rounded-none ease-in duration-300`}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p
          className='font-semibold my-2 line-clamp-2 line-clamp-hover'
          title={title}
        >
          {title}
        </p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <p className='text-sm opacity-80'>{format(publishedAt)}</p>
      </div>
    </li>
  );
};

export default VideoCard;
