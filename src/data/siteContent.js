import bobbyLobbyImage from '../assets/stories/bobby-lobby.webp'
import volvoImage from '../assets/stories/volvo-in-every-vehicle.webp'
import sunReserveImage from '../assets/stories/sun-reserve.webp'
import happyChristmassacreImage from '../assets/stories/happy-christmassacre.webp'
import theShootingImage from '../assets/stories/the-shooting.webp'

export const navItems = [
  { to: '/about', label: 'About' },
  { to: '/ideas', label: 'Ideas' },
  { to: '/locations', label: 'Locations' },
  { to: '/news', label: 'News' },
]

export const featuredStories = [
  {
    slug: 'bobby-lobby',
    client: 'New York Festivals',
    title: 'Bobby Lobby',
    description:
      "Satirizing the Reality of Awards Season to Prove It's the Work that Matters",
    body: "Satirizing the Reality of Awards Season to Prove It's the Work that Matters",
    image: bobbyLobbyImage,
  },
  {
    slug: 'volvo-in-every-vehicle',
    client: 'Volvo',
    title: 'Volvo In Every Vehicle',
    description: 'The Invention That Changed Cars Forever',
    body: 'The Invention That Changed Cars Forever',
    image: volvoImage,
  },
  {
    slug: 'sun-reserve',
    client: 'AB InBev: Corona',
    title: 'Sun Reserve',
    description: 'The World’s 1st Sun Reserve',
    body: 'The World’s 1st Sun Reserve',
    image: sunReserveImage,
  },
  {
    slug: 'happy-christmassacre',
    client: 'PETA',
    title: 'Happy Christmassacre',
    description: 'Bloodbath Beneath the Surface of our Festive Traditions',
    body: 'Bloodbath Beneath the Surface of our Festive Traditions',
    image: happyChristmassacreImage,
  },
  {
    slug: 'the-shooting',
    client: 'Newspaper La Unión and Article 19',
    title: 'The Shooting',
    description: 'We Shoot For the Truth. They Shoot to Silence Us.',
    body: 'We Shoot For the Truth. They Shoot to Silence Us.',
    image: theShootingImage,
  },
  {
    slug: 'estibadores',
    client: 'Mibanco',
    title: 'Estibadores',
    description: 'The Cart That Pays: Turning Work Tools into Financial Inclusion.',
    body: 'The Cart That Pays: Turning Work Tools into Financial Inclusion.',
    image: theShootingImage,
  },
  {
    slug: 'infinite-sunset',
    client: 'AB InBev: Corona Cero',
    title: 'Infinite Sunset',
    description: "Infinite Sunset: Global Livestream Redefines 'Anytime' for Corona Cero",
    body: "Infinite Sunset: Global Livestream Redefines 'Anytime' for Corona Cero",
    image: sunReserveImage,
  },
]

const storyImageByTitle = new Map(
  featuredStories.map((story) => [story.title.toLowerCase(), story.image]),
)

