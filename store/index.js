export const state = () => ({
  siteName: 'ovl',
  mainNavLinks: [
    /* {
      id: 2,
      slug: 'oscar',
      title: 'Über mich',
      text: 'Ich bin'
    }, */
    {
      id: 22341341323421,
      to: { path: '/code' },
      title: 'Code I wrote',
      text: 'Code'
    },
    {
      id: 3,
      to: { path: '/text' },
      title: 'A list of written stuff',
      text: 'Text'
    },
    {
      id: 4,
      to: 'https://talks.ovl.design',
      title: 'Presentations I gave',
      text: 'Talks',
      useNativeLinkElement: true
    }
  ],
  footerNavLinks: [
    {
      id: 1323,
      slug: 'imprint',
      text: 'Imprint'
    }
  ]
})
