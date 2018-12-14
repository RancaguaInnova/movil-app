const urls = {
  local: `http://localhost:3000`,
  dev: '',
  prod: 'https://api.smartrancagua.cl'
}

const env = 'prod'

export default urls[env]
