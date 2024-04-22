import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import OtherVideosFromChannel from '../components/OtherVideosFromChannel';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

const VideoDetail = () => {
  const location = useLocation();
  const { video } = location.state;
  const { title, channelTitle, channelId, description } = video.snippet;

  const { youtube } = useYoutubeApi();
  const { data: commentThreads } = useQuery({
    queryKey: ['commentThreads', video.id],
    queryFn: () => youtube.commentThreads(video.id),
    staleTime: 100 * 60 * 5,
  });

  const comments = commentThreads?.data?.items ?? [];

  return (
    <section className='flex flex-col lg:flex-row'>
      <article className='basis-4/6'>
        <iframe
          id='player'
          type='text/html'
          width='100%'
          height='640'
          src={`https://www.youtube.com/embed/${video.id}`}
          title={title}
          allowFullScreen
        />
        <div className='p-4'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <ChannelInfo
            name={channelTitle}
            id={channelId}
          />
          <div className='bg-customGray px-4 py-0.8 rounded-xl  line-clamp-4 hover:line-clamp-none hover:py-2'>
            <pre className='whitespace-pre-wrap text-sm tracking-tight my-1'>{description}</pre>
          </div>
          <div>
            <div>
              <p className='font-bold text-xl p-2'>comments</p>
              {comments.map((comment) => (
                <div>
                  <div className='flex items-center p-2 m-1'>
                    <img
                      className='w-10 h-10 rounded-full'
                      src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                      alt='profile'
                    />
                    <strong className='ml-2'>{comment.snippet.topLevelComment.snippet.authorDisplayName}</strong>
                  </div>
                  <p className='ml-8'>{decodeHtml(comment.snippet.topLevelComment.snippet.textDisplay)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
      <section className='basis-2/6'>
        <OtherVideosFromChannel id={channelId} />
      </section>
    </section>
  );
};

export default VideoDetail;

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
