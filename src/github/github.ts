import { prisma } from "~/server/db";

type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: null;
  bio: string;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

type GithubOrganization = {};

export async function getRepositories(userId: string) {
  const account = await prisma.account.findFirst({
    where: {
      userId,
    },
  });

  if (account && account.access_token) {
    const user = await fetch(
      `https://api.github.com/user`,
      fetchConfig(account.access_token)
    ).then((res) => res.json() as Promise<GithubUser>);

    if (user) {
      const orgs = await getOrganizations(user, account.access_token);
      console.log(orgs);
    }
  }

  return [];
}

async function getOrganizations(user: GithubUser, accessToken: string) {
  return await fetch(
    `https://api.github.com/user/orgs`,
    fetchConfig(accessToken)
  ).then((res) => res.json());
}

function fetchConfig(accessToken: string) {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}