import swagger from '@elysiajs/swagger';

export default swagger({
  path: '/docs',
  documentation: {
    info: {
      title: 'SimpleBlog API',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'auth',
        description: 'Authentication',
      },
      {
        name: 'user',
        description: 'Users',
      },
      {
        name: 'post',
        description: 'Posts'
      },
      {
        name: 'comment',
        description: 'Post comments',
      }
    ]
  },
});
