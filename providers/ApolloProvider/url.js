const urls = {
  local: `http://localhost:3000`,
  dev: '',
  prod: 'https://api.smartrancagua.com',
}

const env = 'prod'

export default urls[env]
