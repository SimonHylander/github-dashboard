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
  html_url: string;
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

export type Repository = {
  owner: string;
  ownerAvatar: string;
  repositories: GithubRepository[];
  pages: number;
};

export async function getUser(accessToken: string) {
  const user = await fetch(
    `https://api.github.com/user`,
    fetchConfig(accessToken)
  ).then((res) => res.json() as Promise<GithubUser>);

  return user;
}

export async function getRepositories(accessToken: string) {
  const orgs = await getOrganizations(accessToken);
  return await fetchRepositories(orgs, accessToken);
}

async function getOrganizations(accessToken: string) {
  return await fetch(
    `https://api.github.com/user/orgs`,
    fetchConfig(accessToken)
  ).then((res) => res.json() as Promise<GitHubOrganization[]>);
}

async function fetchRepositories(
  orgs: GitHubOrganization[],
  accessToken: string
) {
  const userRepos = fetch(
    `https://api.github.com/user/repos`,
    fetchConfig(accessToken)
  )
    .then((res) => res.json() as Promise<GithubRepository[]>)
    .catch((err) => []);

  const promises: Promise<GithubRepository[]>[] = [userRepos];

  orgs.forEach((org) => {
    promises.push(getOrganizationRepositories(org, accessToken));
  });

  return Promise.all(promises).then((values) => {
    const uniqueRepos = new Set<string>();

    const groups = new Map<
      string,
      { avatar: string; repos: GithubRepository[] }
    >();

    const collectedRepos: Repository[] = [];

    values.forEach((repos) => {
      repos.forEach((repo) => {
        const ownerLogin = repo.owner.login;
        const ownerAvatar = repo.owner.avatar_url;

        if (uniqueRepos.has(`${ownerLogin}/${repo.name}`)) {
          return;
        }

        if (!groups.has(ownerLogin)) {
          groups.set(ownerLogin, { avatar: ownerAvatar, repos: [] });
        }

        const items = groups.get(ownerLogin)?.repos;

        if (!items?.some((item) => item.id === repo.id)) {
          groups.get(ownerLogin)?.repos.push(repo);
        }

        uniqueRepos.add(`${ownerLogin}/${repo.name}`);
      });
    });

    groups.forEach((value, key) => {
      collectedRepos.push({
        owner: key,
        ownerAvatar: value.avatar,
        repositories: value.repos,
        pages: 0,
      });
    });

    return collectedRepos;
  });
}

function getOrganizationRepositories(
  org: GitHubOrganization,
  accessToken: string
) {
  const url = `${org.repos_url}?sort=created`;

  return fetch(url, fetchConfig(accessToken))
    .then((res) => {
      if (res.headers.has("link")) {
        const link = res.headers.get("link");

        if (link?.includes('rel="next"')) {
          console.log("next page");
          console.log(link);
        }
      }

      return res.json() as Promise<GithubRepository[]>;
    })
    .catch((err) => []);
}

function fetchConfig(accessToken: string) {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}
