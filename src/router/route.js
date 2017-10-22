import Body from '@/views/Body'
import Index from '@/views/Index'
import Content from '@/views/Content'
import FirstDemo from '@/views/FirstDemo'
import NotFound from '@/views/NotFound'


const routes = [
  {
    path: '/',
    name: 'Body',
    component: Body,
    redirect: '/three',
    children: [{
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
    }]
  },
  {
    path: '*',
    component: NotFound
  }
]

export default routes
