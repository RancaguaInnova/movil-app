const urls = {
  local: `http://localhost:3000`,
  dev: '',
  prod: ''
}

const env = 'local'

export default urls[env]