export const ideasDirectory = [
  {
    title: 'Bobby Lobby',
    client: 'New York Festivals',
    description:
      "Satirizing the Reality of Awards Season to Prove It's the Work that Matters",
    url: 'https://www.grey.com/ideas/bobby-lobby',
  },
  {
    title: 'Happy Christmassacre',
    client: 'PETA',
    description: 'Bloodbath Beneath the Surface of our Festive Traditions',
    url: 'https://www.grey.com/ideas/happy-christmassacre',
  },
  {
    title: 'Volvo: In Every Vehicle',
    client: 'Volvo',
    description: 'The Invention That Changed Cars Forever',
    url: 'https://www.grey.com/ideas/the-3-point-safety-belt',
  },
  {
    title: 'Sun Reserve',
    client: 'AB InBev: Corona',
    description: 'The World’s 1st Sun Reserve',
    url: 'https://www.grey.com/ideas/sun-reserve',
  },
  {
    title: 'The Shooting',
    client: 'Newspaper La Unión and Article 19',
    description: 'We Shoot For the Truth. They Shoot to Silence Us.',
    url: 'https://www.grey.com/ideas/the-shooting',
  },
  {
    title: 'EstibADores',
    client: 'Mibanco',
    description: 'The Cart That Pays: Turning Work Tools into Financial Inclusion.',
    url: 'https://www.grey.com/ideas/estibadores',
  },
  {
    title: 'envy™ my bag',
    client: 'VOG-VIP',
    description: 'envy™ Apple Redefines Luxury at Milan Fashion Week',
    url: 'https://www.grey.com/locations/italy/envy-tm-my-bag',
  },
  {
    title: 'We All Understand Coca-Cola',
    client: 'Coca-Cola',
    description: 'Using Design to Showcase a Brand Icon',
    url: 'https://www.grey.com/ideas/we-all-understand-coca-cola',
  },
  {
    title: 'Infinite Sunset',
    client: 'AB InBev: Corona Cero',
    description: "Infinite Sunset: Global Livestream Redefines 'Anytime' for Corona Cero",
    url: 'https://www.grey.com/ideas/infinite-sunset',
  },
  {
    title: 'SAD KAMA-CHAN',
    client: 'Food Passion Co., Ltd.',
    description: 'ONE BOLD FLIP. ONE BIG TURNAROUND.',
    url: 'https://www.grey.com/ideas/sad-kama-chan',
  },
  {
    title: 'Claustrobars',
    client: 'AB InBev: Stella Artois',
    description: 'Claustrobars: Worth Navigating the Crowd',
    url: 'https://www.grey.com/ideas/claustrobars',
  },
  {
    title: 'Potty-tunities',
    client: 'Georgia Pacific: Angel Soft',
    description: 'A Super Bowl Spot That’s Designed To Be Missed',
    url: 'https://www.grey.com/ideas/potty-tunities',
  },
  {
    title: "Applebee's is Serving NFL",
    client: "Applebee's",
    description: 'Applebee’s Just Became the NFL’s 33rd Franchise',
    url: 'https://www.grey.com/ideas/applebees-just-became-the-nfls-33rd-franchise',
  },
  {
    title: 'For Every Golden Moment',
    client: 'AB InBev: Corona Cero',
    description: 'Corona Cero Inspires Everyone to Discover Golden Moments',
    url: 'https://www.grey.com/ideas/for-every-golden-moment',
  },
  {
    title: 'A Breakthrough in Inclusive Design',
    client: 'Cemento Sol',
    description: 'Cemento Sol Turns Sidewalks into Sightwalks',
    url: 'https://www.grey.com/ideas/a-breakthrough-in-inclusive-design',
  },
  {
    title: 'The Recruiter',
    client: 'Modelo',
    description: 'Modelo is Recruiting More Full-Time Fans',
    url: 'https://www.grey.com/ideas/modelo-is-recruiting-more-full-time-fans',
  },
  {
    title: 'The Playable Billboard',
    client: 'Coca-Cola',
    description: 'Bringing Real Magic to Times Square',
    url: 'https://www.grey.com/ideas/the-playable-billboard',
  },
  {
    title: 'The Last Trip',
    client: 'Newspaper La Unión and Article 19',
    description: 'A True Story that Moved a Whole Country',
    url: 'https://www.grey.com/ideas/a-true-story-that-moved-a-whole-country',
  },
  {
    title: 'A Beautiful Sight',
    client: 'Vabysmo',
    description: 'Shaping vision care by showing mother’s care',
    url: 'https://www.grey.com/ideas/groundbreaking-short-film-is-a-beautiful-sight-to-see',
  },
  {
    title: 'Songs that you can eat with a spoon',
    client: 'Marodi',
    description: 'A Soup to Remember',
    url: 'https://www.grey.com/ideas/songs-that-you-can-eat-with-a-spoon',
  },
  {
    title: 'Teaching Kids That Perfect Teeth Are Just Healthy Teeth',
    client: 'Aquafresh',
    description: "Challenging children’s ideas of perfect teeth",
    url: 'https://www.grey.com/ideas/teaching-kids-that-perfect-teeth-are-just-healthy-teeth',
  },
  {
    title: 'Revolutionising the Food Category One Grain at a Time',
    client: 'Arroz Super Extra',
    description: 'Rice of Glory',
    url: 'https://www.grey.com/ideas/revolutionising-the-food-category-one-grain-at-a-time',
  },
  {
    title: 'The Movie No One Saw Became Impossible To Unsee',
    client: 'Pringles',
    description: 'Mr. P',
    url: 'https://www.grey.com/ideas/the-movie-no-one-saw-became-impossible-to-unsee',
  },
  {
    title: 'Carry Anti-Racism Wherever You Go',
    client: 'Racismo Zero and Zumbi dos Palmares University',
    description: 'The Anti-Racist Bag',
    url: 'https://www.grey.com/ideas/carry-anti-racism-wherever-you-go',
  },
  {
    title: 'Rick Hoffman is Everyone Everywhere All At Once',
    client: 'PracticePanther',
    description: 'Hoffman, Hoffman, Hoffman & Hoffman',
    url: 'https://www.grey.com/ideas/rick-hoffman-is-everyone-everywhere-all-at-once',
  },
  {
    title: 'There’s no such thing as a happy pig farm',
    client: 'PETA',
    description: 'Pig Farm',
    url: 'https://www.grey.com/ideas/theres-no-such-thing-as-a-happy-pig-farm',
  },
  {
    title: 'The Most Epic Battle for the Family Remote',
    client: 'Vodafone Ireland',
    description: 'The Remote',
    url: 'https://www.grey.com/ideas/the-most-epic-battle-for-the-family-remote',
  },
  {
    title: 'The Unforbidden Fruit',
    client: 'Dole',
    description: 'Original Sin or Original Snack?',
    url: 'https://www.grey.com/the-unforbidden-fruit',
  },
  {
    title: 'Data visualization, brought to you by nature',
    client: 'MAKRO',
    description: 'Life Extending Stickers',
    url: 'https://www.grey.com/data-visualization-brought-to-you-by-nature',
  },
  {
    title: 'Turning barcodes into access codes',
    client: 'Haleon',
    description: 'Access Codes',
    url: 'https://www.grey.com/access-codes',
  },
  {
    title: 'Your Street is Our Showroom',
    client: 'Volvo',
    description: 'Street Configurator',
    url: 'https://www.grey.com/ideas/the-future-of-car-buying',
  },
  {
    title: 'Uncomfortable Truths',
    client: 'Mass Mutual',
    description: 'Protecting your future starts with a difficult conversation.',
    url: 'https://www.grey.com/uncomfortable-truths',
  },
  {
    title: 'Postpone to Stop Postponing',
    client: 'LALCEC',
    description: 'Postponed Day',
    url: 'https://www.grey.com/the-postponed-day',
  },
  {
    title: "Nothing's More Beautiful Than the Sound of Cancer Being Destroyed",
    client: 'ASCO',
    description: 'The Most Beautiful Sound',
    url: 'https://www.grey.com/nothings-more-beautiful-than-the-sound-of-cancer-dying',
  },
  {
    title: 'Unnecessary Genius',
    client: 'Pringles',
    description: '318,000 Flavours, Because You Can',
    url: 'https://www.grey.com/ideas/unnecessary-genius',
  },
  {
    title: 'The Swedish Number',
    client: 'Swedish Tourist Association',
    description: 'Hej, Sweden Here',
    url: 'https://www.grey.com/ideas/the-swedish-number',
  },
  {
    title: 'Searching for the Right Result',
    client: 'Pantene',
    description: 'Equal and Balanced Results',
    url: 'https://www.grey.com/ideas/she',
  },
  {
    title: 'Fancy Like',
    client: 'Applebee’s',
    description: 'On a Date Night',
    url: 'https://www.grey.com/ideas/fancy-like',
  },
  {
    title: 'The Berlin Wall of Sound',
    client: 'SoundCloud',
    description: 'Chords of Calamity',
    url: 'https://www.grey.com/ideas/the-berlin-wall-of-sound',
  },
].map((item) => ({
  ...item,
  slug: item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
  image: storyImageByTitle.get(item.title.toLowerCase()) ?? null,
}))

