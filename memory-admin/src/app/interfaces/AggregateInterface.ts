export interface AggregateInterface {
    array: [AantalSpellenInterface, AantalSpelersInterface, ApiUseInterface[]]
}

interface AantalSpellenInterface {
    aantal_spellen: number
}

interface AantalSpelersInterface {
    aantal_spelers: number
}

interface ApiUseInterface {
    api: string
    aantal: 1
}