import { client } from './sanity';

const simpleConversationsProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "roomname" : roomname,
    "likes": likes[]->username,
    "id":_id,
    "createdAt":_createdAt
`;

export async function getFollowingConversationsOf(username: string) {
  return client.fetch(
    `*[_type =="conversations" && author->username == "${username}"
          || author._ref in *[_type == "user" && username == "${username}"][0].following[]._ref]
          | order(_createdAt desc){
          ${simpleConversationsProjection}
        }`
  );
}
