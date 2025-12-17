export const SEO = ({
                        title = 'EduConnect - School Management System',
                        description = 'Transform education in Nigeria with EduConnect. Digital learning platform for schools, teachers, students, and parents.',
                        keywords = 'school management system, education technology, Nigeria schools, digital learning, EduConnect',
                        image = 'https://educonnect.com.ng/assets/logo-CGEByueL.png',
                        url = 'educonnect.com.ng',
                        type = 'website'
                    }) => {
    return (
        <>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="author" content="EduConnect Digital Solutions" />
        </>
    );
};
