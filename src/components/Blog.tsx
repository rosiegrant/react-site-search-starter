/* This example requires Tailwind CSS v2.0+ */
const posts = [
    {
        title: 'Statue of Liberty',
        href: '#',
        category: { name: 'Guide', href: '#' },
        description:
            '"The Statue of Liberty Enlightening the World" was a gift of friendship from the people of France to the United States and is recognized as a universal symbol of freedom and democracy. The Statue of Liberty was dedicated on October 28, 1886. It was designated as a National Monument in 1924. Employees of the National Park Service have been caring for the colossal copper statue since 1933.',
        date: 'June 16, 2021',
        datetime: '2020-03-16',
        imageUrl:
            'http://a.mktgcdn.com/p/0dhkMsdkaXoyHXzH4sZ7PbxTiP9mUHYnvY7Lf39teYs/2160x1440.jpg',
        readingTime: '6 min',
        author: {
            name: 'Roel Aufderehar',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        title: 'Bryce Canyon',
        href: '#',
        category: { name: 'Video', href: '#' },
        description:
            'Hoodoos (irregular columns of rock) exist on every continent, but here is the largest concentration found anywhere on Earth. Situated along a high plateau at the top of the Grand Staircase, the parks high elevations include numerous life communities, fantastic dark skies, and geological wonders that defy description.',
        date: 'Mar 10, 2021',
        datetime: '2020-03-10',
        imageUrl:
            'http://a.mktgcdn.com/p/ReOE_W0Km6Hcd4JidqXja--UQ7biXAu_hm8Sbp7KdSw/7622x5084.jpg',
        readingTime: '4 min',
        author: {
            name: 'Brenna Goyette',
            href: '#',
            imageUrl:
                'http://a.mktgcdn.com/p/ReOE_W0Km6Hcd4JidqXja--UQ7biXAu_hm8Sbp7KdSw/7622x5084.jpg',
        },
    },
    {
        title: 'Muir Woods',
        href: '#',
        category: { name: 'Guide', href: '#' },
        description:
            'Walk among old growth coast redwoods, cooling their roots in the fresh water of Redwood Creek and lifting their crowns to reach the sun and fog. Federally protected as a National Monument since 1908, this primeval forest is both refuge and laboratory, revealing our relationship with the living landscape. What will you discover in Muir Woods?',
        date: 'Dec 12, 2021',
        datetime: '2020-02-12',
        imageUrl:
            'http://a.mktgcdn.com/p/CjCHm0Xhp5gdnDQcjDSq-Y4akM2iTLqoa99SG96WNkY/2000x1500.jpg',
        readingTime: '11 min',
        author: {
            name: 'Daniela Metz',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
]

export default function Blog() {
    return (
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
                <div className="bg-white h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-3xl">Guides to Plan Your Trip</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Check out these pre-built guides to help you plan your visit to a national park or historic site
                    </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                    {posts.map((post) => (
                        <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                            <div className="flex-shrink-0">
                                <img className="h-48 w-full object-cover" src={post.imageUrl} alt="" />
                            </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-indigo-600">
                                        <a href={post.category.href} className="hover:underline">
                                            {post.category.name}
                                        </a>
                                    </p>
                                    <a href={post.href} className="block mt-2">
                                        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                                        <p className="mt-3 text-base text-gray-500">{post.description}</p>
                                    </a>
                                </div>
                                <div className="mt-6 flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href={post.author.href}>
                                            <span className="sr-only">{post.author.name}</span>
                                            <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" />
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">
                                            <a href={post.author.href} className="hover:underline">
                                                {post.author.name}
                                            </a>
                                        </p>
                                        <div className="flex space-x-1 text-sm text-gray-500">
                                            <time dateTime={post.datetime}>{post.date}</time>
                                            <span aria-hidden="true">&middot;</span>
                                            <span>{post.readingTime} read</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
