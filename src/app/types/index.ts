enum CodeResponse {
  success = 200,
  error = 404 | 400
}

export type WeatherData = {
  name: string
  cod: CodeResponse
  main: {
    temp: string
  }
}
