const cheerio = require('cheerio'),
    { shuffleArray } = require('./util');
module.exports = {
    recents: (data, type, limit) => {
        return new Promise((resolve, reject) => {
            var $ = cheerio.load(data);
            var parsed = {0:[],1:[],2:[],3:[]};
            var sections = $('section');
            for (var i=0;i<sections.length;i++) {
                var $$ = cheerio.load(sections.eq(i).html());
                var figures = $$('figure');
                for (var y=0;y<figures.length;y++) {
                    var figure = figures.eq(y).children();
                    var a = figure.eq(0).children().eq(0).children().eq(0);
                    var f = figure.eq(1).children();
                    parsed[i].push({
                        url: 'https://furaffinity.net'+a.attr('href'),
                        src: 'https:'+a.children().eq(0).attr('src'),
                        title: f.eq(0).children().eq(0).attr('title'),
                        author: f.eq(1).children().eq(1).attr('title'),
                        authorURL: 'https://furaffinity.net'+f.eq(1).children().eq(1).attr('href')
                    });
                }
            }
            var ret = [];
            if (type < 4) ret = parsed[type];
            else ret = [].concat(parsed.reduce(function(a, b) {
                return a.concat(b);
            }, []));
            resolve(shuffleArray(ret));
        });
    }
};