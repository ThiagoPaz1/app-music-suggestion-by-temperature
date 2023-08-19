export type Genres = {
  listid: string
  urlPath: string
}

export type GenresResponse = {
  global: {
    genres: {
      listid: string
      urlPath: string
    }[]
  }
}