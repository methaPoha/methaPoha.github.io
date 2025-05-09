// BLOG/blogLoader.js
document.addEventListener('DOMContentLoaded', function() {
    // List of blogs with date (YYYY-MM-DD format recommended)
    const blogs = [
        {folder: 'ravi jain', date: '2024-12-23'},
        {folder: 'mess se chori', date: '2024-12-09'},
        {folder: 'iitb', date: '2025-05-08'},
        {folder: 'rust', date: '2025-01-22'}
        // Add more blogs with their dates
    ];

    const blogContainer = document.getElementById('blog-container');

    // Function to create a blog card
    async function createBlogCard(blogInfo) {
        try {
            // Fetch the blog's index.html
            const response = await fetch(`${blogInfo.folder}/index.html`);
            const htmlText = await response.text();

            // Create a temporary div to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlText;

            // Extract title from article's first heading
            const articleElement = tempDiv.querySelector('article');
            if (!articleElement) return null;

            const titleElement = articleElement.querySelector('h1, h2');
            const title = titleElement ? titleElement.textContent : 'Untitled Blog';

            // Extract first paragraph from article
            const firstParagraph = articleElement.querySelector('p');
            const excerpt = firstParagraph ? firstParagraph.textContent.substring(0, 200) + '...' : 'No excerpt available';

            // Create blog card
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('blog-card');
            cardDiv.innerHTML = `
                <div class="blog-card-content">
                    <h3 class="blog-title">${title}</h3>
                    <p class="blog-date">${blogInfo.date}</p>
                    <p class="blog-excerpt">${excerpt}</p>
                    <a href="${blogInfo.folder}/index.html" class="read-more">Read More</a>
                </div>
            `;

            return cardDiv;
        } catch (error) {
            console.error(`Error loading blog ${blogInfo.folder}:`, error);
            return null;
        }
    }

    // Load all blog cards
    async function loadBlogs() {
        // Sort blogs by date (most recent first)
        blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

        const blogCards = await Promise.all(
            blogs.map(blogInfo => createBlogCard(blogInfo))
        );

        // Remove any null cards and append to container
        blogCards.filter(card => card !== null)
            .forEach(card => blogContainer.appendChild(card));
    }

    // Trigger blog loading
    loadBlogs();
});