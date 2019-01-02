const urls = {
  local: `https://api.smartrancagua.com/`,
  dev: '',
  prod: 'https://api.smartrancagua.com',
}

const env = 'prod'

export default urls[env]
