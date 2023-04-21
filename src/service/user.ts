import { client } from './sanity';

type OAuthUser = {
  id: string;
  userkey?: string | null;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({
  id,
  userkey,
  username,
  email,
  name,
  image,
}: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    userkey,
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      userkey,
      following[]->{username,image},
      followers[]->{username,image},
    }`
  );
}
