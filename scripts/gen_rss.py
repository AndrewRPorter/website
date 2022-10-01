import os

BLOG_POST_DIR = "markdown/blog"
BLOG_POST_URL_PATH = "https://www.andrewrporter.com/blog/"
RSS_FILE_PATH = "public/rss.xml"

class BlogPost:
    title = ""
    link = ""
    description = ""

    def gen_rss_item(self):
        return f"""<item>
            <title{self.title}</title>
            <link>{BLOG_POST_URL_PATH + self.link}</link>
            <description>{self.description}</description>
            </item>
        <item>
        """

    def __str__(self):
        return self.title

def create_blog_post(blog_post_path: str):
    blog_post = BlogPost()
    
    with open(blog_post_path) as f:
        lines = f.readlines()
        for line in lines:
            if line.startswith("title: "):
                blog_post.title = " ".join(line.split(" ")[1:]).strip()
            elif line.startswith("path: "):
                blog_post.link = " ".join(line.split(" ")[1:]).strip()
            elif line.startswith("description: "):
                blog_post.description = " ".join(line.split(" ")[1:]).strip()
    
    return blog_post

def create_rss():
    blog_posts = []
    for root, dirs, files in os.walk(BLOG_POST_DIR, topdown=False):
        for name in files:
            blog_posts.append(create_blog_post(os.path.join(root, name)))
            
    rss_items = ''.join(map(create_rss_item, blog_posts))
    rss_template = f"""
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
    <channel>
        <title>Andrew R. Porter blog posts</title>
        <link>https://www.andrewrporter.com</link>
        <description>I am a remote Software Engineer at GitHub on the billing team. I enjoy writing web applications with Python and Next.js. I consider myself a lifetime learner and am currently diving into the world of Ruby.</description>
        {rss_items}
    </channel>
    </rss>
    """

    with open(RSS_FILE_PATH, "w") as f:
        f.write(rss_template.strip())

def create_rss_item(blog_post: BlogPost):
    return blog_post.gen_rss_item()

def run():
    create_rss()

if __name__ == "__main__":
    run()
