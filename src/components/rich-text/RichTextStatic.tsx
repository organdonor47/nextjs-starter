/* wrapper component to pass to some non-reset styles for html elements */

import c from 'classnames';
import s from './RichText.module.scss';

interface IProps {
  html?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const RichTextStatic = ({ html, children, className, style }: IProps) => {
  if (!html && !children) {
    return null;
  }

  const passProps: IProps = {};
  passProps.className = c(s.richText, className);
  passProps.style = style;

  // prioritise children
  if (children) {
    return <div {...passProps}>{children}</div>;
  }

  return <div {...passProps} dangerouslySetInnerHTML={{ __html: html ?? '' }} />;
};
