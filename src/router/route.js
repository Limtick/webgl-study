import Body from '@/views/Body'
import Home from '@/views/Home'


import Index from '@/views/Index'
import Content from '@/views/Content'
import FirstDemo from '@/views/FirstDemo'
import AudioVisualizer from '@/views/audioVisualizer/AudioVisualizer'
import NotFound from '@/views/NotFound'


const routes = [
  {
    path: '/',
    name: 'Body',
    component: Body,
    redirect: '/home',
    children: [
			{
				path: '/home',
				name: 'Home',
				component: Home
			},
      {
        path: '/three',
        name: 'Content',
        component: Content,
        redirect: '/three/index',
        children: [
          {
            path: 'index',
            name: 'Index',
            component: Index
          },
          {
            path: 'first',
            name: 'FirstDemo',
            component: FirstDemo
          }
        ]
      },
      {
        path: '/audioVisualizer',
        name: 'AudioVisualizer',
        component: AudioVisualizer
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

export default routes
