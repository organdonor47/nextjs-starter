type sizes = {
  x1: string;
  x2?: string; // retina
  mobile?: string; // use for art direction only
  desktop?: string; // use for art direction only
};

export interface IFormats {
  [key: string]: sizes;
}

interface IProps {
  src: string; // the default fallback image
  width?: number;
  height?: number;
  alt?: string;
  lazy?: boolean;
  className?: string;
  draggable?: boolean;
  formats?: IFormats;
}

export const Picture = ({
  src,
  formats,
  width,
  height,
  alt,
  lazy = true,
  draggable,
  className,
}: IProps) => {
  const renderImage = (
    <img
      className={className}
      src={src}
      width={width}
      height={height}
      alt={alt ?? ''}
      loading={lazy ? 'lazy' : 'eager'}
      draggable={draggable}
    />
  );

  if (!formats) {
    return renderImage;
  }

  const formatArray: Array<{ formatType: string; srcSet: string; media?: string }> = [];

  // sets source orders. TODO: mobile / desktop values in UI?
  const setFormats = () => {
    Object.entries(formats).forEach(([k, v]) => {
      if (v?.mobile) {
        formatArray.push({
          formatType: k,
          srcSet: `${v.mobile}`,
          media: '(max-width: 719px)',
        });
      }

      if (v?.desktop) {
        formatArray.push({
          formatType: k,
          srcSet: `${v.desktop}`,
          media: '(min-width: 720px)',
        });
      }

      formatArray.push(
        v?.x2
          ? { formatType: k, srcSet: `${v.x1} 1x, ${v.x2} 2x` }
          : { formatType: k, srcSet: `${v?.x1} 1x` },
      );
    });

    return formatArray.map(
      (item: { formatType: string; srcSet: string; media?: string }, i: number) => {
        return (
          <source
            key={i}
            srcSet={item.srcSet}
            media={item.media ?? undefined}
            type={`image/${item.formatType}`}
          />
        );
      },
    );
  };

  return (
    <picture>
      {setFormats()}
      {renderImage}
    </picture>
  );
};
