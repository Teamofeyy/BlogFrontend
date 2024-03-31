import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl="https://altaz933.com/wp-content/uploads/2023/05/G_flea_050123.jpg"
                user={{
                  avatarUrl:
                    'https://sun9-66.userapi.com/impg/voxr4G9aXbjPXEkIN8mXf9tRGtbAskbrMJdD-Q/RwgNWeAkZrU.jpg?size=959x1045&quality=95&sign=8e7a628887c42d511812bd2fc443b6c0&type=album',
                  fullName: 'Teamofey',
                }}
                createdAt={'31 марта 2024 г.'}
                viewsCount={150}
                commentsCount={3}
                tags={[ 'rhcp', 'music']}
                isEditable
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={['rhcp', 'musicians']} isLoading={false} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'John Frusciante',
                  avatarUrl:
                    'https://i.pinimg.com/originals/06/5d/fc/065dfc7138ee5032fada44524643dc94.jpg',
                },
                text: 'Куда я жмал',
              },
              {
                user: {
                  fullName: 'Anthony Kiedis',
                  avatarUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVMlsVz2vzn6RXJd2FIVqU_sXWahVAwd9pl9iWVJT5fd4KQji8tJrM8OR2YPHxtfpxGxw&usqp=CAU',
                },
                text: 'CALIFORNIA',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
