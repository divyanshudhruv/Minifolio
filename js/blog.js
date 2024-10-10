//blog section
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const blogSection = document.getElementById('blog');

    const blogPosts = [
        {
            title: 'Web Performance meets User Experience',
            date: 'October 7, 2023',
            content: 'Combining web performance with user experience is crucial. Faster-loading websites offer a seamless experience, resulting in happier visitors who are more likely to stay. It’s not just about speed, though. You have to ensure every interaction is smooth and intuitive... '
        },
        // Add more blog posts here
    ];

    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');

        const titleElement = document.createElement('h3');
        titleElement.textContent = post.title;

        const dateElement = document.createElement('p');
        dateElement.classList.add('date');
        dateElement.textContent = post.date;

        const contentElement = document.createElement('p');
        contentElement.textContent = post.content;

        postElement.appendChild(titleElement);
        postElement.appendChild(dateElement);
        postElement.appendChild(contentElement);

        blogSection.appendChild(postElement);
    });
});
