module.exports = file => {
        return (req, res, next) => {
                var results = Object.keys(req.body)
                var flag = 0

                results.forEach( cur => {
                        if(!req.body[cur])
                        flag = 1
                })

                if(flag == 1)
                        res.render(`${file.split('/')[file.split('/').length - 1].split('.')[0]}/null`)
                else
                        next()
        }
}
