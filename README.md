# good morning / afternoon / evening

This is a starter template for [Next.js](https://nextjs.org/) with some css scaffold and common component patterns. 

DEV: `yarn && yarn dev`
PROD: `yarn build && yarn start`

## includes:
- CSS scaffolding (using scss modules)
  - Grid layout using `@grid` scss mixins
  - dev environment has visual overlay grid-helper
  - `<RichText>` for some post-reset sane defaults
  - Responsive typography using `clamp`
  - local font files setup 
- `UIContext` consumer / provider setup for global ui states (i.e `navOpen`, `canTransition`, `canScroll` etc)
- Mobile & desktop style navigation scaffold
- `React hooks()` for:
  - local storage
  - resize events
  - keyboard events
- `<PageTransition>` component using `react-transition-group`
- debounced `<Loading>` component using `react-transition-group`
- `<Picture>` component with sanitised media-query / srcset props
- Dark mode setup
- `<Meta>` SEO component w. simple default setup
- `<Svg>` import as component

## options as separate branch:
- gsap library
- [ ] [todo]: IE11 patches for flexbox grid and css custom properties

