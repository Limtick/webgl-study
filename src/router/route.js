import Body from '@/views/Body'
import Home from '@/views/Home'


import Index from '@/views/Index'
import Content from '@/views/Content'
import FirstDemo from '@/views/FirstDemo'
import AudioVisualizer from '@/views/audioVisualizer/AudioVisualizer'

import Nes from '@/views/nesGame/Nes'
import Preview from '@/views/nesGame/Preview'

import ColorAnalysis from '@/views/color/ColorAnalysis'


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
      },
      {
        path: '/nes',
        name: 'Nes',
        component: Nes,
        redirect: '/nes/preview',
        children: [
          {
            path: 'preview',
            name: 'Preview',
            component: Preview
          }
        ]
      },
      {
        path: '/color',
        name: 'ColorAnalysis',
        component: ColorAnalysis
      },

    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

export default routes
