const login = {
    loginRequest: '/login/cellphone'
}

const recomend = {
    personalized: '/personalized',
    banner: '/banner',
    privatecontent: '/personalized/privatecontent',
    playlist: '/user/playlist',
    topplaylist: '/top/playlist',
    hotplaylist: '/playlist/hot',
    catlist: '/playlist/catlist',
    newsongs: '/personalized/newsong'
}

const songsheet = {
    sheetdetail: '/playlist/detail'
}

const dailySongs = {
    songsRequest: '/recommend/songs'
}

const notLoadingUrl = ['/playlist/catlist', '/playlist/hot', '/top/playlist', '/personalized', '/banner', '/personalized/privatecontent', '/personalized/newsong']

module.exports = {
    notLoadingUrl,
    login,
    recomend,
    songsheet,
    dailySongs,
}