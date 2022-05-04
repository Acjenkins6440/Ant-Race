import { AntData } from '../types';

type AntResponse = {
  ants: AntData[]
}

export const fetchAntData = (): Promise<AntResponse> => (
  fetch('/ants', { method: 'GET' })
  .then((resp) => {
    const antData = resp.json()
    return antData
  })
)