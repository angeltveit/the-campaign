module.exports = {
    apps: [{
        name: 'the-campaign',
        script: 'index.js',
        node_args: '--experimental-modules  -r',
        instances: 1,
        exec_mode: "fork",
        wait_ready: false,
        watch: false,
        listen_timeout: 8000,
        kill_timeout: 3000
    }]
}

