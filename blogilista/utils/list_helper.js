const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else {
        const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
        return likes
    }
}

const favouriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return 0
    } else {
        let mostLikes = 0
        let theBlog = {
            title: "title",
            author: "author",
            likes: 0
        }

        blogs.forEach(blog => {
            if (blog.likes >= mostLikes) {
                mostLikes = blog.likes
                theBlog = {
                    title: blog.title,
                    author: blog.author,
                    likes: blog.likes
                }
            }
        }, {})
        return theBlog;
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}