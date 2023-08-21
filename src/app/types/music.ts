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

export type ListMusic = {
  id: string
  city: string
  temp: number
  date?: string
  genre: string
  tracks: {
    title: string
  }[]
}