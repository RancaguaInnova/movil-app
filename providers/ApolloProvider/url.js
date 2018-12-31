const urls = {
  local: 'http://localhost:3000',
  dev: '',
  prod: 'https://api.smartrancagua.com',
}

const env = 'local'

export default urls[env]
