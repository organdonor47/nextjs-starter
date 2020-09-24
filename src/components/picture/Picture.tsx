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
  className?: string;

  formats?: {
    png?: sizes;
    webp?: sizes;
    jpg?: sizes;
  }
}

export const Picture = ({ src, formats, width, height, alt, lazy = true, className } : IProps) => {

  const renderImage = (
    <img
      className={className}
      src={src}
      width={width}
      height={height}
      alt={alt ?? ''}
      loading={lazy ? 'lazy' : 'eager'}
    />
  );

    if (!formats) {
      return renderImage;
    }

    const formatArray: any = [];

    // sets source orders. TODO: mobile / desktop values in UI? 
    const setFormats = () => {

      Object.entries(formats).forEach(([k, v]) => {

      if (v.mobile) {
        formatArray.push({type: k, srcSet: `${v.mobile}`, media: '(max-width: 719px)'});
      }
      
      if (v.desktop) {
        formatArray.push({type: k, srcSet: `${v.desktop}`, media: '(min-width: 720px)'});
      }
      
      formatArray.push(
        v.x2 ?
        {type: k, srcSet: `${v.x1} 1x, ${v.x2} 2x`}
        : {type: k, srcSet: `${v.x1} 1x`});
      });
      
      return formatArray.map((item: { srcSet: string; media: string; type: string }, i) => {
        return (
          <source key={i} srcSet={item.srcSet} media={item.media ?? null} type={`image/${item.type}`} />
        );
      });
    }
  
  return (
    <picture>
      {setFormats()}
      {renderImage}
    </picture>
  );
}