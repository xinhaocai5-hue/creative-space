/* ============================================
   CREATIVE SPACE - APP.JS
   ============================================ */
(function () {
  'use strict';

  /* ---------- STATE ---------- */
  var STORAGE_KEY = 'siteDataV11';
  var PASSWORD = 'yglnb';
  var isEditMode = false;
  var isAuthenticated = false;
  var currentLang = localStorage.getItem('langV4') || 'zh';
  var currentTheme = localStorage.getItem('themeV4') || 'dark';
  var lightboxItems = [];
  var lightboxIndex = 0;

  // Forward declarations (defined later in initPhotosPage / initVideosPage)
  window.closePhotosPage = window.closePhotosPage || function () {};
  window.closeVideosPage = window.closeVideosPage || function () {};
  window._openEditModal = window._openEditModal || function () {};
  var illustExpanded = false;
  var videoExpanded = false;
  var softExpanded = false;

  /* ---------- DEFAULT DATA ---------- */
  var defaultData = {
    illust: [
      { id: 'i1', title: 'AI Art 01', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_00033_.png', link: '' },
      { id: 'i2', title: 'AI Art 02', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_00568_.png', link: '' },
      { id: 'i3', title: 'AI Art 03', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_00828_.png', link: '' },
      { id: 'i4', title: 'AI Art 04', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_00871_.png', link: '' },
      { id: 'i5', title: 'AI Art 05', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_00915_.png', link: '' },
      { id: 'i6', title: 'AI Art 06', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_01207_.png', link: '' },
      { id: 'i7', title: 'AI Art 07', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_01221_.png', link: '' },
      { id: 'i8', title: 'AI Art 08', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_01326_.png', link: '' },
      { id: 'i9', title: 'AI Art 09', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_01386_.png', link: '' },
      { id: 'i10', title: 'AI Art 10', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_01433_.png', link: '' },
      { id: 'i11', title: 'AI Art 11', desc: 'AI generated illustration', image: '制作的图片/ComfyUI_01470_.png', link: '' },
      { id: 'i12', title: 'AI Art 12', desc: 'AI generated illustration', image: '制作的图片/Echo_QuickGen_00425_.png', link: '' },
      { id: 'i13', title: 'AI Art 13', desc: 'AI generated illustration', image: '制作的图片/Echo_QuickGen_00437_.png', link: '' },
      { id: 'i14', title: 'AI Art 14', desc: 'AI generated illustration', image: '制作的图片/Echo_QuickGen_00446_.png', link: '' },
      { id: 'i15', title: 'AI Art 15', desc: 'AI generated illustration', image: '制作的图片/Echo_QuickGen_00676_.png', link: '' },
      { id: 'i16', title: 'AI Art 16', desc: 'AI generated illustration', image: '制作的图片/Echo_QuickGen_00738_.png', link: '' },
      { id: 'i17', title: 'AI Art 17', desc: 'AI generated illustration', image: '制作的图片/Echo_胡桃_00001_.png', link: '' },
      { id: 'i18', title: 'Dream Scene', desc: 'Dream weave scene', image: '制作的图片/DreamWeave_scene_0_00021_.png', link: '' },
      { id: 'i19', title: 'AI Art 19', desc: 'AI generated illustration', image: '制作的图片/dfbdf9cf-58b9-4d66-a04f-a6a955515828.png', link: '' },
      { id: 'i20', title: 'AI Art 20', desc: 'AI generated illustration', image: '制作的图片/01640-1596548715-(depth of field_1.1),bokeh,_lora_c_evernight (honkai star rail)_ilv1.0-xl_0.8_,evernight _(honkai star rail_),(evil smile_1.3),p.png', link: '' },
      { id: 'i21', title: 'AI Art 21', desc: 'AI generated illustration', image: '制作的图片/02156-4068180705-(1girl_1.2),masterpiece,best quality,ultra-detailed,8k,HDR,_perfect lighting,soft shadows,_professional photography,_absurdres,h.png', link: '' },
      { id: 'i22', title: 'AI Art 22', desc: 'AI generated illustration', image: '制作的图片/02250-1730115288-dynamic_pose,depth of field,lens flare,(artist_quasarcake_0.8),extreme aesthetic,(wlop_0.6),wanke,newest,dynamic pose,depth of f.png', link: '' },
      { id: 'i23', title: 'AI Art 23', desc: 'AI generated illustration', image: '制作的图片/02254-1730115288-dynamic_pose,depth of field,lens flare,(artist_quasarcake_0.8),extreme aesthetic,(wlop_0.6),wanke,newest,dynamic pose,depth of f.png', link: '' },
      { id: 'i24', title: 'AI Art 24', desc: 'AI generated illustration', image: '制作的图片/02267-2287222883-blood on face,nsfw,explicit,dynamic_pose,depth of field,lens flare,(artist_quasarcake_0.8),extreme aesthetic,(wlop_0.6),wanke,ne.png', link: '' },
      { id: 'i25', title: 'AI Art 25', desc: 'AI generated illustration', image: '制作的图片/03010-2089968511-perspective,fisheye lens,blurry,photo background,1girl,solo,Star firefly _(honkai_ star rail_),chromatic aberration,messy hair,w.png', link: '' },
      { id: 'i26', title: 'Scenery 01', desc: 'AI scenery illustration', image: '制作的图片/03133-1704518559-Masterpiece,best quality,amazing quality,newest,very aesthetic,absurdres,(scenery_1.4),8k,good anatomy,good shading,ultra detail.png', link: '' },
      { id: 'i27', title: 'AI Art 27', desc: 'AI generated illustration', image: '制作的图片/03161-3747631927-XUER guangying,1girl,solo,long hair,breasts,looking at viewer,bangs,skirt,simple background,hair ornament,long sleeves,navel,hol.png', link: '' },
      { id: 'i28', title: 'AI Art 28', desc: 'AI generated illustration', image: '制作的图片/03248-316585411-1girl,masterpiece,best quality,ultra-detailed,8k,HDR,_perfect lighting,soft shadows,_professional photography,_absurdres,incredi.png', link: '' },
      { id: 'i29', title: 'AI Art 29', desc: 'AI generated illustration', image: '制作的图片/03311-3478904754-_lora_长夜月-000018_0.8_,evernight _(honkai_ star rail_),red eyes,medium hair,pink hair,(1girl_1.2),masterpiece,best quality,ultra-.png', link: '' },
      { id: 'i30', title: 'AI Art 30', desc: 'AI generated illustration', image: '制作的图片/04269-1735042825-asts,cowboy shot,dutch angle,cinematic,fanshion,(vibrant color_0.3),gradient hair,abstract background,wuthering waves,clock,(qua.png', link: '' },
      { id: 'i31', title: 'AI Art 31', desc: 'AI generated illustration', image: '制作的图片/04549-861813205-flat color,no lineart,blending,negative space,_artist_[john kafka_ponsuke kaikai_hara id 21_yoneyama mai_fuzichoco],_snowman,out.png', link: '' },
      { id: 'i32', title: 'AI Art 32', desc: 'AI generated illustration', image: '制作的图片/04669-3564821686-best quality,masterpiece,absurdres,newest,__lora_FXP02_Lokr_f4-000016_0.8_,fxp02,_A dynamic fantasy illustration with a cool aes.png', link: '' },
      { id: 'i33', title: 'AI Art 33', desc: 'AI generated illustration', image: '制作的图片/04680-44981854-(artist_tianliang duohe fangdongye_0.9, artist_ciloranko, a rtist_noyu, noyu23386566,ningen mame, (artist_sho_0.826446) (sho Iwl.png', link: '' },
      { id: 'i34', title: 'AI Art 34', desc: 'AI generated illustration', image: '制作的图片/04894-763165170-mignon,chen_bin,_masterpiece,best quality,amazing quality,_jingliu (honkai_ star rail),blue hair,very long hair,hair bow,red eye.png', link: '' },
      { id: 'i35', title: 'AI Art 35', desc: 'AI generated illustration', image: '制作的图片/04998-2837965184-WJBZ,Realistic illustration,simple background,white background,_wire,dynamic composition,out-of-focus effect,artistic out-of-foc.png', link: '' },
      { id: 'i36', title: 'AI Art 36', desc: 'AI generated illustration', image: '制作的图片/05004-4098175858-WJBZ,Realistic illustration,simple background,white background,_wire,dynamic composition,out-of-focus effect,artistic out-of-foc.png', link: '' },
      { id: 'i37', title: 'AI Art 37', desc: 'AI generated illustration', image: '制作的图片/05113-4069100391-best quality,amazing quality,_lora_FXP-01R_loraplus_huber_0.8_,_lora_HerrscherAGGA2025_DMD2_Color-Recovery_V6_1_,_lora_illustrio.png', link: '' }
    ],
    video: [
      { id: 'v1', title: 'JIN PING MEI', desc: '金瓶梅', image: '', link: 'https://player.bilibili.com/player.html?isOutside=true&aid=115870483416994&bvid=BV1mB62B5EtA&cid=35302146327&p=1' }
    ],
    software: [
      { id: 's1', title: 'AI图片参数提取', desc: '从图片中提取生成参数信息', image: '', link: 'https://xinhaocai5-hue.github.io/prompt-viewer/' },
      { id: 's2', title: '织梦纺', desc: '一个支持全自动生成及对话的旮旯给木生成器', image: '', link: '制作的软件/织梦纺2.0/index.html' },
      { id: 's3', title: 'Echo', desc: '提示词及模型管理器，并附加了XL的WebUI以及提示词标签', image: '', link: '制作的软件/Echo/Echo.html' },
      { id: 's4', title: '菜包AI', desc: '支持多个API平台接入，可以做到类似于豆包的效果', image: '', link: 'https://agnes-ai-vert.vercel.app/Agnes.html' }
    ],
    social: [
      { name: '哔哩哔哩', handle: 'Bilibili', icon: 'bilibili', url: 'https://space.bilibili.com/1744859920' },
      { name: '抖音', handle: 'Douyin', icon: 'douyin', url: 'https://v.douyin.com/OVRfc54-qGk/' },
      { name: '快手', handle: 'Kuaishou', icon: 'kuaishou', url: 'https://v.kuaishou.com/KDgJedfz' },
      { name: '小红书', handle: 'Xiaohongshu', icon: 'xiaohongshu', url: 'https://www.xiaohongshu.com/user/profile/67498c900000000010003d3c' },
      { name: 'GitHub', handle: 'GitHub', icon: 'github', url: 'https://github.com/xinhaocai5-hue' }
    ],
    about: [
      {
        id: 'about',
        title: 'hello, this is creative space,',
        desc: 'creating images, videos, audio and software with AI',
        image: 'https://pic1.imgdb.cn/item/6a3983314a893629d9947cee.png',
        link: "let's make something cool with AI"
      }
    ]
  };

  /* ---------- DATA MANAGEMENT ---------- */
  function loadData() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        var parsed = JSON.parse(stored);
        return {
          illust: parsed.illust || defaultData.illust,
          video: parsed.video || defaultData.video,
          software: parsed.software || defaultData.software,
          social: parsed.social || defaultData.social,
          about: parsed.about || defaultData.about
        };
      }
    } catch (e) {
      // ignore
    }
    return JSON.parse(JSON.stringify(defaultData));
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // ignore
    }
  }

  var siteData = loadData();

  /* ---------- SMOOTH SCROLL (NO LENIS) ---------- */
  function initSmoothScroll() {
    var scrollY = window.pageYOffset;
    var targetScrollY = window.pageYOffset;
    var isScrolling = false;
    var ease = 0.14;
    var rafId = 0;
    var isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    // Expose reset function for use when closing overlay pages
    window._resetSmoothScroll = function () {
      scrollY = window.pageYOffset;
      targetScrollY = window.pageYOffset;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
        isScrolling = false;
      }
    };

    function updateScroll() {
      var diff = targetScrollY - scrollY;
      if (Math.abs(diff) > 0.5) {
        scrollY += diff * ease;
        window.scrollTo(0, Math.round(scrollY));
        rafId = requestAnimationFrame(updateScroll);
      } else {
        scrollY = targetScrollY;
        window.scrollTo(0, Math.round(scrollY));
        isScrolling = false;
        rafId = 0;
      }
    }

    function startScroll() {
      if (!isScrolling) {
        isScrolling = true;
        rafId = requestAnimationFrame(updateScroll);
      }
    }

    // Ease-in-out-cubic for anchor navigation: accelerate then decelerate
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateAnchorScroll(targetY, duration) {
      duration = duration || 900;
      var startY = window.pageYOffset;
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      var endY = Math.max(0, Math.min(targetY, maxScroll));
      var startTime = performance.now();

      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
        isScrolling = false;
      }

      function tick(now) {
        var elapsed = now - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = easeInOutCubic(progress);
        var currentY = startY + (endY - startY) * eased;
        scrollY = currentY;
        window.scrollTo(0, Math.round(currentY));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          targetScrollY = endY;
          isScrolling = false;
          rafId = 0;
        }
      }

      isScrolling = true;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('wheel', function (e) {
      e.preventDefault();
      targetScrollY += e.deltaY;
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
      startScroll();
    }, { passive: false });

    // Keyboard scroll support
    window.addEventListener('keydown', function (e) {
      var delta = 0;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') delta = 120;
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') delta = -120;
      else if (e.key === 'Home') { targetScrollY = 0; startScroll(); return; }
      else if (e.key === 'End') { targetScrollY = document.documentElement.scrollHeight - window.innerHeight; startScroll(); return; }
      else return;
      e.preventDefault();
      targetScrollY += delta;
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
      startScroll();
    });

    // Sync with external scroll changes (scrollbar drag, GSAP, etc.)
    // Use position-based diff instead of a flag: if the actual scroll position
    // differs from our expected scrollY by more than 2px, it's an external change.
    // This avoids the async scroll-event timing bug where a synchronous flag
    // (isWheelScrolling) was already false when the scroll event fired, causing
    // the animation to be cancelled after just one frame.
    window.addEventListener('scroll', function () {
      var actualY = window.pageYOffset;
      if (Math.abs(actualY - scrollY) > 2) {
        targetScrollY = actualY;
        scrollY = actualY;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
          isScrolling = false;
        }
      }
    });

    // Click-based smooth scroll for anchor links
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        var id = link.getAttribute('href').substring(1);
        var el = document.getElementById(id);
        if (el) {
          animateAnchorScroll(el.offsetTop, 900);
        }
      }
    });
  }

  /* ---------- LOADER ---------- */
  function runLoader() {
    return new Promise(function (resolve) {
      var green = document.querySelector('.loader-green');
      var black = document.querySelector('.loader-black');
      var bar = document.getElementById('loaderBarFill');
      var num = document.getElementById('loaderNum');
      var loader = document.getElementById('loader');

      if (!green || !black || !loader) {
        document.body.classList.remove('loading');
        resolve();
        return;
      }

      // Phase 1: Green slides in
      gsap.to(green, { x: '0%', duration: 0.6, ease: 'expo.inOut' });
      // Phase 2: Black slides in
      gsap.to(black, { x: '0%', duration: 0.6, delay: 0.3, ease: 'expo.inOut' });

      // Phase 3: Progress counter
      var start = performance.now();
      var dur = 1800;

      function tick(now) {
        var p = Math.min(1, (now - start) / dur);
        var progress = Math.floor(p * 100);
        if (bar) bar.style.width = progress + '%';
        if (num) num.textContent = String(progress).padStart(2, '0');
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          // Phase 4: Fade out all content, then slide out panels
          gsap.to('.loader-center, .loader-grid, .loader-deco, .loader-bracket, .loader-ring, .loader-scan, .loader-bar', { opacity: 0, duration: 0.3 });
          gsap.to(black, { x: '101%', duration: 0.5, delay: 0.2, ease: 'expo.inOut' });
          gsap.to(green, {
            x: '101%', duration: 0.5, delay: 0.4, ease: 'expo.inOut',
            onComplete: function () {
              loader.style.display = 'none';
              document.body.classList.remove('loading');
              resolve();
            }
          });
        }
      }

      requestAnimationFrame(tick);
    });
  }

  /* ---------- CUSTOM CURSOR ---------- */
  function initCursor() {
    // Custom cursor disabled - using system default
    var cursor = document.getElementById('cursor');
    if (cursor) cursor.style.display = 'none';
    return;
  }

  /* ---------- NAV ---------- */
  var navEl = null;
  var navLinksEl = null;

  function initNav() {
    navEl = document.getElementById('nav');
    navLinksEl = document.getElementById('navLinks');

    // Build nav links
    if (navLinksEl) {
      var links = [
        { href: '#hero', zh: '主页', en: 'home' },
        { href: '#skills', zh: '会做什么', en: 'skills' },
        { href: '#illustrations', zh: '图片', en: 'photos' },
        { href: '#videos', zh: '视频', en: 'videos' },
        { href: '#software', zh: '软件', en: 'software' },
        { href: '#contact', zh: '联系', en: 'contact' }
      ];
      var frag = document.createDocumentFragment();
      links.forEach(function (l) {
        var a = document.createElement('a');
        a.href = l.href;
        a.className = 'nav-link';
        a.setAttribute('data-zh', l.zh);
        a.setAttribute('data-en', l.en);
        a.textContent = currentLang === 'zh' ? l.zh : l.en;
        frag.appendChild(a);
      });
      navLinksEl.appendChild(frag);
    }

    // Scroll behavior
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var st = window.pageYOffset;
      if (navEl) {
        if (st > 80) {
          navEl.classList.add('scrolled');
        } else {
          navEl.classList.remove('scrolled');
        }
      }
      lastScroll = st;
    });

    // Active link on scroll
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
      var scrollPos = window.pageYOffset + 200;
      sections.forEach(function (sec) {
        var top = sec.offsetTop;
        var height = sec.offsetHeight;
        var id = sec.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-link').forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
          // Update menu items
          document.querySelectorAll('.menu-item').forEach(function (item) {
            item.classList.remove('menu-item--active');
            if (item.getAttribute('href') === '#' + id) {
              item.classList.add('menu-item--active');
            }
          });
        }
      });
    });
  }

  /* ---------- FULLSCREEN MENU ---------- */
  function initMenu() {
    var overlay = document.getElementById('menuOverlay');
    var menuBtn = document.getElementById('menuBtn');
    var menuClose = document.getElementById('menuClose');
    var items = document.querySelectorAll('.menu-item');
    var open = false;

    if (!overlay || !menuBtn) return;

    function openMenu() {
      open = true;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      menuBtn.classList.add('active');

      gsap.fromTo(items, { y: 80, opacity: 0, rotateY: -10, scale: 0.95 }, {
        y: 0, opacity: 1, rotateY: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: 'elastic.out(1, 0.75)', delay: 0.2
      });
      gsap.fromTo('.menu-contact', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, delay: 0.6
      });
      gsap.fromTo('.menu-links', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, delay: 0.7
      });
    }

    function closeMenu() {
      open = false;
      gsap.to(items, { y: -40, opacity: 0, rotateY: 10, scale: 0.95, stagger: 0.05, duration: 0.3, ease: 'power2.in' });
      gsap.to('.menu-contact', { opacity: 0, duration: 0.2 });
      gsap.to('.menu-links', {
        opacity: 0, duration: 0.2,
        onComplete: function () {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
          menuBtn.classList.remove('active');
          // Reset items
          gsap.set(items, { rotateY: 0, scale: 1 });
          // Reset smooth scroll state to prevent nav from scrolling
          if (window._resetSmoothScroll) window._resetSmoothScroll();
        }
      });
    }

    menuBtn.addEventListener('click', function () {
      if (open) closeMenu(); else openMenu();
    });

    if (menuClose) {
      menuClose.addEventListener('click', closeMenu);
    }

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        closeMenu();
        setTimeout(function () {
          var target = item.getAttribute('href').substring(1);
          // Use page transition for photos page
          if (target === 'illustrations') {
            pageTransition(function () { openPhotosPage(); });
            return;
          }
          // Use page transition for videos page
          if (target === 'videos') {
            pageTransition(function () { openVideosPage(); });
            return;
          }
          // Use page transition for home (close photos if open)
          if (target === 'hero') {
            var photosPage = document.getElementById('photosPage');
            var videosPage = document.getElementById('videosPage');
            if ((photosPage && photosPage.classList.contains('active')) || (videosPage && videosPage.classList.contains('active'))) {
              pageTransition(function () {
                closePhotosPage();
                closeVideosPage();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              });
              return;
            }
          }
          var el = document.getElementById(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      });
    });
  }

  /* ---------- SCROLL PROGRESS ---------- */
  function initScrollProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    // Section reveal
    var sections = document.querySelectorAll('[data-reveal-section]');
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(function (sec) {
      sectionObserver.observe(sec);
    });

    // Element reveal
    var reveals = document.querySelectorAll('[data-reveal]');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
          setTimeout(function () {
            // Clear any inline opacity/transform set by GSAP gsap.from() that
            // ScrollTrigger may have failed to animate (custom smooth scroll issue)
            entry.target.style.opacity = '';
            entry.target.style.transform = '';
            entry.target.classList.add('revealed');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- GSAP SCROLLTRIGGER ANIMATIONS ---------- */
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero title reveal on load (handled by reveal system, but ensure it triggers)
    var heroLines = document.querySelectorAll('.hero-line');
    heroLines.forEach(function (line, i) {
      var inner = line.querySelector('.hero-line-inner');
      if (inner) {
        gsap.to(inner, {
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.8 + i * 0.15,
          onComplete: function () {
            line.classList.add('revealed');
          }
        });
      }
    });

    // Hero tag and foot
    var heroTag = document.querySelector('.hero-tag');
    var heroFoot = document.querySelector('.hero-foot');
    if (heroTag) {
      gsap.fromTo(heroTag, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'elastic.out(1, 0.75)' });
    }
    if (heroFoot) {
      gsap.fromTo(heroFoot, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 1.4, ease: 'elastic.out(1, 0.75)' });
    }

    // Statement parallax
    // Statement lines — handled by CSS + IntersectionObserver (data-reveal="word")
    // GSAP gsap.from() was previously used here but set inline opacity:0 that
    // ScrollTrigger (with custom smooth scroll) failed to clear, leaving text
    // permanently invisible. Same bug as skill-card.

    // Portfolio title wave
    var ptitleText = document.querySelector('.ptitle-text');
    if (ptitleText) {
      var text = ptitleText.textContent;
      ptitleText.innerHTML = '';
      text.split('').forEach(function (char, i) {
        var span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = (i * 0.08) + 's';
        ptitleText.appendChild(span);
      });

      ScrollTrigger.create({
        trigger: ptitleText,
        start: 'top 80%',
        onEnter: function () {
          gsap.from(ptitleText.querySelectorAll('.char'), {
            y: 60,
            opacity: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: 'back.out(1.7)'
          });
        },
        once: true
      });
    }

    // Skill cards 3D entrance — handled by CSS + IntersectionObserver (data-reveal="skill-3d")
    // GSAP gsap.from() was previously used here but set inline opacity:0 that
    // ScrollTrigger (with custom smooth scroll) failed to clear, leaving cards
    // permanently invisible. The CSS reveal system handles this correctly.

    // Section lines scale
    gsap.utils.toArray('.section-line').forEach(function (line) {
      gsap.to(line, {
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        scaleX: 1,
        duration: 0.8,
        ease: 'expo.inOut'
      });
    });

    // ===== SCROLL-DRIVEN ANIMATIONS (scrub) =====
    // These animations continuously respond to scroll position, not just one-time.

    // 1. Hero parallax: title moves slower than content as you scroll
    var heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      gsap.to(heroTitle, {
        y: -120,
        opacity: 0.3,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // 2. Hero decorations parallax
    var heroDeco = document.querySelector('.hero-deco');
    if (heroDeco) {
      gsap.to(heroDeco, {
        y: -60,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // 3. Section watermarks drift as you scroll through each section
    gsap.utils.toArray('.deco-watermark').forEach(function (wm) {
      gsap.to(wm, {
        y: -80,
        scrollTrigger: {
          trigger: wm.closest('section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    });

    // 4. Section deco shapes subtle parallax
    gsap.utils.toArray('.section-deco').forEach(function (deco) {
      var shapes = deco.querySelectorAll('.deco-shape');
      shapes.forEach(function (shape, i) {
        var speed = (i % 2 === 0) ? 30 : -20;
        gsap.to(shape, {
          y: speed,
          scrollTrigger: {
            trigger: deco.closest('section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      });
    });

    // 5. Statement text scales and shifts with scroll
    gsap.utils.toArray('.statement-item').forEach(function (item, i) {
      gsap.fromTo(item,
        { scale: 0.85, opacity: 0.5 },
        {
          scale: 1, opacity: 1,
          scrollTrigger: {
            trigger: '.statement',
            start: 'top 80%',
            end: 'center center',
            scrub: 1
          }
        }
      );
    });

    // 6. About portrait parallax
    var portrait = document.querySelector('.about-portrait');
    if (portrait) {
      gsap.to(portrait, {
        y: -40,
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    }

    // 7. Skills keywords subtle drift
    gsap.utils.toArray('.kw').forEach(function (kw, i) {
      gsap.to(kw, {
        y: (i % 2 === 0) ? -8 : 8,
        scrollTrigger: {
          trigger: kw.closest('.skills'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    });

    // 8. Vision marquee speed responds to scroll
    var visionTrack = document.querySelector('.vision-track');
    if (visionTrack) {
      gsap.to(visionTrack, {
        x: -100,
        scrollTrigger: {
          trigger: '.vision',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    }

    // 9. Contact title grows as you approach it
    var contactTitle = document.querySelector('.contact-title');
    if (contactTitle) {
      gsap.fromTo(contactTitle,
        { scale: 0.9 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: '.contact',
            start: 'top 90%',
            end: 'center center',
            scrub: 1.5
          }
        }
      );
    }
  }

  /* ---------- 3D TILT ON SKILL CARDS ---------- */
  /* Removed: skill cards replaced by paragraph layout */
  function init3DTilt() {}

  /* ---------- MAGNETIC BUTTONS ---------- */
  function initMagneticButtons() {
    var buttons = document.querySelectorAll('.nav-pill, .view-more');

    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      });

      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  /* ---------- RENDER ILLUSTRATIONS ---------- */
  function renderIllust() {
    var trackTop = document.getElementById('illustTrackTop');
    var trackBottom = document.getElementById('illustTrackBottom');
    var viewMoreBtn = document.getElementById('illustViewMore');
    if (!trackTop || !trackBottom) return;

    var items = siteData.illust;
    if (items.length === 0) return;

    // Split items into two rows
    var topItems = [];
    var bottomItems = [];
    items.forEach(function(item, i) {
      if (i % 2 === 0) topItems.push(item);
      else bottomItems.push(item);
    });

    // Build card HTML for a set of items (duplicated enough to fill viewport seamlessly)
    function buildTrackHTML(itemList, direction) {
      var html = '';
      var singleCycle = '';
      itemList.forEach(function(item) {
        var imgSrc = item.image || '';
        if (imgSrc) {
          singleCycle += '<div class="illust-marquee-card" data-id="' + item.id + '" role="button" tabindex="0" aria-label="' + item.title + '">' +
            '<img class="illust-marquee-card-img" src="' + imgSrc + '" alt="' + item.title + '" loading="lazy">' +
            '<div class="illust-marquee-card-overlay"><span class="illust-marquee-card-title">' + item.title + '</span></div>' +
            '<div class="film-watermark">ARTWORK</div>' +
            '<button class="illust-marquee-card-edit" data-id="' + item.id + '" data-type="illust" aria-label="Edit ' + item.title + '">E</button>' +
          '</div>';
        } else {
          singleCycle += '<div class="illust-marquee-card" data-id="' + item.id + '" role="button" tabindex="0" aria-label="' + item.title + '">' +
            '<div class="illust-marquee-card-img" style="display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--muted);">' + item.title + '</div>' +
            '<div class="illust-marquee-card-overlay"><span class="illust-marquee-card-title">' + item.title + '</span></div>' +
            '<div class="film-watermark">ARTWORK</div>' +
            '<button class="illust-marquee-card-edit" data-id="' + item.id + '" data-type="illust" aria-label="Edit ' + item.title + '">E</button>' +
          '</div>';
        }
      });

      // Duplicate enough times to cover at least 2x viewport width for seamless loop
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1280;
      var cardWidth = 240; // film frame width, no gap
      var cycleCount = 2;
      if (itemList.length > 0) {
        cycleCount = Math.max(2, Math.ceil((viewportWidth * 2) / (itemList.length * cardWidth)));
      }
      for (var d = 0; d < cycleCount; d++) {
        html += singleCycle;
      }
      return html;
    }

    trackTop.innerHTML = buildTrackHTML(topItems, 'left');
    trackBottom.innerHTML = buildTrackHTML(bottomItems, 'right');

    // Bind click events
    function bindCardEvents(track) {
      track.querySelectorAll('.illust-marquee-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
          if (e.target.closest('.illust-marquee-card-edit')) return;
          var id = card.getAttribute('data-id');
          openLightbox('illust', id);
        });
        var editBtn = card.querySelector('.illust-marquee-card-edit');
        if (editBtn) {
          editBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            window._openEditModal('illust', editBtn.dataset.id);
          });
        }
      });
    }

    bindCardEvents(trackTop);
    bindCardEvents(trackBottom);

    // View more button
    if (viewMoreBtn) {
      viewMoreBtn.textContent = currentLang === 'zh' ? '查看全部' : 'view all';
    }

    initLazyLoad();
  }

  /* ---------- RENDER VIDEOS ---------- */
  function renderVideos() {
    var list = document.getElementById('videoList');
    var more = document.getElementById('videoMore');
    var viewMoreBtn = document.getElementById('videoViewMore');
    if (!list) return;

    var items = siteData.video;
    var visibleCount = 3;
    var visible = items.slice(0, visibleCount);
    var hidden = items.slice(visibleCount);

    var frag = document.createDocumentFragment();
    visible.forEach(function (item) {
      frag.appendChild(createVideoCard(item));
    });
    list.innerHTML = '';
    list.appendChild(frag);

    if (more) {
      more.innerHTML = '';
      if (videoExpanded && hidden.length > 0) {
        var moreFrag = document.createDocumentFragment();
        hidden.forEach(function (item) {
          moreFrag.appendChild(createVideoCard(item));
        });
        more.appendChild(moreFrag);
        more.style.display = 'flex';
      } else {
        more.style.display = 'none';
      }
    }

    if (viewMoreBtn) {
      if (hidden.length === 0) {
        viewMoreBtn.classList.add('hidden');
      } else {
        viewMoreBtn.classList.remove('hidden');
        viewMoreBtn.textContent = videoExpanded
          ? (currentLang === 'zh' ? '收起' : 'collapse')
          : (currentLang === 'zh' ? '查看全部' : 'view all');
      }
    }

    initLazyLoad();
  }

  function createVideoCard(item) {
    var card = document.createElement('div');
    card.className = 'video-link';
    card.setAttribute('data-id', item.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', item.title);

    var arrowSVG = '<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="13,6 19,12 13,18"></polyline></svg>';
    var idx = siteData.video.indexOf(item);
    var num = String(idx + 1).padStart(2, '0');

    card.innerHTML =
      '<span class="video-link-num">' + num + '</span>' +
      '<div class="video-link-thumb">' +
        (item.image
          ? '<img src="' + item.image + '" alt="' + item.title + '" loading="lazy">'
          : '<div class="video-link-thumb-placeholder">' + item.title.charAt(0) + '</div>') +
        '<div class="video-link-play"><div class="video-link-play-icon"></div></div>' +
      '</div>' +
      '<div class="video-link-info">' +
        '<h3 class="video-link-title">' + item.title + '</h3>' +
        '<p class="video-link-desc">' + (item.desc || '') + '</p>' +
      '</div>' +
      '<span class="video-link-arrow">' + arrowSVG + '</span>' +
      '<button class="video-link-edit" data-id="' + item.id + '" data-type="video" aria-label="Edit ' + item.title + '">E</button>';

    card.addEventListener('click', function (e) {
      if (e.target.closest('.video-link-edit')) return;
      openLightbox('video', item.id);
    });

    var editBtn = card.querySelector('.video-link-edit');
    if (editBtn) {
      editBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        window._openEditModal('video', item.id);
      });
    }

    return card;
  }

  /* ---------- RENDER SOFTWARE ---------- */
  function renderSoftware() {
    var grid = document.getElementById('softGrid');
    var more = document.getElementById('softMore');
    var viewMoreBtn = document.getElementById('softViewMore');
    if (!grid) return;

    var items = siteData.software;
    var visibleCount = 4;
    var visible = items.slice(0, visibleCount);
    var hidden = items.slice(visibleCount);

    var frag = document.createDocumentFragment();
    visible.forEach(function (item) {
      frag.appendChild(createSoftCard(item));
    });
    grid.innerHTML = '';
    grid.appendChild(frag);

    if (more) {
      more.innerHTML = '';
      if (softExpanded && hidden.length > 0) {
        var moreFrag = document.createDocumentFragment();
        hidden.forEach(function (item) {
          moreFrag.appendChild(createSoftCard(item));
        });
        more.appendChild(moreFrag);
        more.style.display = 'grid';
      } else {
        more.style.display = 'none';
      }
    }

    if (viewMoreBtn) {
      if (hidden.length === 0) {
        viewMoreBtn.classList.add('hidden');
      } else {
        viewMoreBtn.classList.remove('hidden');
        viewMoreBtn.textContent = softExpanded
          ? (currentLang === 'zh' ? '收起' : 'collapse')
          : (currentLang === 'zh' ? '查看全部' : 'view all');
      }
    }
  }

  function createSoftCard(item) {
    var card = document.createElement('a');
    card.className = 'soft-card';
    card.setAttribute('data-id', item.id);
    if (item.link) {
      card.href = item.link;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    } else {
      card.setAttribute('role', 'button');
    }
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', item.title);

    card.innerHTML =
      '<div class="soft-card-icon">' + item.title.charAt(0) + '</div>' +
      '<h3 class="soft-card-title">' + item.title + '</h3>' +
      '<p class="soft-card-desc">' + (item.desc || '') + '</p>' +
      '<button class="soft-card-edit" data-id="' + item.id + '" data-type="software" aria-label="Edit ' + item.title + '">E</button>';

    var editBtn = card.querySelector('.soft-card-edit');
    if (editBtn) {
      editBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window._openEditModal('software', item.id);
      });
    }

    return card;
  }

  /* ---------- RENDER SOCIAL ---------- */
  var socialIcons = {
    bilibili: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44h4.96l1.707-1.707c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zm2.347 3.84c.356 0 .658.124.907.373s.373.551.373.907v1.173c0 .356-.124.658-.373.907s-.551.373-.907.373-.658-.124-.907-.373-.373-.551-.373-.907v-1.173c0-.356.124-.658.373-.907s.551-.373.907-.373zm8.64 0c.356 0 .658.124.907.373s.373.551.373.907v1.173c0 .356-.124.658-.373.907s-.551.373-.907.373-.658-.124-.907-.373-.373-.551-.373-.907v-1.173c0-.356.124-.658.373-.907s.551-.373.907-.373z"/></svg>',
    douyin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.57-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.06.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.07.02-12.1z"/></svg>',
    kuaishou: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 6.5l4.5 3-4.5 3v-6z"/><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    xiaohongshu: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm2 4v8h2v-3l2 3h2.5l-2.5-3.5L12.5 8H10l-2 2.5V8H6zm8 0v8h2v-3h1l1.5 3H21l-1.8-3.6c.8-.4 1.3-1.2 1.3-2.2 0-1.4-1.1-2.2-2.8-2.2H14zm2 1.5h1c.6 0 1 .3 1 .8s-.4.8-1 .8h-1v-1.6z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>'
  };

  function renderSocial() {
    var grid = document.getElementById('socialGrid');
    if (!grid) return;

    var frag = document.createDocumentFragment();
    siteData.social.forEach(function (s) {
      var link = document.createElement('a');
      link.className = 'contact-card';
      link.href = s.url || '#';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      var iconSVG = socialIcons[s.icon] || '';
      link.innerHTML =
        '<span class="contact-card-icon">' + iconSVG + '</span>' +
        '<div class="contact-card-info">' +
          '<span class="contact-card-name">' + s.name + '</span>' +
          '<span class="contact-card-handle">' + s.handle + '</span>' +
        '</div>';
      frag.appendChild(link);
    });
    grid.innerHTML = '';
    grid.appendChild(frag);
  }

  /* ---------- RENDER ABOUT ---------- */
  function renderAbout() {
    var portraitImg = document.querySelector('.portrait-img');
    var portraitPlaceholder = document.querySelector('.portrait-placeholder');
    var line1 = document.getElementById('aboutLine1');
    var line2 = document.getElementById('aboutLine2');
    var line3 = document.getElementById('aboutLine3');
    var editBtn = document.getElementById('aboutEditBtn');

    var data = (siteData.about && siteData.about[0]) || defaultData.about[0];

    // Portrait image
    var portraitPhoto = document.querySelector('.portrait-photo');
    if (data.image) {
      if (portraitPhoto) {
        portraitPhoto.src = data.image;
        portraitPhoto.style.display = 'block';
      }
      if (portraitPlaceholder) portraitPlaceholder.style.display = 'none';
    } else {
      if (portraitPhoto) {
        portraitPhoto.src = '';
        portraitPhoto.style.display = 'none';
      }
      if (portraitPlaceholder) portraitPlaceholder.style.display = '';
    }

    // Text lines - support both zh and en
    var zhTexts = {
      'hello, this is creative space,': '你好,这里是创意空间,',
      'creating images, videos, audio and software with AI': '用 AI 创作图片、视频、音频和软件',
      "let's make something cool with AI": '让我们用AI做点cool的事'
    };
    var enTexts = {
      'hello, this is creative space,': 'hello, this is creative space,',
      'creating images, videos, audio and software with AI': 'creating images, videos, audio and software with AI',
      "let's make something cool with AI": "let's make something cool with AI"
    };

    if (line1) {
      var t1 = data.title || '';
      line1.textContent = currentLang === 'zh' ? (zhTexts[t1] || t1) : (enTexts[t1] || t1);
      line1.setAttribute('data-zh', zhTexts[t1] || t1);
      line1.setAttribute('data-en', enTexts[t1] || t1);
    }
    if (line2) {
      var t2 = data.desc || '';
      line2.textContent = currentLang === 'zh' ? (zhTexts[t2] || t2) : (enTexts[t2] || t2);
      line2.setAttribute('data-zh', zhTexts[t2] || t2);
      line2.setAttribute('data-en', enTexts[t2] || t2);
    }
    if (line3) {
      var t3 = data.link || '';
      line3.textContent = currentLang === 'zh' ? (zhTexts[t3] || t3) : (enTexts[t3] || t3);
      line3.setAttribute('data-zh', zhTexts[t3] || t3);
      line3.setAttribute('data-en', enTexts[t3] || t3);
    }

    // Edit button visibility
    if (editBtn) {
      editBtn.style.display = isEditMode ? 'flex' : 'none';
      editBtn.onclick = function (e) {
        e.stopPropagation();
        window._openEditModal('about', 'about');
      };
    }
  }

  /* ---------- VIEW MORE BUTTONS ---------- */
  function initViewMore() {
    var illustBtn = document.getElementById('illustViewMore');
    var videoBtn = document.getElementById('videoViewMore');
    var softBtn = document.getElementById('softViewMore');

    if (illustBtn) {
      illustBtn.addEventListener('click', function () {
        pageTransition(function () { openPhotosPage(); });
      });
    }

    if (videoBtn) {
      videoBtn.addEventListener('click', function () {
        videoExpanded = !videoExpanded;
        renderVideos();
      });
    }

    if (softBtn) {
      softBtn.addEventListener('click', function () {
        softExpanded = !softExpanded;
        renderSoftware();
      });
    }
  }

  /* ---------- PHYSICS MARQUEE DRAG ---------- */
  function initMarqueeDrag() {
    var rows = document.querySelectorAll('.illust-track-row');

    rows.forEach(function(row) {
      var inner = row.querySelector('.illust-track-inner');
      if (!inner) return;

      var isDragging = false;
      var startX = 0;
      var currentX = 0;
      var velocity = 0;
      var lastX = 0;
      var lastTime = 0;
      var position = 0;
      var baseSpeed = 0.4; // 自动滚动基础速度 (px/frame)
      var direction = row.classList.contains('illust-track-bottom') ? 1 : -1;
      var rafId = null;
      var autoPaused = false;
      var singleWidth = 0;

      function getSingleWidth() {
        var cards = inner.querySelectorAll('.illust-marquee-card');
        if (cards.length === 0) return 0;
        var first = cards[0];
        var style = window.getComputedStyle(first);
        return first.offsetWidth + parseFloat(style.marginRight || 0) + parseFloat(style.marginLeft || 0) + 16; // 16 = gap
      }

      function updatePosition() {
        var cards = inner.querySelectorAll('.illust-marquee-card');
        var totalCards = cards.length;
        if (totalCards === 0) return;

        // Use half width as loop period (because we duplicated cycles)
        var loopWidth = inner.scrollWidth / 2;
        if (loopWidth <= 0) return;

        // Wrap position
        while (position > 0) position -= loopWidth;
        while (position < -loopWidth) position += loopWidth;

        inner.style.transform = 'translateX(' + position + 'px)';
      }

      function animate() {
        if (!isDragging && !autoPaused) {
          position += baseSpeed * direction;
        } else if (!isDragging) {
          // Inertia after drag release
          position += velocity;
          velocity *= 0.95; // friction
          if (Math.abs(velocity) < 0.1) {
            velocity = 0;
            autoPaused = false;
          }
        }
        updatePosition();
        rafId = requestAnimationFrame(animate);
      }

      function onPointerDown(e) {
        // Only left click / touch
        if (e.type === 'mousedown' && e.button !== 0) return;
        e.preventDefault();
        isDragging = true;
        autoPaused = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX);
        currentX = startX;
        lastX = startX;
        lastTime = Date.now();
        velocity = 0;
        row.classList.add('is-dragging');
        inner.style.transition = 'none';
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        var clientX = e.clientX || (e.touches && e.touches[0].clientX);
        var delta = clientX - currentX;
        position += delta;
        currentX = clientX;

        var now = Date.now();
        var dt = now - lastTime;
        if (dt > 0) {
          velocity = (clientX - lastX) / dt * 16; // convert to px/frame
          lastX = clientX;
          lastTime = now;
        }
        updatePosition();
      }

      function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;
        row.classList.remove('is-dragging');
        // Inertia will take over in animate loop
      }

      row.addEventListener('mousedown', onPointerDown);
      row.addEventListener('touchstart', onPointerDown, { passive: false });

      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('touchmove', onPointerMove, { passive: false });

      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchend', onPointerUp);

      // Hover pauses auto-scroll
      row.addEventListener('mouseenter', function() {
        if (!isDragging) autoPaused = true;
      });
      row.addEventListener('mouseleave', function() {
        if (!isDragging) autoPaused = false;
      });

      // Start loop
      updatePosition();
      rafId = requestAnimationFrame(animate);
    });
  }

  /* ---------- LIGHTBOX ---------- */
  function openLightbox(type, id) {
    var lightbox = document.getElementById('lightbox');
    var body = document.getElementById('lightboxBody');
    var counter = document.getElementById('lightboxCounter');
    var prevBtn = document.getElementById('lightboxPrev');
    var nextBtn = document.getElementById('lightboxNext');
    if (!lightbox || !body) return;

    // Build items list
    lightboxItems = [];
    if (type === 'illust') {
      siteData.illust.forEach(function (item) {
        lightboxItems.push({ type: 'image', src: item.image, title: item.title });
      });
    } else if (type === 'video') {
      siteData.video.forEach(function (item) {
        lightboxItems.push({ type: 'video', src: item.link, title: item.title, image: item.image });
      });
    }

    // Find index
    var items = type === 'illust' ? siteData.illust : siteData.video;
    lightboxIndex = items.findIndex(function (item) { return item.id === id; });
    if (lightboxIndex < 0) lightboxIndex = 0;

    showLightboxItem();

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Nav visibility
    if (prevBtn) prevBtn.style.display = lightboxItems.length > 1 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = lightboxItems.length > 1 ? 'flex' : 'none';
  }

  function showLightboxItem() {
    var body = document.getElementById('lightboxBody');
    var counter = document.getElementById('lightboxCounter');
    if (!body || !lightboxItems.length) return;

    var item = lightboxItems[lightboxIndex];
    body.innerHTML = '';

    if (item.type === 'image' && item.src) {
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.title;
      body.appendChild(img);
    } else if (item.type === 'video' && item.src) {
      var iframe = document.createElement('iframe');
      iframe.src = item.src;
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('border', '0');
      iframe.setAttribute('frameborder', 'no');
      iframe.setAttribute('framespacing', '0');
      iframe.setAttribute('allowfullscreen', 'true');
      body.appendChild(iframe);
    } else {
      body.innerHTML = '<p style="color:var(--muted);font-size:14px;">' + (item.title || 'No preview') + '</p>';
    }

    if (counter) {
      counter.textContent = (lightboxIndex + 1) + ' / ' + lightboxItems.length;
    }
  }

  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function initLightbox() {
    var closeBtn = document.getElementById('lightboxClose');
    var backdrop = document.getElementById('lightboxBackdrop');
    var prevBtn = document.getElementById('lightboxPrev');
    var nextBtn = document.getElementById('lightboxNext');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
        showLightboxItem();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
        showLightboxItem();
      });
    }

    document.addEventListener('keydown', function (e) {
      var lightbox = document.getElementById('lightbox');
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });
  }

  /* ---------- EDIT SYSTEM (ENHANCED) ---------- */
  var currentEditTab = 'illust';
  var pendingDeleteId = null;
  var pendingDeleteType = null;

  function initEditSystem() {
    var editToggle = document.getElementById('editToggle');
    var editModal = document.getElementById('editModal');
    var editModalClose = document.getElementById('editModalClose');
    var editModalBackdrop = document.getElementById('editModalBackdrop');
    var editForm = document.getElementById('editForm');
    var editDelete = document.getElementById('editDelete');
    var editCancel = document.getElementById('editCancel');
    var editConfirm = document.getElementById('editConfirm');
    var editConfirmYes = document.getElementById('editConfirmYes');
    var editConfirmNo = document.getElementById('editConfirmNo');
    var editTabs = document.getElementById('editTabs');
    var editList = document.getElementById('editList');
    var editFormWrap = document.getElementById('editFormWrap');
    var passwordModal = document.getElementById('passwordModal');
    var passwordModalClose = document.getElementById('passwordModalClose');
    var passwordModalBackdrop = document.getElementById('passwordModalBackdrop');
    var passwordForm = document.getElementById('passwordForm');
    var passwordInput = document.getElementById('passwordInput');

    if (!editToggle) return;

    // Edit toggle
    editToggle.addEventListener('click', function () {
      if (!isAuthenticated) {
        openPasswordModal();
        return;
      }
      isEditMode = !isEditMode;
      document.body.classList.toggle('edit-mode', isEditMode);
      var span = editToggle.querySelector('span:last-child');
      if (span) {
        span.textContent = isEditMode
          ? (currentLang === 'zh' ? '退出编辑' : 'exit edit')
          : (currentLang === 'zh' ? '编辑' : 'edit');
      }
      renderAbout();
    });

    // Password modal
    function openPasswordModal() {
      if (passwordModal) {
        passwordModal.classList.add('active');
        if (passwordInput) passwordInput.value = '';
        if (passwordInput) passwordInput.focus();
      }
    }

    function closePasswordModal() {
      if (passwordModal) passwordModal.classList.remove('active');
    }

    if (passwordModalClose) passwordModalClose.addEventListener('click', closePasswordModal);
    if (passwordModalBackdrop) passwordModalBackdrop.addEventListener('click', closePasswordModal);

    if (passwordForm) {
      passwordForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var pwd = passwordInput ? passwordInput.value : '';
        if (pwd === PASSWORD) {
          isAuthenticated = true;
          isEditMode = true;
          document.body.classList.add('edit-mode');
          closePasswordModal();
          var span = editToggle.querySelector('span:last-child');
          if (span) {
            span.textContent = currentLang === 'zh' ? '退出编辑' : 'exit edit';
          }
          showToast(currentLang === 'zh' ? '编辑模式已开启' : 'Edit mode enabled');
          renderAbout();
        } else {
          showToast(currentLang === 'zh' ? '密码错误' : 'Wrong password');
        }
      });
    }

    // Tab switching
    if (editTabs) {
      editTabs.querySelectorAll('.edit-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
          currentEditTab = tab.dataset.tab;
          editTabs.querySelectorAll('.edit-tab').forEach(function(t) { t.classList.remove('active'); });
          tab.classList.add('active');
          renderEditList();
          resetEditForm();
          showFormFieldsForType(currentEditTab);
        });
      });
    }

    // Render item list for current tab
    function renderEditList() {
      if (!editList) return;
      var items = getItemsByType(currentEditTab);
      var html = '';
      items.forEach(function(item, idx) {
        var thumb = '';
        if (currentEditTab === 'illust' && item.image) {
          thumb = '<img class="edit-list-thumb" src="' + item.image + '" alt="">';
        } else if (currentEditTab === 'about' && item.image) {
          thumb = '<img class="edit-list-thumb" src="' + item.image + '" alt="">';
        } else if (currentEditTab === 'social') {
          thumb = '<div class="edit-list-thumb-placeholder">' + (item.icon || item.name.charAt(0)) + '</div>';
        } else {
          thumb = '<div class="edit-list-thumb-placeholder">' + (item.title || 'A').charAt(0) + '</div>';
        }
        var sub = '';
        if (currentEditTab === 'social') {
          sub = item.handle || '';
        } else if (currentEditTab === 'about') {
          sub = item.desc || '';
        } else {
          sub = item.desc || item.tag || '';
        }
        html += '<div class="edit-list-item" draggable="true" data-id="' + item.id + '" data-idx="' + idx + '">' +
          '<span class="edit-list-drag">::</span>' +
          thumb +
          '<div class="edit-list-info">' +
            '<div class="edit-list-title">' + (item.title || item.name || '') + '</div>' +
            '<div class="edit-list-sub">' + sub + '</div>' +
          '</div>' +
          '<div class="edit-list-actions">' +
            '<button class="edit-list-btn btn-edit" data-id="' + item.id + '" title="Edit">E</button>' +
            (currentEditTab === 'about' ? '' : '<button class="edit-list-btn btn-del" data-id="' + item.id + '" title="Delete">X</button>') +
          '</div>' +
        '</div>';
      });
      if (currentEditTab !== 'about') {
        html += '<button class="edit-add-btn" id="editAddBtn">' + (currentLang === 'zh' ? '+ 添加新项目' : '+ Add New') + '</button>';
      }
      editList.innerHTML = html;

      // Edit/delete buttons
      editList.querySelectorAll('.btn-edit').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          loadItemToForm(currentEditTab, btn.dataset.id);
        });
      });
      editList.querySelectorAll('.btn-del').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          pendingDeleteId = btn.dataset.id;
          pendingDeleteType = currentEditTab;
          if (editConfirm) editConfirm.style.display = 'block';
          if (editFormWrap) editFormWrap.style.display = 'none';
        });
      });

      // Add button
      var addBtn = document.getElementById('editAddBtn');
      if (addBtn) {
        addBtn.addEventListener('click', function() {
          resetEditForm();
          showFormFieldsForType(currentEditTab);
          if (editFormWrap) editFormWrap.style.display = 'block';
          if (editConfirm) editConfirm.style.display = 'none';
          document.getElementById('editTitle').focus();
        });
      }

      // Drag reorder
      initDragReorder();
    }

    // Drag and drop reorder
    function initDragReorder() {
      if (!editList) return;
      var dragItem = null;
      var items = editList.querySelectorAll('.edit-list-item');
      items.forEach(function(item) {
        item.addEventListener('dragstart', function(e) {
          dragItem = item;
          item.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
        });
        item.addEventListener('dragend', function() {
          item.classList.remove('dragging');
          items.forEach(function(i) { i.classList.remove('drag-over'); });
          dragItem = null;
        });
        item.addEventListener('dragover', function(e) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          if (item !== dragItem) {
            item.classList.add('drag-over');
          }
        });
        item.addEventListener('dragleave', function() {
          item.classList.remove('drag-over');
        });
        item.addEventListener('drop', function(e) {
          e.preventDefault();
          item.classList.remove('drag-over');
          if (dragItem && item !== dragItem) {
            var fromId = dragItem.dataset.id;
            var toId = item.dataset.id;
            reorderItem(currentEditTab, fromId, toId);
            renderEditList();
          }
        });
      });
    }

    function reorderItem(type, fromId, toId) {
      var items = getItemsByType(type);
      var fromIdx = items.findIndex(function(i) { return i.id === fromId; });
      var toIdx = items.findIndex(function(i) { return i.id === toId; });
      if (fromIdx < 0 || toIdx < 0) return;
      var moved = items.splice(fromIdx, 1)[0];
      items.splice(toIdx, 0, moved);
      saveData(siteData);
      renderAll();
    }

    function getItemsByType(type) {
      if (type === 'illust') return siteData.illust;
      if (type === 'video') return siteData.video;
      if (type === 'software') return siteData.software;
      if (type === 'social') return siteData.social;
      if (type === 'about') return siteData.about;
      return [];
    }

    // Show/hide form fields based on type
    function showFormFieldsForType(type) {
      var imageGroup = document.getElementById('editImageGroup');
      var linkGroup = document.getElementById('editLinkGroup');
      var videoUrlGroup = document.getElementById('editVideoUrlGroup');
      var videoFileGroup = document.getElementById('editVideoFileGroup');
      var softFileGroup = document.getElementById('editSoftFileGroup');
      var socialFields = document.getElementById('editSocialFields');
      var tagGroup = document.getElementById('editTagGroup');

      if (imageGroup) imageGroup.style.display = (type === 'illust' || type === 'video' || type === 'about') ? '' : 'none';
      if (linkGroup) linkGroup.style.display = (type === 'illust' || type === 'software' || type === 'about') ? '' : 'none';
      if (videoUrlGroup) videoUrlGroup.style.display = type === 'video' ? '' : 'none';
      if (videoFileGroup) videoFileGroup.style.display = type === 'video' ? '' : 'none';
      if (softFileGroup) softFileGroup.style.display = type === 'software' ? '' : 'none';
      if (socialFields) socialFields.style.display = type === 'social' ? '' : 'none';
      if (tagGroup) tagGroup.style.display = (type === 'video') ? '' : 'none';

      // Update labels for about type
      var titleLabel = document.querySelector('#editForm .form-group:nth-child(1) .form-label');
      var descLabel = document.querySelector('#editForm .form-group:nth-child(2) .form-label');
      var imageLabel = imageGroup ? imageGroup.querySelector('.form-label') : null;
      var linkLabel = linkGroup ? linkGroup.querySelector('.form-label') : null;
      if (type === 'about') {
        if (titleLabel) { titleLabel.textContent = currentLang === 'zh' ? '第一行文字' : 'Line 1 Text'; }
        if (descLabel) { descLabel.textContent = currentLang === 'zh' ? '第二行文字' : 'Line 2 Text'; }
        if (imageLabel) { imageLabel.textContent = currentLang === 'zh' ? '人像照片' : 'Portrait Photo'; }
        if (linkLabel) { linkLabel.textContent = currentLang === 'zh' ? '第三行文字' : 'Line 3 Text'; }
      } else if (type === 'social') {
        if (titleLabel) { titleLabel.textContent = currentLang === 'zh' ? '中文名' : 'Chinese Name'; }
        if (descLabel) { descLabel.textContent = currentLang === 'zh' ? '描述' : 'Description'; }
        if (imageLabel) { imageLabel.textContent = currentLang === 'zh' ? '图片/封面' : 'Image/Cover'; }
        if (linkLabel) { linkLabel.textContent = currentLang === 'zh' ? '链接URL' : 'Link URL'; }
      } else {
        if (titleLabel) { titleLabel.textContent = currentLang === 'zh' ? '标题' : 'Title'; }
        if (descLabel) { descLabel.textContent = currentLang === 'zh' ? '描述' : 'Description'; }
        if (imageLabel) { imageLabel.textContent = currentLang === 'zh' ? '图片/封面' : 'Image/Cover'; }
        if (linkLabel) { linkLabel.textContent = currentLang === 'zh' ? '链接URL' : 'Link URL'; }
      }
    }

    // Load item into form for editing
    function loadItemToForm(type, id) {
      var items = getItemsByType(type);
      var item = items.find(function(i) { return i.id === id; });
      if (!item) return;

      document.getElementById('editType').value = type;
      document.getElementById('editId').value = id;
      document.getElementById('editTitle').value = item.title || item.name || '';
      document.getElementById('editDesc').value = item.desc || '';
      document.getElementById('editImage').value = item.image || '';
      document.getElementById('editLink').value = item.link || '';
      document.getElementById('editTag').value = item.tag || '';

      if (type === 'video') {
        document.getElementById('editVideoUrl').value = item.url || '';
        document.getElementById('editVideoFilePath').value = item.file || '';
      }
      if (type === 'software') {
        document.getElementById('editSoftFilePath').value = item.file || item.link || '';
      }
      if (type === 'social') {
        document.getElementById('editSocialHandle').value = item.handle || '';
        document.getElementById('editSocialIcon').value = item.icon || '';
        document.getElementById('editSocialUrl').value = item.url || '';
      }

      showFormFieldsForType(type);
      if (editFormWrap) editFormWrap.style.display = 'block';
      if (editConfirm) editConfirm.style.display = 'none';
      if (editDelete) editDelete.style.display = 'inline-flex';
    }

    // Reset form
    function resetEditForm() {
      document.getElementById('editId').value = '';
      document.getElementById('editTitle').value = '';
      document.getElementById('editDesc').value = '';
      document.getElementById('editImage').value = '';
      document.getElementById('editLink').value = '';
      document.getElementById('editTag').value = '';
      document.getElementById('editType').value = currentEditTab;
      var videoUrl = document.getElementById('editVideoUrl');
      var videoFile = document.getElementById('editVideoFilePath');
      var softFile = document.getElementById('editSoftFilePath');
      var socialHandle = document.getElementById('editSocialHandle');
      var socialIcon = document.getElementById('editSocialIcon');
      var socialUrl = document.getElementById('editSocialUrl');
      if (videoUrl) videoUrl.value = '';
      if (videoFile) videoFile.value = '';
      if (softFile) softFile.value = '';
      if (socialHandle) socialHandle.value = '';
      if (socialIcon) socialIcon.value = '';
      if (socialUrl) socialUrl.value = '';
      if (editDelete) editDelete.style.display = 'none';
    }

    // Edit modal open/close
    function openEditModal(type, id) {
      if (!editModal) return;
      currentEditTab = type || 'illust';
      // Update tabs
      if (editTabs) {
        editTabs.querySelectorAll('.edit-tab').forEach(function(t) {
          t.classList.toggle('active', t.dataset.tab === currentEditTab);
        });
      }
      renderEditList();
      resetEditForm();
      showFormFieldsForType(currentEditTab);
      if (id) {
        loadItemToForm(currentEditTab, id);
      } else {
        if (editFormWrap) editFormWrap.style.display = 'block';
        if (editConfirm) editConfirm.style.display = 'none';
      }
      editModal.classList.add('active');
    }

    function closeEditModal() {
      if (editModal) editModal.classList.remove('active');
      if (editFormWrap) editFormWrap.style.display = 'block';
      if (editConfirm) editConfirm.style.display = 'none';
    }

    if (editModalClose) editModalClose.addEventListener('click', closeEditModal);
    if (editModalBackdrop) editModalBackdrop.addEventListener('click', closeEditModal);

    // Cancel button
    if (editCancel) {
      editCancel.addEventListener('click', function() {
        resetEditForm();
        if (editFormWrap) editFormWrap.style.display = 'none';
      });
    }

    // File upload handlers
    var imageFileInput = document.getElementById('editImageFile');
    if (imageFileInput) {
      imageFileInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function(ev) {
            document.getElementById('editImage').value = ev.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    var videoFileInput = document.getElementById('editVideoFile');
    if (videoFileInput) {
      videoFileInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (file) {
          document.getElementById('editVideoFilePath').value = file.name;
        }
      });
    }

    var softFileInput = document.getElementById('editSoftFile');
    if (softFileInput) {
      softFileInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (file) {
          document.getElementById('editSoftFilePath').value = file.name;
        }
      });
    }

    // Form submit
    if (editForm) {
      editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var type = document.getElementById('editType').value;
        var title = document.getElementById('editTitle').value;
        var desc = document.getElementById('editDesc').value;
        var image = document.getElementById('editImage').value;
        var link = document.getElementById('editLink').value;
        var tag = document.getElementById('editTag').value;
        var id = document.getElementById('editId').value;

        if (!title) return;

        var items = getItemsByType(type);

        if (type === 'social') {
          var handle = document.getElementById('editSocialHandle').value;
          var icon = document.getElementById('editSocialIcon').value;
          var url = document.getElementById('editSocialUrl').value;
          if (id) {
            var item = items.find(function(i) { return i.id === id; });
            if (item) {
              item.name = title;
              item.handle = handle;
              item.icon = icon || title.charAt(0);
              item.url = url;
            }
          } else {
            var newId = 'so' + Date.now();
            items.push({ id: newId, name: title, handle: handle, icon: icon || title.charAt(1), url: url || '#' });
          }
        } else if (type === 'video') {
          var videoUrl = document.getElementById('editVideoUrl').value;
          var videoFile = document.getElementById('editVideoFilePath').value;
          if (id) {
            var item = items.find(function(i) { return i.id === id; });
            if (item) {
              item.title = title;
              item.desc = desc;
              item.image = image;
              item.link = link;
              item.url = videoUrl;
              item.file = videoFile;
              item.tag = tag;
            }
          } else {
            var newId = 'v' + Date.now();
            items.push({ id: newId, title: title, desc: desc, image: image, link: link || videoUrl || videoFile, url: videoUrl, file: videoFile, tag: tag });
          }
        } else if (type === 'software') {
          var softFile = document.getElementById('editSoftFilePath').value;
          if (id) {
            var item = items.find(function(i) { return i.id === id; });
            if (item) {
              item.title = title;
              item.desc = desc;
              item.image = image;
              item.link = link || softFile;
              item.file = softFile;
            }
          } else {
            var newId = 's' + Date.now();
            items.push({ id: newId, title: title, desc: desc, image: image, link: link || softFile, file: softFile });
          }
        } else if (type === 'about') {
          // About - single item, update in place
          var item = items.find(function(i) { return i.id === id; });
          if (item) {
            item.title = title;
            item.desc = desc;
            item.image = image;
            item.link = link;
          }
        } else {
          // illust
          if (id) {
            var item = items.find(function(i) { return i.id === id; });
            if (item) {
              item.title = title;
              item.desc = desc;
              item.image = image;
              item.link = link;
            }
          } else {
            var newId = 'i' + Date.now();
            items.push({ id: newId, title: title, desc: desc, image: image, link: link });
          }
        }

        saveData(siteData);
        renderAll();
        renderEditList();
        resetEditForm();
        if (editFormWrap) editFormWrap.style.display = 'none';
        showToast(currentLang === 'zh' ? '已保存' : 'Saved');
      });
    }

    // Delete with confirmation
    if (editConfirmYes) {
      editConfirmYes.addEventListener('click', function() {
        if (!pendingDeleteId) return;
        var items = getItemsByType(pendingDeleteType);
        var idx = items.findIndex(function(i) { return i.id === pendingDeleteId; });
        if (idx > -1) {
          items.splice(idx, 1);
          saveData(siteData);
          renderAll();
          renderEditList();
          resetEditForm();
          if (editFormWrap) editFormWrap.style.display = 'none';
          showToast(currentLang === 'zh' ? '已删除' : 'Deleted');
        }
        pendingDeleteId = null;
        pendingDeleteType = null;
        if (editConfirm) editConfirm.style.display = 'none';
      });
    }

    if (editConfirmNo) {
      editConfirmNo.addEventListener('click', function() {
        pendingDeleteId = null;
        pendingDeleteType = null;
        if (editConfirm) editConfirm.style.display = 'none';
        if (editFormWrap) editFormWrap.style.display = 'block';
      });
    }

    // Legacy delete button (also triggers confirmation)
    if (editDelete) {
      editDelete.addEventListener('click', function () {
        var type = document.getElementById('editType').value;
        var id = document.getElementById('editId').value;
        if (!id) return;
        pendingDeleteId = id;
        pendingDeleteType = type;
        if (editConfirm) editConfirm.style.display = 'block';
        if (editFormWrap) editFormWrap.style.display = 'none';
      });
    }

    // Export data
    var editExportBtn = document.getElementById('editExportBtn');
    if (editExportBtn) {
      editExportBtn.addEventListener('click', function() {
        var json = JSON.stringify(siteData, null, 2);
        var blob = new Blob([json], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'creative-space-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast(currentLang === 'zh' ? '数据已导出' : 'Data exported');
      });
    }

    // Import data
    var editImportBtn = document.getElementById('editImportBtn');
    var editImportFile = document.getElementById('editImportFile');
    if (editImportBtn && editImportFile) {
      editImportBtn.addEventListener('click', function() {
        editImportFile.value = '';
        editImportFile.click();
      });
      editImportFile.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(ev) {
          try {
            var data = JSON.parse(ev.target.result);
            if (!data.illust || !Array.isArray(data.illust) ||
                !data.video || !Array.isArray(data.video) ||
                !data.software || !Array.isArray(data.software) ||
                !data.social || !Array.isArray(data.social)) {
              showToast(currentLang === 'zh' ? '数据格式无效' : 'Invalid data format');
              return;
            }
            siteData.illust = data.illust;
            siteData.video = data.video;
            siteData.software = data.software;
            siteData.social = data.social;
            if (data.about && Array.isArray(data.about)) siteData.about = data.about;
            saveData(siteData);
            renderAll();
            renderEditList();
            showToast(currentLang === 'zh' ? '数据已导入' : 'Data imported');
          } catch (err) {
            showToast(currentLang === 'zh' ? '导入失败：无效的JSON' : 'Import failed: invalid JSON');
          }
        };
        reader.readAsText(file);
      });
    }

    // Expose openEditModal globally for add buttons
    window._openEditModal = openEditModal;
  }

  /* ---------- THEME TOGGLE ---------- */
  function initThemeToggle() {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }

  function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('themeV4', currentTheme);
  }

  /* ---------- LANGUAGE TOGGLE ---------- */
  function initLangToggle() {
    applyLang();
  }

  function toggleLang() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('langV4', currentLang);
    applyLang();
  }

  function applyLang() {
    document.documentElement.setAttribute('data-lang', currentLang);
    var elements = document.querySelectorAll('[data-zh]');
    elements.forEach(function (el) {
      var zh = el.getAttribute('data-zh');
      var en = el.getAttribute('data-en');
      if (zh && en) {
        el.textContent = currentLang === 'zh' ? zh : en;
      }
    });

    // Update lang toggle button
    var langToggle = document.getElementById('langToggle');
    if (langToggle) {
      var span = langToggle.querySelector('span');
      if (span) {
        span.textContent = currentLang === 'zh' ? 'EN' : '中';
      }
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(function (link) {
      var zh = link.getAttribute('data-zh');
      var en = link.getAttribute('data-en');
      if (zh && en) {
        link.textContent = currentLang === 'zh' ? zh : en;
      }
    });

    // Re-render dynamic content
    renderAbout();
    renderIllust();
    renderVideos();
    renderSoftware();
  }

  /* ---------- TOAST ---------- */
  function showToast(message) {
    var toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(function () {
      toast.classList.remove('show');
    }, 2500);
  }

  /* ---------- LAZY LOAD ---------- */
  function initLazyLoad() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(function (img) {
      observer.observe(img);
    });
  }

  /* ---------- ADAPTIVE QUALITY ---------- */
  function initAdaptiveQuality() {
    var frameCount = 0;
    var lastTime = performance.now();

    function measureFPS() {
      frameCount++;
      var now = performance.now();
      if (now - lastTime >= 1000) {
        var fps = frameCount;
        frameCount = 0;
        lastTime = now;

        if (fps < 30) {
          document.body.classList.add('low-performance');
        } else {
          document.body.classList.remove('low-performance');
        }
      }
      requestAnimationFrame(measureFPS);
    }
    requestAnimationFrame(measureFPS);
  }

  /* ---------- TOUCH OPTIMIZATIONS ---------- */
  function initTouchOptimizations() {
    if ('ontouchstart' in window) {
      var cursor = document.getElementById('cursor');
      if (cursor) cursor.style.display = 'none';
      document.body.classList.add('touch-device');
    }

    document.querySelectorAll('button, a, .nav-pill, .view-more').forEach(function (el) {
      el.style.touchAction = 'manipulation';
    });
  }

  /* ---------- CANVAS PARTICLES (ENHANCED) ---------- */
  function initCanvas() {
    var canvas = document.getElementById('ideaCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var orbs = [];
    var isMobile = window.innerWidth < 768;
    var particleCount = isMobile ? 25 : 50;
    var orbCount = isMobile ? 3 : 6;
    var mouseX = -1000;
    var mouseY = -1000;
    var scrollProgress = 0;
    var lastMouseMove = 0;
    var mouseThrottle = 16;
    var frameSkip = 0;
    var isLowPerf = false;

    function resize() {
      var section = canvas.parentElement;
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Track mouse position relative to canvas (throttled)
    canvas.parentElement.addEventListener('mousemove', function (e) {
      var now = Date.now();
      if (now - lastMouseMove < mouseThrottle) return;
      lastMouseMove = now;
      var rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', function () {
      mouseX = -1000;
      mouseY = -1000;
    });

    // Track scroll for color shifts
    window.addEventListener('scroll', function () {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = docHeight > 0 ? window.pageYOffset / docHeight : 0;
    });

    // Particle constructor
    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.baseX = this.x;
      this.baseY = this.y;
    }

    // Light orb constructor
    function LightOrb() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 30 + 20;
      this.opacity = Math.random() * 0.08 + 0.02;
      this.pulseSpeed = Math.random() * 0.002 + 0.001;
      this.pulseOffset = Math.random() * Math.PI * 2;
    }

    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    for (var j = 0; j < orbCount; j++) {
      orbs.push(new LightOrb());
    }

    // Get color based on scroll progress (acid green shifts to warm tones)
    function getAccentColor(alpha) {
      // Shift hue slightly based on scroll: from acid green toward warm yellow-green
      var r = 197 + Math.floor(scrollProgress * 40);
      var g = 255 - Math.floor(scrollProgress * 30);
      var b = 58 - Math.floor(scrollProgress * 20);
      r = Math.min(255, Math.max(0, r));
      g = Math.min(255, Math.max(0, g));
      b = Math.min(255, Math.max(0, b));
      return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }

    function draw(time) {
      // Frame skipping for low-end devices
      isLowPerf = document.body.classList.contains('low-performance');
      frameSkip++;
      if (isLowPerf && frameSkip % 2 !== 0) {
        requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw light orbs (behind particles)
      orbs.forEach(function (orb) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        // Mouse attraction for orbs
        var dxm = mouseX - orb.x;
        var dym = mouseY - orb.y;
        var distM = Math.sqrt(dxm * dxm + dym * dym);
        if (distM < 300 && distM > 0) {
          orb.x += dxm * 0.002;
          orb.y += dym * 0.002;
        }

        // Pulse effect
        var pulse = Math.sin(time * orb.pulseSpeed + orb.pulseOffset) * 0.5 + 0.5;
        var currentRadius = orb.radius * (0.8 + pulse * 0.4);
        var currentOpacity = orb.opacity * (0.6 + pulse * 0.4);

        // Draw glowing orb
        var gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
        gradient.addColorStop(0, getAccentColor(currentOpacity));
        gradient.addColorStop(0.5, getAccentColor(currentOpacity * 0.4));
        gradient.addColorStop(1, getAccentColor(0));

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Update and draw particles
      particles.forEach(function (p) {
        // Mouse interaction: slight attraction
        var dxm = mouseX - p.x;
        var dym = mouseY - p.y;
        var distM = Math.sqrt(dxm * dxm + dym * dym);
        if (distM < 200 && distM > 0) {
          p.vx += dxm / distM * 0.02;
          p.vy += dym / distM * 0.02;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = getAccentColor(p.opacity);
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = getAccentColor(0.1 * (1 - dist / 140));
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw lines from mouse to nearby particles
      if (mouseX > 0 && mouseY > 0) {
        particles.forEach(function (p) {
          var dx = mouseX - p.x;
          var dy = mouseY - p.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = getAccentColor(0.15 * (1 - dist / 180));
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      }

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  /* ===== PHOTOS PAGE ===== */
  function initPhotosPage() {
    var page = document.getElementById('photosPage');
    var canvas = document.querySelector('.photos_photobox');
    var checkbox = document.querySelector('.photos_checkbox');
    var mousetip = document.querySelector('.photos_mousetip');
    var backBtn = document.getElementById('photosBack');
    if (!page || !canvas) return;

    var ctx = canvas.getContext('2d');
    var max_img_width = 280;
    var max_img_height = 400;
    var img_margin = 120;
    var line_nums = 0;
    var row_nums = 0;
    var img_total = 0;
    var total_width = 0;
    var total_height = 0;
    var standard_width = 1920;
    var standard_height = 1080;
    var scale_nums = 1;
    var draw_scale = 1;
    var imgs_data = [];
    var img_mask = null;
    var if_movable = false;
    var img_selected = {};
    var imgs_inview = [];
    var change_timer = null;
    var mouse = { x: 0, y: 0, pro_x: 0, pro_y: 0 };
    var ease = { x: 0, y: 0, id: null, damping: function(v) { return v * 0.95; } };
    var cb = {
      img: checkbox ? checkbox.querySelector('.photos_checkbox_img') : null,
      mover: checkbox ? Array.from(checkbox.querySelectorAll('.photos_checkbox_mover')) : [],
      state: false,
      if_visible: false,
      if_animating: false
    };
    var mt = {
      ele: mousetip,
      if_render: true,
      if_shutable: false,
      last_angle: 0
    };

    // Create mask image (placeholder for unloaded images)
    img_mask = new Image(max_img_width, max_img_height);
    var maskCanvas = document.createElement('canvas');
    maskCanvas.width = max_img_width;
    maskCanvas.height = max_img_height;
    var maskCtx = maskCanvas.getContext('2d');
    maskCtx.fillStyle = '#1a1a1a';
    maskCtx.fillRect(0, 0, max_img_width, max_img_height);
    maskCtx.strokeStyle = '#333';
    maskCtx.lineWidth = 2;
    maskCtx.strokeRect(4, 4, max_img_width - 8, max_img_height - 8);
    img_mask.src = maskCanvas.toDataURL();

    function complement_data(count) {
      var i = count;
      while (true) {
        var a = Math.ceil(Math.sqrt(i));
        var t = Math.floor(Math.sqrt(i));
        if (a <= t + 1) a = t + 2;
        if (a * t >= i && a - t >= 2) {
          row_nums = a;
          line_nums = t;
          img_total = a * t;
          // Use max dimensions for total area calculation
          total_width = row_nums * (max_img_width + img_margin) - img_margin;
          total_height = line_nums * (max_img_height + img_margin) - img_margin;
          break;
        }
        i++;
      }
    }

    function resize() {
      scale_nums = innerWidth / standard_width / 2 + innerHeight / standard_height / 2;
      draw_scale = scale_nums * devicePixelRatio;
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
      document.documentElement.style.setProperty('--scale', scale_nums);
      if (cb.mover.length && img_selected.w && img_selected.h) {
        var selW = img_selected.w * scale_nums;
        var selH = img_selected.h * scale_nums;
        gsap.set(cb.mover, {
          width: selW + 'px',
          height: selH + 'px',
          x: (innerWidth - selW) / 2 + 'px',
          y: (innerHeight - selH) / 2 - 40 * scale_nums + 'px'
        });
      }
      if (imgs_data.length !== 0) move_imgs(0, 0);
    }

    function create_imgs_data() {
      var data = loadData();
      var baseIllusts = data.illust || [];
      if (baseIllusts.length === 0) return;

      // Duplicate images until the scattered grid is wide enough to cover the viewport
      var illusts = baseIllusts.slice();
      while (true) {
        complement_data(illusts.length);
        if (total_width >= standard_width * 2 || illusts.length >= baseIllusts.length * 8) break;
        illusts = illusts.concat(baseIllusts);
      }

      for (var i = 0; i < img_total; i++) {
        var a = illusts.length - 1;
        var t = Math.floor(a / 2);
        var x = i <= a ? i : i % (t + 1) + t;
        var col = i % row_nums;
        var row = Math.floor(i / row_nums);
        var posX = col * (max_img_width + img_margin);
        var posY = row * (max_img_height + img_margin);
        if (col % 2) posY -= (max_img_height + img_margin) / 2;

        var idx = i;
        // Fixed cell dimensions, images will be cropped with cover fit
        var item = {
          x: posX,
          y: posY,
          name: illusts[x].title || '',
          time: illusts[x].desc || '',
          index: idx,
          if_show: true,
          if_loaded: false,
          if_green: false,
          img: img_mask,
          w: max_img_width,
          h: max_img_height,
          origW: max_img_width,
          origH: max_img_height
        };
        imgs_data.push(item);

        // Load image and keep fixed cell size (cover crop)
        (function(index, src) {
          var imgEl = new Image();
          imgEl.onload = function() {
            if (!imgs_data[index]) return;
            imgs_data[index].origW = imgEl.naturalWidth || imgEl.width;
            imgs_data[index].origH = imgEl.naturalHeight || imgEl.height;
            imgs_data[index].img = imgEl;
            imgs_data[index].if_loaded = true;
          };
          imgEl.onerror = function() {
            if (imgs_data[index]) {
              imgs_data[index].img = img_mask;
              imgs_data[index].if_loaded = false;
            }
          };
          imgEl.src = src;
        })(idx, illusts[x].image || '');
      }
    }

    function draw_item(item) {
      var dx = item.x * draw_scale;
      var dy = item.y * draw_scale;
      var cellW = max_img_width * draw_scale;
      var cellH = max_img_height * draw_scale;

      // Cover crop: draw image to fill the fixed cell without distortion
      var img = item.img;
      var srcW = img.naturalWidth || img.width || max_img_width;
      var srcH = img.naturalHeight || img.height || max_img_height;
      var srcRatio = srcW / srcH;
      var cellRatio = max_img_width / max_img_height;
      var sx, sy, sW, sH;

      if (srcRatio > cellRatio) {
        sH = srcH;
        sW = sH * cellRatio;
        sx = (srcW - sW) / 2;
        sy = 0;
      } else {
        sW = srcW;
        sH = sW / cellRatio;
        sx = 0;
        sy = (srcH - sH) / 2;
      }

      ctx.drawImage(img, sx, sy, sW, sH, dx, dy, cellW, cellH);
    }

    function create_canvas_events() {
      canvas.onmousedown = function(e) {
        if_movable = true;
        mouse.x = e.x;
        mouse.y = e.y;
      };

      canvas.ontouchstart = function(e) {
        if_movable = true;
        mouse.pro_x = mouse.x = e.touches[0].clientX;
        mouse.pro_y = mouse.y = e.touches[0].clientY;
      };

      canvas.onmouseup = function(e) {
        if_movable = false;
        if (mouse.x === e.x && mouse.y === e.y) {
          select_img(e.x, e.y);
        }
      };

      canvas.ontouchend = function() {
        if_movable = false;
        if (mouse.pro_x === mouse.x && mouse.pro_y === mouse.y) {
          select_img(mouse.x, mouse.y);
        }
      };

      canvas.onmouseleave = function() {
        if_movable = false;
      };

      canvas.onmousemove = function(e) {
        if (if_movable) move_imgs(e.movementX, e.movementY);
      };

      canvas.ontouchmove = function(e) {
        e.preventDefault();
        if (if_movable) {
          move_imgs(e.touches[0].clientX - mouse.x, e.touches[0].clientY - mouse.y);
          mouse.x = e.touches[0].clientX;
          mouse.y = e.touches[0].clientY;
        }
      };
    }

    function wheel_handler(e) {
      move_imgs(0, 10 * Math.sign(e.deltaY * -1));
    }

    function move_imgs(dx, dy) {
      if (cb.if_visible) return;
      ease.x += 0.2 * dx;
      ease.y += 0.2 * dy;

      var tick = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgs_data.forEach(function(item) {
          item.x += ease.x;
          if (item.x > total_width - max_img_width) item.x -= total_width + img_margin;
          if (item.x < -max_img_width) item.x += total_width + img_margin;
          item.y += ease.y;
          if (item.y > total_height - max_img_height) item.y -= total_height + img_margin;
          if (item.y < -max_img_height) item.y += total_height + img_margin;
          draw_item(item);
        });
        ease.x = ease.damping(ease.x);
        ease.y = ease.damping(ease.y);
        if (Math.abs(ease.x) < 0.01 && Math.abs(ease.y) < 0.01) {
          ease.x = 0;
          ease.y = 0;
          ease.id = null;
          return;
        }
        ease.id = requestAnimationFrame(tick);
      };
      if (!ease.id) ease.id = requestAnimationFrame(tick);
    }

    function select_img(mx, my) {
      imgs_inview = imgs_data.filter(function(item) {
        return item.x * scale_nums >= -max_img_width * scale_nums &&
               item.x * scale_nums <= innerWidth &&
               item.y * scale_nums >= -max_img_height * scale_nums &&
               item.y * scale_nums <= innerHeight;
      });

      var found = imgs_data.find(function(item) {
        var cellW = max_img_width * scale_nums;
        var cellH = max_img_height * scale_nums;
        var imgX = item.x * scale_nums;
        var imgY = item.y * scale_nums;
        return mx >= imgX && mx < imgX + cellW &&
               my >= imgY && my < imgY + cellH;
      });

      if (found) {
        img_selected = found;
        img_selected.if_show = false;
        hidden_imgs();
        show_checkbox();
        change_imgs(false);
      }
    }

    function check_hidden() {
      if (cb.if_animating) return;
      hidden_checkbox();
      change_imgs(true);
    }

    function computeLightboxSize(origW, origH) {
      var maxW = innerWidth * 0.82;
      var maxH = (innerHeight - 140) * 0.82;
      var ratio = Math.min(maxW / origW, maxH / origH, 1);
      return { w: origW * ratio, h: origH * ratio };
    }

    function show_checkbox() {
      cb.if_animating = true;
      cb.state = true;
      cb.if_visible = true;
      mt.if_shutable = true;

      // Stop any ongoing hide/show transitions and blur the canvas background
      clearInterval(change_timer);
      cancelAnimationFrame(ease.id);
      ease.id = null;
      if (canvas) canvas.classList.add('photos-blur-bg');

      if (cb.img) {
        cb.img.src = '';
        cb.img.src = img_selected.img.src;
      }
      if (checkbox) {
        checkbox.classList.add('photos_checkbox_show');
        checkbox.style.visibility = 'visible';
      }
      var pccName = checkbox ? checkbox.querySelector('.pcc_name') : null;
      if (pccName) {
        pccName.innerHTML = '';
        var nameStr = img_selected.name || '';
        for (var ci = 0; ci < nameStr.length; ci++) {
          var span = document.createElement('span');
          span.style.setProperty('--i', (0.02 * parseInt(Math.random() * nameStr.length)).toString());
          span.textContent = nameStr[ci];
          pccName.appendChild(span);
        }
      }
      var pccTime = checkbox ? checkbox.querySelector('.pcc_time') : null;
      if (pccTime) pccTime.textContent = img_selected.time || '';

      var startW = max_img_width * scale_nums;
      var startH = max_img_height * scale_nums;
      var origW = img_selected.origW || max_img_width;
      var origH = img_selected.origH || max_img_height;
      var size = computeLightboxSize(origW, origH);
      var endW = size.w * scale_nums;
      var endH = size.h * scale_nums;

      gsap.fromTo(cb.mover,
        { width: startW + 'px', height: startH + 'px', x: img_selected.x * scale_nums + 'px', y: img_selected.y * scale_nums + 'px' },
        {
          width: endW + 'px',
          height: endH + 'px',
          x: (innerWidth - endW) / 2 + 'px',
          y: (innerHeight - endH) / 2 - 40 * scale_nums + 'px',
          scale: 1,
          duration: 0.8,
          ease: 'power4.out',
          stagger: { from: 'end', each: 0.04 },
          onComplete: function() { cb.if_animating = false; }
        }
      );
    }

    function hidden_checkbox() {
      cb.if_animating = true;
      cb.state = false;
      mt.if_shutable = false;
      if (checkbox) checkbox.classList.remove('photos_checkbox_show');

      var origW = img_selected.origW || max_img_width;
      var origH = img_selected.origH || max_img_height;
      var size = computeLightboxSize(origW, origH);
      var endW = size.w * scale_nums;
      var endH = size.h * scale_nums;
      var startW = max_img_width * scale_nums;
      var startH = max_img_height * scale_nums;

      if (canvas) canvas.classList.remove('photos-blur-bg');

      gsap.to(cb.mover, {
        width: startW + 'px',
        height: startH + 'px',
        x: img_selected.x * scale_nums + 'px',
        y: img_selected.y * scale_nums + 'px',
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: { from: 'end', each: 0.04 },
        onComplete: function() {
          cb.if_animating = false;
          cb.if_visible = false;
          if (checkbox) checkbox.style.visibility = 'hidden';
          img_selected.if_show = true;
          show_imgs();
        }
      });
    }

    function change_imgs(show) {
      cancelAnimationFrame(ease.id);
      ease.id = null;
      var t = 0;
      change_timer = setInterval(function() {
        if (t >= imgs_inview.length) {
          clearInterval(change_timer);
          imgs_inview.forEach(function(item) { item.if_green = false; });
          return;
        }
        if (imgs_inview[t].index === img_selected.index) { t++; return; }
        imgs_inview[t].if_show = show;
        if (Math.random() > 0.7) {
          var ri = Math.floor(Math.random() * (imgs_inview.length - t)) + t;
          if (imgs_inview[ri].index !== img_selected.index) {
            imgs_inview[ri].if_green = true;
          }
        }
        if (show) show_imgs(); else hidden_imgs();
        t++;
      }, 30);
    }

    function show_imgs() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      imgs_inview.forEach(function(item) {
        if (item.if_green) {
          draw_item(item);
        }
        if (item.if_show) {
          draw_item(item);
        }
      });
    }

    function hidden_imgs() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      imgs_inview.forEach(function(item) {
        if (item.if_show) {
          draw_item(item);
        }
        if (item.if_green) {
          draw_item(item);
        }
      });
    }

    // Mouse tip events
    function bind_mousetip_events() {
      if (!page || !mousetip) return;
      if (navigator.maxTouchPoints > 0) {
        mt.if_render = false;
        if (mousetip) mousetip.style.display = 'none';
        return;
      }
      page.onmousemove = function(e) {
        gsap.to(mousetip, { x: e.x + 'px', y: e.y + 'px', duration: 0.5, ease: 'power2.out' });
        if (!if_movable) return;
        var angle;
        var ratio = (e.x - innerWidth / 2) / (e.y - innerHeight / 2);
        if (e.y >= innerHeight / 2) {
          angle = 180 * Math.atan(ratio) / Math.PI + 90;
        } else {
          angle = 270 + 180 * Math.atan(ratio) / Math.PI;
        }
        var prev = mt.last_angle % 360;
        if (prev < 0) prev += 360;
        var diff = angle - prev;
        if (diff >= 180) diff -= 360;
        if (diff < -180) diff += 360;
        angle = mt.last_angle + diff;
        gsap.to(mousetip, { rotate: -angle + 'deg', duration: 0.5, ease: 'power2.out' });
        mt.last_angle = angle;
      };
      page.onmouseenter = function(e) {
        gsap.timeline().to(mousetip, { x: e.x + 'px', y: e.y + 'px', scale: 1, duration: 0.8, ease: 'power3.out' });
      };
      page.onmouseleave = function() {
        reset_mousetip();
        gsap.to(mousetip, { scale: 0, duration: 0.8, ease: 'power3.out' });
      };
      page.onmouseup = function() {
        reset_mousetip();
      };
    }

    function reset_mousetip() {
      if (!mousetip) return;
      gsap.timeline()
        .set(mousetip, { rotate: mt.last_angle % 360 + 'deg' })
        .to(mousetip, { rotate: '0deg', duration: 0.5, ease: 'power2.out' });
      mt.last_angle = 0;
    }

    // Checkbox click to close
    if (checkbox) {
      checkbox.addEventListener('click', function(e) {
        if (e.target.closest('.photos_checkbox_img')) {
          check_hidden();
        }
      });
    }

    // Back button - always close the photos page.
    // Previously, if cb.if_visible was true, it called check_hidden() which
    // relies on a GSAP onComplete callback. If that animation never fires,
    // cb.if_visible stays true forever and the Back button becomes dead.
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        pageTransition(function () { closePhotosPage(); });
      });
    }

    // ESC key to close
    function escHandler(e) {
      if (e.key === 'Escape') {
        pageTransition(function () { closePhotosPage(); });
      }
    }

    // Init
    window.addEventListener('resize', resize);
    create_canvas_events();
    bind_mousetip_events();

    // Public methods
    window.openPhotosPage = function () {
      page.classList.add('active');
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', wheel_handler);
      window.addEventListener('keydown', escHandler);
      // Reset state
      imgs_data = [];
      img_selected = {};
      if (change_timer) clearInterval(change_timer);
      cancelAnimationFrame(ease.id);
      ease.id = null;
      ease.x = 0;
      ease.y = 0;
      if_movable = false;
      if (checkbox) {
        checkbox.style.visibility = 'hidden';
        checkbox.classList.remove('photos_checkbox_show');
      }
      // Activate scale transition
      canvas.classList.add('photos_photobox_activated');
      if (checkbox) checkbox.classList.add('photos_checkbox_activated');
      if (backBtn) backBtn.classList.add('active');
      // Load and create data
      create_imgs_data();
      // Wait for CSS to apply before measuring canvas
      requestAnimationFrame(function () {
        resize();
        // Animate in after layout is ready
        setTimeout(function() {
          move_imgs(innerWidth / 4, 0);
        }, 600);
      });
    };

    window.closePhotosPage = function () {
      page.classList.remove('active');
      document.body.style.overflow = '';
      canvas.classList.remove('photos_photobox_activated');
      if (checkbox) checkbox.classList.remove('photos_checkbox_activated');
      if (canvas) canvas.classList.remove('photos-blur-bg');
      if (backBtn) backBtn.classList.remove('active');
      if (change_timer) clearInterval(change_timer);
      cancelAnimationFrame(ease.id);
      ease.id = null;
      // Force-clear checkbox state so GSAP onComplete can't trap us
      cb.if_visible = false;
      cb.if_animating = false;
      cb.state = false;
      if (checkbox) {
        checkbox.classList.remove('photos_checkbox_show');
        checkbox.style.visibility = 'hidden';
      }
      if (cb.mover && cb.mover.length && window.gsap) {
        gsap.killTweensOf(cb.mover);
      }
      window.removeEventListener('wheel', wheel_handler);
      window.removeEventListener('keydown', escHandler);
      // Reset smooth scroll state to prevent nav from scrolling
      if (window._resetSmoothScroll) window._resetSmoothScroll();
    };
  }

  /* ---------- VIDEOS TITLE WAVE ---------- */
  function initVideosTitleWave() {
    var vpTitle = document.querySelector('.vp-title.image-wave');
    if (!vpTitle || vpTitle.dataset.waveSplit === 'true') return;

    var text = vpTitle.textContent;
    vpTitle.innerHTML = '';
    text.split('').forEach(function (char, i) {
      var span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = (i * 0.08) + 's';
      vpTitle.appendChild(span);
    });
    vpTitle.dataset.waveSplit = 'true';

    gsap.from(vpTitle.querySelectorAll('.char'), {
      y: 60,
      opacity: 0,
      stagger: 0.04,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: 0.3
    });
  }

  /* ===== VIDEOS PAGE ===== */
  function initVideosPage() {
    var page = document.getElementById('videosPage');
    var grid = document.getElementById('vpGrid');
    var backBtn = document.getElementById('vpBack');
    var countEl = document.getElementById('vpCount');
    var typesEl = document.getElementById('vpTypes');
    if (!page) return;

    function renderVideos(filter) {
      var data = loadData();
      var videos = data.video || [];
      if (countEl) countEl.textContent = videos.length;

      // Render type filters
      var types = [];
      videos.forEach(function(v) {
        var t = v.tag || 'other';
        if (types.indexOf(t) === -1) types.push(t);
      });
      if (typesEl) {
        var html = '';
        types.forEach(function(t) {
          html += '<button class="vp-type' + (t === filter ? ' active' : '') + '" data-type="' + t + '">' + t + '</button>';
        });
        html += '<button class="vp-type' + (!filter ? ' active' : '') + '" data-type="">all</button>';
        typesEl.innerHTML = html;

        typesEl.querySelectorAll('.vp-type').forEach(function(btn) {
          btn.addEventListener('click', function() { renderVideos(btn.dataset.type || null); });
        });
      }

      // Render video cards
      var filtered = filter ? videos.filter(function(v) { return (v.tag || 'other') === filter; }) : videos;
      if (grid) {
        grid.innerHTML = filtered.map(function(v, i) {
          return '<div class="vp-card" data-index="' + i + '" style="animation-delay:' + (i * 0.1) + 's">' +
            '<div class="vp-card-img-wrap">' +
              '<img class="vp-card-img" src="' + (v.image || v.thumb || '') + '" alt="' + (v.title || '') + '" loading="lazy">' +
              '<div class="vp-card-overlay"><div class="vp-card-play"></div></div>' +
            '</div>' +
            '<div class="vp-card-info">' +
              '<div class="vp-card-title">' + (v.title || '') + '</div>' +
              '<div class="vp-card-tag">' + (v.tag || 'other') + '</div>' +
            '</div>' +
          '</div>';
        }).join('');

        // Add hover wave effect and click
        grid.querySelectorAll('.vp-card').forEach(function(card) {
          card.addEventListener('mouseenter', function() { card.classList.add('wave-hover'); });
          card.addEventListener('mouseleave', function() { card.classList.remove('wave-hover'); });
          card.addEventListener('click', function() {
            var idx = parseInt(card.dataset.index);
            var video = filtered[idx];
            if (video) playVideo(video);
          });
        });
      }
    }

    function playVideo(video) {
      var player = document.querySelector('.video-player');
      if (!player) {
        player = document.createElement('div');
        player.className = 'video-player';
        player.innerHTML = '<button class="video-player-close">X</button><div class="video-player-content"></div>';
        document.body.appendChild(player);
        player.querySelector('.video-player-close').addEventListener('click', function() {
          player.classList.remove('active');
          player.querySelector('.video-player-content').innerHTML = '';
        });
      }

      var content = player.querySelector('.video-player-content');
      if (video.url && video.url.indexOf('bilibili') > -1) {
        content.innerHTML = '<iframe src="' + video.url + '" width="960" height="540" frameborder="0" allowfullscreen></iframe>';
      } else if (video.url) {
        content.innerHTML = '<video src="' + video.url + '" controls autoplay width="960"></video>';
      } else if (video.link) {
        if (video.link.indexOf('bilibili') > -1) {
          content.innerHTML = '<iframe src="' + video.link + '" width="960" height="540" frameborder="0" allowfullscreen></iframe>';
        } else {
          content.innerHTML = '<video src="' + video.link + '" controls autoplay width="960"></video>';
        }
      }
      player.classList.add('active');
    }

    if (backBtn) {
      backBtn.addEventListener('click', function() {
        page.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    window.openVideosPage = function() {
      page.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderVideos();
      initVideosTitleWave();
    };

    window.closeVideosPage = function() {
      page.classList.remove('active');
      document.body.style.overflow = '';
      // Reset smooth scroll state to prevent nav from scrolling
      if (window._resetSmoothScroll) window._resetSmoothScroll();
    };
  }

  /* ===== PAGE TRANSITIONS ===== */
  function pageTransition(callback) {
    var overlay = document.getElementById('pageTransition');
    if (!overlay) { callback(); return; }

    // If a previous transition got stuck (classes not cleaned up),
    // force-clear the state instead of silently dropping the click.
    if (overlay.classList.contains('entering') || overlay.classList.contains('leaving')) {
      overlay.classList.remove('entering');
      overlay.classList.remove('leaving');
      var blocks = overlay.querySelectorAll('.page-transition-block');
      blocks.forEach(function (b) { b.style.transform = ''; });
    }

    overlay.classList.add('entering');

    setTimeout(function () {
      callback();
      overlay.classList.remove('entering');
      overlay.classList.add('leaving');
      setTimeout(function () {
        overlay.classList.remove('leaving');
        var blocks = overlay.querySelectorAll('.page-transition-block');
        blocks.forEach(function (b) { b.style.transform = ''; });
      }, 600);
    }, 500);
  }

  /* ---------- RENDER ALL ---------- */
  function renderAll() {
    renderAbout();
    renderIllust();
    renderVideos();
    renderSoftware();
    renderSocial();
  }

  /* ---------- SCROLL ELASTIC BOUNCE ---------- */
  function initScrollBounce() {
    if ('ontouchstart' in window) return;

    var scrollVelocity = 0;
    var lastScrollY = 0;
    var bouncing = false;

    window.addEventListener('scroll', function () {
      scrollVelocity = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      if (bouncing) return;

      if (window.scrollY <= 0) {
        bouncing = true;
        gsap.to('#home', {
          y: Math.min(scrollVelocity * 0.3, 30),
          duration: 0.2,
          ease: 'power2.out',
          onComplete: function () {
            gsap.to('#home', { y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', onComplete: function () { bouncing = false; } });
          }
        });
      }
    });
  }

  /* ---------- SKILL CARD 3D TILT ENHANCEMENT ---------- */
  /* Removed: skill cards replaced by paragraph layout */
  function init3DTiltEnhanced() {}

  /* ---------- MOUSE LIGHT ---------- */
  function initMouseLight() {
    if ('ontouchstart' in window) return;

    var light = document.createElement('div');
    light.className = 'mouse-light';
    document.body.appendChild(light);

    document.addEventListener('mousemove', function (e) {
      gsap.to(light, { left: e.clientX, top: e.clientY, duration: 0.5, ease: 'power2.out' });
    });
  }

  /* ---------- BUTTON CLICK FEEDBACK ---------- */
  function initButtonClickFeedback() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('button, a, .nav-pill, .view-more, .menu-item');
      if (!btn) return;

      var ripple = document.createElement('span');
      ripple.className = 'click-ripple';
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);

      gsap.fromTo(ripple,
        { scale: 0, opacity: 1 },
        { scale: 1, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: function () { ripple.remove(); } }
      );
    });
  }

  /* ---------- LINK HOVER ENHANCEMENT ---------- */
  function initLinkHoverEnhancement() {
    var links = document.querySelectorAll('.nav-link, .menu-link, .menu-item-text');
    links.forEach(function (link) {
      link.style.position = 'relative';
      link.style.transition = 'letter-spacing 0.3s ease, color 0.3s ease';

      link.addEventListener('mouseenter', function () {
        link.style.letterSpacing = '0.2em';
      });
      link.addEventListener('mouseleave', function () {
        link.style.letterSpacing = '';
      });
    });
  }

  /* ---------- MENU ANIMATION POLISH ---------- */
  function initMenuAnimationPolish() {
    var overlay = document.getElementById('menuOverlay');
    if (!overlay) return;

    var bgLetters = overlay.querySelectorAll('.menu-bg-letter');
    // Add slow rotation to background letters
    bgLetters.forEach(function (letter, i) {
      gsap.to(letter, {
        rotation: 360,
        duration: 60 + i * 10,
        repeat: -1,
        ease: 'none'
      });
    });
  }

  /* ---------- BLOB SCROLL PARALLAX ---------- */
  function initBlobParallax() {
    var blobs = document.querySelectorAll('.blob');
    if (!blobs.length) return;

    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;
      blobs.forEach(function (blob, i) {
        var speed = (i + 1) * 0.05;
        blob.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
    });
  }

  /* ---------- INIT ---------- */
  function init() {
    // Theme & language
    initThemeToggle();
    initLangToggle();

    // Smooth scroll
    initSmoothScroll();

    // Loader
    runLoader().then(function () {
      // After loader completes
      initReveal();
      initGSAPAnimations();
      init3DTilt();
      init3DTiltEnhanced();
      initMagneticButtons();
      initScrollBounce();
      initMouseLight();
      initButtonClickFeedback();
      initLinkHoverEnhancement();
      initMenuAnimationPolish();
      initBlobParallax();

      // Performance & optimization
      initAdaptiveQuality();
      initTouchOptimizations();
      initLazyLoad();
    });

    // UI
    initCursor();
    initNav();
    initMenu();
    initScrollProgress();
    initCanvas();

    // Data
    renderAll();
    initViewMore();

    // Systems
    initMarqueeDrag();
    initLightbox();
    initEditSystem();
    initPhotosPage();
    initVideosPage();

    // Toggle handlers
    var langToggle = document.getElementById('langToggle');
    if (langToggle) {
      langToggle.addEventListener('click', toggleLang);
    }

    // Theme toggle via double-click on logo
    var navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
      navLogo.addEventListener('dblclick', function (e) {
        e.preventDefault();
        toggleTheme();
      });
    }
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
