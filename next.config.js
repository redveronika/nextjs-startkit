module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' }
    }
  },
  webpack: (config, { dev }) => {
    config.node = config.node || {}
    config.node.fs = 'empty'
    return config
  }
}
