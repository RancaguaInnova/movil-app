const urls = {
  local: `http://localhost:3000`,
  dev: '',
  prod: 'https://api.smartrancagua.com',
  //prod: 'http://localhost:3000',
}

const env = 'prod'

export default urls[env]
