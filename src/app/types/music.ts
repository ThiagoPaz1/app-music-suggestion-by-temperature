export type Genres = {
  rockId: string
  popId: string
  countryId: string
  alternativeId: string
}

export type GenresResponse = {
  global: {
    genres: {
      listid: string
      urlPath: string
    }[]
  }
}