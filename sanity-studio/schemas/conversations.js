export default {
  title: 'Conversations',
  name: 'conversations',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'roomName',
      type: 'string',
      title: 'Room Name',
    },
    {
      name: 'roomId',
      type: 'string',
      title: 'Room Id',
    },
  ],
}
