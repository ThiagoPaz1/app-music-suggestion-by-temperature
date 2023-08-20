export type Genre = {
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

export type Music = {
  searchDate?: Date
  tracks: {
    title: string
  }[]
}