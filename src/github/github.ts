import { prisma } from "~/server/db";
import { env } from "~/env.mjs";

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

export type GitHubOrganization = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string | null;
};

export type GithubRepository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
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
    site_admin: boolean;
  };
};

type Repository = {
  organization: string;
  name: string;
};

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

      return await fetchRepositories(orgs, account.access_token);
    }
  }

  return [];
}

async function getOrganizations(user: GithubUser, accessToken: string) {
  return await fetch(
    `https://api.github.com/user/orgs`,
    fetchConfig(accessToken)
  ).then((res) => res.json() as Promise<GitHubOrganization[]>);
}

async function fetchRepositories(
  orgs: GitHubOrganization[],
  accessToken: string
) {
  const allRepos: Repository[] = [];

  const userRepos = fetch(
    `https://api.github.com/user/repos`,
    fetchConfig(accessToken)
  ).then((res) => res.json() as Promise<GithubRepository[]>);

  return Promise.all([userRepos]).then((repos) => {
    return repos[0];
  });

  /* for (const org of orgs) {
    const repos = await fetch(org.repos_url, fetchConfig(accessToken)).then(
      (res) => res.json() as Promise<{ name: string }[]>
    );

    if (repos && repos.length > 0) {
      const orgRepos = repos.map((repo) => ({
        organization: org.login,
        name: repo.name,
      }));
      allRepos.push(...orgRepos);
    }
  } */
}

function fetchConfig(accessToken: string) {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}
