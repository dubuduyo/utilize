import { SearchUser } from '@/model/user';
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

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : '';
  return client
    .fetch(
      `*[_type =="user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }
    `
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function addApiKey(id: string, apiKey: string) {
  return client.patch(id).set({ userkey: apiKey }).commit();
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      "following": count(following),
      "followers": count(followers),
    }
    `
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
    }));
}
