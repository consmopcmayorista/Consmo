import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import ProductView_cat from '../views/ShopList_cat.vue'
import ShopList from '../views/ShopList.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: ShopList,
    },
    {
      path: '/catalogo_cat',
      name: 'catalogo_cat',
      component: ProductView_cat,
      props: (route) => ({ categoria: route.query.categoria, busqueda: route.query.busqueda }) // Pasar el parámetro como prop
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/confirmacion',
      name: 'confirmacion',
      component: () => import('../views/OrderConfirmationView.vue'),
    },
    {
      path: '/compra-exitosa',
      name: 'OrderCompleted',
      component: () => import('../views/OrderCompleted.vue'),
    },
    {
      path: '/conocenos',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/envios',
      name: 'envios',
      component: () => import('../views/Envios.vue'),
    },
    {
      path: '/encuentranos',
      name: 'encuentranos',
      component: () => import('../views/Encuentranos.vue'),
    },
    {
      path: '/calificanos',
      name: 'calificanos',
      component: () => import('../views/Rating.vue'),
      props: true,
    },
    {
      path: '/producto',
      name: 'producto',
      component: ProductView,
    },
    // Rutas del foro
    {
      path: '/foro',
      name: 'foro',
      component: () => import('../views/Foro.vue'), // Vista para la lista del foro
    },
    {
      path: '/foro/:id',
      name: 'publicacion',
      component: () => import('../components/Publicacion.vue'), // Vista para el detalle de la publicación
      props: true, // Permite pasar el parámetro `id` como propiedad al componente
    },
    {
      path: '/promociones',
      name: 'promociones',
      component: () => import('../views/Promos.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/Error404.vue'),
    }
    
  ],
  strict: true,
  debug: true,
});

export default router;