export const capabilitiesContent = {
  introTitle: 'Hello!',
  introParagraphs: [
    "We’re Grey, a global collective of creative entrepreneurs with one mission: to build Famously Effective ideas that deliver growth because they solve real business problems and make brands stand out in culture in a positive way.",
    "We don’t just show up; we lead. We deliver ideas that break into new markets, build cultural relevance, and set brands up to own the future. Wherever we play, we turn momentum into movement, shaping culture, not chasing it.",
    "For over 100 years, we’ve been smashing the old rules. Forget choosing between famous or effective. At Grey, we deliver both. Because in today’s world, brands need to be unforgettable and unstoppable.",
    'Our edge? Cultural Value. the power that moves people, brands, and the world forward. We help brands earn it, live it, and lead with it, rooted in what truly matters.',
    "If you’re ready to lead the next era, we’re ready to build it with you. Let’s talk: [email protected].",
  ],
  sectionTitle: 'Famously Effective, Culture-Driving Creativity',
  capabilities: [
    {
      title: 'Advertising + Communications',
      alignment: 'right',
      body: [
        "Instead of just doing what clients ask, we dig deeper to understand the real business problems they're facing. Then, we come up with creative solutions that actually fix those problems.",
        "We make sure your message is clear and consistent everywhere your customers see it – whether it's on your website, in an ad, or on social media. A good idea should reach people in the right place, at the right moment, with the right message.",
      ],
      media: [
        {
          type: 'image',
          src: 'https://images.ctfassets.net/faxemkcsc5vu/2X5sQGiKAk4EeUpECzpYMc/e6f2af5ee6d49be106bf955939e5e783/For_every_moment_hero_image.jpg',
          alt: 'For every golden moment hero image',
        },
      ],
    },
    {
      title: 'AI',
      alignment: 'left',
      body: 'Throughout the entire creative process, we combine human and AI brains to rapidly identify, validate apply insights to ensure those meaningful ideas are not only meaningful and impactful, but also distinctive and attention-grabbing.',
      media: [
        {
          type: 'image',
          src: 'https://images.ctfassets.net/faxemkcsc5vu/4GBEbBRkmL67da4iU18MuQ/c9e9d85ef201b23a6c8d4f823954a398/CocaCola_Print_German-Urdu.png',
          alt: 'capabilities AI',
        },
        {
          type: 'video',
          src: 'https://videos.ctfassets.net/faxemkcsc5vu/6NX8tSJUfCEUmDbcctGHG2/df2511ad580e0767abad30e1a8df3838/BasicCell-1-1-v2-ezgif.com-gif-to-mp4-converter.mp4',
        },
      ],
    },
    {
      title: 'Production with Speed + Precision',
      alignment: 'right',
      body: 'Our production approach is centered on delivering bold, creative, and strategic solutions that move brands forward in an ever-evolving content landscape. We merge scale with cutting-edge technology, ensuring operational excellence, cost efficiency, and fast execution, all without compromising on quality or craft.',
      media: [
        {
          type: 'video',
          src: 'https://videos.ctfassets.net/faxemkcsc5vu/2Mkd5azBOPsHlp1vvOu1v3/7e14dbb0b5e4b57162dc98b27e31e2f8/AS_NeedToGo.mp4',
        },
        {
          type: 'image',
          src: 'https://images.ctfassets.net/faxemkcsc5vu/6V3bNjlvIfNed5S9rtNB5E/4713a40e4cda5a872ecacdb4c74316df/slack-imgs.jpg',
          alt: 'About Pantene Alix',
        },
        {
          type: 'video',
          src: 'https://videos.ctfassets.net/faxemkcsc5vu/798IDDo82WbTfpgPWVNzEG/cf6174b7ea0acd611c121d532c496e7b/EssentiallyBeautifulft.SonHeung-Min-ezgif.com-gif-to-mp4-converter.mp4',
        },
      ],
    },
    {
      title: 'Design',
      alignment: 'left',
      body: 'We apply design thinking, creativity and stunning craft to identify and address customer needs, solving problems and unlocking new opportunities. Our expertise encompasses visual identity, product design, communications strategy, and experience design.',
      media: [
        {
          type: 'image',
          src: 'https://images.ctfassets.net/faxemkcsc5vu/1uzjCLvuZuzAM8zz9aEoZp/b3c8f296f904abd11489714e023cb0e6/posteri-1536x861.jpg.webp',
          alt: 'Marodi poster',
        },
        {
          type: 'image',
          src: 'https://images.ctfassets.net/faxemkcsc5vu/1thiP164x4uneNRKTvKN98/52a9fda02223687f0e6041b167858dac/CloseUp_Mango_Red_03.jpeg',
          alt: 'Life extending sticker Mango',
        },
        {
          type: 'video',
          src: 'https://videos.ctfassets.net/faxemkcsc5vu/78oilI6FiRYTQMBKiBPrtq/4df60d4bd9ea08aae66c3864b14635d7/sightwalks_Post_gif_1.mp4',
        },
      ],
    },
  ],
  beyondBordersTitle: 'Beyond Borders',
  beyondBordersParagraph:
    "As the smallest of the big creative agencies of our parent, WPP, we offer the best of both worlds: the vast resources of the world's largest communications company, combined with the agility to thrive in today's fast-paced environment. Our global-to-local model ensures our clients have access to award-winning talent across every capability, with fully integrated teams delivering immediate insights and seamless activations. With 25 studios in 18 markets, we're perfectly sized to be incredibly nimble, enabling us to be responsive in today’s dynamic landscape.",
  achievements:
    'And the results speak for themselves: Grey has won a Grand Effie in every market we operate in. Newsweek named us a Top 100 Global Most Loved Workplace (2023) and one of America’s Greatest Workplaces for Women and Professional Services (2025). In 2024, we were ranked a Top 10 Network by the Cannes Lions International Festival of Creativity.',
}
