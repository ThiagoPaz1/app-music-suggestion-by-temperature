enum CodeResponse {
  success = 200
}

export type WeatherData = {
  name: string
  cod: CodeResponse
  main: {
    temp: string
  }
  error?: {
    cod: number
  }
}
