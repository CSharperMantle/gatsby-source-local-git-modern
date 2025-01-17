import git, { DefaultLogFields, ListLogLine } from 'simple-git';

interface Author {
  id: string
  name: string
  email: string
}

interface Commit extends ListLogLine {
  id: string
  hash: string
  message: string
  body: string
  refs: string
  date: Date
  latest: boolean
  author: Author
}

interface Tag {
  id: string
  name: string
  latest: boolean
}

interface Branch {
  id: string
  name: string
  commit: string
  current: boolean
}

const createAuthor = (name: string, email: string): Author => ({
  name,
  email,
  id: `${name}__${email}`,
})

const getCommits = async (): Promise<Commit[]> => {
  const { all, latest } = await git().log<DefaultLogFields>({
    "--stat": "4096",
  })
  const latestHash = latest!.hash

  return all.map(
    ({ hash, diff, date, author_email, author_name, ...rest }) => ({
      hash,
      ...rest,
      id: hash,
      date: new Date(date),
      latest: hash === latestHash,
      // create copy so a plain object is returned
      diff: diff && { ...diff },
      author: createAuthor(author_name, author_email),
    })
  )
}

const getTags = async (): Promise<Tag[]> => {
  const { all, latest } = await git().tags()

  return all.map((name) => ({
    name,
    id: name,
    latest: name === latest,
  }))
}

const getBranches = async (): Promise<Branch[]> => {
  const { branches } = await git().branch(["-v", "-a"])

  return Object.values(branches).map(({ name, commit, current }) => ({
    name,
    commit,
    current,
    id: name,
  }))
}

export { getCommits, getTags, getBranches, Author, Commit, Tag, Branch }
