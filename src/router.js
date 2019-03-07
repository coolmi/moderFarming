import Vue from 'vue';
import Router from 'vue-router';
import ding from './lib/ding'

Vue.use(Router);

let dd = window.dd

// 滚动行为
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

const router = new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/s',
      component: () => import('@/views/Home'),
      meta: {
        ddConfig: true
      }
    },
    {
      path: '/',
      component: () => import('@/views/Appraise'),
      meta: {
        // ddConfig: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.pullToRefresh) {
    dd.ui.pullToRefresh.enable()
  } else {
    dd.ui.pullToRefresh.disable()
  }
  if (to.meta.ddConfig) { // 如果ddConfig为ture 则进行授权jsAPI
    setDDConfig(to)
  }
  typeof to.meta.title && setDocumentTitle(to.meta.title) // 设置title
  next();
});

let setDocumentTitle = function (title) {
  if (title !== undefined) {
    let config = {
      title: title
    }
    dd.ready(function () {
      dd.biz.navigation.setTitle(config);
    });
    dd.error(function (err) {
      console.error('dd setTitle error: ' + window.location.href + JSON.stringify(err));
    });
  }
};

let setDDConfig = function (to) {
  // let path = store.state.ddstate.ddConfigPath || base.baseURL
  let path = location.href
  ding.jsApiOAuth(path).then((ddconfig) => {
    dd.config(ddconfig)
  }).catch(function (error) {
    // ding.alertInfo(DEM.ddConfigInfoError);
  });
}

export default router;
