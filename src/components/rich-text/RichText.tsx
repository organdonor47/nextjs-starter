import c from 'classnames';
import s from './RichText.module.scss';

export const RichText = ({html, className }: { html: string | React.ReactNode; className?: string; }) => {

  if (typeof html === 'string') {
    return (
      <div className={c(s.richText, className)} dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
  return (
    <div className={c(s.richText, className)}>
      {html}
    </div>
  );
}