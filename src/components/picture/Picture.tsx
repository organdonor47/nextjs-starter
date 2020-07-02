import s from './Picture.module.scss';

type sizes = {
  x1: string;
  x2?: string; // retina
  mobile?: string; // use for art direction only
  desktop?: string; // use for art direction only
}

interface IProps {
  src: string; // the default fallback image
  width: number;
  height: number;
  alt?: string;
  lazy?: boolean;

  formats?: {
    png?: sizes;
    webp?: sizes;
    jpg?: sizes;
  }
}

export const Picture = ({ src, formats, width, height, alt, lazy = true } : IProps) => {

    const result = [];

    const setFormats = () => {
      Object.entries(formats).forEach(([k, v]) => {

      if (v.mobile) {
        result.push({type: k, srcSet: `${v.mobile}`, media: '(max-width: 719px)'});
      }
      
      if (v.desktop) {
        result.push({type: k, srcSet: `${v.desktop}`, media: '(min-width: 720px)'});
      }
      
      result.push(
        v.x2 ?
        {type: k, srcSet: `${v.x1} 1x, ${v.x2} 2x`}
        : {type: k, srcSet: `${v.x1} 1x`});
      });
      
      return result.map((item: { srcSet: string; media: string; type: string }, i) => {
        return (
          <source key={i} srcSet={item.srcSet} media={item.media ?? null} type={`image/${item.type}`} />
        );
      });
    }
  
  return (
    <picture className={s.picture}>
      {setFormats()}
      <img
        className={s.picture__image}
        src={src}
        width={width}
        height={height}
        alt={alt ?? ''}
        loading={lazy ? 'lazy' : 'eager'}
      />
    </picture>
  );
}